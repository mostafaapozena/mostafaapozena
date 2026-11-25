"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/portfolio";
import ProjectImage from "./ProjectImage";
import Reveal from "./Reveal";

export default function FeaturedProjects() {
  const ref = useRef<HTMLElement>(null);
  const featured = projects.filter((p) => p.featured);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".fp-card");
      cards.forEach((card, i) => {
        // shrink & dim each card while the next one slides over it
        if (i < cards.length - 1) {
          gsap.to(card.querySelector(".fp-inner"), {
            scale: 0.88,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: { trigger: cards[i + 1], start: "top bottom", end: "top top", scrub: true },
          });
        }
        gsap.from(card.querySelector(".fp-num"), { yPercent: 100, opacity: 0, duration: 1.2, ease: "power4.out", scrollTrigger: { trigger: card, start: "top 60%" } });
        gsap.fromTo(card.querySelector(".fp-img"), { clipPath: "inset(15% 15% 15% 15%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true } });
        gsap.fromTo(card.querySelector(".fp-img-inner"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: ref }
  );

  return (
    <section id="projects" ref={ref} className="relative">
      <div className="flex flex-col items-center px-6 pb-16 pt-32 text-center md:px-12">
        <Reveal>
          <p className="font-display text-6xl font-light text-muted md:text-8xl">({featured.length})</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase md:text-6xl">Featured Work</h2>
          <p className="mx-auto mt-4 max-w-md text-muted">Selected client projects, crafted with passion and purpose.</p>
        </Reveal>
      </div>

      {featured.map((p, i) => (
        <div key={p.slug} className="fp-card sticky top-0 flex h-[100svh] items-center px-6 md:px-12">
          <div className="fp-inner grid w-full origin-top items-center gap-8 rounded-3xl border border-line bg-surface p-6 md:grid-cols-[auto_1fr] md:gap-14 md:p-12">
            <div className="overflow-hidden">
              <p className="fp-num font-display text-[28vw] font-bold leading-none md:text-[14vw]">{String(i + 1).padStart(2, "0")}.</p>
            </div>
            <div>
              <Link href={`/projects/${p.slug}`} data-cursor className="fp-img block aspect-[16/10] overflow-hidden rounded-2xl">
                <div className="fp-img-inner h-full w-full">
                  <ProjectImage project={p} index={i} />
                </div>
              </Link>
              <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted">
                    {p.category} · {p.year}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold uppercase md:text-3xl">{p.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
