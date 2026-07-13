import { useEffect, useState, useMemo } from "react";
import { fetchBranches } from "@/lib/api";
import SEO from "@/components/SEO";

const CATEGORIES = [
  "All",
  "Birthday Parties",
  "School Visits",
  "Corporate Events",
  "Game Zone",
];

export default function Gallery() {
  const [branches, setBranches] = useState([]);
  const [cat, setCat] = useState("All");

  useEffect(() => {
    fetchBranches()
      .then(setBranches)
      .catch(() => {});
  }, []);

  const images = useMemo(() => {
    const all = [];
    branches.forEach((b) =>
      (b.gallery || []).forEach((src) => all.push({ src, city: b.city })),
    );
    return all;
  }, [branches]);

  return (
    <>
      <SEO
        title="Gallery"
        description="Photos from Game On India — arcade, VR, bowling, parties, and events across all branches."
        path="/gallery"
      />
      <div
        className="pt-32 pb-24 px-6 md:px-10 max-w-7xl mx-auto"
        data-testid="gallery-page"
      >
        <div className="goi-overline mb-4">Gallery</div>
        <h1 className="font-display font-black text-5xl sm:text-6xl mb-4">
          Moments we captured.
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mb-10">
          Faces, high-fives, and confetti.
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              data-testid={`gallery-filter-${c.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${cat === c ? "bg-brand-magenta border-brand-magenta" : "border-white/10 text-white/70"}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="break-inside-avoid goi-card rounded-2xl overflow-hidden group"
              data-testid={`gallery-image-${i}`}
            >
              <img
                src={img.src}
                alt={img.city}
                className="w-full group-hover:scale-105 transition duration-700"
              />
              <div className="p-3 flex justify-between text-xs">
                <span className="text-white/60">{img.city}</span>
                <span className="text-brand-cyan">Game On</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
