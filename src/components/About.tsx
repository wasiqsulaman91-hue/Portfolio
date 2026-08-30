import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Brain, GitBranch, Database, PlugsConnected, Sparkle } from "@phosphor-icons/react";
import profile from "@/assets/profile.jfif";

const skills = [
  { icon: Code, label: "Python" },
  { icon: Brain, label: "ML / AI" },
  { icon: GitBranch, label: "Agentic Workflow" },
  { icon: Database, label: "Database Architecture" },
  { icon: PlugsConnected, label: "API Handling" },
  { icon: Sparkle, label: "LLM Tooling" },
];

export function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-section",
        { opacity: 0, filter: "blur(12px)", y: 40 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "#about", start: "top 78%" },
        },
      );
      gsap.from(".about-image", {
        opacity: 0,
        x: -80,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "#about", start: "top 75%" },
      });
    });
    // Skill chips reveal via IntersectionObserver for reliability.
    const chips = gsap.utils.toArray<HTMLElement>(".skill-chip");
    gsap.set(chips, { opacity: 0, y: 30, filter: "blur(8px)" });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const idx = chips.indexOf(entry.target as HTMLElement);
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            delay: Math.max(idx, 0) * 0.09,
            ease: "power3.out",
          });
        });
      },
      { threshold: 0.15 },
    );
    chips.forEach((c) => io.observe(c));
    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section id="about" className="relative overflow-hidden py-28 sm:py-36">
      <div className="glow-orb glow-orb-float top-1/3 -left-24 h-72 w-72 bg-violet/20" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="about-section grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div className="about-image group relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
            <div className="absolute -inset-6 rounded-full violet-fill opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-50" />
            <div className="relative aspect-square overflow-hidden rounded-full border border-ice/20 p-[3px] transition-transform duration-500 ease-out group-hover:-translate-y-3 group-hover:rotate-3">
              <div className="h-full w-full overflow-hidden rounded-full glow-ring">
                <img
                  src={profile}
                  alt="Portrait of Wasiq, Agentic AI Engineer"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-light tracking-[0.35em] text-muted-foreground uppercase">
              About
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Building systems that <span className="text-gradient">think and act</span>
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed font-light text-muted-foreground">
              I&apos;m a Computer Engineering student focused on agentic AI — reasoning loops, tool use, retrieval, and
              memory wired into real products. From data models and API layers to evaluation and
              deployment, I build the whole path from prompt to production.
            </p>

            <div className="skill-grid mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {skills.map((s) => (
                <div
                  key={s.label}
                  className="skill-chip group/chip flex flex-col gap-3 rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-1 hover:glow-ring"
                >
                  <s.icon
                    size={26}
                    weight="light"
                    className="text-ice transition-transform duration-300 group-hover/chip:scale-110"
                  />
                  <span className="text-sm font-light text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
