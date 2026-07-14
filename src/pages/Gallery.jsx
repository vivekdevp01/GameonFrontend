import { useEffect, useState, useMemo } from "react";
import { fetchBranches } from "@/lib/api";
import SEO from "@/components/SEO";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

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

  // Each gallery item is now { url, category } instead of a plain string —
  // matches the updated backend model + GalleryUploadField.
  const allImages = useMemo(() => {
    const all = [];
    branches.forEach((b) =>
      (b.gallery || []).forEach((img) =>
        all.push({
          src: typeof img === "string" ? img : img.url,
          category:
            typeof img === "string" ? "Game Zone" : img.category || "Game Zone",
          city: b.city,
        }),
      ),
    );
    return all;
  }, [branches]);

  // The actual fix — filter by the selected category
  const images = useMemo(
    () =>
      cat === "All"
        ? allImages
        : allImages.filter((img) => img.category === cat),
    [allImages, cat],
  );

  return (
    <>
      <SEO
        title="Gallery | Game On India Arcade, VR & Birthday Parties"
        description="Browse photos from Game On India featuring arcade games, VR experiences, bowling, birthday parties, corporate events and school visits across Jalandhar, Amritsar, Zirakpur and Pune."
        path="/gallery"
        keywords="Game On gallery, arcade photos, VR games, birthday party gallery, bowling photos"
      />

      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
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

        {images.length === 0 ? (
          <p
            className="text-white/40 text-center py-20"
            data-testid="gallery-empty-state"
          >
            No photos in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className="goi-card rounded-2xl overflow-hidden group"
                data-testid={`gallery-image-${i}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.city}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="p-3 flex justify-between text-xs">
                  <span className="text-white/60">{img.city}</span>
                  <span className="text-brand-cyan">Game On</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
