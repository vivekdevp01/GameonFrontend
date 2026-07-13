import { Helmet } from "react-helmet-async";

/*
  Usage: drop this at the top of any page component.

  <SEO
    title="Bowling in Jalandhar | Game On India"
    description="Premium bowling lanes at Game On India Jalandhar. Book now for parties, groups, or a casual game."
    path="/branches/jalandhar"
    image="https://images.unsplash.com/photo-1558271697-dd9f331ca8b3?w=1200"
  />

  Requires: npm install react-helmet-async
  Then wrap <App /> in index.js with <HelmetProvider> (see setup notes below).
*/

const SITE_NAME = "Game On India";
const SITE_URL = "https://www.gameonindia.in"; // update to your real production domain
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1558271697-dd9f331ca8b3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

export default function SEO({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
}) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Play. Eat. Celebrate.`;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph — controls how links look on WhatsApp, Facebook, LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter/X card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
