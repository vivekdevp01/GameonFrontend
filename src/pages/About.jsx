// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Sparkles, Users, Gamepad2, PartyPopper, ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";
// import { fetchBranches } from "@/lib/api";

// const HERO_IMG = "https://images.unsplash.com/photo-1558271697-dd9f331ca8b3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920";
// const STORY_IMG = "https://images.pexels.com/photos/7773729/pexels-photo-7773729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";

// const OFFERINGS = [
//     { icon: Gamepad2, title: "Arcade & Redemption", desc: "60+ cabinets, classic and cutting-edge.", img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
//     { icon: Sparkles, title: "Virtual Reality", desc: "Next-gen immersive VR experiences.", img: "https://images.pexels.com/photos/7773729/pexels-photo-7773729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
//     { icon: Users, title: "Bowling & Trampoline", desc: "Bowling lanes, trampoline park & soft play.", img: "https://images.pexels.com/photos/9821845/pexels-photo-9821845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
//     { icon: PartyPopper, title: "Parties & Corporate Events", desc: "Birthdays, school trips, team events.", img: "https://images.pexels.com/photos/29506612/pexels-photo-29506612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" },
// ];

// function isOpenNow(open, close) {
//     const now = new Date();
//     const mins = now.getHours() * 60 + now.getMinutes();
//     const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
//     const o = toMin(open); let c = toMin(close);
//     if (c === 0) c = 24 * 60;
//     if (c > o) return mins >= o && mins < c;
//     return mins >= o || mins < c;
// }

// export default function About() {
//     const [branches, setBranches] = useState([]);

//     useEffect(() => {
//         fetchBranches().then(setBranches).catch(() => {});
//     }, []);

//     return (
//         <div data-testid="about-page">
//             {/* HERO */}
//             <section className="relative min-h-[70vh] flex items-end overflow-hidden goi-noise" data-testid="about-hero-section">
//                 <img src={HERO_IMG} alt="Game On India arcade" className="absolute inset-0 w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
//                 <div className="absolute inset-0 goi-grid-bg opacity-40" />
//                 <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 pt-32 w-full">
//                     <div className="goi-overline mb-4 flex items-center gap-2">
//                         <Sparkles className="w-3.5 h-3.5" /> About Us
//                     </div>
//                     <h1 className="font-display font-black uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter max-w-4xl">
//                         Play. Eat. <span className="text-brand-magenta">Celebrate.</span>
//                     </h1>
//                 </div>
//             </section>

//             {/* STORY */}
//             <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto" data-testid="about-story-section">
//                 <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
//                     <div>
//                         <div className="goi-overline mb-4">Our Story</div>
//                         <h2 className="font-display font-black text-3xl sm:text-4xl mb-6 leading-tight">
//                             Where every visit becomes an unforgettable adventure.
//                         </h2>
//                         <div className="space-y-5 text-white/70 leading-relaxed">
//                             <p>
//                                 Game On Family Entertainment Center is a world-class destination where families, friends, and thrill-seekers come together to play, celebrate, and create unforgettable memories. Designed for guests of all ages, we combine cutting-edge entertainment with a vibrant atmosphere to deliver an experience that goes far beyond gaming.
//                             </p>
//                             <p>
//                                 From exciting arcade games, bowling, virtual reality, trampoline parks, soft play zones, bumper cars, and other interactive attractions to delicious food and unforgettable birthday parties and corporate events, Game On offers something for everyone under one roof.
//                             </p>
//                             <p>
//                                 Our mission is simple: to bring people together through fun, innovation, and exceptional hospitality. We are committed to providing a safe, clean, and exciting environment where every visit is filled with laughter, adventure, and lasting memories.
//                             </p>
//                             <p>
//                                 Whether you're planning a family outing, a birthday celebration, a school trip, or a corporate team event, Game On is your ultimate destination to Play. Eat. Celebrate.
//                             </p>
//                         </div>
//                         <div className="flex flex-wrap gap-3 mt-8">
//                             <Link to="/booking" data-testid="about-book-party-btn" className="goi-btn-primary">
//                                 Book Your Party <ArrowUpRight className="w-4 h-4" />
//                             </Link>
//                             <Link to="/games" data-testid="about-explore-games-btn" className="goi-btn-outline">
//                                 Explore Games
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="relative">
//                         <div className="absolute -inset-4 bg-gradient-to-tr from-brand-magenta/20 via-transparent to-brand-cyan/20 blur-2xl rounded-3xl" />
//                         <img src={STORY_IMG} alt="Guests enjoying VR at Game On" className="relative rounded-3xl w-full object-cover aspect-[4/5] goi-card" />
//                     </div>
//                 </div>
//             </section>

//             {/* WHAT WE OFFER */}
//             <section className="py-24 md:py-32 bg-brand-surface" data-testid="about-offerings-section">
//                 <div className="max-w-7xl mx-auto px-6 md:px-10">
//                     <div className="mb-12 max-w-2xl">
//                         <div className="goi-overline mb-4">Under One Roof</div>
//                         <h2 className="font-display font-black text-4xl sm:text-5xl">Something for everyone.</h2>
//                     </div>
//                     <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                         {OFFERINGS.map((o) => (
//                             <div key={o.title} className="goi-card rounded-2xl overflow-hidden group" data-testid={`about-offering-${o.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
//                                 <div className="aspect-[4/3] relative overflow-hidden">
//                                     <img src={o.img} alt={o.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
//                                     <o.icon className="absolute top-3 left-3 w-6 h-6 text-brand-cyan drop-shadow-lg" />
//                                 </div>
//                                 <div className="p-5">
//                                     <div className="font-display font-bold text-base mb-1">{o.title}</div>
//                                     <p className="text-sm text-white/50">{o.desc}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* SAFETY / MISSION STRIP */}
//             <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto" data-testid="about-mission-section">
//                 <div className="goi-glass rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
//                     <div className="flex items-start gap-4 max-w-2xl">
//                         <ShieldCheck className="w-8 h-8 text-brand-lime shrink-0 mt-1" />
//                         <div>
//                             <div className="font-display font-bold text-xl mb-2">Safe, clean & built for every age.</div>
//                             <p className="text-white/60 leading-relaxed">
//                                 Every Game On venue is designed with guest safety and comfort front and center — from staff-supervised attractions to regularly maintained equipment across every branch.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* BRANCHES */}
//             <section className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto" data-testid="about-branches-section">
//                 <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
//                     <div>
//                         <div className="goi-overline mb-4">Find Us</div>
//                         <h2 className="font-display font-black text-4xl sm:text-5xl">Our branches.</h2>
//                     </div>
//                     <Link to="/branches" className="goi-btn-outline text-sm">All branches <ArrowUpRight className="w-4 h-4" /></Link>
//                 </div>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {["jalandhar", "amritsar", "zirakpur", "pune"].map((slug) => {
//                         const b = branches.find((x) => x.slug === slug);
//                         const open = b ? isOpenNow(b.timings.open, b.timings.close) : false;
//                         const label = slug.charAt(0).toUpperCase() + slug.slice(1);
//                         return (
//                             <Link key={slug} to={`/branches/${slug}`} data-testid={`about-branch-${slug}`} className="goi-card rounded-2xl p-6 group flex flex-col justify-between">
//                                 <div>
//                                     <MapPin className="w-5 h-5 text-brand-magenta mb-3" />
//                                     <div className="font-display font-bold text-lg group-hover:text-brand-magenta transition-colors">{label}</div>
//                                     <div className="flex items-center gap-1.5 mt-2">
//                                         <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-brand-lime" : "bg-red-400"} animate-pulse`}></span>
//                                         <span className={`text-[10px] tracking-widest uppercase font-bold ${open ? "text-brand-lime" : "text-red-400"}`}>{open ? "Open" : "Closed"}</span>
//                                     </div>
//                                 </div>
//                                 <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-magenta mt-4 self-end" />
//                             </Link>
//                         );
//                     })}
//                 </div>
//             </section>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import {
  Sparkles,
  Users,
  Gamepad2,
  PartyPopper,
  ArrowUpRight,
  MapPin,
  ShieldCheck,
  Sparkle,
  HeartHandshake,
  Award,
} from "lucide-react";
import { fetchBranches } from "@/lib/api";

const HERO_IMG =
  "https://images.unsplash.com/photo-1558271697-dd9f331ca8b3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920";
const STORY_IMG =
  "https://images.pexels.com/photos/7773729/pexels-photo-7773729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";

const OFFERINGS = [
  {
    icon: Gamepad2,
    title: "Arcade & Redemption",
    desc: "60+ cabinets, classic and cutting-edge.",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
  },
  {
    icon: Sparkles,
    title: "Virtual Reality",
    desc: "Next-gen immersive VR experiences.",
    img: "https://images.pexels.com/photos/7773729/pexels-photo-7773729.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    icon: Users,
    title: "Bowling & Trampoline",
    desc: "Bowling lanes, trampoline park & soft play.",
    img: "https://images.pexels.com/photos/9821845/pexels-photo-9821845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    icon: PartyPopper,
    title: "Parties & Corporate Events",
    desc: "Birthdays, school trips, team events.",
    img: "https://images.pexels.com/photos/29506612/pexels-photo-29506612.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const STATS = [
  { value: "4+", label: "Branches across India" },
  { value: "60+", label: "Arcade cabinets per venue" },
  { value: "12K+", label: "5-star guest reviews" },
  { value: "All", label: "Ages, from toddlers to teams" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    color: "text-brand-lime",
    border: "hover:border-brand-lime/50",
    title: "Safety First",
    desc: "Age, height, and weight guidelines are enforced on every attraction, with trained staff supervising VR, bowling, and rides at all times.",
  },
  {
    icon: Sparkle,
    color: "text-brand-cyan",
    border: "hover:border-brand-cyan/50",
    title: "Spotless & Well-Maintained",
    desc: "Equipment is inspected and cleaned on a regular schedule, and every venue undergoes routine hygiene checks across all zones — arcade floor to food counters.",
  },
  {
    icon: Users,
    color: "text-brand-magenta",
    border: "hover:border-brand-magenta/50",
    title: "Built for Every Age",
    desc: "From toddler-safe soft play to high-intensity VR and bowling, our zones are laid out so grandparents, parents, and kids all have something made for them.",
  },
  {
    icon: HeartHandshake,
    color: "text-yellow-400",
    border: "hover:border-yellow-400/50",
    title: "Genuine Hospitality",
    desc: "Our team is trained to make every visit feel personal — from party hosts who plan around your theme to staff who remember regular guests by name.",
  },
];

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

export default function About() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches()
      .then(setBranches)
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Game On India — our story, mission, and what makes us India's premium family entertainment destination."
        path="/about-us"
      />
      <div data-testid="about-page">
        {/* HERO */}
        <section
          className="relative min-h-[70vh] flex items-end overflow-hidden goi-noise"
          data-testid="about-hero-section"
        >
          <img
            src={HERO_IMG}
            alt="Game On India arcade"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 goi-grid-bg opacity-40" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pb-16 pt-32 w-full">
            <div className="goi-overline mb-4 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> About Us
            </div>
            <h1 className="font-display font-black uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter max-w-4xl">
              Play. Eat. <span className="text-brand-magenta">Celebrate.</span>
            </h1>
          </div>
        </section>

        {/* STORY */}
        <section
          className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
          data-testid="about-story-section"
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="goi-overline mb-4">Our Story</div>
              <h2 className="font-display font-black text-3xl sm:text-4xl mb-6 leading-tight">
                Where every visit becomes an unforgettable adventure.
              </h2>
              <div className="space-y-5 text-white/70 leading-relaxed">
                <p>
                  Game On Family Entertainment Center is a world-class
                  destination where families, friends, and thrill-seekers come
                  together to play, celebrate, and create unforgettable
                  memories. Designed for guests of all ages, we combine
                  cutting-edge entertainment with a vibrant atmosphere to
                  deliver an experience that goes far beyond gaming.
                </p>
                <p>
                  From exciting arcade games, bowling, virtual reality,
                  trampoline parks, soft play zones, bumper cars, and other
                  interactive attractions to delicious food and unforgettable
                  birthday parties and corporate events, Game On offers
                  something for everyone under one roof.
                </p>
                <p>
                  Our mission is simple: to bring people together through fun,
                  innovation, and exceptional hospitality. We are committed to
                  providing a safe, clean, and exciting environment where every
                  visit is filled with laughter, adventure, and lasting
                  memories.
                </p>
                <p>
                  Whether you're planning a family outing, a birthday
                  celebration, a school trip, or a corporate team event, Game On
                  is your ultimate destination to Play. Eat. Celebrate.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  to="/booking"
                  data-testid="about-book-party-btn"
                  className="goi-btn-primary"
                >
                  Book Your Party <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/games"
                  data-testid="about-explore-games-btn"
                  className="goi-btn-outline"
                >
                  Explore Games
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-magenta/20 via-transparent to-brand-cyan/20 blur-2xl rounded-3xl" />
              <img
                src={STORY_IMG}
                alt="Guests enjoying VR at Game On"
                className="relative rounded-3xl w-full object-cover aspect-[4/5] goi-card"
              />
            </div>
          </div>
        </section>

        {/* WHAT WE OFFER */}
        <section
          className="py-24 md:py-32 bg-brand-surface"
          data-testid="about-offerings-section"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-12 max-w-2xl">
              <div className="goi-overline mb-4">Under One Roof</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl">
                Something for everyone.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OFFERINGS.map((o) => (
                <div
                  key={o.title}
                  className="goi-card rounded-2xl overflow-hidden group"
                  data-testid={`about-offering-${o.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={o.img}
                      alt={o.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <o.icon className="absolute top-3 left-3 w-6 h-6 text-brand-cyan drop-shadow-lg" />
                  </div>
                  <div className="p-5">
                    <div className="font-display font-bold text-base mb-1">
                      {o.title}
                    </div>
                    <p className="text-sm text-white/50">{o.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY FAMILIES CHOOSE US — stats + values */}
        <section
          className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
          data-testid="about-why-us-section"
        >
          <div className="mb-12 max-w-2xl">
            <div className="goi-overline mb-4 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" /> Why Families Choose Us
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl">
              Built on safety, hygiene & hospitality.
            </h2>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="goi-glass rounded-2xl p-6 text-center"
                data-testid={`about-stat-${s.label.split(" ")[0].toLowerCase()}`}
              >
                <div className="font-display font-black text-3xl sm:text-4xl text-brand-magenta mb-1">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm text-white/60">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Value cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className={`goi-card rounded-2xl p-8 transition-colors duration-300 ${v.border}`}
                data-testid={`about-value-${v.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                <v.icon className={`w-8 h-8 ${v.color} mb-4`} />
                <div className="font-display font-bold text-xl mb-2">
                  {v.title}
                </div>
                <p className="text-white/60 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BRANCHES */}
        <section
          className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto bg-brand-surface"
          data-testid="about-branches-section"
        >
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="goi-overline mb-4">Find Us</div>
              <h2 className="font-display font-black text-4xl sm:text-5xl">
                Our branches.
              </h2>
            </div>
            <Link to="/branches" className="goi-btn-outline text-sm">
              All branches <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {["jalandhar", "amritsar", "zirakpur", "pune"].map((slug) => {
              const b = branches.find((x) => x.slug === slug);
              const open = b
                ? isOpenNow(b.timings.open, b.timings.close)
                : false;
              const label = slug.charAt(0).toUpperCase() + slug.slice(1);
              return (
                <Link
                  key={slug}
                  to={`/branches/${slug}`}
                  data-testid={`about-branch-${slug}`}
                  className="goi-card rounded-2xl p-6 group flex flex-col justify-between"
                >
                  <div>
                    <MapPin className="w-5 h-5 text-brand-magenta mb-3" />
                    <div className="font-display font-bold text-lg group-hover:text-brand-magenta transition-colors">
                      {label}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${open ? "bg-brand-lime" : "bg-red-400"} animate-pulse`}
                      ></span>
                      <span
                        className={`text-[10px] tracking-widest uppercase font-bold ${open ? "text-brand-lime" : "text-red-400"}`}
                      >
                        {open ? "Open" : "Closed"}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-brand-magenta mt-4 self-end" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
