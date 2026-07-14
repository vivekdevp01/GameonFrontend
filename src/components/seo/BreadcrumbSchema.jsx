import { Helmet } from "react-helmet-async";

/*
  Breadcrumb structured data — use on most pages except the homepage.
  Helps Google show the breadcrumb trail (Home > Branches > Jalandhar)
  directly in search results instead of just a plain URL.

  Usage (on a branch page):
  <BreadcrumbSchema items={[
      { name: "Home", path: "/" },
      { name: "Branches", path: "/branches" },
      { name: "Jalandhar", path: "/branches/jalandhar" },
  ]} />
*/

const SITE_URL = "https://gameonplay.in";

export default function BreadcrumbSchema({ items }) {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
