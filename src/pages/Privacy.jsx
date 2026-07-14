import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const SECTIONS = [
  {
    title: "1. Scope of This Policy",
    body: `This Privacy Policy applies to Game On India, our website, our mobile communications (SMS/WhatsApp), and all company-owned and franchise-operated branches operating under the Game On India brand across Jalandhar, Amritsar, Zirakpur, Pune, and future locations. Franchise-operated branches are contractually required to follow the same data-handling standards described here.`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect information you provide directly — such as your name, phone number, email, and city — when you book a party, purchase a package, register for a Game On membership or power card, sign up for our newsletter, or contact us. We also automatically collect device information such as browser type, IP address, and pages visited when you use our website.`,
  },
  {
    title: "3. Membership, Power Cards & Loyalty Points",
    body: `If you register for a Game On membership or reloadable game card, we store your card ID, play history, and points balance to manage your rewards, tier status, and birthday offers. Points and card balances are non-transferable between accounts and hold no cash value.`,
  },
  {
    title: "4. How We Use Your Information",
    body: `We use your information to process bookings, confirm reservations, manage loyalty accounts, respond to inquiries, and — only where you've opted in — send offers and updates. We do not sell your personal information to third parties for their own marketing purposes.`,
  },
  {
    title: "5. Cookies & Website Analytics",
    body: `Our website uses cookies and similar technologies to remember preferences and understand how visitors use the site. You can disable cookies in your browser settings; some features, such as saved branch preferences, may not work correctly as a result.`,
  },
  {
    title: "6. Payments & Gift Cards",
    body: `Payments for bookings, packages, and gift cards are processed through secure third-party payment gateways. We do not store full card or payment credentials on our servers. Gift cards and vouchers are linked only to the minimal information required to issue and redeem them.`,
  },
  {
    title: "7. CCTV & In-Venue Monitoring",
    body: `For guest and staff safety, our branches are monitored by CCTV. Footage is used solely for security and incident-review purposes and is retained only for the period required by applicable law or operational necessity.`,
  },
  {
    title: "8. Children's Information",
    body: `Many of our guests are minors visiting with a parent or guardian. We do not knowingly collect personal information directly from children without adult involvement — bookings, memberships, and registrations must be made by an adult on the child's behalf.`,
  },
  {
    title: "9. Sharing With Service Providers",
    body: `We share information only with vendors who help us operate — such as payment processors, SMS/WhatsApp messaging providers, and booking-system providers — strictly to deliver our services. Franchise partners have access only to data relevant to their own branch operations.`,
  },
  {
    title: "10. Third-Party Links",
    body: `Our website may link to third-party sites (such as social media or payment gateways). We are not responsible for the privacy practices of those sites and encourage you to review their policies separately.`,
  },
  {
    title: "11. Data Security",
    body: `We apply reasonable administrative and technical safeguards to protect your information. No method of transmission over the internet is completely secure, and we cannot guarantee absolute protection against unauthorized access.`,
  },
  {
    title: "12. Your Rights",
    body: `You may request access to, correction of, or deletion of your personal information, or opt out of promotional communication at any time, by contacting us using the details below. We will respond to reasonable requests within a reasonable timeframe.`,
  },
  {
    title: "13. Franchise & Fraud Notice",
    body: `Game On India does not authorize any individual, agency, or third-party website to collect payments, personal data, or franchise fees on our behalf outside of our official, verified channels. If you're contacted by someone claiming to represent Game On India for franchise or investment purposes, please verify directly with us before sharing any information or making a payment.`,
  },
  {
    title: "14. Changes to This Policy",
    body: `We may update this Privacy Policy periodically. Changes will be posted on this page with a revised date. Continued use of our services after an update constitutes acceptance of the revised policy.`,
  },
  {
    title: "15. Contact Us",
    body: `For questions about this Privacy Policy or your data, contact us at hello@gameonindia.in or visit any Game On India branch.`,
  },
];

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read Game On India's Privacy Policy explaining how we collect, use, store and protect your personal information across all Game On India branches."
        path="/privacy"
        keywords="Game On India Privacy Policy, privacy policy, personal information, customer data, arcade privacy"
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ]}
      />
      <div data-testid="privacy-page" className="min-h-screen">
        <section className="relative pt-40 pb-20 px-6 md:px-10 goi-noise overflow-hidden">
          <div className="absolute inset-0 goi-grid-bg opacity-30" />
          <div className="relative max-w-4xl mx-auto">
            <Link
              to="/"
              data-testid="privacy-back-home"
              className="inline-flex items-center gap-2 text-white/50 hover:text-brand-cyan text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="goi-overline mb-4 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="font-display font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-4">
              Privacy <span className="text-brand-magenta">Policy</span>
            </h1>
            <p className="text-white/60">
              Last updated: January 2026 · Applies to all company-owned and
              franchise-operated branches
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-24 md:pb-32">
          <div className="max-w-4xl mx-auto goi-card rounded-3xl p-8 md:p-12">
            <p className="text-white/70 leading-relaxed mb-10">
              Game On India ("we", "us", "our") operates and franchises family
              entertainment centers across India. This Privacy Policy explains
              how we collect, use, and protect your information when you visit
              our website, book a party, register for a membership, or interact
              with any Game On India branch — company-owned or franchised.
            </p>
            <div className="space-y-10">
              {SECTIONS.map((s) => (
                <div
                  key={s.title}
                  data-testid={`privacy-section-${s.title.split(".")[0]}`}
                >
                  <h2 className="font-display font-bold text-xl sm:text-2xl mb-3 text-white">
                    {s.title}
                  </h2>
                  <p className="text-white/60 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
