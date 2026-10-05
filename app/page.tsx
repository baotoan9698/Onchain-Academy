"use client";

import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BookOpen,
  ChevronDown,
  Globe2,
  GraduationCap,
  Landmark,
  Linkedin,
  Menu,
  Network,
  Plus,
  Rocket,
  X,
} from "lucide-react";
import {
  asset,
  benefits,
  blogs,
  contributors,
  opportunities,
  original,
  reviews,
  solutions,
  type ImageKey,
} from "@/lib/content";

const contact = original("/contact-us");
const nav = [
  ["About Us", "#aboutus"],
  ["Our Solutions", "#products"],
  ["Testimonials", "#reviews"],
  ["Adoption program", "#activities"],
  ["Blogs", "#blogs"],
];
function Picture({
  name,
  alt,
  className = "",
  eager = false,
}: {
  name: ImageKey;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <img
      src={asset(name)}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
function Logo() {
  return (
    <span className="logo" role="img" aria-label="On-chain Academy">
      <span className="logo-mark" aria-hidden="true">
        <Picture name="logo" alt="" eager />
      </span>
      <span className="logo-wordmark" aria-hidden="true">ON-CHAIN<br />ACADEMY</span>
    </span>
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="eyebrow">
      <span>
        <Blocks size={13} />
      </span>
      {children}
    </div>
  );
}
function Heading({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <Label>{label}</Label>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
function Contact({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-dark"}`}
      href={contact}
    >
      Contact Us <ArrowUpRight size={13} />
    </a>
  );
}
const faqs = [
  [
    "What is On-chain Academy?",
    "On-chain Academy is a pioneer dedicated to shaping Vietnam’s On-chain Economy by building the Vietnam On-chain Hub and driving the key enablers for its growth.",
  ],
  [
    "Who are running OA?",
    "On-chain Academy is powered by a strong network of local and global experts who share the same vision of strengthening Vietnam’s On-chain Economy. Our core team is supported by seasoned professionals and thought leaders from leading Web3 firms worldwide.",
  ],
  [
    "Who should partner with OA?",
    "Any global Web3 business looking to understand Vietnam’s On-chain Economy and IFC, and seeking to leverage their resources to grow alongside a rising market, should partner with OA.",
  ],
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(1);
  const teamRef = useRef<HTMLDivElement>(null);
  const icons = [Landmark, Network, Rocket, GraduationCap, BookOpen, Globe2];
  function slide(direction: number) {
    const el = teamRef.current;
    if (el)
      el.scrollBy({
        left:
          direction *
          ((el.firstElementChild?.getBoundingClientRect().width ?? 350) + 24),
        behavior: "smooth",
      });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="hero-wrap">
        <header className="header">
          <a href="#" aria-label="On-chain Academy home">
            <Logo />
          </a>
          <nav
            aria-label="Main navigation"
            className={menuOpen ? "navigation open" : "navigation"}
          >
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <Contact />
            <button
              className="menu-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <h1 id="hero-title">
              A New Economy Is
              <br />
              Taking Shape In
              <br />
              Vietnam.
            </h1>
            <p>
              In October 2024, Vietnam launched its National Blockchain
              Strategy. In June 2025, the National Assembly approved the
              establishment of the International Financial Center (IFC) with a
              sandbox for digital assets, and the Resolution 05 on pilot
              implementation of crypto asset market was approved in September
              2025. These milestones lay a strong foundation for the On-chain
              Economy in Vietnam.
            </p>
            <div className="hero-buttons">
              <a className="button button-glass" href="#products">
                View Our Solutions
              </a>
              <Contact light />
            </div>
          </div>
          <Picture
            name="skyline"
            alt="Ho Chi Minh City skyline"
            className="skyline"
            eager
          />
        </section>
      </div>
      <main id="main">
        <section className="section opportunities">
          <div className="container">
            <Heading
              label="Why Vietnam?"
              title={
                <>
                  Vietnam’s Unique
                  <br />
                  Opportunities
                </>
              }
              description="Vietnam stands at a pivotal moment, where timing, national advantages, and human harmony converge to create unique opportunities for building its On-chain Economy."
            />
            <div className="grid three opportunity-grid">
              {opportunities.map((item) => (
                <article className="card opportunity" key={item.title}>
                  <Picture name={item.image} alt={item.title} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section news">
          <div className="container">
            <Heading
              label="News"
              title={
                <>
                  News about
                  <br />
                  IFC &amp; Vietnam
                  <br />
                  On-chain Landscape
                </>
              }
            />
            <div className="news-logos">
              <div className="news-logo-track">
              {[0, 1].map((copy) => (
              <div className="news-logo-group" key={copy} aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
              <a
                href="https://mst.gov.vn/chien-luoc-quoc-gia-ve-ung-dung-va-phat-trien-cong-nghe-chuoi-khoi-den-nam-2030-197241024151848954.htm"
                aria-label="National Blockchain Strategy"
              >
                <Picture
                  name="ministry"
                  alt="Ministry of Science and Technology"
                />
              </a>
              <a href="https://vnexpress.net/quoc-hoi-thong-qua-luat-cong-nghiep-cong-nghe-so-4898730.html">
                <Picture name="vnexpress" alt="VNExpress" />
              </a>
              <a href="https://tuoitre.vn/">
                <Picture name="tuoitre" alt="Tuổi Trẻ" />
              </a>
              <a href="https://nhandan.vn/bo-tai-chinh-trinh-du-thao-nghi-quyet-ve-viec-trien-khai-thi-diem-phat-hanh-va-giao-dich-tai-san-ma-hoa-post866435.html">
                <Picture name="nhandan" alt="Nhân Dân" />
              </a>
              <a href="https://tapchitaichinh.vn/on-chain-tao-nhieu-co-hoi-phat-trien-cho-thi-truong-tai-chinh-so-tai-viet-nam.html">
                <Picture name="news5" alt="Tạp chí Tài chính" />
              </a>
              </div>
              ))}
              </div>
            </div>
          </div>
        </section>
        <section id="blogs" className="section">
          <div className="container">
            <Heading
              label="Our Blogs"
              title="All Blogs"
              description="Find the latest activities of On-chain Academy and its growth"
            />
            <div className="grid three">
              {blogs.map((blog) => (
                <a
                  href={original(`/blogs/${blog.slug}/`)}
                  className="card article-card"
                  key={blog.slug}
                >
                  <Picture name={blog.image} alt={blog.title} />
                  <div className="card-body">
                    <h3 title={blog.title}>{blog.title}</h3>
                    <time>{blog.date}</time>
                    <p>{blog.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section id="aboutus" className="section about">
          <div className="container narrow">
            <Heading label="Who Are We" title="About Us" />
            <div className="about-copy">
              <p>
                On-chain Academy is a pioneer in driving the growth of Vietnam’s
                On-chain Economy. Our mission is to form the Vietnam On-chain
                Hub, which accelerates key enablers for a strong On-chain
                Economy, including:
              </p>
              <ul>
                <li>
                  <strong>Education &amp; Training:</strong> Delivering tailored
                  programs for public and private sectors to raise awareness,
                  build solid foundation, and develop Vietnam’s next generation
                  of Web3 professionals.
                </li>
                <li>
                  <strong>Capital &amp; Economic Contribution:</strong>{" "}
                  Attracting strategic investment and incubating high-value
                  digital financial products for Vietnam.
                </li>
                <li>
                  <strong>Innovation &amp; Global Integration:</strong> Driving
                  cutting-edge innovation in Web3 and digital finance while
                  fostering international collaboration.
                </li>
                <li>
                  <strong>Experimentation &amp; Standardization:</strong>{" "}
                  Piloting sandboxes, establishing standards, and shaping
                  regulatory frameworks aligned with international best
                  practices.
                </li>
              </ul>
            </div>
            <Picture
              name="building"
              alt="On-chain Academy campus and innovation hub"
              className="about-building"
            />
          </div>
        </section>
        <section className="media section">
          <Heading label="Media" title="Media About Us" />
          <div className="media-logos">
            {[0, 1].map((repeat) => (
              <div className="media-group" key={repeat}>
                {(
                  [
                    [
                      "phapluat",
                      "Báo Pháp Luật",
                      "http://videophapluat.baophapluat.vn/doanh-nghiep-hoi-nhap/ky-nguyen-on-chain-co-hoi-de-viet-nam-tro-thanh-trung-tam-tai-chinh-quoc-te-187646.html",
                    ],
                    [
                      "taichinh",
                      "Tạp chí Tài Chính",
                      "https://tapchitaichinh.vn/on-chain-tao-nhieu-co-hoi-phat-trien-cho-thi-truong-tai-chinh-so-tai-viet-nam.html",
                    ],
                    [
                      "dautu",
                      "Báo Đầu Tư",
                      "https://baodautu.vn/blockchain-va-trung-tam-tai-chinh-quoc-te-co-hoi-but-pha-cho-doanh-nghiep-viet-d333833.html",
                    ],
                    [
                      "news5",
                      "C4IR",
                      "https://c4ir.vn/khi-viet-nam-dung-truoc-co-hoi-vang-cua-nen-kinh-te-on-chain/",
                    ],
                  ] as [ImageKey, string, string][]
                ).map(([name, alt, href]) => (
                  <a
                    href={href}
                    key={name}
                    tabIndex={repeat ? -1 : undefined}
                    aria-hidden={repeat ? true : undefined}
                  >
                    <Picture name={name} alt={alt} />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section id="products" className="section solutions">
          <div className="container">
            <Heading
              label="What We Offer"
              title="Our Solutions"
              description="On-chain Academy drives Vietnam’s On-chain Economy by training top leaders, uniting stakeholders through nationwide adoption programs, and building hubs that showcase innovation and foster sandbox-driven financial products."
            />
            <div className="grid three">
              {solutions.map((item) => (
                <a
                  className="card article-card"
                  key={item.slug}
                  href={original(`/solution/${item.slug}`)}
                >
                  <Picture name={item.image} alt={item.title} />
                  <div className="card-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section id="reviews" className="section testimonials">
          <div className="container">
            <div className="left-heading">
              <Label>Testimonials</Label>
              <h2>People talk about OA</h2>
              <p>
                See how leaders and innovators are transforming
                <br className="desktop" /> through our On-chain learning
                experience.
              </p>
              <Contact />
              <div className="decorations" aria-hidden="true">
                <Blocks />
                <Globe2 />
                <Plus />
              </div>
            </div>
            <div className="grid three review-grid">
              {reviews.map((item) => (
                <figure className="card review" key={item.name}>
                  <div className="stars" aria-label="5 out of 5 stars">
                    ★★★★★
                  </div>
                  <blockquote>“{item.quote}”</blockquote>
                  <figcaption>
                    <Picture name={item.image} alt={item.name} />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <section id="benefits" className="section benefits">
          <div className="container">
            <Heading
              label="Our advantages"
              title={
                <>
                  Why On-chain
                  <br />
                  Academy?
                </>
              }
              description="With pioneering expertise, global connections, and deep local insight, OA is uniquely positioned to shape the foundations of Vietnam’s On-chain Economy."
            />
            <div className="grid three">
              {benefits.map(([title, text], i) => {
                const Icon = icons[i];
                return (
                  <article key={title} className="card benefit">
                    <span className="benefit-icon">
                      <Icon size={24} strokeWidth={1.3} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section contributors">
          <div className="container">
            <Heading
              label="Our Contributor"
              title={
                <>
                  A seamless fusion of
                  <br />
                  scholarly insight and real-
                  <br className="desktop" />
                  world expertise
                </>
              }
              description="Our contributors, with over 40 years of combined Web3 experience, bring the vision, expertise, and networks needed to shape Vietnam’s On-chain Hub and connect it with the global ecosystem."
            />
            <div className="team-wrapper">
              <button
                className="carousel-arrow prev"
                onClick={() => slide(-1)}
                aria-label="Previous contributors"
              >
                <ArrowLeft size={19} />
              </button>
              <div
                className="team-track"
                ref={teamRef}
                tabIndex={0}
                aria-label="Contributors carousel"
              >
                {contributors.map((person) => (
                  <article className="card person" key={person.name}>
                    <Picture name={person.image} alt={person.name} />
                    <h3>{person.name}</h3>
                    <span className="person-role">Contributor</span>
                    <p>{person.bio}</p>
                    <a
                      className="social-link"
                      href={`https://www.linkedin.com/in/${person.linkedin}/`}
                      aria-label={`${person.name} on LinkedIn`}
                    >
                      <Linkedin size={17} />
                    </a>
                  </article>
                ))}
              </div>
              <button
                className="carousel-arrow next"
                onClick={() => slide(1)}
                aria-label="Next contributors"
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </section>
        <section className="section faq">
          <div className="container faq-grid">
            <div>
              <Label>FAQ Hub</Label>
              <h2>
                Frequently Asked
                <br />
                Questions!
              </h2>
              <div className="card question-card">
                <h3>Still Have Questions?</h3>
                <p>Don’t hesitate to reach out!</p>
                <Contact />
              </div>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer], i) => (
                <div
                  className={`faq-item ${faqOpen === i ? "expanded" : ""}`}
                  key={question}
                >
                  <h3>
                    <button
                      aria-expanded={faqOpen === i}
                      aria-controls={`faq-${i}`}
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    >
                      {question}
                      <ChevronDown size={17} />
                    </button>
                  </h3>
                  <div id={`faq-${i}`} hidden={faqOpen !== i}>
                    <p>{answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="activities" className="section activities">
          <div className="container">
            <Heading
              label="Featured Activities"
              title="Our main activities"
              description="Our activities span across meetups, events, webinars, hackathons, courses, newsletters, R&D, and more — all designed to foster collaboration, innovation, and growth in Vietnam’s On-chain Hub."
            />
            <div className="activity-tags">
              {[
                "Course",
                "Meetup",
                "Hackathon",
                "Webinar",
                "Newsletter",
                "R&D",
              ].map((item) => (
                <a
                  href={
                    item === "R&D"
                      ? original("/solution/research-development")
                      : item === "Course"
                        ? original("/solution/customized-training")
                        : original("/blogs")
                  }
                  key={item}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="community">
          <div className="container community-inner">
            <div>
              <Label>Community</Label>
              <h2>
                Join a community
                <br />
                where value thrives.
              </h2>
              <p>
                Unlock the amazing benefits of joining our Hub, growing
                <br className="desktop" /> your business, and building
                connections.
              </p>
              <Contact />
            </div>
            <div className="community-art">
              <Picture
                name="globe"
                alt="A connected global on-chain community"
              />
              <div className="chat chat-one">
                We have an exciting model that can
                <br />
                be brought On-chain
              </div>
              <div className="chat chat-two">
                Awesome! Let’s
                <br />
                collaborate to make it
                <br />
                happen.
              </div>
              <div className="orbit-icons" aria-hidden="true">
                <Blocks />
                <Globe2 />
                <Plus />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-cta">
          <a href="#" aria-label="Back to top">
            <Logo />
          </a>
          <h2>
            Join the evolution of the economy
            <br />
            today!
          </h2>
          <Contact />
          <p>Your Gateway To The Vietnam On-chain Economy</p>
          <div className="socials">
            <a
              href="https://x.com/OnChainAcad"
              aria-label="On-chain Academy on X"
            >
              𝕏
            </a>
            <a
              href="https://www.linkedin.com/company/on-chain-academy/"
              aria-label="On-chain Academy on LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#benefits">Benefits</a>
          <a href="#products">Solutions</a>
          <a href={contact}>Contact</a>
          <a href="#blogs">Blogs</a>
          <a href="#reviews">Testimonials</a>
        </nav>
        <div className="copyright">
          On-chain Academy © {new Date().getFullYear()}.
        </div>
      </footer>
    </>
  );
}
