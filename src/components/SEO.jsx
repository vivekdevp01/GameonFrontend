import { Helmet } from "react-helmet-async";

/*
  Generic, page-agnostic SEO tags — belongs on EVERY page.

  Deliberately does NOT include JSON-LD structured data. That lives in
  two other places instead:
    1. index.html — static Organization + WebSite schema, same on every
       page, describing the business once, correctly.
    2. LocalBusinessSchema.jsx / ArticleSchema.jsx / FAQSchema.jsx /
       BreadcrumbSchema.jsx — composed only on the specific page types
       they actually describe (branch pages, blog posts, FAQ pages).

  Putting schema here instead would mean every page — Home, Games,
  Contact, every blog post — emits its own separate "business" entity
  with a different url/image each time, which reads to Google as
  conflicting duplicate listings rather than one consistent one.

  Usage:
  <SEO
    title="Bowling in Jalandhar"
    description="Premium bowling lanes at Game On India Jalandhar."
    path="/branches/jalandhar"
    keywords="arcade, VR games, bowling, Jalandhar"
  />
*/

const SITE_NAME = "Game On India";
const SITE_URL = "https://gameonplay.in";

const DEFAULT_TITLE =
  "Game On India | Play. Eat. Celebrate. — Family Entertainment Center";

const DEFAULT_DESCRIPTION =
  "India's premium Family Entertainment Center. Arcade, VR, Bowling, Birthday Parties, Racing Sims and Kids Entertainment across Jalandhar, Amritsar, Zirakpur & Pune.";

const DEFAULT_KEYWORDS =
  "Game On India, Game On Play, arcade, VR games, bowling, birthday party, family entertainment, Jalandhar, Amritsar, Zirakpur, Pune";

// NOTE: confirm this matches the real filename in your public/ folder —
// earlier messages in this project used "gameonlogo.png", this one used
// "gameon.png". Pick whichever file actually exists and use that exact
// name here, in index.html, and everywhere else that references it.
const DEFAULT_IMAGE = `${SITE_URL}/gameon.png`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords = DEFAULT_KEYWORDS,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />
      <link rel="canonical" href={url} />

      <link rel="alternate" hrefLang="en-in" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
