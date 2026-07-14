import { useState } from "react";
import {
  Building2,
  DollarSign,
  Layers,
  Users,
  TrendingUp,
  Award,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { createFranchise } from "@/lib/api";
import SEO from "@/components/SEO";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const FAQS = [
  {
    q: "What's the total investment?",
    a: "Investment ranges from ₹1.5 Cr to ₹5 Cr depending on city, size, and format.",
  },
  {
    q: "What space do I need?",
    a: "Minimum 6,000 sq ft carpet area, ideally in a Tier 1/2 mall or high-street location.",
  },
  {
    q: "How long is the ROI cycle?",
    a: "Break-even in 24–30 months. Average ROI of 30–40% by year 3.",
  },
  {
    q: "Do you provide training?",
    a: "Yes. Full 6-week training covering operations, marketing, safety, and tech.",
  },
];

export default function Franchise() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    investment_range: "1.5-3 Cr",
    space_available: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createFranchise(form);
      toast.success(
        "Enquiry received! Our team will reach out within 48 hours.",
      );
      setForm({
        name: "",
        email: "",
        mobile: "",
        city: "",
        investment_range: "1.5-3 Cr",
        space_available: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const franchiseFaqs = FAQS.map((faq) => ({
  question: faq.q,
  answer: faq.a,
}));

  return (
    <>
    <>
  <SEO
    title="Game On India Franchise Opportunities"
    description="Start your Game On India franchise. Discover investment requirements, ROI, training, operational support and franchise opportunities across India."
    path="/franchise"
    keywords="Game On India franchise, arcade franchise, entertainment franchise, family entertainment business"
  />

  <BreadcrumbSchema
    items={[
      { name: "Home", path: "/" },
      { name: "Franchise", path: "/franchise" },
    ]}
  />

  <FAQSchema faqs={franchiseFaqs} />
</>
      <div data-testid="franchise-page">
        <section className="pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
          <div className="goi-overline mb-4">Franchise Opportunity</div>
          <h1 className="font-display font-black text-5xl sm:text-6xl mb-4 max-w-4xl">
            Own a Game On India in your city.
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mb-12">
            Join India's fastest-scaling FEC brand. Proven playbook. Premium
            experience. Serious returns.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            {[
              { i: Building2, v: "4+8", l: "Live + Signed" },
              { i: TrendingUp, v: "30-40%", l: "Avg ROI" },
              { i: Users, v: "1M+", l: "Annual footfall" },
              { i: Award, v: "Zero", l: "Franchise failures" },
            ].map((s) => (
              <div key={s.l} className="goi-card rounded-2xl p-6">
                <s.i className="w-8 h-8 text-brand-magenta mb-4" />
                <div className="font-display font-black text-3xl text-brand-cyan mb-1">
                  {s.v}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[
              {
                i: DollarSign,
                t: "Investment",
                d: "₹1.5 Cr – ₹5 Cr depending on format & city",
              },
              {
                i: Layers,
                t: "Space",
                d: "6,000 – 20,000 sq ft. High-street or mall",
              },
              { i: TrendingUp, t: "Payback", d: "24–30 months to break-even" },
              {
                i: Award,
                t: "Training",
                d: "6-week full-stack training program",
              },
              {
                i: Users,
                t: "Support",
                d: "Ongoing ops, marketing, and tech support",
              },
              {
                i: Building2,
                t: "Brand",
                d: "Access to India's premium FEC brand",
              },
            ].map((f) => (
              <div key={f.t} className="goi-card rounded-2xl p-8">
                <f.i className="w-8 h-8 text-brand-magenta mb-6" />
                <div className="font-display font-bold text-xl mb-2">{f.t}</div>
                <p className="text-white/60 text-sm">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="goi-overline mb-4">FAQs</div>
              <h2 className="font-display font-black text-3xl mb-8">
                Common questions
              </h2>
              <div className="space-y-3">
                {FAQS.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`franchise-faq-${i}`}
                    className="w-full text-left goi-card rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="font-semibold">{f.q}</div>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition ${openFaq === i ? "rotate-180 text-brand-magenta" : ""}`}
                      />
                    </div>
                    {openFaq === i && (
                      <p className="text-white/60 text-sm mt-3">{f.a}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="goi-card rounded-2xl p-8">
              <div className="goi-overline mb-4">Enquire</div>
              <h2 className="font-display font-black text-3xl mb-8">
                Let's talk business.
              </h2>
              <form
                onSubmit={submit}
                className="space-y-4"
                data-testid="franchise-form"
              >
                <input
                  required
                  placeholder="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-testid="franchise-name-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    data-testid="franchise-email-input"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                  />
                  <input
                    required
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    data-testid="franchise-mobile-input"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                  />
                </div>
                <input
                  required
                  placeholder="City of interest"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  data-testid="franchise-city-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
                <select
                  value={form.investment_range}
                  onChange={(e) =>
                    setForm({ ...form, investment_range: e.target.value })
                  }
                  data-testid="franchise-investment-select"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                >
                  <option className="bg-brand-surface">1.5-3 Cr</option>
                  <option className="bg-brand-surface">3-5 Cr</option>
                  <option className="bg-brand-surface">5 Cr+</option>
                </select>
                <input
                  placeholder="Space available (sq ft)"
                  value={form.space_available}
                  onChange={(e) =>
                    setForm({ ...form, space_available: e.target.value })
                  }
                  data-testid="franchise-space-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
                <textarea
                  rows="3"
                  placeholder="Tell us about yourself..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  data-testid="franchise-message-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="franchise-submit-btn"
                  className="goi-btn-primary w-full justify-center disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
