"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import SplitText from "./SplitText";

/** Big heading: the words reveal char by char; `accent` words are tinted. */
export default function SectionTitle({ text, accent, eyebrow, className = "" }: { text: string; accent?: string; eyebrow?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(".char", {
        yPercent: 110,
        rotate: 6,
        duration: 1,
        ease: "power4.out",
        stagger: 0.025,
        scrollTrigger: { trigger: ref.current, start: "top 85%" },
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {eyebrow && (
        <p className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" /> {eyebrow}
        </p>
      )}
      <h2 className="font-display text-5xl font-bold uppercase leading-[0.95] md:text-7xl lg:text-8xl">
        <SplitText text={text} />
        {accent && (
          <>
            {" "}
            <SplitText text={accent} className="text-accent" />
          </>
        )}
      </h2>
    </div>
  );
}
