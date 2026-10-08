import { SiteHeader, SiteFooter } from "@/components/site-shell";
import "../blogs/blogs.css";
import "./solutions.css";
export default function SolutionLayout({children}: {children: React.ReactNode}) {
  return <div className="blog-site solution-site"><SiteHeader />{children}<SiteFooter /></div>;
}
