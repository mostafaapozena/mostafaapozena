"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis, LOADED_EVENT } from "@/lib/scroll";
import { profile } from "@/data/portfolio";

export default function Preloader() {
  const ref = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      document.documentElement.classList.add("is-loading");
      getLenis()?.stop();
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("is-loading");
          getLenis()?.start();
          window.dispatchEvent(new Event(LOADED_EVENT));
          setDone(true);
        },
      });
      tl.from(".pl-char", { yPercent: 120, stagger: 0.04, duration: 0.9, ease: "power4.out" })
        .to(counter, {
          v: 100,
          duration: 1.8,
          ease: "power2.inOut",
          onUpdate: () => {
            const n = ref.current?.querySelector(".pl-count");
            if (n) n.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0)
        .to(".pl-bar", { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0)
        .to(".pl-char", { yPercent: -120, stagger: 0.03, duration: 0.6, ease: "power3.in" })
        .to(".pl-meta", { opacity: 0, duration: 0.3 }, "<")
        .to(ref.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.1");
    },
    { scope: ref }
  );

  if (done) return null;
  const name = `${profile.firstName} ${profile.lastName}`;
  return (
    <div
      ref={ref}
      style={{ clipPath: "inset(0 0 0% 0)" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-loader text-fg"
    >
      <h1 className="overflow-hidden font-display text-3xl font-bold uppercase tracking-wide md:text-5xl">
        {name.split("").map((c, i) => (
          <span key={i} className="pl-char inline-block whitespace-pre">
            {c}
          </span>
        ))}
      </h1>
      <div className="pl-meta absolute bottom-10 left-6 right-6 flex items-end justify-between gap-6 md:left-12 md:right-12">
        <span className="text-xs uppercase tracking-[0.3em] text-fg/60">Loading portfolio</span>
        <div className="mx-6 hidden h-px flex-1 bg-fg/15 md:block">
          <div className="pl-bar h-px origin-left scale-x-0 bg-fg" />
        </div>
        <span className="pl-count font-display text-5xl font-bold tabular-nums md:text-7xl">000</span>
      </div>
    </div>
  );
}
