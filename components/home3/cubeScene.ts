import * as THREE from "three";
import { cubes } from "@/lib/home3";

/**
 * Port of santalarch.com's CubesScene: a stepped pyramid of wire cubes carrying words on their faces.
 * Everything is a pure function of timeline time T (1 unit ≈ one screen of scroll), using the
 * reference's own numbers: reveal 0–0.75, three layer shifts 0.75–2.25, flatten 2.25–5.25,
 * camera arc 0.25–5.25 (front view → over the top), then a dive into the apex cube 5.25–6.75.
 */
const FS = 0.175; // world font size
const MIN = -4; // layers run C = -4 … 6
const N = 11;
const BELOW = [0.2, 0.12, 0.1]; // layers under the middle fade out
const PLANE_O = [0.7, 0.4, 0.2, 0.6]; // front, left, right, top
const LINE_O = 0.3;
const FOV = 15;
const CAM_Z = 8;
const END_Z = -4.5; // arc ends above the pyramid's axis
const ELEV = 25;
const UNZOOM = 0.6;
const DIVE_END = 1.4; // camera distance above the apex centre when the dive ends
const SPECIAL = 6; // layer C = 2, column 0: "Perception / Defines / Experience" one behind the other
const TEXT_PX = 200;

export const DIVE_START = 5.25;
export const DIVE_DONE = 6.75;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const span = (T: number, a: number, b: number) => clamp01((T - a) / (b - a));
const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const mod = (n: number, m: number) => ((n % m) + m) % m;

// tips (-4 … -2) and base (5, 6) form the pyramid; the six wide slabs between them fade away
const config = (C: number) =>
  C <= -2
    ? { size: 2 * (-2 - C) + 1, depth: 2 * (-2 - C) + 1, hidden: false }
    : C >= 5
      ? { size: 2 * (9 - C) + 1, depth: 2 * (9 - C) + 1, hidden: false }
      : { size: 11, depth: 3, hidden: true };

const slotPos = (j: number) => {
  const C = j + MIN;
  const E = Math.abs(C);
  return new THREE.Vector3(0, C, E ? -(0.25 * Math.min(E, 1) + 0.5 * clamp01(E - 1) + Math.max(E - 2, 0)) : 0);
};
const SLOTS = Array.from({ length: N }, (_, j) => slotPos(j));
const slotA = (j: number) => (j + MIN < 0 ? (BELOW[-(j + MIN) - 1] ?? 0) : 1);

// columns step back from the centre: 0, .25, .5, 1, 1.5, 2.25 …
const colZ = (w: number) => {
  let r = 0;
  for (let D = 1; D <= Math.abs(w); D++) r += 0.25 * Math.min(Math.ceil(D / 2), 4);
  return -r;
};

function wordTexture(word: string, family: string, aniso: number) {
  const c = document.createElement("canvas");
  const g = c.getContext("2d")!;
  const set = () => {
    g.font = `400 ${TEXT_PX}px ${family}`;
    g.letterSpacing = `${-0.05 * TEXT_PX}px`;
  };
  set();
  const m = g.measureText(word);
  const pad = TEXT_PX * 0.1;
  c.width = Math.ceil(m.width + pad * 2);
  c.height = Math.ceil(m.fontBoundingBoxAscent + m.fontBoundingBoxDescent + pad * 2);
  set(); // resizing the canvas resets the context
  g.fillStyle = "#fff";
  g.fillText(word, pad, pad + m.fontBoundingBoxAscent);
  const map = new THREE.CanvasTexture(c);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = aniso;
  // content box centred in the texture, like a CSS line box, so it can sit exactly on a DOM line
  return { map, w: (c.width / TEXT_PX) * FS, h: (c.height / TEXT_PX) * FS };
}

type Cube = { w: number; D: number; front: string; side: string };
type Words = Map<string, { mesh: THREE.InstancedMesh; mat: THREE.MeshBasicMaterial; front: Cube[]; side: Cube[] }>;

export type TagLine = { cx: number; cy: number; font: number; lh: number }; // the DOM "Perception" line, stage px

export function createCubeScene(canvas: HTMLCanvasElement, family: string) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  const target = new THREE.Vector3();
  const UP0 = new THREE.Vector3(0, 1, 0);
  const UP1 = new THREE.Vector3(0, 0, 1); // looking straight down, as the reference's end Euler (-π/2, 0, π)
  const aniso = renderer.capabilities.getMaxAnisotropy();
  const quad = new THREE.PlaneGeometry(1, 1);
  const edges = new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)).attributes.position.array as Float32Array;
  const dummy = new THREE.Object3D();

  const textures = new Map<string, ReturnType<typeof wordTexture>>();
  const tex = (s: string) => {
    if (!textures.has(s)) textures.set(s, wordTexture(s, family, aniso));
    return textures.get(s)!;
  };
  const textMat = (s: string) =>
    new THREE.MeshBasicMaterial({ map: tex(s).map, color: 0xf0f0f0, transparent: true, opacity: 0, alphaTest: 0.02, side: THREE.DoubleSide });

  const root = new THREE.Group();
  root.position.set(0, -2, 0.25);
  scene.add(root);

  const layers = Array.from({ length: N }, (_, j) => {
    const C = j + MIN;
    const cfg = config(C);
    const half = (cfg.size - 1) / 2;
    const group = new THREE.Group();
    root.add(group);

    const list: Cube[] = [];
    for (let w = -half, G = 0; w <= half; w++, G++)
      for (let D = 0; D < cfg.depth; D++) {
        const O = mod((4 + j) * 5 + G * 2 + D, 6);
        list.push({ w, D, front: cubes.front[O], side: cubes.side[mod(O + w * 2, 3)] });
      }

    // draw order: words, then edges over them, then the dark faces (nudged back so they never dim their own edges)
    const lineMat = new THREE.LineBasicMaterial({ color: 0xf2f0f0, transparent: true, opacity: 0 });
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(list.length * edges.length), 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    lines.renderOrder = 1;
    lines.frustumCulled = false;
    group.add(lines);

    const planeMats = PLANE_O.map(
      () =>
        new THREE.MeshBasicMaterial({
          color: 0x111111,
          transparent: true,
          opacity: 0,
          depthWrite: false,
          side: THREE.DoubleSide,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        }),
    );
    const planes = planeMats.map((mat, k) => {
      const mesh = new THREE.InstancedMesh(quad, mat, k === 3 && C === 0 ? 0 : list.length); // the reference leaves C = 0 open on top
      mesh.renderOrder = 2; // last: dark faces dim what lies behind them, never what is in front
      mesh.frustumCulled = false;
      group.add(mesh);
      return mesh;
    });

    // the special column's front words are separate meshes so they can start as the DOM tagline
    const special = j === SPECIAL;
    const words: Words = new Map();
    const bucket = (s: string) => {
      if (!words.has(s)) words.set(s, { mesh: null!, mat: textMat(s), front: [], side: [] });
      return words.get(s)!;
    };
    list.forEach((c) => {
      if (!(special && c.w === 0 && c.D < 3)) bucket(c.front).front.push(c);
      bucket(c.side).side.push(c);
    });
    words.forEach((b) => {
      b.mesh = new THREE.InstancedMesh(quad, b.mat, b.front.length + b.side.length);
      b.mesh.renderOrder = 0;
      b.mesh.frustumCulled = false;
      group.add(b.mesh);
    });

    return { C, hidden: cfg.hidden, group, list, lines, lineMat, planes, planeMats, words };
  });

  const specials = cubes.front.slice(0, 3).map((s, D) => {
    const mesh = new THREE.Mesh(quad, textMat(s));
    mesh.renderOrder = 0;
    layers[SPECIAL].group.add(mesh);
    return { mesh, D, from: new THREE.Vector3(0, 0, 0.501 - D), fromScale: 1 };
  });

  // writes every instance for a given flatten amount (columns stepping back → aligned)
  let laidOut = -1;
  const layout = (flat: number) => {
    if (flat === laidOut) return;
    laidOut = flat;
    const at = (c: Cube, hidden: boolean) => colZ(c.w) * (hidden ? 1 : 1 - flat) - c.D;
    layers.forEach((L) => {
      const pos = L.lines.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      L.list.forEach((c, i) => {
        const z = at(c, L.hidden);
        for (let v = 0; v < edges.length; v += 3) {
          arr[i * edges.length + v] = edges[v] + c.w;
          arr[i * edges.length + v + 1] = edges[v + 1];
          arr[i * edges.length + v + 2] = edges[v + 2] + z;
        }
        const place = (mesh: THREE.InstancedMesh, k: number, x: number, y: number, zz: number, rx: number, ry: number) => {
          if (k >= mesh.count) return;
          dummy.position.set(x, y, zz);
          dummy.rotation.set(rx, ry, 0);
          dummy.scale.set(1, 1, 1);
          dummy.updateMatrix();
          mesh.setMatrixAt(k, dummy.matrix);
        };
        place(L.planes[0], i, c.w, 0, z + 0.5, 0, 0);
        place(L.planes[1], i, c.w - 0.5, 0, z, 0, Math.PI / 2);
        place(L.planes[2], i, c.w + 0.5, 0, z, 0, Math.PI / 2);
        place(L.planes[3], i, c.w, 0.5, z, -Math.PI / 2, 0);
      });
      pos.needsUpdate = true;
      L.planes.forEach((m) => (m.instanceMatrix.needsUpdate = true));
      L.words.forEach((b, s) => {
        const t = tex(s);
        let k = 0;
        const put = (x: number, zz: number, ry: number) => {
          dummy.position.set(x, 0, zz);
          dummy.rotation.set(0, ry, 0);
          dummy.scale.set(t.w, t.h, 1);
          dummy.updateMatrix();
          b.mesh.setMatrixAt(k++, dummy.matrix);
        };
        b.front.forEach((c) => put(c.w, at(c, L.hidden) + 0.501, 0));
        b.side.forEach((c) => put(c.w - 0.501, at(c, L.hidden), Math.PI / 2));
        b.mesh.instanceMatrix.needsUpdate = true;
      });
    });
  };
  layout(0);

  let w = 1;
  let h = 1;
  const resize = (width: number, height: number, tag: TagLine | null) => {
    w = width;
    h = height;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!tag) return;
    // place the three words over the DOM tagline: Perception on its line, Defines and Experience below
    const at = [
      [tag.cx, tag.cy],
      [tag.cx + 1.8 * tag.font, tag.cy + tag.lh],
      [tag.cx - 0.2 * tag.font, tag.cy + 2 * tag.lh],
    ];
    specials.forEach((s, i) => {
      const d = CAM_Z - (0.001 - i); // camera to the word, front view
      const px = h / (2 * d * Math.tan(THREE.MathUtils.degToRad(FOV / 2)));
      const half = ((tex(cubes.front[i]).w / FS) * tag.font) / 2 - 0.1 * tag.font; // ink half-width, px
      const cx = Math.min(at[i][0], w - 16 - half); // keep "Defines" on narrow screens
      s.from.set((cx - w / 2) / px, (h / 2 - at[i][1]) / px, 0.501 - i);
      s.fromScale = tag.font / px / FS;
    });
  };

  const corner = new THREE.Vector3();
  const TOP = [
    [-0.5, -0.5],
    [0.5, -0.5],
    [0.5, 0.5],
    [-0.5, 0.5],
  ];
  /** screen rectangle of the apex cube's top face — the window the dive falls through */
  const apexRect = () => {
    const apex = layers.find((L) => L.list.length === 1)!.group;
    let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
    for (const [x, z] of TOP) {
      corner.set(x, 0.5, z);
      apex.localToWorld(corner).project(camera);
      const sx = ((corner.x + 1) / 2) * w;
      const sy = ((1 - corner.y) / 2) * h;
      l = Math.min(l, sx);
      r = Math.max(r, sx);
      t = Math.min(t, sy);
      b = Math.max(b, sy);
    }
    return { l, t, r, b };
  };

  const render = (T: number) => {
    // 1 · reveal: the three tagline words settle onto their faces while the cubes fade in
    const midO = easeOut(span(T, 0, 0.25));
    const move = span(T, 0.2, 0.7);
    const grow = span(T, 0.25, 0.75);
    const revText = easeIn(span(T, 0.25, 0.75));
    const revLine = easeOut(span(T, 0.25, 0.75));
    // 2 · every layer slides down into the slot below, three times; the bottom one wraps to the top
    const s = clamp01((T - 0.75) / 1.5) * 3;
    // 3 · the wide slabs fade, the pyramid's columns line up
    const f2 = span(T, 2.25, 5.25);
    layout(easeIn(f2));
    const fade = 1 - easeOut(f2);

    layers.forEach((L, a) => {
      let A = slotA(a);
      if (s > 0) {
        const k = Math.min(Math.floor(s), 2);
        const f = s - k;
        const from = mod(a - k, N);
        const to = mod(a - k - 1, N);
        if (to === N - 1) {
          L.group.position.copy(SLOTS[to]); // jumps, as the reference's gsap.set
          A = slotA(to);
        } else {
          L.group.position.lerpVectors(SLOTS[from], SLOTS[to], f);
          A = lerp(slotA(from), slotA(to), easeIn(f));
        }
      } else L.group.position.copy(SLOTS[a]);

      const hide = L.hidden ? fade : 1;
      const text = A * (s > 0 ? 1 : revText) * hide;
      const fadeTo = (o: THREE.Object3D, m: THREE.Material, v: number) => {
        m.opacity = v;
        o.visible = v > 0.001; // as the reference: nothing invisible is drawn
      };
      fadeTo(L.lines, L.lineMat, LINE_O * A * (s > 0 ? 1 : revLine) * hide);
      L.planes.forEach((p, k) => fadeTo(p, L.planeMats[k], PLANE_O[k] * A * (s > 0 ? 1 : revLine) * hide));
      L.words.forEach((b) => fadeTo(b.mesh, b.mat, text));
      if (a === SPECIAL)
        specials.forEach((sp) => {
          fadeTo(sp.mesh, sp.mesh.material as THREE.Material, T < 0.75 ? (sp.D ? midO : 1) : text);
          const t = tex(cubes.front[sp.D]);
          const sc = lerp(sp.fromScale, 1, grow);
          sp.mesh.position.set(lerp(sp.from.x, 0, move), lerp(sp.from.y, 0, move), sp.from.z);
          sp.mesh.scale.set(t.w * sc, t.h * sc, 1);
        });
    });

    // camera: half a circle up and over to a top-down view, unzooming; then straight down into the apex
    const e = span(T, 0.25, 5.25);
    const dive = span(T, DIVE_START, DIVE_DONE);
    const R = (CAM_Z - END_Z) / 2;
    if (dive > 0) camera.position.set(0, 4 + (ELEV - 4) * Math.pow(DIVE_END / (ELEV - 4), dive), END_Z);
    else camera.position.set(R * Math.sin(Math.PI * e), lerp(0, ELEV, e), (CAM_Z + END_Z) / 2 + R * Math.cos(Math.PI * e));
    target.set(0, lerp(0, 4, e), lerp(0, END_Z, e));
    camera.up.lerpVectors(UP0, UP1, e).normalize();
    camera.lookAt(target);
    camera.zoom = lerp(1, UNZOOM, e);
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
    return dive > 0 ? apexRect() : null;
  };

  const dispose = () => {
    scene.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.Material | undefined;
      m?.dispose();
      if (o instanceof THREE.LineSegments) o.geometry.dispose();
      if (o instanceof THREE.InstancedMesh) o.dispose();
    });
    textures.forEach((t) => t.map.dispose());
    quad.dispose();
    renderer.dispose();
  };

  return { render, resize, dispose };
}
