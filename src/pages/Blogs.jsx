import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import SEO from "@/components/SEO";
import { fetchBlogPosts } from "@/lib/api";

export default function Blog() {
    const [posts, setPosts] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        fetchBlogPosts()
            .then(setPosts)
            .catch(() => {});
    }, []);

    const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
    const filtered = category === "All" ? posts : posts.filter((p) => p.category === category);

    return (
        <div data-testid="blog-page">
            <SEO
                title="Blog"
                description="Tips, guides, and stories from Game On India — birthday party ideas, VR guides, and family entertainment inspiration across Jalandhar, Amritsar, Zirakpur & Pune."
                path="/blog"
            />

            <section className="relative pt-40 pb-16 px-6 md:px-10 goi-noise overflow-hidden">
                <div className="absolute inset-0 goi-grid-bg opacity-30" />
                <div className="relative max-w-4xl mx-auto">
                    <div className="goi-overline mb-4 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" /> Blog
                    </div>
                    <h1 className="font-display font-black uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tighter mb-4">
                        Stories & <span className="text-brand-magenta">Guides</span>
                    </h1>
                    <p className="text-white/60 max-w-2xl">
                        Party ideas, game guides, and behind-the-scenes from every Game On India branch.
                    </p>
                </div>
            </section>

            <section className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto">
                {posts.length === 0 ? (
                    <p className="text-white/40 text-center py-20" data-testid="blog-empty-state">
                        New stories coming soon — check back shortly.
                    </p>
                ) : (
                    <>
                        {/* Category filter */}
                        <div className="flex flex-wrap gap-2 mb-10" data-testid="blog-category-filter">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    data-testid={`blog-filter-${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                    className={`text-xs px-4 py-2 rounded-full border transition-all ${
                                        category === c
                                            ? "bg-brand-magenta border-brand-magenta text-white"
                                            : "border-white/15 text-white/60 hover:border-brand-cyan hover:text-brand-cyan"
                                    }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((post) => (
                                <Link
                                    key={post.slug}
                                    to={`/blog/${post.slug}`}
                                    data-testid={`blog-post-${post.slug}`}
                                    className="goi-card rounded-2xl overflow-hidden group"
                                >
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] tracking-widest uppercase bg-brand-cyan text-brand-ink font-bold">
                                            {post.category}
                                        </span>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-1.5 text-[11px] text-white/40 mb-2">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </div>
                                        <h2 className="font-display font-bold text-lg leading-snug mb-2 group-hover:text-brand-magenta transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-sm text-white/50 leading-relaxed mb-3">{post.excerpt}</p>
                                        <span className="flex items-center gap-1 text-xs font-bold text-brand-cyan">
                                            Read more <ArrowUpRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}