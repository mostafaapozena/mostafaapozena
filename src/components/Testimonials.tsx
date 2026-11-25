"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/data/portfolio";
import SectionTitle from "./SectionTitle";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-[300px] shrink-0 rounded-2xl border border-line bg-surface p-6 md:w-[380px]">
      <p className="text-accent">★★★★★</p>
      <blockquote className="mt-4 text-fg/80">&ldquo;{t.quote}&rdquo;</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 font-display font-bold text-accent">{t.name[0]}</span>
        <span>
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".marquee").forEach((m, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const tween = gsap.fromTo(m, { xPercent: dir === -1 ? 0 : -50 }, { xPercent: dir === -1 ? -50 : 0, duration: 40, ease: "none", repeat: -1 });
        m.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 }));
        m.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
      });
    },
    { scope: ref }
  );

  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials, [...testimonials.slice(half), ...testimonials.slice(0, half)]];

  return (
    <section id="testimonials" ref={ref} className="overflow-hidden py-32">
      <div className="px-6 text-center md:px-12">
        <SectionTitle text="Kind words from" accent="clients" className="[&_h2]:text-4xl md:[&_h2]:text-6xl" />
      </div>
      <div className="mt-16 space-y-6">
        {rows.map((row, r) => (
          <div key={r} className="marquee flex w-max gap-6 pr-6">
            {[...row, ...row].map((t, i) => (
              <Card key={i} t={t} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
