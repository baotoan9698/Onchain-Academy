import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import SolutionCards from "@/components/solution-cards";
import BlogSupport from "@/components/blog-support";
export const metadata: Metadata = { title: "All Solutions | On-chain Academy", description: "Explore On-chain Academy’s customized training, research and development, and On-chain Hub.", alternates: {canonical: "/solution"} };
export default function SolutionsPage() {
  return <main id="main">
    <section className="solution-intro">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/" aria-label="Home"><Home size={18}/></Link><ChevronRight size={16}/><span>All Solutions</span></nav>
      <h1>All Online Courses</h1><p>Find what fascinates you as you explore these online courses.</p>
    </section>
    <section className="container solution-list" aria-labelledby="services-heading">
      <div className="solution-toolbar"><h2 id="services-heading">All Services</h2><span className="solution-filter">All</span></div>
      <SolutionCards />
    </section>
    <BlogSupport />
  </main>;
}
