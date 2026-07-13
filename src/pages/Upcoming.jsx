import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { fetchUpcoming, notifyMe } from "@/lib/api";
import SEO from "@/components/SEO";

export default function Upcoming() {
  const [stores, setStores] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedStore, setSelectedStore] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUpcoming()
      .then(setStores)
      .catch(() => {});
  }, []);

  const notify = async (e) => {
    e.preventDefault();
    if (!email || !selectedStore) return;
    setLoading(true);
    try {
      await notifyMe({ email, upcoming_store: selectedStore });
      toast.success("You'll be the first to know!");
      setEmail("");
      setSelectedStore(null);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Upcoming Branches"
        description="See where Game On India is opening next. New family entertainment centers coming soon across India."
        path="/upcoming-stores"
      />
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="upcoming-page"
      >
        <div className="goi-overline mb-4">Opening Soon</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          More cities. More fun.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-16">
          We're building. Get notified when we open near you.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {stores.map((s) => (
            <div
              key={s.slug}
              className="goi-card rounded-2xl overflow-hidden"
              data-testid={`upcoming-card-${s.slug}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.city}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="text-xs tracking-widest text-brand-cyan uppercase mb-2">
                    Coming Soon
                  </div>
                  <div className="font-display font-black text-4xl">
                    {s.city}
                  </div>
                  <div className="text-white/60 mt-1">{s.state}</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-white/60">
                    Expected:{" "}
                    <span className="text-white font-semibold">
                      {s.expected}
                    </span>
                  </span>
                  <span className="text-brand-cyan font-bold">
                    {s.progress}% complete
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-brand-magenta transition-all"
                    style={{ width: `${s.progress}%` }}
                  />
                </div>
                <button
                  onClick={() => setSelectedStore(s.slug)}
                  data-testid={`notify-btn-${s.slug}`}
                  className={`w-full goi-btn-outline justify-center text-sm ${selectedStore === s.slug ? "border-brand-magenta text-brand-magenta" : ""}`}
                >
                  <Bell className="w-4 h-4" /> Notify me
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedStore && (
          <form
            onSubmit={notify}
            className="mt-16 max-w-xl mx-auto goi-card rounded-2xl p-8"
            data-testid="notify-form"
          >
            <div className="font-display font-bold text-2xl mb-2">
              Get notified
            </div>
            <p className="text-white/60 text-sm mb-6">
              We'll email you the moment we open in{" "}
              <span className="text-brand-cyan capitalize">
                {selectedStore}
              </span>
              .
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                data-testid="notify-email-input"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm focus:border-brand-cyan focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="notify-submit-btn"
                className="goi-btn-primary text-sm disabled:opacity-50"
              >
                {loading ? "..." : "Notify Me"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
