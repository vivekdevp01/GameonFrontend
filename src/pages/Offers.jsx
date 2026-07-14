import { useEffect, useState, useMemo } from "react";
import { Gift } from "lucide-react";
import { fetchOffers, fetchBranches } from "@/lib/api";
import SEO from "@/components/SEO";
import OfferSchema from "@/components/seo/OfferSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOffers()
      .then(setOffers)
      .catch(() => {});
    fetchBranches()
      .then(setBranches)
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? offers
        : offers.filter((o) => o.branches.includes(filter)),
    [offers, filter],
  );

  return (
    <>
     <SEO
  title="Party Packages & Offers"
  description="Silver, Gold & Platinum birthday party packages, arcade offers, VR offers and bowling deals at Game On India."
  path="/offers"
  keywords="birthday party offers, arcade offers, VR offers, bowling offers, Game On India offers"
/>

<BreadcrumbSchema
  items={[
    { name: "Home", path: "/" },
    { name: "Offers", path: "/offers" },
  ]}
/>

<OfferSchema offers={filtered} />
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="offers-page"
      >
        <div className="goi-overline mb-4">Live offers</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Save while you slay.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-10">
          Refreshed weekly. Grab them before they expire.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            data-testid="offers-filter-all"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter === "all" ? "bg-brand-magenta border-brand-magenta" : "border-white/10 text-white/70"}`}
          >
            All branches
          </button>
          {branches.map((b) => (
            <button
              key={b.slug}
              data-testid={`offers-filter-${b.slug}`}
              onClick={() => setFilter(b.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${filter === b.slug ? "bg-brand-magenta border-brand-magenta" : "border-white/10 text-white/70"}`}
            >
              {b.city}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="goi-card rounded-2xl p-6 relative overflow-hidden"
              data-testid={`offer-card-${o.id}`}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-magenta/20 rounded-full blur-2xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-brand-cyan mb-4 px-2 py-1 rounded-full border border-brand-cyan/30">
                  <Gift className="w-3 h-3" /> {o.tag}
                </div>
                <div className="font-display font-bold text-xl mb-2">
                  {o.title}
                </div>
                <p className="text-white/60 text-sm mb-4">{o.description}</p>
                <div className="flex justify-between items-end pt-4 border-t border-white/5">
                  <div className="text-xs text-white/40">
                    Valid till{" "}
                    {new Date(o.valid_till).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-white/60">
                    {o.branches.length} branch
                    {o.branches.length > 1 ? "es" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
