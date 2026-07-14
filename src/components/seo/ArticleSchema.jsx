import { Helmet } from "react-helmet-async";

/*
  Article structured data — use ONLY on individual blog post pages
  (BlogPost.jsx).

  Usage (inside BlogPost.jsx, once `post` data has loaded):
  <ArticleSchema post={post} />

  Optional fields on `post` this now supports (safe if missing — falls
  back sensibly): post.author, post.tags (array of strings).
  If you want these populated per-post from the admin dashboard, add
  "author" (text) and "tags" (csv) fields to your blog_posts schema in
  both server.py's BlogPost model and AdminDashboard.jsx's SCHEMAS.blog_posts
  — not required for this component to work, just for richer per-post data.
*/

const SITE_URL = "https://gameonplay.in";

export default function ArticleSchema({ post }) {
  if (!post) return null;

  // Real named author if the post has one, otherwise falls back to the
  // Organization itself as author — matches Google's own guidance for
  // content without an individual byline, while supporting real author
  // names the moment you start adding them per post.
  const author = post.author
    ? { "@type": "Person", name: post.author }
    : { "@type": "Organization", name: "Game On India" };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    dateModified: post.updated_at || post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    inLanguage: "en-IN",
    articleSection: post.category || "Entertainment",
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    author,
    publisher: {
      "@type": "Organization",
      name: "Game On India",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/gameon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
