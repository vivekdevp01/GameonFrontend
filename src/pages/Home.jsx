import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Sparkles,
  MapPin,
  Star,
  Clock,
  Play,
  Zap,
  PartyPopper,
  Quote,
  BadgeCheck,
  Palette,
  CheckCircle2,
} from "lucide-react";
import {
  fetchBranches,
  fetchGames,
  fetchTestimonials,
  fetchUpcoming,
} from "@/lib/api";

import CountUp from "@/components/CountUp";
const HERO_IMG =
  "https://images.unsplash.com/photo-1558271697-dd9f331ca8b3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920";
const HERO_VIDEO =
  "https://res.cloudinary.com/f6quknu5/video/upload/f_auto,q_auto,w_auto/v1783969072/IMG_1393_1_kou5pv.mp4";
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

const TICKETS = [
  {
    tag: "ARCADE",
    big: "60+",
    label: "Arcade Cabinets",
    emoji: "🕹️",
    bg: "from-brand-magenta to-pink-600",
  },
  {
    tag: "VR ZONE",
    big: "100%",
    label: "Immersive VR",
    emoji: "🥽",
    bg: "from-brand-cyan to-blue-600",
  },
  {
    tag: "BOWLING",
    big: "6",
    label: "Lanes Per Branch",
    emoji: "🎳",
    bg: "from-brand-lime to-green-600",
  },
  {
    tag: "PARTY",
    big: "3",
    label: "Package Tiers",
    emoji: "🎉",
    bg: "from-yellow-400 to-orange-500",
  },
  {
    tag: "RACING",
    big: "8",
    label: "Racing Simulators",
    emoji: "🏎️",
    bg: "from-violet-500 to-purple-700",
  },
  {
    tag: "KIDS ZONE",
    big: "All",
    label: "Ages Welcome",
    emoji: "🎡",
    bg: "from-rose-400 to-brand-magenta",
  },
];

const BRANCH_COLOR_PALETTE = [
  {
    grad: "from-brand-magenta to-pink-600",
    glow: "shadow-[0_8px_30px_-6px_rgba(255,0,85,0.5)]",
  },
  {
    grad: "from-brand-cyan to-blue-600",
    glow: "shadow-[0_8px_30px_-6px_rgba(0,170,255,0.5)]",
  },
  {
    grad: "from-yellow-400 to-orange-500",
    glow: "shadow-[0_8px_30px_-6px_rgba(251,191,36,0.5)]",
  },
  {
    grad: "from-violet-500 to-purple-700",
    glow: "shadow-[0_8px_30px_-6px_rgba(139,92,246,0.5)]",
  },
  {
    grad: "from-brand-lime to-green-600",
    glow: "shadow-[0_8px_30px_-6px_rgba(163,230,53,0.5)]",
  },
  {
    grad: "from-rose-400 to-brand-magenta",
    glow: "shadow-[0_8px_30px_-6px_rgba(251,113,133,0.5)]",
  },
];
function TicketCard({ t }) {
  return (
    <div
      className={`relative shrink-0 w-64 h-36 rounded-2xl overflow-hidden bg-gradient-to-br ${t.bg} shadow-xl`}
      data-testid={`ticket-card-${t.tag.toLowerCase().replace(/[^a-z]+/g, "-")}`}
    >
      {/* Watermark */}
      <div className="absolute -right-2 -bottom-3 font-display font-black text-5xl text-white/10 uppercase select-none pointer-events-none rotate-[-6deg]">
        Game On
      </div>

      {/* Perforated notches along the left edge — match the section background */}
      <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col justify-between py-1.5 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="w-3 h-3 -ml-1.5 rounded-full bg-brand-surface"
          />
        ))}
      </div>

      <div className="relative h-full pl-6 pr-4 py-4 flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-black tracking-[0.15em] uppercase bg-black/25 text-white px-2.5 py-1 rounded-full">
            {t.tag}
          </span>
          <span className="text-2xl drop-shadow-lg">{t.emoji}</span>
        </div>

        {/* Big stat */}
        <div>
          <div className="font-display font-black text-4xl text-white leading-none tracking-tight">
            {t.big}
          </div>
          <div className="text-xs text-white/80 font-semibold mt-1">
            {t.label}
          </div>
        </div>

        {/* Bottom tag */}
        <div className="text-[10px] text-white/60 font-medium tracking-wide">
          #GameOnIndia
        </div>
      </div>
    </div>
  );
}
import SEO from "@/components/SEO";
// import VideoShowcase from "@/components/VideoShowcase";
export default function Home() {
  // ...inside the component's return:
  const [branches, setBranches] = useState([]);
  const [games, setGames] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [heroVideoReady, setHeroVideoReady] = useState(false);

  useEffect(() => {
    fetchBranches()
      .then(setBranches)
      .catch(() => {});
    fetchGames()
      .then(setGames)
      .catch(() => {});
    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => {});
    fetchUpcoming()
      .then(setUpcoming)
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="India's Premium Game Zone"
        description="Arcade, VR, bowling, racing sims, and unforgettable birthday parties across Jalandhar, Amritsar, Zirakpur & Pune. Book your visit today."
        path="/"
      />
      <div data-testid="home-page">
        {/* HERO with prominent branch selection */}
        <section
          className="relative min-h-[100dvh] flex items-center md:items-end overflow-hidden goi-noise"
          data-testid="hero-section"
        >
          <>
            {/* Poster while video loads */}
            <img
              src={HERO_IMG}
              alt="Game On India"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                heroVideoReady ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Background Video */}
            <video
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                heroVideoReady ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={HERO_IMG}
              onCanPlay={() => setHeroVideoReady(true)}
              onLoadedData={() => setHeroVideoReady(true)}
            >
              <source src={HERO_VIDEO} type="video/mp4" />
            </video>
          </>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 goi-grid-bg opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          {/* <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-6 sm:pb-16 md:pb-20 pt-6 sm:pt-24 md:pt-32 w-full"> */}
          <div
            className="
    relative
    z-10
    w-full
    max-w-7xl
    mx-auto

    px-5
    sm:px-6
    md:px-10

    pt-24
    min-[390px]:pt-28
    sm:pt-24
    md:pt-32

    pb-28
    sm:pb-16
    md:pb-20
  "
          >
            <div className="max-w-4xl">
              {/* <div className="goi-overline mb-4 flex items-center gap-2"> */}
              <div className="goi-overline mb-5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" /> India's Premium Game Zone
              </div>
              {/* <h1 className="font-display font-black uppercase text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-4"> */}
              <h1
                className="
    font-display
    font-black
    uppercase

    text-[clamp(2.8rem,10vw,5rem)]

    leading-[0.88]

    tracking-tighter

    mb-5
  "
              >
                Level up your <span className="goi-text-cycle">weekend</span>
              </h1>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mb-6 leading-relaxed">
                60+ arcade cabinets. Next-gen VR. Bowling. Racing sims. Kids
                rides — across Jalandhar, Amritsar, Zirakpur & Pune.
              </p>

              {/* Prominent branch selector — top of homepage */}
              <div
                className="bg-black/70 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 rounded-2xl p-5 mb-6 relative overflow-hidden"
                data-testid="hero-branch-selector"
              >
                {/* Faint grid texture inside the panel for extra depth, matching your goi-grid-bg elsewhere */}
                <div className="absolute inset-0 goi-grid-bg opacity-[0.07] pointer-events-none" />

                <div className="relative flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-brand-cyan" />
                  <span className="text-[11px] tracking-widest uppercase text-brand-cyan font-bold">
                    1 · Pick your branch
                  </span>
                </div>

                <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {branches.map((b, i) => {
                    const open = isOpenNow(b.timings.open, b.timings.close);
                    const color =
                      BRANCH_COLOR_PALETTE[i % BRANCH_COLOR_PALETTE.length];
                    return (
                      <Link
                        key={b.slug}
                        to={`/branches/${b.slug}`}
                        data-testid={`hero-branch-${b.slug}`}
                        className={`group relative overflow-hidden flex items-center justify-between px-4 py-3.5 rounded-xl bg-gradient-to-br ${color.grad} ${color.glow} hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.6)] hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-300`}
                      >
                        {/* Diagonal texture overlay for a less flat, more tactile surface */}
                        <div
                          className="absolute inset-0 opacity-[0.08] pointer-events-none"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 8px)",
                          }}
                        />
                        {/* Corner shine */}
                        <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/20 rounded-full blur-2xl pointer-events-none" />

                        <div className="text-left relative z-10">
                          <div className="font-display font-black text-sm text-white drop-shadow-sm">
                            {b.city ||
                              b.slug.charAt(0).toUpperCase() + b.slug.slice(1)}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${open ? "bg-white" : "bg-white/40"} animate-pulse`}
                            />
                            <span className="text-[10px] tracking-widest uppercase font-bold text-white/90">
                              {open ? "Open Now" : "Closed"}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all relative z-10 shrink-0" />

                        {/* Shine sweep on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <Link
                  to="/booking"
                  data-testid="hero-book-party-btn"
                  className="goi-btn-primary w-full sm:w-auto justify-center"
                >
                  Book Your Party
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/games"
                  data-testid="hero-view-games-btn"
                  className="goi-btn-outline w-full sm:w-auto justify-center"
                >
                  <Play className="w-4 h-4" />
                  Explore Games
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        {/* <section className="border-y border-white/10 py-6 bg-brand-surface">
        <div className="marquee">
          <div className="marquee-track font-display font-black text-2xl sm:text-4xl uppercase tracking-tight">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex gap-12 shrink-0">
                {[
                  "Epic Fun",
                  "Neon Vibes",
                  "Level Up",
                  "Play Together",
                  "Win Big",
                  "Game On",
                ].map((t) => (
                  <span key={t + i} className="flex items-center gap-8">
                    <span className="text-white">{t}</span>
                    <span className="text-brand-magenta">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section> */}
        <section
          className="border-y border-white/10 py-8 bg-brand-surface overflow-hidden"
          data-testid="tickets-marquee-section"
        >
          <div className="ticket-marquee">
            <div className="ticket-marquee-track">
              {Array.from({ length: 2 }).map((_, loop) => (
                <div key={loop} className="flex gap-5 shrink-0 pr-5">
                  {TICKETS.map((t, i) => (
                    <TicketCard key={t.tag + loop + i} t={t} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* <VideoShowcase /> */}
        {/* 2 · UPCOMING BRANCHES */}
        <section
          className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
          data-testid="upcoming-section"
        >
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="goi-overline mb-4">2 · Coming soon</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl">
                Expanding across India.
              </h2>
            </div>
            <Link to="/upcoming-stores" className="goi-btn-outline text-sm">
              All upcoming <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcoming.map((s) => (
              <div
                key={s.id || s.slug}
                className="goi-card rounded-2xl overflow-hidden"
                data-testid={`upcoming-preview-${s.slug}`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.city}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-[10px] tracking-widest text-brand-cyan uppercase mb-1">
                      Coming Soon
                    </div>
                    <div className="font-display font-black text-2xl">
                      {s.city}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-white/50">{s.expected}</span>
                    <span className="text-brand-cyan font-bold">
                      {s.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-magenta"
                      style={{ width: `${s.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3 · GAMES GALLERY */}
        <section
          className="py-24 md:py-32 bg-brand-surface"
          data-testid="games-gallery-section"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <div className="goi-overline mb-4">3 · Games gallery</div>
                <h2 className="font-display font-black text-4xl sm:text-5xl">
                  Play the hits.
                </h2>
                <p className="text-white/60 mt-3">
                  All games available across our branches.
                </p>
              </div>
              <Link to="/games" className="goi-btn-outline text-sm">
                All games <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {games.map((g, i) => (
                <Link
                  key={g.id || g.slug}
                  to="/games"
                  data-testid={`home-game-${g.slug}`}
                  className={`goi-card rounded-2xl overflow-hidden group relative ${i === 0 ? "col-span-2 md:col-span-1 row-span-2 md:row-span-1" : ""}`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={g.image}
                      alt={g.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-[9px] tracking-widest uppercase bg-brand-magenta text-white font-bold">
                      {g.category}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="font-display font-bold text-lg leading-tight">
                        {g.name}
                      </div>
                      <div className="text-[11px] text-white/60 mt-1">
                        Age {g.min_age}+ · {g.credits} credits
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · CUSTOMER REVIEWS */}
        {/* <section
        className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="testimonials-section"
      >
        <div className="mb-12 max-w-2xl">
          <div className="goi-overline mb-4">4 · Loved by families</div>
          <h2 className="font-display font-black text-4xl sm:text-5xl">
            4.8★ · 12,000+ reviews.
          </h2>
          <p className="text-white/60 mt-3">
            What our guests are saying about Game On India.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={t.id || i}
              className="goi-glass rounded-2xl p-6"
              data-testid={`testimonial-${i}`}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="text-white/80 leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-magenta/20 border border-brand-magenta/40 flex items-center justify-center font-bold text-brand-magenta">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-white/40">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

        {/* Add to your imports at the top of Home.jsx: */}
        {/* import CountUp from "@/components/CountUp"; */}

        {/* Add to your imports at the top of Home.jsx: */}
        {/* import CountUp from "@/components/CountUp"; */}

        <section
          className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
          data-testid="testimonials-section"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <div className="goi-overline mb-4">4 · Loved by families</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl mb-3">
                4.8★ · 10,000+ reviews.
              </h2>
              <p className="text-white/60">
                What our guests are saying about Game On India.
              </p>
            </div>

            {/* Rating summary panel */}
            <div
              className="hidden lg:flex goi-glass rounded-2xl p-6 items-center gap-6 shrink-0"
              data-testid="testimonials-rating-summary"
            >
              <div className="text-center shrink-0">
                <div className="font-display font-black text-5xl text-white leading-none">
                  <CountUp end={4.8} decimals={1} duration={1800} />
                </div>
                <div className="flex gap-0.5 mt-2 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <div className="text-[10px] text-white/40 mt-1.5 tracking-wide">
                  <CountUp end={10000} suffix="+" duration={2800} /> reviews
                </div>
              </div>
              <div className="w-px h-16 bg-white/10 hidden sm:block" />
              <div className="hidden sm:flex flex-col gap-1.5 w-32">
                {[
                  { star: 5, pct: 82 },
                  { star: 4, pct: 12 },
                  { star: 3, pct: 4 },
                  { star: 2, pct: 1 },
                  { star: 1, pct: 1 },
                ].map((r) => (
                  <div key={r.star} className="flex items-center gap-2">
                    <span className="text-[10px] text-white/50 w-2">
                      {r.star}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-[1800ms] ease-out"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => {
              const accents = [
                "border-brand-magenta/40",
                "border-brand-cyan/40",
                "border-brand-lime/40",
              ];
              const avatarBg = [
                "bg-brand-magenta/20 border-brand-magenta/40 text-brand-magenta",
                "bg-brand-cyan/20 border-brand-cyan/40 text-brand-cyan",
                "bg-brand-lime/20 border-brand-lime/40 text-brand-lime",
              ];
              const accent = accents[i % accents.length];
              const avatar = avatarBg[i % avatarBg.length];
              return (
                <div
                  key={t.id || i}
                  className={`goi-card rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border ${accent} hover:border-opacity-100`}
                  data-testid={`testimonial-${i}`}
                >
                  <Quote className="absolute top-4 right-5 w-8 h-8 text-white/5 group-hover:text-white/10 transition-colors" />

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/40 font-medium">
                      <BadgeCheck className="w-3.5 h-3.5 text-brand-cyan" />{" "}
                      Verified Guest
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed mb-6 relative z-10">
                    "{t.text}"
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold shrink-0 ${avatar}`}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-white/40">{t.city}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-10">
            <a
              href="https://www.google.com/search?q=game+on+india+reviews"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="testimonials-see-all-btn"
              className="goi-btn-outline text-sm"
            >
              Read all reviews on Google <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
        {/* CTA */}
        {/* <section
        className="py-24 md:py-32 px-6 md:px-10"
        data-testid="cta-section"
      >
        <div className="max-w-6xl mx-auto goi-card rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-magenta/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-cyan/20 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <PartyPopper className="w-10 h-10 text-brand-magenta mb-6" />
              <h2 className="font-display font-black text-4xl sm:text-5xl mb-4 leading-[1.05]">
                Ready to make it unforgettable?
              </h2>
              <p className="text-white/70 mb-8 text-lg">
                Book your party in under 60 seconds. Our team confirms within 2
                hours.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/booking"
                  data-testid="cta-book-btn"
                  className="goi-btn-primary"
                >
                  Book Now <Zap className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  data-testid="cta-contact-btn"
                  className="goi-btn-outline"
                >
                  Talk to us
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.pexels.com/photos/29506612/pexels-photo-29506612.jpeg?w=800"
                alt="celebration"
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section> */}
        {/* Drop-in replacement for the CTA <section> in Home.jsx — mobile-responsive version */}

        <section
          className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10"
          data-testid="cta-section"
        >
          <div className="max-w-6xl mx-auto goi-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-16 relative overflow-hidden">
            {/* Blobs scaled down on mobile so they can't push layout width */}
            <div className="absolute -top-16 -right-16 w-56 h-56 sm:-top-24 sm:-right-24 sm:w-96 sm:h-96 bg-brand-magenta/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 sm:-bottom-24 sm:-left-24 sm:w-96 sm:h-96 bg-brand-cyan/20 rounded-full blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div>
                <PartyPopper className="w-8 h-8 sm:w-10 sm:h-10 text-brand-magenta mb-4 sm:mb-6" />
                <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 leading-[1.1] sm:leading-[1.05] break-words">
                  Ready to make it unforgettable?
                </h2>
                <p className="text-white/70 mb-6 sm:mb-8 text-base sm:text-lg">
                  Book your party in under 60 seconds. Our team confirms within
                  2 hours.
                </p>

                {/* Trust bullets */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {[
                    {
                      icon: Clock,
                      text: "Confirmed within 2 hours, guaranteed",
                    },
                    {
                      icon: Palette,
                      text: "Custom themes for every age group",
                    },
                    {
                      icon: CheckCircle2,
                      text: "Dedicated party host included",
                    },
                  ].map((f) => (
                    <div key={f.text} className="flex items-center gap-3">
                      <f.icon className="w-4 h-4 text-brand-lime shrink-0" />
                      <span className="text-sm text-white/70">{f.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/booking"
                    data-testid="cta-book-btn"
                    className="goi-btn-primary"
                  >
                    Book Now <Zap className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    data-testid="cta-contact-btn"
                    className="goi-btn-outline"
                  >
                    Talk to us
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative">
                <div className="absolute -inset-3 bg-gradient-to-tr from-brand-magenta/30 via-transparent to-brand-cyan/30 blur-2xl rounded-3xl" />
                <img
                  src="https://images.pexels.com/photos/9821845/pexels-photo-9821845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=800"
                  alt="Family celebrating a party at Game On India"
                  className="relative rounded-2xl w-full object-cover aspect-[4/5] border border-white/10"
                />

                {/* Floating stat badge */}
                <div className="absolute bottom-5 left-5 right-5 goi-glass rounded-2xl px-5 py-4 flex items-center gap-3">
                  <div className="flex -space-x-2 shrink-0">
                    {["AS", "PK", "RV"].map((initials, i) => (
                      <div
                        key={initials}
                        className={`w-8 h-8 rounded-full border-2 border-[#0F0F11] flex items-center justify-center text-[10px] font-bold text-white ${
                          [
                            "bg-brand-magenta",
                            "bg-brand-cyan",
                            "bg-brand-lime",
                          ][i]
                        }`}
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm text-white">
                      500+ parties hosted
                    </div>
                    <div className="text-[11px] text-white/50">
                      this year across all branches
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
