import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { fetchBranches } from "@/lib/api";
import SEO from "@/components/SEO";

function isOpenNow(open, close) {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const toMin = (s) => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m;
  };
  const o = toMin(open);
  let c = toMin(close);
  if (c === 0) c = 24 * 60;
  if (c > o) return mins >= o && mins < c;
  return mins >= o || mins < c;
}

export default function Branches() {
  const [branches, setBranches] = useState([]);
  useEffect(() => {
    fetchBranches()
      .then(setBranches)
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="Our Branches"
        description="Find your nearest Game On India branch in Jalandhar, Amritsar, Zirakpur, or Pune. Timings, directions, and facilities for each location."
        path="/branches"
      />
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="branches-page"
      >
        <div className="goi-overline mb-4">Our Branches</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Pick your playground.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-16">
          4 branches. Each with its own personality, games, and offers.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {branches.map((b) => {
            const open = isOpenNow(b.timings.open, b.timings.close);
            return (
              <Link
                to={`/branches/${b.slug}`}
                key={b.slug}
                data-testid={`branches-list-${b.slug}`}
                className="goi-card rounded-2xl overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={b.hero_image}
                    alt={b.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div
                    className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${open ? "bg-brand-lime/20 text-brand-lime" : "bg-red-500/20 text-red-400"}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${open ? "bg-brand-lime" : "bg-red-400"} animate-pulse`}
                    ></span>
                    {open ? "Open Now" : "Closed"}
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <div className="font-display font-black text-3xl mb-1">
                      {b.city}
                    </div>
                    <div className="text-white/70 text-sm">{b.state}</div>
                  </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                  <div className="space-y-2 text-sm text-white/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-magenta" />
                      {b.address.substring(0, 45)}...
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-magenta" />
                      {b.timings.open} — {b.timings.close}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand-magenta/10 flex items-center justify-center group-hover:bg-brand-magenta group-hover:text-white transition">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
