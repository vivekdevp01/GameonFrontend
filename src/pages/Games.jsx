import { useEffect, useState, useMemo } from "react";
import { fetchGames } from "@/lib/api";
import SEO from "@/components/SEO";
import FAQSchema from "@/components/seo/FAQSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

const CATEGORIES = [
  "All",
  "Arcade Games",
  "VR Games",
  "Redemption Games",
  "Kids Rides",
  "Claw Machines",
  "Racing Games",
  "Basketball",
  "Air Hockey",
  "Bowling",
];

const gameFaqs = [
  {
    question: "What games are available at Game On India?",
    answer:
      "We offer arcade games, VR experiences, bowling, racing simulators, redemption games, claw machines, kids rides and more.",
  },
  {
    question: "Are games suitable for children?",
    answer: "Yes. We have games suitable for children, teenagers and adults.",
  },
  {
    question: "Do all branches have the same games?",
    answer:
      "Each branch has a unique selection, although many popular attractions are available across multiple locations.",
  },
  {
    question: "Do I need to book games in advance?",
    answer:
      "Walk-ins are welcome, but birthday parties and group events should be booked in advance.",
  },
];
export default function Games() {
  const [games, setGames] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchGames()
      .then(setGames)
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () =>
      category === "All" ? games : games.filter((g) => g.category === category),
    [games, category],
  );

  return (
    <>
      <>
        <SEO
          title="Arcade Games, VR, Bowling & Family Entertainment"
          description="Explore arcade games, VR experiences, bowling lanes, racing simulators, redemption games, claw machines and kids rides at Game On India."
          path="/games"
          keywords="Arcade Games, VR Games, Bowling, Kids Games, Racing Games, Family Entertainment"
        />

        <BreadcrumbSchema
          items={[
            { name: "Home", path: "/" },
            { name: "Games", path: "/games" },
          ]}
        />

        <FAQSchema faqs={gameFaqs} />
      </>
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="games-page"
      >
        <div className="goi-overline mb-4">The arsenal</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Games we run.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-10">
          From retro cabinets to next-gen VR — pick your poison.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`games-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                category === c
                  ? "bg-brand-magenta border-brand-magenta text-white"
                  : "border-white/10 text-white/70 hover:border-white/30 hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <div
              key={g.slug}
              className="goi-card rounded-2xl overflow-hidden group"
              data-testid={`game-card-${g.slug}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={g.image}
                  alt={g.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-brand-magenta text-white font-bold">
                  {g.category}
                </div>
              </div>
              <div className="p-5">
                <div className="font-display font-bold text-xl mb-2">
                  {g.name}
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {g.description}
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-white/70">
                  <span className="px-2 py-1 rounded bg-white/5">
                    Age {g.min_age}+
                  </span>
                  <span className="px-2 py-1 rounded bg-white/5">
                    {g.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded bg-brand-cyan/10 text-brand-cyan font-bold">
                    {g.credits} credits
                  </span>
                </div>
                <div className="mt-3 text-xs text-white/40">
                  Available at:{" "}
                  {g.branches
                    .map((b) => b.charAt(0).toUpperCase() + b.slice(1))
                    .join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
