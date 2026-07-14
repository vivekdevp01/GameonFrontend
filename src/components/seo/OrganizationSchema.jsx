import { Helmet } from "react-helmet-async";

/*
  Organization structured data — render this ONCE, site-wide, not per-page.
  Best placed in App.js's Layout component (non-admin routes) so it's
  present on every page via React, consistently with the rest of your SEO
  system — instead of the static duplicate currently in index.html.

  IMPORTANT: once you add this, remove the static Organization JSON-LD
  <script> block from index.html — having both means Google sees the
  exact same Organization entity declared twice. Pick one source of
  truth; this component is the better one since it's easy to keep in
  sync with your actual contact-info data going forward.

  Usage (once, in App.js's Layout):
  <OrganizationSchema />
*/

const SITE_URL = "https://gameonplay.in";

const SOCIAL_LINKS = [
  "https://instagram.com/gameonindia",
  "https://facebook.com/gameonindia",
  "https://youtube.com/@gameonindia",
];

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Game On India",
    legalName: "Game On India",
    url: SITE_URL,
    logo: `${SITE_URL}/gameon.png`,
    image: `${SITE_URL}/gameon.png`,
    description:
      "India's premium Family Entertainment Center. Arcade, VR, bowling, racing sims, and birthday parties across Jalandhar, Amritsar, Zirakpur & Pune.",
    sameAs: SOCIAL_LINKS,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+91-77106-61100",
      email: "hello@gameonindia.in",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Punjabi"],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
