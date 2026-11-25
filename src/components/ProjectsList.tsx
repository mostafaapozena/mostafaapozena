"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { projects } from "@/data/portfolio";
import ProjectImage from "./ProjectImage";
import Reveal from "./Reveal";

/** Full list of every project, with an image preview that follows the cursor. */
export default function ProjectsList() {
  const ref = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(0);
  const quick = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      gsap.set(preview.current, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
      quick.current = {
        x: gsap.quickTo(preview.current, "x", { duration: 0.5, ease: "power3" }),
        y: gsap.quickTo(preview.current, "y", { duration: 0.5, ease: "power3" }),
      };
    },
    { scope: ref }
  );

  const onMove = (e: React.MouseEvent) => {
    quick.current?.x(e.clientX);
    quick.current?.y(e.clientY);
  };
  const show = (i: number) => {
    setHovered(i);
    gsap.to(preview.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
  };
  const hide = () => gsap.to(preview.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power3.in" });

  return (
    <section ref={ref} className="px-6 py-32 md:px-12" onMouseMove={onMove}>
      <p className="flex items-center gap-2 text-sm uppercase tracking-[0.3em]">
        <span className="h-2 w-2 rounded-full bg-accent" /> <span className="text-accent">Projects</span> List
      </p>

      <Reveal childrenStagger stagger={0.06} className="mt-12 border-t border-line" >
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            onMouseEnter={() => show(i)}
            onMouseLeave={hide}
            className="group flex flex-col gap-2 border-b border-line py-7 transition-colors md:flex-row md:items-center md:gap-8"
          >
            <span className="font-display text-sm text-muted">{String(i + 1).padStart(2, "0")}.</span>
            <span className="font-display text-xl font-semibold transition-transform duration-500 group-hover:translate-x-4 group-hover:text-accent md:text-3xl">
              {p.title} <span className="inline-block text-base opacity-50">↗</span>
            </span>
            <span className="text-sm text-muted md:ml-auto">{p.tags.join(" · ")}</span>
          </Link>
        ))}
      </Reveal>

      <div ref={preview} className="pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/3] w-80 overflow-hidden rounded-xl md:block">
        <ProjectImage project={projects[hovered]} index={hovered} />
      </div>
    </section>
  );
}
