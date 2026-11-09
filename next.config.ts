import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  async redirects() {
    // /home is the working edition; /home1–3 stay reachable by their own slugs. Temporary, so it can move again.
    return [{ source: "/", destination: "/home", permanent: false }];
  },
  // Baseline hardening (GDPR Art. 32): no referrer leakage to third parties, no MIME sniffing, no device APIs.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
