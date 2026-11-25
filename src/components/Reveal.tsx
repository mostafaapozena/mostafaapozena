"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  stagger?: number;
  /** animate direct children one by one instead of the wrapper */
  childrenStagger?: boolean;
};

export default function Reveal({ children, className, y = 60, delay = 0, stagger = 0.1, childrenStagger }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current!;
      const targets = childrenStagger ? Array.from(el.children) : el;
      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 1.1,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
