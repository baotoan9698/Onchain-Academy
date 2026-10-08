"use client";
import { useState } from "react";
import Link from "next/link";
import type { BlogSummary } from "@/lib/blogs";
import { formatBlogDate } from "@/lib/blog-format";

export default function BlogList({ posts }: { posts: BlogSummary[] }) {
  const [limit, setLimit] = useState(9);
  return (
    <>
      <div className="grid three blog-grid" id="blog-grid">
        {posts.slice(0, limit).map((post, i) => (
          <Link
            href={`/blogs/${post.slug}`}
            className="card article-card blog-card"
            key={post.slug}
          >
            <img
              src={post.cover}
              alt={post.title}
              loading={i < 3 ? "eager" : "lazy"}
              width={600}
              height={420}
            />
            <div className="card-body">
              <h2 title={post.title}>{post.title}</h2>
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>
              <p>{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="blog-load-more">
        <p className="sr-only" aria-live="polite">
          Showing {Math.min(limit, posts.length)} of {posts.length} articles
        </p>
        {limit < posts.length && (
          <button
            className="button button-dark"
            aria-controls="blog-grid"
            onClick={() => setLimit((n) => n + 6)}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
