import { Helmet } from "react-helmet-async";

/*
  WebSite structured data — render this ONCE, site-wide, alongside
  OrganizationSchema. Google explicitly recommends keeping these as two
  separate entities rather than merging Organization + WebSite fields
  into one object.

  Usage (once, in App.js's Layout):
  <WebSiteSchema />
*/

const SITE_URL = "https://gameonplay.in";

export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Game On India",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/games?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
