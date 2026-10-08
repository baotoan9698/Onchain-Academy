import { SiteHeader, SiteFooter } from "@/components/site-shell";
import "./blogs.css";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-site">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
