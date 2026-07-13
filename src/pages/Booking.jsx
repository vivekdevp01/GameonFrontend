import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Users, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { createBooking, fetchBranches } from "@/lib/api";
import SEO from "@/components/SEO";

const TYPES = [
  "Birthday Party",
  "School Picnic",
  "Corporate Event",
  "Family Celebration",
  "Group Booking",
  "Private Event",
];

export default function Booking() {
  const [params] = useSearchParams();
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    booking_type: "Birthday Party",
    branch: params.get("branch") || "Jalandhar",
    preferred_date: "",
    preferred_time: "18:00",
    guests: 10,
    special_requirements: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(null);

  useEffect(() => {
    fetchBranches()
      .then((b) => {
        setBranches(b);
        const preset = params.get("branch");
        if (preset && b.find((x) => x.slug === preset)) {
          const found = b.find((x) => x.slug === preset);
          setForm((f) => ({ ...f, branch: found.city }));
        }
      })
      .catch(() => {});
  }, [params]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createBooking({ ...form, guests: Number(form.guests) });
      setDone(res);
      toast.success("Booking received!");
      window.scrollTo(0, 0);
    } catch {
      toast.error("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div
        className="pt-40 pb-24 px-6 max-w-2xl mx-auto text-center"
        data-testid="booking-success"
      >
        <div className="w-20 h-20 rounded-full bg-brand-lime/20 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-10 h-10 text-brand-lime" />
        </div>
        <div className="goi-overline mb-4">Booking Received</div>
        <h1 className="font-display font-black text-4xl sm:text-5xl mb-4">
          You're in.
        </h1>
        <p className="text-white/60 text-lg mb-8">{done.message}</p>
        <div className="goi-card rounded-2xl p-6 text-left text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-white/50">Booking ID</span>
            <span className="font-mono">{done.booking_id.slice(0, 8)}...</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Name</span>
            <span>{form.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Type</span>
            <span>{form.booking_type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Branch</span>
            <span>{form.branch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Date & Time</span>
            <span>
              {form.preferred_date} · {form.preferred_time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Guests</span>
            <span>{form.guests}</span>
          </div>
        </div>
        <button onClick={() => setDone(null)} className="mt-8 goi-btn-outline">
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Book Your Party"
        description="Book your birthday party, group event, or arcade session at Game On India in under 60 seconds. Confirmed within 2 hours."
        path="/booking"
      />
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-6xl mx-auto"
        data-testid="booking-page"
      >
        <div className="goi-overline mb-4">Online Booking</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Book in 60 seconds.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-16">
          Parties, picnics, corporate offsites — we've hosted it all.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <form
            onSubmit={submit}
            className="md:col-span-2 goi-card rounded-2xl p-8 space-y-4"
            data-testid="booking-form"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Full Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  data-testid="booking-name-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Mobile
                </label>
                <input
                  required
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  data-testid="booking-mobile-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-testid="booking-email-input"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Booking Type
                </label>
                <select
                  value={form.booking_type}
                  onChange={(e) =>
                    setForm({ ...form, booking_type: e.target.value })
                  }
                  data-testid="booking-type-select"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                >
                  {TYPES.map((t) => (
                    <option key={t} className="bg-brand-surface">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Branch
                </label>
                <select
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  data-testid="booking-branch-select"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                >
                  {branches.map((b) => (
                    <option key={b.slug} className="bg-brand-surface">
                      {b.city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Date
                </label>
                <input
                  required
                  type="date"
                  value={form.preferred_date}
                  onChange={(e) =>
                    setForm({ ...form, preferred_date: e.target.value })
                  }
                  data-testid="booking-date-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Time
                </label>
                <input
                  required
                  type="time"
                  value={form.preferred_time}
                  onChange={(e) =>
                    setForm({ ...form, preferred_time: e.target.value })
                  }
                  data-testid="booking-time-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                  Guests
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  data-testid="booking-guests-input"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest text-white/50 mb-2 block">
                Special Requirements
              </label>
              <textarea
                rows="4"
                value={form.special_requirements}
                onChange={(e) =>
                  setForm({ ...form, special_requirements: e.target.value })
                }
                data-testid="booking-notes-input"
                placeholder="Cake theme, food preferences, decor, etc."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-brand-cyan focus:outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="booking-submit-btn"
              className="goi-btn-primary w-full justify-center text-base disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </form>

          <aside className="space-y-4">
            <div className="goi-card rounded-2xl p-6 sticky top-28">
              <Sparkles className="w-6 h-6 text-brand-magenta mb-4" />
              <div className="font-display font-bold text-xl mb-4">
                Your booking
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-white/70">
                  <Calendar className="w-4 h-4 text-brand-cyan" />
                  {form.booking_type}
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-brand-cyan" />
                  {form.branch}
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <Users className="w-4 h-4 text-brand-cyan" />
                  {form.guests || 0} guests
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10 text-xs text-white/50">
                Our team confirms via call/WhatsApp within 2 hours. Final quote
                depends on package + add-ons.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
