"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { profile } from "@/data/portfolio";
import SplitText from "./SplitText";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ct-title .char", { yPercent: 120, stagger: 0.02, duration: 1, ease: "power4.out", scrollTrigger: { trigger: ".ct-title", start: "top 80%" } });
      gsap.from(".ct-fade", { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".ct-title", start: "top 70%" } });

      // giant name marquee whose speed & direction follow the scroll
      const track = ref.current!.querySelector(".ct-marquee")!;
      const loop = gsap.to(track, { xPercent: -50, duration: 30, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
          gsap.to(loop, { timeScale: v === 0 ? 1 : v, duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: self.direction, duration: 1.2, delay: 0.3 });
        },
      });
    },
    { scope: ref }
  );

  const name = `${profile.firstName} ${profile.lastName} — `;

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-6 pb-10 pt-40 md:px-12">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none overflow-hidden">
        <div className="ct-marquee flex w-max whitespace-nowrap font-display text-[22vw] font-bold uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.08)]">
          <span>{name.repeat(2)}</span>
          <span>{name.repeat(2)}</span>
        </div>
      </div>

      <div className="relative grid gap-16 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <p className="ct-fade mb-6 flex items-center gap-2 text-sm uppercase tracking-[0.3em]">
            <span className="h-2 w-2 rounded-full bg-accent" /> Get in <span className="text-accent">touch</span>
          </p>
          <h2 className="ct-title font-display text-6xl font-bold uppercase leading-[0.9] md:text-8xl lg:text-9xl">
            <SplitText text="Let's build" />
            <br />
            <SplitText text="the future." className="text-accent" />
          </h2>
        </div>
        <div className="space-y-6">
          <p className="ct-fade text-muted">Have a project in mind or just want to say hi? My inbox is always open.</p>
          <a href={`mailto:${profile.email}`} className="ct-fade block font-display text-2xl link-underline md:text-3xl">{profile.email}</a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="ct-fade block text-muted hover:text-fg">{profile.phone}</a>
          <a href={`mailto:${profile.email}`} className="ct-fade inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-violet-500">
            Send message <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <footer className="relative mt-40 flex flex-col gap-6 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {profile.year} {profile.firstName} {profile.lastName}. All rights reserved.</p>
        <div className="flex flex-wrap gap-6">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline hover:text-fg">{s.label}</a>
          ))}
        </div>
      </footer>
    </section>
  );
}
