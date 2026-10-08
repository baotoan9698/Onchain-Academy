"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Linkedin } from "lucide-react";
import { asset, original } from "@/lib/content";

export function SiteLogo() {
  return (
    <span className="logo" role="img" aria-label="On-chain Academy">
      <span className="logo-mark" aria-hidden="true">
        <img src={asset("logo")} alt="" />
      </span>
      <span className="logo-wordmark" aria-hidden="true">
        ON-CHAIN
        <br />
        ACADEMY
      </span>
    </span>
  );
}
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <Link href="/" aria-label="On-chain Academy home">
          <SiteLogo />
        </Link>
        <nav
          aria-label="Main navigation"
          className={open ? "navigation open" : "navigation"}
        >
          {[
            ["About Us", "/#aboutus"],
            ["Our Solutions", "/solution"],
            ["Testimonials", "/#reviews"],
            ["Adoption program", "/#activities"],
            ["Blogs", "/blogs"],
          ].map(([label, href]) => (
            <Link
              href={href}
              key={label}
              onClick={() => setOpen(false)}
              aria-current={(href === "/blogs" || href === "/solution") && pathname.startsWith(href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a href={original("/contact-us")} className="button button-dark">
            Contact Us
          </a>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
export function SiteFooter() {
  return (
    <footer>
      <div className="footer-cta">
        <Link href="/" aria-label="On-chain Academy home">
          <SiteLogo />
        </Link>
        <h2>
          Join the evolution of the economy
          <br /> today!
        </h2>
        <a href={original("/contact-us")} className="button button-dark">
          Contact Us
        </a>
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
        {[
          ["Benefits", "/#benefits"],
          ["Solutions", "/solution"],
          ["Contact", original("/contact-us")],
          ["Blogs", "/blogs"],
          ["Testimonials", "/#reviews"],
        ].map(([label, href]) => (
          <Link key={label} href={href}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="copyright">
        On-chain Academy © {new Date().getFullYear()}.
      </div>
    </footer>
  );
}
