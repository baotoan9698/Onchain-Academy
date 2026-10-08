import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Blocks, Network, Orbit } from "lucide-react";
import BlogList from "@/components/blog-list";
import BlogSupport from "@/components/blog-support";
import { getBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "All Blogs | On-chain Academy",
  description: "Find the latest insights about Onchain Economy and its growth.",
  alternates: { canonical: "/blogs" },
};
export default async function BlogsPage() {
  const posts = await getBlogs();
  return (
    <main id="main">
      <section className="blog-index">
        <div className="blog-index-intro">
          <div className="blog-decorations" aria-hidden="true">
            <Blocks />
            <Network />
            <Orbit />
          </div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" aria-label="Home">
              <Home size={18} />
            </Link>
            <ChevronRight size={16} />
            <span aria-current="page">All Blogs</span>
          </nav>
          <h1>All Blogs</h1>
          <p>Find the latest insights about Onchain Economy and its growth</p>
        </div>
        <div className="container">
          <BlogList posts={posts} />
        </div>
      </section>
      <BlogSupport />
    </main>
  );
}
