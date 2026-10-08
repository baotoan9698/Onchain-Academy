"use client";
import { useState } from "react";
import {
  Blocks,
  Landmark,
  Network,
  Rocket,
  GraduationCap,
  BookOpen,
  Globe2,
  ChevronDown,
} from "lucide-react";
import { benefits, original } from "@/lib/content";

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
export default function BlogSupport() {
  const [open, setOpen] = useState<number | null>(1);
  const icons = [Landmark, Network, Rocket, GraduationCap, BookOpen, Globe2];
  return (
    <>
      <section className="section benefits">
        <div className="container">
          <div className="section-heading">
            <Label>Our advantages</Label>
            <h2>
              Why On-chain
              <br />
              Academy?
            </h2>
            <p>
              With pioneering expertise, global connections, and deep local
              insight, OA is uniquely positioned to shape the foundations of
              Vietnam’s On-chain Economy.
            </p>
          </div>
          <div className="grid three">
            {benefits.map(([title, text], i) => {
              const Icon = icons[i];
              return (
                <article className="card benefit" key={title}>
                  <span className="benefit-icon">
                    <Icon size={24} strokeWidth={1.3} />
                  </span>
                  <h3 title={title}>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
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
              <a className="button button-dark" href={original("/contact-us")}>
                Contact Us
              </a>
            </div>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div
                className={`faq-item ${open === i ? "expanded" : ""}`}
                key={question}
              >
                <h3>
                  <button
                    aria-expanded={open === i}
                    aria-controls={`blog-faq-${i}`}
                    onClick={() => setOpen(open === i ? null : i)}
                  >
                    {question}
                    <ChevronDown size={17} />
                  </button>
                </h3>
                <div id={`blog-faq-${i}`} hidden={open !== i}>
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section activities">
        <div className="container">
          <div className="section-heading">
            <Label>Featured Activities</Label>
            <h2>Our main activities</h2>
            <p>
              Our activities span across meetups, events, webinars, hackathons,
              courses, newsletters, R&amp;D, and more — all designed to foster
              collaboration, innovation, and growth in Vietnam’s On-chain Hub.
            </p>
          </div>
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
                      : "/blogs"
                }
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
