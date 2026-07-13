import { Link } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";
import SEO from "@/components/SEO";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By visiting any Game On India branch — company-owned or franchise-operated — using our website, or booking a party or package, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.`,
  },
  {
    title: "2. Bookings & Reservations",
    body: `Party and event bookings are subject to availability and confirmation by branch staff. A booking is guaranteed only once confirmed via phone, WhatsApp, or email. An advance payment or deposit may be required to hold a slot, as specified at the time of booking.`,
  },
  {
    title: "3. Cancellations & Rescheduling",
    body: `Cancellation or rescheduling requests must be made at least 48 hours before the scheduled time. Deposits and advance payments may be non-refundable depending on the package selected — please confirm the specific policy with your branch at the time of booking.`,
  },
  {
    title: "4. Pricing & Packages",
    body: `Prices for games, packages, and parties are subject to change without prior notice and may vary by branch and location. The price confirmed at the time of booking will be honored. Promotional offers cannot be combined unless explicitly stated.`,
  },
  {
    title: "5. Membership, Power Cards & Rewards",
    body: `Game cards and membership accounts are non-transferable and remain the property of Game On India. Loyalty points, tier status, and card balances hold no cash value, cannot be redeemed for cash, and may expire after a period of inactivity as specified at sign-up.`,
  },
  {
    title: "6. Gift Cards & Vouchers",
    body: `Gift cards and vouchers are non-refundable and non-transferable unless stated otherwise, must be used within their validity period, and are only valid when purchased through our official website or an authorized branch. We are not responsible for gift cards or vouchers purchased through unauthorized third parties or resellers.`,
  },
  {
    title: "7. Redemption Games & Prizes",
    body: `Tickets earned through redemption games hold no cash value and cannot be exchanged for cash. Prizes are subject to availability and may be substituted with items of comparable value at branch discretion.`,
  },
  {
    title: "8. Age, Height & Safety Requirements",
    body: `Certain attractions — including VR, bowling, and select arcade and ride equipment — have minimum age, height, or weight requirements for safety. Staff decisions on eligibility to play are final. Children must be supervised by an accompanying adult at all times.`,
  },
  {
    title: "9. Guest Conduct",
    body: `We reserve the right to refuse service or remove any guest from our premises whose conduct is unsafe, disruptive, or disrespectful toward staff or other guests, without refund.`,
  },
  {
    title: "10. Assumption of Risk & Liability",
    body: `Participation in arcade games, VR, bowling, rides, and other attractions carries inherent risk. By using our facilities, guests — or a parent/guardian, for minors — acknowledge this risk. To the fullest extent permitted by law, Game On India and its franchise partners are not liable for injury or loss resulting from failure to follow posted safety instructions or staff guidance.`,
  },
  {
    title: "11. Lost or Damaged Property",
    body: `Game On India is not responsible for loss, theft, or damage to personal belongings brought onto our premises. Guests are advised to keep valuables secure at all times.`,
  },
  {
    title: "12. Franchise Fraud Notice",
    body: `Game On India does not authorize any individual, agency, or third-party platform to solicit, offer, or finalize franchise agreements, or to collect franchise fees, on our behalf outside official channels. Please verify any franchise inquiry directly with our head office before making any payment or sharing sensitive information. Franchise information on this website is for general informational purposes only and does not constitute a binding offer — franchise terms are governed exclusively by a formal, signed franchise agreement.`,
  },
  {
    title: "13. Vendor & Third-Party Terms",
    body: `Vendors and service providers engaging with Game On India for supply, maintenance, or operational services are separately bound by our standard vendor terms of business, available on request from our procurement team.`,
  },
  {
    title: "14. Intellectual Property",
    body: `The Game On India name, logo, graphics, and branding are the property of Game On India and may not be reproduced, copied, or used without prior written permission, including by franchise partners outside the scope of their franchise agreement.`,
  },
  {
    title: "15. Limitation of Liability",
    body: `To the fullest extent permitted by law, Game On India shall not be liable for indirect, incidental, or consequential loss arising from use of our website, services, or venues, including any interruption, error, or inaccuracy in content. Nothing in these Terms limits liability that cannot lawfully be excluded.`,
  },
  {
    title: "16. Changes to These Terms",
    body: `We may revise these Terms & Conditions periodically. Updates will be posted on this page with a revised date. Continued use of our services after an update constitutes acceptance of the current Terms.`,
  },
  {
    title: "17. Governing Law",
    body: `These Terms are governed by the laws of India. Disputes arising from use of our services are subject to the jurisdiction of the courts local to the relevant Game On India branch.`,
  },
  {
    title: "18. Contact Us",
    body: `For questions about these Terms & Conditions, contact us at hello@gameonindia.in or reach out to your nearest branch.`,
  },
];

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Game On India's terms and conditions for bookings, memberships, and venue use."
        path="/terms"
      />
      <div data-testid="terms-page" className="min-h-screen">
        <section className="relative pt-40 pb-20 px-6 md:px-10 goi-noise overflow-hidden">
          <div className="absolute inset-0 goi-grid-bg opacity-30" />
          <div className="relative max-w-4xl mx-auto">
            <Link
              to="/"
              data-testid="terms-back-home"
              className="inline-flex items-center gap-2 text-white/50 hover:text-brand-cyan text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <div className="goi-overline mb-4 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Legal
            </div>
            <h1 className="font-display font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-4">
              Terms & <span className="text-brand-magenta">Conditions</span>
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
              Please read these Terms & Conditions carefully before booking a
              party, purchasing a package or gift card, registering for a
              membership, or visiting any Game On India branch — company-owned
              or franchised.
            </p>
            <div className="space-y-10">
              {SECTIONS.map((s) => (
                <div
                  key={s.title}
                  data-testid={`terms-section-${s.title.split(".")[0]}`}
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
