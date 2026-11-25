"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LOADED_EVENT, scrollToTarget } from "@/lib/scroll";
import { profile } from "@/data/portfolio";
import SplitText from "./SplitText";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({ paused: true });
      intro
        .from(".hero-bg", { scale: 1.25, opacity: 0, duration: 2, ease: "expo.out" })
        .from(".hero-name .char", { yPercent: 120, duration: 1.2, stagger: 0.04, ease: "power4.out" }, 0.1)
        .fromTo(".hero-sign", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power2.inOut" }, 0.5)
        .from(".hero-fade", { y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, 0.7);

      const play = () => intro.play();
      // if the preloader already finished (e.g. client navigation), play now
      if (!document.documentElement.classList.contains("is-loading") && !document.querySelector(".pl-char")) play();
      else window.addEventListener(LOADED_EVENT, play, { once: true });

      // scroll parallax
      gsap.to(".hero-bg", { yPercent: 25, scale: 1.1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-content", { yPercent: -30, opacity: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });

      // floating orbs
      gsap.utils.toArray<HTMLElement>(".orb").forEach((o, i) => {
        gsap.to(o, { x: "random(-80, 80)", y: "random(-60, 60)", duration: 6 + i * 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });

      return () => window.removeEventListener(LOADED_EVENT, play);
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Background: replace with an image of yours by adding <img src="/hero.jpg" /> inside .hero-bg */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,#2a1650_0%,#0d0a18_55%,#07060c_100%)]" />
        <div className="orb absolute left-[18%] top-[30%] h-72 w-72 rounded-full bg-accent/40 blur-[110px]" />
        <div className="orb absolute right-[12%] top-[15%] h-96 w-96 rounded-full bg-fuchsia-600/25 blur-[130px]" />
        <div className="orb absolute bottom-[5%] left-[45%] h-80 w-80 rounded-full bg-indigo-500/25 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--color-bg))]" />
      </div>

      <div className="hero-content relative z-10 flex h-full flex-col justify-center px-6 md:px-12">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
          <p className="hero-sign order-2 font-sign text-6xl text-fg/90 md:order-1 md:text-8xl">{profile.signature}</p>
          <div className="order-1 md:order-2 md:text-right">
            <h1 className="hero-name font-display text-[17vw] font-bold uppercase leading-[0.85] tracking-tight md:text-[9vw]">
              <SplitText text={profile.firstName} />
              <br />
              <SplitText text={profile.lastName} />
            </h1>
            <div className="mt-6 md:ml-auto md:max-w-xs">
              <p className="hero-fade flex items-center gap-2 text-sm md:justify-end">
                <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                {profile.role}
              </p>
              <p className="hero-fade text-sm text-muted">{profile.location}</p>
              {profile.cvUrl && (<a
                href={profile.cvUrl}
                className="hero-fade mt-6 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-accent"
              >
                Download CV <span aria-hidden>↓</span>
              </a>)}
            </div>
          </div>
        </div>

        <div className="hero-fade absolute bottom-8 left-6 flex gap-5 text-xs uppercase tracking-widest text-muted md:left-12">
          {profile.socials.slice(0, 3).map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline hover:text-fg">
              {s.label}
            </a>
          ))}
        </div>
        <button
          onClick={() => scrollToTarget("#services")}
          className="hero-fade absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-fg/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollLine_1.6s_ease-in-out_infinite] bg-fg" />
          </span>
        </button>
      </div>
    </section>
  );
}
