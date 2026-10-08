import type { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Mail, Phone, Blocks } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { ContactFaq } from "@/components/blog-support";
import ContactForm from "@/components/contact-form";
import { asset } from "@/lib/content";
import "../blogs/blogs.css";
import "./contact.css";
export const metadata: Metadata = {title: "Contact Us | On-chain Academy", description: "Get in touch with On-chain Academy. Our team is here to help and support you every step of the way.", alternates: {canonical: "/contact-us"}};
export default function ContactPage() {
  return <div className="blog-site contact-site"><SiteHeader /><main id="main">
    <section className="contact-intro">
      <nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/" aria-label="Home"><Home size={18}/></Link><ChevronRight size={16}/><span>Contact Us</span></nav>
      <h1>Get in touch with us today!</h1>
      <p>Whatever you need, whenever you need it, our team is here to help dedicated to supporting you every step of the way.</p>
    </section>
    <section className="container contact-grid" aria-label="Contact On-chain Academy">
      <div className="contact-details">
        <article><span className="contact-icon"><Mail size={24}/></span><h2>Message Us</h2><p>Use our online chat system to message us and get support.</p><a href="mailto:contact@on-chain.academy">contact@on-chain.academy</a></article>
        <article><span className="contact-icon"><Phone size={24}/></span><h2>Call us</h2><p>Let's chat - nothing better than talking to another human being.</p><a href="tel:+84964931661">+84964931661</a></article>
      </div><ContactForm />
    </section>
    <ContactFaq />
    <section className="section community"><div className="container community-grid">
      <div><div className="eyebrow"><Blocks size={13}/> Community</div><h2>Join a community<br/>where value thrives.</h2><p>Unlock the amazing benefits of joining our Hub, growing your business, and building connections.</p><a className="button button-dark" href="#main">Contact Us</a></div>
      <div className="community-art"><img src={asset("globe")} alt="A connected global on-chain community"/><div className="chat chat-one">We have an exciting model that can<br/>be brought On-chain</div><div className="chat chat-two">Awesome! Let’s<br/>collaborate to make it<br/>happen.</div></div>
    </div></section>
  </main><SiteFooter /></div>;
}
