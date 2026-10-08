import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import solutions from "@/data/solutions.json";
import SolutionCards from "@/components/solution-cards";
import { SolutionActivities } from "@/components/blog-support";
export function generateStaticParams() { return solutions.map(({slug}) => ({slug})); }
type Props = {params: Promise<{slug: string}>};
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params;
  const item = solutions.find(item => item.slug === slug);
  if (!item) return {};
  return {title: `${item.title} | On-chain Academy`, description: item.description, alternates: {canonical: `/solution/${slug}`}, openGraph: {title: item.title, description: item.description, images: [item.cover]}};
}
export default async function SolutionPage({params}: Props) {
  const {slug} = await params;
  const item = solutions.find(item => item.slug === slug);
  if (!item) notFound();
  return <main id="main">
    <section className="solution-intro solution-detail-intro">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/solution">Solution</Link><ChevronRight size={16}/><span>{item.title}</span></nav>
      <h1>{item.title}</h1><p>{item.description}</p>
    </section>
    <div className="container">
      <section className="solution-partners"><h2>Top enterprises boost skills with our trusted trainings</h2>
        <div>{item.partners.map(src => <img key={src} src={src} alt="" loading="lazy"/>)}</div>
      </section>
      <article className="solution-body"><h2>What we offer?</h2><div dangerouslySetInnerHTML={{__html: item.bodyHtml}} /></article>
      <section className="solution-related"><div className="section-heading"><div className="eyebrow">What We Offer</div><h2>Our Solutions</h2><p>On-chain Academy drives Vietnam’s On-chain Economy by training top leaders, uniting stakeholders through nationwide adoption programs, and building hubs that showcase innovation and foster sandbox-driven financial products.</p></div><SolutionCards /></section>
    </div>
    <SolutionActivities />
  </main>;
}
