import { useEffect, useState } from "react";
import gsap from "gsap";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" })
      .fromTo(
        ".hero-line",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(".hero-sub", { opacity: 0, y: 30, filter: "blur(8px)", duration: 0.9 }, "-=0.6")
      .from(".hero-scroll", { opacity: 0, y: 20, duration: 0.7 }, "-=0.5")
      .from(".hero-spline", { opacity: 0, x: 120, duration: 1.4, ease: "power2.out" }, 0.2);

    gsap.to(".glow-orb-float", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.6,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_75%)]" />
      <div className="starfield pointer-events-none absolute inset-0 opacity-70" />

      <div className="glow-orb glow-orb-float top-[18%] left-[8%] h-56 w-56 bg-violet/30" />
      <div className="glow-orb glow-orb-float bottom-[12%] left-[38%] h-72 w-72 bg-glow/20" />
      <div className="glow-orb glow-orb-float top-[8%] right-[12%] h-64 w-64 bg-ice/15" />

      {/* Spline 3D orb — full-bleed background (hidden until loaded so no white flash) */}
      <div className="hero-spline pointer-events-none absolute inset-0 -z-10 bg-background">
        <div
          className={`relative h-full w-full transition-opacity duration-1000 ${
            splineLoaded ? "opacity-70 md:opacity-100" : "opacity-0"
          }`}
        >
          <iframe
            src="https://my.spline.design/orb-xRaYTE8TZM8LUOMekrWAvInu/"
            title="3D orb"
            frameBorder="0"
            width="100%"
            height="100%"
            onLoad={() => setSplineLoaded(true)}
            className="pointer-events-none h-full w-full bg-background"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 pb-20">
        <div className="max-w-2xl">
          <p className="hero-eyebrow inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[11px] font-light tracking-[0.28em] text-muted-foreground uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[var(--shadow-glow)]" />
            Available for agentic AI work
          </p>

          <h1 className="mt-7 text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            <span className="hero-line block text-foreground">Hi, I&apos;m Wasiq</span>
            <span className="hero-line text-gradient block">Agentic AI Engineer</span>
          </h1>

          <p className="hero-sub mt-7 max-w-lg text-base leading-relaxed font-light text-muted-foreground sm:text-lg">
            I design autonomous agents, orchestrate multi-step AI workflows, and ship production
            systems where models, data, and APIs move as one.
          </p>

          <div className="hero-scroll mt-14 flex items-center gap-3 text-xs font-light tracking-[0.3em] text-muted-foreground uppercase">
            <ArrowDown size={16} weight="light" className="animate-bounce" />
            Scroll to explore
          </div>
        </div>
      </div>
    </section>
  );
}
