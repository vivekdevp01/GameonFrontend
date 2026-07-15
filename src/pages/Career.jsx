import { useState } from "react";
import { Briefcase, MapPin, Clock, Mail } from "lucide-react";
import { toast } from "sonner";
import { createCareer } from "@/lib/api";
import SEO from "@/components/SEO";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const OPENINGS = [
  { title: "Store Manager", branch: "Pune", type: "Full-time", exp: "3-5 yrs" },
  {
    title: "Game Attendant",
    branch: "Jalandhar",
    type: "Full-time",
    exp: "0-2 yrs",
  },
  {
    title: "Party Host",
    branch: "Zirakpur",
    type: "Full-time",
    exp: "1-3 yrs",
  },
  { title: "F&B Manager", branch: "Pune", type: "Full-time", exp: "3-5 yrs" },
  {
    title: "Marketing Executive",
    branch: "Amritsar",
    type: "Full-time",
    exp: "2-4 yrs",
  },
  {
    title: "Tech Support",
    branch: "Jalandhar",
    type: "Full-time",
    exp: "1-3 yrs",
  },
];
const careerFaqs = [
  {
    question: "How can I apply for a job at Game On India?",
    answer:
      "Choose an open position, fill out the application form and submit your resume. Our HR team reviews all applications.",
  },
  {
    question: "Which cities are currently hiring?",
    answer: "We regularly hire for Jalandhar, Amritsar, Zirakpur and Pune.",
  },
  {
    question: "How long does the hiring process take?",
    answer:
      "Shortlisted candidates are usually contacted within 5 business days.",
  },
  {
    question: "Can freshers apply?",
    answer:
      "Yes. Some roles are suitable for freshers while others require prior experience.",
  },
];
export default function Career() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    position: "",
    branch: "Jalandhar",
    experience: "",
    cover_letter: "",
    resume_url: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCareer(form);
      toast.success("Application received. HR will get back within 5 days.");
      setForm({
        name: "",
        email: "",
        mobile: "",
        position: "",
        branch: "Jalandhar",
        experience: "",
        cover_letter: "",
        resume_url: "",
      });
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Careers | Join Game On India"
        description="Explore careers at Game On India. Apply for jobs in Jalandhar, Amritsar, Zirakpur and Pune. Build your career with India's premium family entertainment brand."
        path="/careers"
        keywords="Game On India careers, arcade jobs, entertainment jobs, Pune jobs, Jalandhar jobs"
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />

      <FAQSchema faqs={careerFaqs} />

      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="career-page"
      >
        <div className="goi-overline mb-4">Careers</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Work where fun happens.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-16">
          We're building the best FEC team in India. Come play with us.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-24">
          {OPENINGS.map((o) => (
            <div
              key={o.title + o.branch}
              className="goi-card rounded-2xl p-6"
              data-testid={`career-opening-${o.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Briefcase className="w-6 h-6 text-brand-magenta mb-4" />
              <div className="font-display font-bold text-lg mb-3">
                {o.title}
              </div>
              <div className="space-y-1.5 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  {o.branch}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  {o.type} · {o.exp}
                </div>
              </div>
              <button
                onClick={() =>
                  setForm({ ...form, position: o.title, branch: o.branch })
                }
                className="mt-5 goi-btn-outline text-xs w-full justify-center"
                data-testid={`apply-btn-${o.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div className="goi-overline mb-4">Apply</div>
            <h2 className="font-display font-black text-3xl mb-8">
              Send your application
            </h2>
            <form
              onSubmit={submit}
              className="space-y-4"
              data-testid="career-form"
            >
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="career-name-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="career-email-input"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
                <input
                  required
                  placeholder="Mobile"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  data-testid="career-mobile-input"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  placeholder="Position"
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  data-testid="career-position-input"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  data-testid="career-branch-select"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                >
                  {["Jalandhar", "Amritsar", "Zirakpur", "Pune"].map((b) => (
                    <option key={b} className="bg-brand-surface">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <input
                required
                placeholder="Total experience"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                data-testid="career-experience-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
              />
              <input
                placeholder="Resume URL (Google Drive, Dropbox link)"
                value={form.resume_url}
                onChange={(e) =>
                  setForm({ ...form, resume_url: e.target.value })
                }
                data-testid="career-resume-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
              />
              <textarea
                rows="4"
                placeholder="Cover letter"
                value={form.cover_letter}
                onChange={(e) =>
                  setForm({ ...form, cover_letter: e.target.value })
                }
                data-testid="career-cover-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="career-submit-btn"
                className="goi-btn-primary w-full justify-center disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
          <div className="goi-card rounded-2xl p-6 h-fit">
            <div className="goi-overline mb-4">HR Contact</div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-magenta" />
                <a
                  href="mailto:support@gameonplay.in"
                  className="text-white/80 hover:text-brand-cyan"
                >
                  support@gameonplay.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
