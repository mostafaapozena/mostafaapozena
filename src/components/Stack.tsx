"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack } from "@/data/portfolio";

export default function Stack() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stack-row").forEach((row) => {
        gsap.from(row.querySelectorAll(".chip"), {
          y: 30,
          opacity: 0,
          scale: 0.8,
          stagger: 0.05,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="px-6 py-32 md:px-12">
      <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em]">
        <span className="h-2 w-2 rounded-full bg-accent" /> My <span className="text-accent">Stack</span>
      </p>
      <div className="mt-12 border-t border-line">
        {stack.map((g) => (
          <div key={g.group} className="stack-row grid gap-6 border-b border-line py-10 md:grid-cols-[220px_1fr]">
            <h3 className="font-display text-xl uppercase text-muted">{g.group}</h3>
            <div className="flex flex-wrap gap-3">
              {g.items.map((t) => (
                <span key={t} className="chip rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:border-accent hover:text-accent">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
