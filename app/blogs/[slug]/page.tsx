import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Home, ChevronRight, ArrowLeft } from "lucide-react";
import { getBlog, getBlogs } from "@/lib/blogs";
import { formatBlogDate } from "@/lib/blog-format";

export async function generateStaticParams() {
  return (await getBlogs()).map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) return { title: "Article not found | On-chain Academy" };
  return {
    title: `${post.title} | On-chain Academy`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: [post.cover],
      publishedTime: post.publishedAt,
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlog(slug);
  if (!post) notFound();
  return (
    <main id="main">
      <article className="blog-article">
        <header className="article-header">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" aria-label="Home">
              <Home size={18} />
            </Link>
            <ChevronRight size={16} />
            <Link href="/blogs">Blogs</Link>
            <ChevronRight size={16} />
            <span aria-current="page">{post.title}</span>
          </nav>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.excerpt}</p>
          <div className="article-meta">
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
        <div className="article-back">
          <Link className="button button-dark" href="/blogs">
            <ArrowLeft size={16} />
            All Blogs
          </Link>
        </div>
      </article>
    </main>
  );
}
