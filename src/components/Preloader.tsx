import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setHidden(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline();

    tl.fromTo(
      ".preloader-letter",
      { opacity: 0, y: 70, rotateX: -80, filter: "blur(16px)" },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
      },
    )
      .fromTo(
        ".preloader-letter",
        { textShadow: "0 0 0px rgba(140,170,255,0)" },
        {
          textShadow: "0 0 28px rgba(140,170,255,0.55)",
          duration: 0.7,
          stagger: 0.05,
          ease: "sine.inOut",
        },
        "-=0.5",
      )
      .from(".preloader-sub", { opacity: 0, y: 12, letterSpacing: "0.9em", duration: 0.8, ease: "power3.out" }, "-=0.6")
      .fromTo(
        ".progress-bar",
        { width: "0%" },
        { width: "100%", duration: 2, ease: "power2.out" },
        "-=0.4",
      )
      .to(
        counter,
        {
          v: 100,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => setPct(Math.round(counter.v)),
        },
        "<",
      )
      .to(".progress-shell", { opacity: 0, duration: 0.5, ease: "power2.out" })
      .to(
        ".preloader",
        {
          opacity: 0,
          scale: 0.9,
          filter: "blur(12px)",
          duration: 1,
          ease: "power2.inOut",
          onComplete: finish,
        },
        "-=0.2",
      );

    // Safety net: never trap the visitor on the loader.
    const bail = window.setTimeout(() => {
      tl.progress(1);
      finish();
    }, 9000);

    return () => {
      window.clearTimeout(bail);
      tl.kill();
    };
  }, [finish]);

  if (hidden) return null;

  return (
    <div className="preloader fixed inset-0 z-100 flex flex-col items-center justify-center bg-background">
      <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-orb -top-20 left-1/2 h-[420px] w-[420px] -translate-x-1/2 bg-glow/25" />
      <div className="relative flex flex-col items-center px-6" style={{ perspective: "600px" }}>
        <h1
          aria-label="Wasiq"
          className="text-6xl font-extrabold tracking-tight sm:text-8xl"
          style={{ transformStyle: "preserve-3d" }}
        >
          {"Wasiq".split("").map((c, i) => (
            <span
              key={i}
              className="preloader-letter text-gradient inline-block will-change-transform"
            >
              {c}
            </span>
          ))}
        </h1>
        <p className="preloader-sub mt-4 text-xs font-light tracking-[0.4em] text-muted-foreground uppercase">
          Agentic AI Engineer
        </p>

        <div className="progress-shell mt-14 w-[70vw] max-w-md">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
            <div className="progress-bar h-full w-0 rounded-full bg-gradient-to-r from-violet to-ice shadow-[var(--shadow-glow)]" />
          </div>
          <div className="mt-3 flex justify-between text-[11px] font-light tracking-widest text-muted-foreground">
            <span>LOADING</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
