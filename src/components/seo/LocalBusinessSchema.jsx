import { Helmet } from "react-helmet-async";

/*
  LocalBusiness structured data — use ONLY on individual branch pages
  (Branch.jsx). Do NOT put this on Home.jsx or any page that isn't a
  single physical location.

  Usage (inside Branch.jsx, once `branch` data has loaded):
  <LocalBusinessSchema branch={branch} />

  Optional fields on `branch` this supports (all safe if missing):
    branch.latitude, branch.longitude  → adds geo coordinates
    branch.rating, branch.review_count → adds aggregateRating, but ONLY
      if both are real numbers reflecting actual displayed reviews.
      Never fabricate these — Google treats mismatched/fake review
      schema as manipulative and can issue a manual action against
      the whole site.
*/

const SITE_URL = "https://gameonplay.in";

// Shared brand social accounts — same across all branches, per the
// single central @gameonindia account confirmed earlier in this project.
const BRAND_SOCIAL_LINKS = [
  "https://www.instagram.com/game_on_jalandhar",
  // "https://facebook.com/gameonindia",
  // "https://youtube.com/@gameonindia",
];

export default function LocalBusinessSchema({ branch }) {
  if (!branch) return null;

  const schema = {
    "@context": "https://schema.org",
    // EntertainmentBusiness is a more accurate fit than AmusementPark —
    // this is an indoor arcade/FEC, not a theme park like Disneyland.
    "@type": "EntertainmentBusiness",
    name: `Game On India — ${branch.city}`,
    image: branch.hero_image,
    logo: `${SITE_URL}/gameon.png`,
    url: `${SITE_URL}/branches/${branch.slug}`,
    telephone: branch.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: branch.city,
      addressRegion: branch.state,
      addressCountry: "IN",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: branch.timings?.open,
      closes: branch.timings?.close,
    },
    priceRange: "₹₹",
    sameAs: BRAND_SOCIAL_LINKS,
  };

  // Only added if the branch actually has real coordinates stored
  if (branch.latitude && branch.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: branch.latitude,
      longitude: branch.longitude,
    };
  }

  // Only added if BOTH real values are present — see warning in the
  // comment block above about never fabricating this
  if (branch.rating && branch.review_count) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: branch.rating,
      reviewCount: branch.review_count,
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
