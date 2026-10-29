// Privacy notice and legal notice text shared by the /home2 and /home3 editions.
// Highlighted brackets are facts Levo must supply or confirm with counsel before launch.
const company = { legal: "Levo Advertising LLC", group: "A division of the Alams Group", email: "info@levoworld.com", phone: "+971 4 359 3600" };

const T = ({ children }: { children: React.ReactNode }) => <span className="todo">{children}</span>;

export const PRIVACY_UPDATED = "28 October 2026";

/** `stored` names what this edition keeps in the browser (strictly necessary, so no consent needed). */
export function PrivacyBody({ stored }: { stored: string }) {
  return (
    <div className="legal-body">
      <section>
        <h2>Who we are</h2>
        <p>
          The controller is {company.legal} (“Levo Exhibitions”), a division of the Alams Group, 1104, 11th Floor, Latifa Tower,
          Sheikh Zayed Road, Dubai, United Arab Emirates. E-mail <a href={`mailto:${company.email}`}>{company.email}</a>, telephone{" "}
          {company.phone}.
        </p>
        <p>
          Our representative in the European Union under Article 27 GDPR: <T>[name and address]</T>.
        </p>
      </section>

      <section>
        <h2>Cookies and tracking</h2>
        <p>
          None. This site sets no cookies, runs no analytics or advertising tools, and embeds no social-media pixels or third-party
          content. Fonts, images and scripts are served from our own server, so your browser does not contact Google or anyone else
          while you read it. Because nothing optional is stored on your device, we do not need to ask for consent. {stored}
        </p>
      </section>

      <section>
        <h2>What we process and why</h2>
        <ul>
          <li>
            <b>Visiting the site.</b> Our host <T>[provider, location]</T> processes your IP address, the page requested, time and
            browser type to deliver the site and keep it secure — our legitimate interest (Art. 6(1)(f) GDPR). Server logs are deleted
            after <T>[x] days</T>.
          </li>
          <li>
            <b>When you contact us.</b> By e-mail, phone or WhatsApp we receive your name, contact details, company and project
            information, and use them to answer you and prepare a proposal — steps prior to a contract at your request (Art. 6(1)(b))
            and our legitimate interest in replying to business enquiries (Art. 6(1)(f)). Enquiries that do not lead to a project are
            deleted after <T>[x months]</T>; project records are kept as long as UAE commercial law requires.
          </li>
          <li>
            <b>WhatsApp.</b> Our WhatsApp link opens Meta’s service under Meta’s own privacy terms. Use e-mail if you prefer not to.
          </li>
        </ul>
      </section>

      <section>
        <h2>Transfers outside the EU</h2>
        <p>
          Levo is based in the United Arab Emirates, which has no EU adequacy decision. When you contact us, your data goes to the UAE
          because it is necessary to answer you and to take the pre-contractual steps you asked for (Art. 49(1)(b) GDPR). Ongoing
          projects are covered by <T>[EU Standard Contractual Clauses, Art. 46(2)(c)]</T>. Builds outside the UAE are produced with
          partners, who receive only what your project needs.
        </p>
      </section>

      <section>
        <h2>Who receives data</h2>
        <p>
          Our host <T>[name]</T>, our e-mail provider <T>[name]</T>, and — only for your project — production partners and the show
          organiser where their technical regulations require it. We never sell personal data.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <ul>
          <li>Access your data and receive a copy (Art. 15, 20)</li>
          <li>Have it corrected or erased (Art. 16, 17)</li>
          <li>Restrict processing or object to processing based on legitimate interest (Art. 18, 21)</li>
          <li>Complain to a data protection authority, in particular where you live or work in the EU (Art. 77)</li>
        </ul>
        <p>
          Write to <a href={`mailto:${company.email}`}>{company.email}</a> — we reply within one month. Giving us your details is
          voluntary, but without them we cannot answer. We make no automated decisions about you.
        </p>
      </section>
    </div>
  );
}

export function LegalBody() {
  return (
    <div className="legal-body">
      <section>
        <h2>Provider</h2>
        <p>
          {company.legal}, trading as Levo Exhibitions
          <br />
          {company.group}
          <br />
          1104, 11th Floor, Latifa Tower, Sheikh Zayed Road, Dubai, United Arab Emirates
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          E-mail <a href={`mailto:${company.email}`}>{company.email}</a>
          <br />
          Telephone {company.phone}
        </p>
      </section>
      <section>
        <h2>Registration</h2>
        <p>
          Trade licence no. <T>[number]</T>, issued by <T>[Dubai Department of Economy and Tourism]</T>
          <br />
          VAT registration (TRN) <T>[number]</T>
          <br />
          Managing director <T>[name]</T>
        </p>
      </section>
      <section>
        <h2>EU representative</h2>
        <p>
          Under Article 27 GDPR: <T>[name and address]</T>
        </p>
      </section>
    </div>
  );
}
