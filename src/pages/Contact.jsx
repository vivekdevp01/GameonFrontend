import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { createContact } from "@/lib/api";
import SEO from "@/components/SEO";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "General",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContact(form);
      toast.success("Message sent! We'll reply within 24 hours.");
      setForm({
        name: "",
        email: "",
        mobile: "",
        subject: "General",
        message: "",
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
        title="Contact Us"
        description="Get in touch with Game On India. Phone, email, WhatsApp, and branch addresses for all locations."
        path="/contact"
      />
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="contact-page"
      >
        <div className="goi-overline mb-4">Contact</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Let's play.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-16">
          Questions, feedback, partnerships — we're here.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 goi-card rounded-2xl p-8">
            <form
              onSubmit={submit}
              className="space-y-4"
              data-testid="contact-form"
            >
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="contact-name-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  data-testid="contact-email-input"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
                <input
                  placeholder="Mobile"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  data-testid="contact-mobile-input"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                data-testid="contact-subject-select"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
              >
                {[
                  "General",
                  "Booking",
                  "Franchise",
                  "Partnership",
                  "Complaint",
                  "Media",
                ].map((s) => (
                  <option key={s} className="bg-brand-surface">
                    {s}
                  </option>
                ))}
              </select>
              <textarea
                required
                rows="5"
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                data-testid="contact-message-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none resize-none"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit-btn"
                className="goi-btn-primary w-full justify-center disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="goi-card rounded-2xl p-6">
              <div className="goi-overline mb-4">Head Office</div>
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 text-brand-magenta shrink-0" />
                  <span className="text-white/80">
                    Viva Collage Mall, Jalandhar, Punjab 144001
                  </span>
                </li>
                <li className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-brand-magenta shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="text-white/80 hover:text-brand-cyan"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex gap-3 items-center">
                  <Mail className="w-5 h-5 text-brand-magenta shrink-0" />
                  <a
                    href="mailto:hello@gameonindia.in"
                    className="text-white/80 hover:text-brand-cyan"
                  >
                    hello@gameonindia.in
                  </a>
                </li>
                <li className="flex gap-3 items-center">
                  <MessageCircle className="w-5 h-5 text-brand-magenta shrink-0" />
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-brand-cyan"
                  >
                    WhatsApp us
                  </a>
                </li>
              </ul>
            </div>
            <div className="goi-card rounded-2xl p-6">
              <div className="goi-overline mb-4">Follow</div>
              <div className="flex gap-2">
                {[Instagram, Facebook, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 hover:border-brand-magenta hover:text-brand-magenta transition"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 goi-card rounded-2xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=Viva+Collage+Mall+Jalandhar&output=embed"
            className="w-full h-80 border-0"
            title="head office map"
            loading="lazy"
            data-testid="contact-map"
          ></iframe>
        </div>
      </div>
    </>
  );
}
