// import { useEffect, useState } from "react";
// import { Link, useParams, Navigate } from "react-router-dom";
// import { ArrowUpRight, Calendar, ArrowLeft, MapPin } from "lucide-react";
// import { Helmet } from "react-helmet-async";
// import SEO from "@/components/SEO";
// import { fetchBlogPost } from "@/lib/api";

// export default function BlogPost() {
//     const { slug } = useParams();
//     const [post, setPost] = useState(undefined); // undefined = loading, null = not found

//     useEffect(() => {
//         setPost(undefined);
//         fetchBlogPost(slug)
//             .then((data) => setPost(data || null))
//             .catch(() => setPost(null));
//     }, [slug]);

//     if (post === undefined) {
//         return (
//             <div className="min-h-screen pt-40 text-center text-white/40" data-testid="blog-post-loading">
//                 Loading...
//             </div>
//         );
//     }

//     if (post === null) {
//         return <Navigate to="/blog" replace />;
//     }

//     const articleSchema = {
//         "@context": "https://schema.org",
//         "@type": "Article",
//         headline: post.title,
//         image: post.image,
//         datePublished: post.date,
//         author: { "@type": "Organization", name: "Game On India" },
//         publisher: { "@type": "Organization", name: "Game On India" },
//     };

//     return (
//         <div data-testid="blog-post-page">
//             <SEO
//                 title={post.title}
//                 description={post.excerpt}
//                 path={`/blog/${post.slug}`}
//                 image={post.image}
//                 type="article"
//             />
//             <Helmet>
//                 <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
//             </Helmet>

//             <section className="relative pt-40 pb-16 px-6 md:px-10 goi-noise overflow-hidden">
//                 <div className="absolute inset-0 goi-grid-bg opacity-30" />
//                 <div className="relative max-w-3xl mx-auto">
//                     <Link to="/blog" data-testid="blog-post-back-link" className="inline-flex items-center gap-2 text-white/50 hover:text-brand-cyan text-sm mb-8 transition-colors">
//                         <ArrowLeft className="w-4 h-4" /> Back to Blog
//                     </Link>
//                     <span className="inline-block px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-brand-cyan text-brand-ink font-bold mb-4">
//                         {post.category}
//                     </span>
//                     <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4 leading-tight">
//                         {post.title}
//                     </h1>
//                     <div className="flex items-center gap-1.5 text-sm text-white/40">
//                         <Calendar className="w-3.5 h-3.5" />
//                         {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//                     </div>
//                 </div>
//             </section>

//             <section className="px-6 md:px-10 pb-16 max-w-3xl mx-auto">
//                 <img src={post.image} alt={post.title} className="w-full rounded-3xl aspect-video object-cover mb-10 goi-card" />
//                 <div
//                     className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-headings:font-display prose-headings:font-bold prose-a:text-brand-cyan max-w-none"
//                     dangerouslySetInnerHTML={{ __html: post.content }}
//                     data-testid="blog-post-content"
//                 />
//             </section>

//             {post.branch_slug && (
//                 <section className="px-6 md:px-10 pb-24 max-w-3xl mx-auto">
//                     <div className="goi-glass rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
//                         <div className="flex items-center gap-3">
//                             <MapPin className="w-5 h-5 text-brand-magenta" />
//                             <span className="text-white/80 text-sm">
//                                 Ready to visit? Check out our {post.branch_slug.charAt(0).toUpperCase() + post.branch_slug.slice(1)} branch.
//                             </span>
//                         </div>
//                         <Link to={`/branches/${post.branch_slug}`} data-testid="blog-post-branch-cta" className="goi-btn-primary text-sm">
//                             View Branch <ArrowUpRight className="w-4 h-4" />
//                         </Link>
//                     </div>
//                 </section>
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowUpRight, Calendar, ArrowLeft, MapPin } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import { fetchBlogPost } from "@/lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(undefined); // undefined = loading, null = not found

  useEffect(() => {
    setPost(undefined);
    fetchBlogPost(slug)
      .then((data) => setPost(data || null))
      .catch(() => setPost(null));
  }, [slug]);

  if (post === undefined) {
    return (
      <div
        className="min-h-screen pt-40 text-center text-white/40"
        data-testid="blog-post-loading"
      >
        Loading...
      </div>
    );
  }

  if (post === null) {
    return <Navigate to="/blog" replace />;
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Game On India" },
    publisher: { "@type": "Organization", name: "Game On India" },
  };

  return (
    <div data-testid="blog-post-page">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <section className="relative pt-40 pb-16 px-6 md:px-10 goi-noise overflow-hidden">
        <div className="absolute inset-0 goi-grid-bg opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          {/* Each wrapped in its own block-level div so they stack
                        on separate lines instead of colliding as inline elements */}
          <div className="mb-8">
            <Link
              to="/blog"
              data-testid="blog-post-back-link"
              className="inline-flex items-center gap-2 text-white/50 hover:text-brand-cyan text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

          <div className="mb-4">
            <span className="inline-block px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase bg-brand-cyan text-brand-ink font-bold">
              {post.category}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-1.5 text-sm text-white/40">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-16 max-w-3xl mx-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-3xl aspect-video object-cover mb-10 goi-card"
        />
        <div
          className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-headings:font-display prose-headings:font-bold prose-a:text-brand-cyan max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-testid="blog-post-content"
        />
      </section>

      {post.branch_slug && (
        <section className="px-6 md:px-10 pb-24 max-w-3xl mx-auto">
          <div className="goi-glass rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-brand-magenta" />
              <span className="text-white/80 text-sm">
                Ready to visit? Check out our{" "}
                {post.branch_slug.charAt(0).toUpperCase() +
                  post.branch_slug.slice(1)}{" "}
                branch.
              </span>
            </div>
            <Link
              to={`/branches/${post.branch_slug}`}
              data-testid="blog-post-branch-cta"
              className="goi-btn-primary text-sm"
            >
              View Branch <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
