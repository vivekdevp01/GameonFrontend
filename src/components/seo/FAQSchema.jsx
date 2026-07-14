import { Helmet } from "react-helmet-async";

/*
  FAQ structured data — use ONLY on pages that have real, visible FAQ
  content on the page itself (never inject FAQ schema for content the
  visitor can't actually see — Google penalizes that as "spammy structured
  data"). Good candidates: Games.jsx, Booking.jsx, Franchise.jsx, About.jsx
  if you add visible Q&A sections there.

  Usage:
  <FAQSchema faqs={[
      { question: "What age is VR suitable for?", answer: "Most VR attractions require..." },
      { question: "Do you offer group discounts?", answer: "Yes, for groups of 10+..." },
  ]} />
*/

export default function FAQSchema({ faqs }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: String(f.answer),
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
