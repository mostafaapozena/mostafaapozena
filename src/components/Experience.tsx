"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { experience } from "@/data/portfolio";
import SectionTitle from "./SectionTitle";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(".exp-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".exp-list", start: "top 70%", end: "bottom 60%", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".exp-anim"), {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        });
        gsap.fromTo(item.querySelector(".exp-dot"), { scale: 0 }, { scale: 1, duration: 0.5, ease: "back.out(3)", scrollTrigger: { trigger: item, start: "top 65%" } });
      });
    },
    { scope: ref }
  );

  return (
    <section id="experience" ref={ref} className="px-6 py-32 md:px-12">
      <SectionTitle eyebrow="Career" text="Experience" />
      <div className="exp-list relative mt-20">
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-1/2">
          <div className="exp-line h-full w-full origin-top bg-accent" />
        </div>
        {experience.map((e) => (
          <div key={e.role + e.period} className="exp-item relative grid gap-4 pb-20 pl-10 md:grid-cols-2 md:gap-24 md:pl-0">
            <span className="exp-dot absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2" />
            <div className="md:text-right">
              <h3 className="exp-anim font-display text-2xl font-semibold md:text-3xl">{e.role}</h3>
              <p className="exp-anim text-muted">{e.company}</p>
            </div>
            <div>
              <p className="exp-anim font-display text-xl text-accent">{e.period}</p>
              <p className="exp-anim mt-3 max-w-md text-muted">{e.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
