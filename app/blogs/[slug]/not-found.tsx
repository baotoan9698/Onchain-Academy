import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="blog-not-found">
      <h1>Article not found</h1>
      <p>This article is no longer available, or the link is incorrect.</p>
      <Link className="button button-dark" href="/blogs">
        Back to All Blogs
      </Link>
    </main>
  );
}
