"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/data/portfolio";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".svc-body", { height: 0 });
      gsap.set(".svc-body-0", { height: "auto" });
    },
    { scope: ref }
  );

  const toggle = contextSafe((i: number) => {
    const next = active === i ? -1 : i;
    gsap.to(".svc-body", { height: 0, duration: 0.6, ease: "power3.inOut" });
    if (next >= 0) gsap.to(`.svc-body-${next}`, { height: "auto", duration: 0.6, ease: "power3.inOut" });
    setActive(next);
  });

  return (
    <section id="services" ref={ref} className="relative px-6 py-32 md:px-12">
      <div className="grid gap-10 md:grid-cols-2">
        <SectionTitle text="What I" accent="Do /" />
        <Reveal className="self-end text-muted md:max-w-md md:justify-self-end">
          <p>User-friendly interfaces don&apos;t happen by chance. They are built with intention: I craft intuitive, responsive solutions that make your users&apos; journey effortless.</p>
        </Reveal>
      </div>

      <Reveal childrenStagger className="mt-20 border-t border-line">
        {services.map((s, i) => (
          <div key={s.title} className="border-b border-line">
            <button onClick={() => toggle(i)} className="group flex w-full items-center gap-6 py-8 text-left">
              <span className="font-display text-lg text-muted">({String(i + 1).padStart(2, "0")})</span>
              <span className={`font-display text-2xl font-semibold transition md:text-4xl ${active === i ? "text-fg" : "text-fg/60 group-hover:text-fg"}`}>{s.title}</span>
              <span className={`ml-auto text-2xl transition-transform duration-500 ${active === i ? "rotate-45 text-accent" : ""}`}>+</span>
            </button>
            <div className={`svc-body svc-body-${i} overflow-hidden`}>
              <div className="grid gap-6 pb-10 md:grid-cols-2 md:pl-20">
                <p className="max-w-md text-muted">{s.description}</p>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
