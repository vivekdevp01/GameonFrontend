import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  MessageCircle,
  Star,
  Car,
  Gift,
  ChevronDown,
  CreditCard,
} from "lucide-react";
import { fetchBranch } from "@/lib/api";
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

export default function Branch() {
  const { slug } = useParams();
  const [branch, setBranch] = useState(null);
  const [tab, setTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBranch(slug)
      .then(setBranch)
      .catch(() => setBranch(null));
  }, [slug]);

  if (!branch)
    return (
      <div className="pt-40 text-center text-white/50">Loading branch...</div>
    );

  const open = isOpenNow(branch.timings.open, branch.timings.close);
  const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(branch.map_query)}&output=embed`;
  const mapNav = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.map_query)}`;
  const waLink = `https://wa.me/${branch.whatsapp}?text=${encodeURIComponent(`Hi ${branch.name}, I'd like to enquire.`)}`;

  return (
    <>
      <SEO
        title={`${branch?.city || "Branch"} — Arcade, VR & Bowling`}
        description={`Visit Game On India in ${branch?.city || "your city"}. Arcade, VR, bowling, and party packages — timings, address, and booking info.`}
        path={`/branches/${slug}`}
      />

      <div data-testid={`branch-page-${slug}`}>
        {/* HERO */}
        {/* Drop-in replacement for the Branch page hero <section>.
    Same pattern already applied to Home.jsx and About.jsx. */}

        <section className="relative min-h-[42vh] sm:min-h-[50vh] md:min-h-[70vh] flex items-center md:items-end overflow-hidden">
          <img
            src={branch.hero_image}
            alt={branch.city}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-24 sm:pt-28 md:pt-40 pb-8 sm:pb-12 md:pb-16 w-full">
            <div className="goi-overline mb-4">Game On India</div>
            <h1
              className="font-display font-black uppercase mb-4 leading-[0.95] break-words"
              style={{ fontSize: "clamp(2rem, 9vw, 4.5rem)" }}
            >
              {branch.city}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${open ? "bg-brand-lime/20 text-brand-lime" : "bg-red-500/20 text-red-400"}`}
                data-testid="branch-live-status"
              >
                <span
                  className={`w-2 h-2 rounded-full ${open ? "bg-brand-lime" : "bg-red-400"} animate-pulse`}
                ></span>
                {open ? "Open Now" : "Closed"}
              </div>
              <span className="text-white/60 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {branch.timings.open} — {branch.timings.close}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/booking?branch=${branch.slug}`}
                data-testid="branch-book-btn"
                className="goi-btn-primary"
              >
                Book This Branch
              </Link>
              <a
                href={mapNav}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="branch-directions-btn"
                className="goi-btn-outline"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="branch-whatsapp-btn"
                className="goi-btn-outline"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* TABS */}
        <div className="sticky top-20 z-30 goi-glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex gap-2 overflow-x-auto">
            {[
              { k: "overview", l: "Overview" },
              { k: "cards", l: "Card Offers" },
              { k: "games", l: "Games" },
              { k: "gallery", l: "Gallery" },
              { k: "offers", l: "Offers" },
              { k: "reviews", l: "Reviews" },
              { k: "faqs", l: "FAQs" },
            ].map((t) => (
              <button
                key={t.k}
                data-testid={`branch-tab-${t.k}`}
                onClick={() => setTab(t.k)}
                className={`px-5 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition ${tab === t.k ? "border-brand-magenta text-brand-magenta" : "border-transparent text-white/60 hover:text-white"}`}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          {tab === "overview" && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="goi-card rounded-2xl overflow-hidden">
                  <iframe
                    src={mapEmbed}
                    className="w-full h-96 border-0"
                    title="map"
                    loading="lazy"
                    data-testid="branch-map"
                  ></iframe>
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl mb-4">
                    Facilities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {branch.facilities.map((f) => (
                      <span
                        key={f}
                        className="px-4 py-2 rounded-full border border-white/10 text-sm bg-brand-surface"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="space-y-4">
                <div className="goi-card rounded-2xl p-6">
                  <div className="goi-overline mb-4">Contact</div>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3">
                      <MapPin className="w-5 h-5 text-brand-magenta shrink-0" />
                      <span
                        className="text-white/80"
                        data-testid="branch-address"
                      >
                        {branch.address}
                      </span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <Phone className="w-5 h-5 text-brand-magenta shrink-0" />
                      <a
                        href={`tel:${branch.phone.replace(/\s/g, "")}`}
                        className="text-white/80 hover:text-brand-cyan"
                        data-testid="branch-phone"
                      >
                        {branch.phone}
                      </a>
                    </li>
                    <li className="flex gap-3 items-center">
                      <Mail className="w-5 h-5 text-brand-magenta shrink-0" />
                      <a
                        href={`mailto:${branch.email}`}
                        className="text-white/80 hover:text-brand-cyan"
                      >
                        {branch.email}
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Car className="w-5 h-5 text-brand-magenta shrink-0" />
                      <span className="text-white/80">{branch.parking}</span>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
          )}

          {tab === "cards" && (
            <div data-testid="branch-card-offers-section">
              <div className="mb-8">
                <div className="goi-overline mb-3 flex items-center gap-2">
                  <CreditCard className="w-3.5 h-3.5" /> Recharge & Play
                </div>
                <h3 className="font-display font-bold text-3xl mb-2">
                  Card Offers
                </h3>
                <p className="text-white/60">
                  Load your Game On card, get bonus points instantly. Points
                  valid for 90 days.
                </p>
              </div>
              {!branch.card_offers || branch.card_offers.length === 0 ? (
                <div className="text-white/50">
                  Card offers coming soon at this branch.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {branch.card_offers.map((c, i) => {
                    const bonus = c.points - c.card_value;
                    const best = i === branch.card_offers.length - 1;
                    return (
                      <div
                        key={c.id}
                        data-testid={`card-offer-${c.id}`}
                        className={`goi-card rounded-2xl p-6 relative overflow-hidden ${best ? "border-brand-magenta/50 glow-pink" : ""}`}
                      >
                        {best && (
                          <div className="absolute -top-3 left-6 bg-brand-magenta text-white text-[10px] tracking-widest px-3 py-1 rounded-full font-bold">
                            BEST VALUE
                          </div>
                        )}
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-brand-cyan/10 rounded-full blur-2xl" />
                        <div className="relative">
                          <div className="text-xs uppercase tracking-widest text-white/50 mb-2">
                            Recharge
                          </div>
                          <div className="font-display font-black text-3xl mb-1">
                            ₹{c.card_value.toLocaleString("en-IN")}
                          </div>
                          <div className="text-sm text-white/50 mb-4">
                            Card value
                          </div>
                          <div className="h-px bg-white/10 my-4"></div>
                          <div className="text-xs uppercase tracking-widest text-brand-cyan mb-2">
                            You get
                          </div>
                          <div className="font-display font-bold text-2xl text-brand-cyan">
                            {c.points.toLocaleString("en-IN")} pts
                          </div>
                          {bonus > 0 && (
                            <div className="mt-1 text-xs text-brand-lime font-bold">
                              +{bonus.toLocaleString("en-IN")} bonus
                            </div>
                          )}
                          {c.bonus_note && (
                            <div className="mt-3 text-xs text-white/60">
                              {c.bonus_note}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to={`/booking?branch=${branch.slug}`}
                  className="goi-btn-primary text-sm"
                >
                  Book & Recharge
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="goi-btn-outline text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp us
                </a>
              </div>
            </div>
          )}

          {tab === "games" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {branch.games.map((g) => (
                <div
                  key={g.id || g.slug}
                  className="goi-card rounded-2xl overflow-hidden"
                >
                  <img
                    src={g.image}
                    alt={g.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <div className="text-xs text-brand-cyan tracking-widest uppercase mb-1">
                      {g.category}
                    </div>
                    <div className="font-display font-bold text-lg mb-2">
                      {g.name}
                    </div>
                    <p className="text-white/60 text-sm mb-3">
                      {g.description}
                    </p>
                    <div className="flex justify-between text-xs text-white/50">
                      <span>Age {g.min_age}+</span>
                      <span>{g.difficulty}</span>
                      <span className="text-brand-magenta font-bold">
                        {g.credits} cr
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "gallery" && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {branch.gallery.map((src, i) => (
                <div
                  key={i}
                  className="goi-card rounded-2xl overflow-hidden aspect-video"
                >
                  <img
                    src={src}
                    alt={`${branch.city} ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                </div>
              ))}
            </div>
          )}

          {tab === "offers" && (
            <div className="grid md:grid-cols-2 gap-4">
              {branch.offers.length === 0 && (
                <div className="text-white/50">
                  No offers running here right now. Check back soon!
                </div>
              )}
              {branch.offers.map((o) => (
                <div key={o.id} className="goi-card rounded-2xl p-6">
                  <div className="inline-flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-brand-cyan mb-3 px-2 py-1 rounded-full border border-brand-cyan/30">
                    <Gift className="w-3 h-3" /> {o.tag}
                  </div>
                  <div className="font-display font-bold text-xl mb-2">
                    {o.title}
                  </div>
                  <p className="text-white/60 text-sm">{o.description}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "reviews" && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="font-display font-black text-5xl">4.8</div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <div className="text-white/50 text-sm">
                    Based on 2,140+ Google reviews
                  </div>
                </div>
                <a href="#" className="goi-btn-outline text-sm ml-auto">
                  Write a review
                </a>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {branch.testimonials.length === 0 && (
                  <div className="text-white/50">
                    No testimonials for this city yet.
                  </div>
                )}
                {branch.testimonials.map((t, i) => (
                  <div key={t.id || i} className="goi-glass rounded-2xl p-6">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <p className="text-white/80 mb-4">"{t.text}"</p>
                    <div className="text-sm font-semibold">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "faqs" && (
            <div className="max-w-3xl mx-auto space-y-3">
              {branch.faqs.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`branch-faq-${i}`}
                  className="w-full text-left goi-card rounded-xl p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="font-semibold">{f.q}</div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition ${openFaq === i ? "rotate-180 text-brand-magenta" : ""}`}
                    />
                  </div>
                  {openFaq === i && (
                    <p className="text-white/60 text-sm mt-3 leading-relaxed">
                      {f.a}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
