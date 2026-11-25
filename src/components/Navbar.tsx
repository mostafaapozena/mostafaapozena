"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/scroll";
import { navLinks, profile } from "@/data/portfolio";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const isHome = usePathname() === "/";

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const hide = y > last && y > 200;
      gsap.to(ref.current, { yPercent: hide ? -110 : 0, duration: 0.5, ease: "power3.out" });
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    if (!isHome) return; // let the link navigate to /#section
    e.preventDefault();
    scrollToTarget(href);
  };

  return (
    <>
      <header ref={ref} className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <nav className="flex items-start justify-between px-6 py-6 md:px-12">
          <Link href="/" className="leading-tight" onClick={(e) => go(e, "#top")}>
            <span className="block font-display text-sm font-bold uppercase tracking-wider">
              {profile.firstName} {profile.lastName}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-fg/60">{profile.availability}</span>
          </Link>
          <ul className="hidden gap-8 text-sm md:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={isHome ? l.href : `/${l.href}`} onClick={(e) => go(e, l.href)} className="link-underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className={`h-px w-6 bg-fg transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-fg transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-bg px-8 transition-[clip-path] duration-700 ease-[cubic-bezier(.77,0,.18,1)] md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]"
        }`}
      >
        {navLinks.map((l) => (
          <a key={l.href} href={isHome ? l.href : `/${l.href}`} onClick={(e) => go(e, l.href)} className="font-display text-5xl font-bold uppercase">
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
