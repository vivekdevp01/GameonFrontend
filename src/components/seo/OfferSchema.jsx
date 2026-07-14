import { Helmet } from "react-helmet-async";

const SITE_URL = "https://gameonplay.in";

export default function OfferSchema({ offers = [] }) {
  if (!offers.length) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Game On India Offers",
    url: `${SITE_URL}/offers`,
    itemListElement: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.title,
      description: offer.description,
      url: `${SITE_URL}/offers`,
      priceCurrency: "INR",

      ...(offer.price && {
        price: offer.price,
      }),

      availability: "https://schema.org/InStock",

      ...(offer.valid_till && {
        validThrough: offer.valid_till,
      }),

      category: offer.tag,

      seller: {
        "@type": "Organization",
        name: "Game On India",
        url: SITE_URL,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
