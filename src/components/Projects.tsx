import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import p1 from "@/assets/project-1.png";
import p2 from "@/assets/project-2.png";
import p3 from "@/assets/project-3.png";
import p4 from "@/assets/project-4.png";
import p5 from "@/assets/project-5.png";
import p6 from "@/assets/project-6.jfif";

const projects = [
  {
    img: p1,
    title: "Vertex Job Portal",
    desc: "Dual-role hiring platform with applicant tracking, instant apply, and an admin review console.",
    stack: ["React", "Supabase", "Auth"],
  },
  {
    img: p2,
    title: "Noodle of Doom",
    desc: "Retro terminal-style arcade snake with dynamic speed scaling and a live scoreboard HUD.",
    stack: ["Canvas", "TypeScript", "Game Loop"],
  },
  {
    img: p3,
    title: "Social Network Analyzer",
    desc: "Graph engine that maps friendships, mutual connections, and people-you-may-know suggestions.",
    stack: ["Python", "Graphs", "Tkinter"],
  },
  {
    img: p4,
    title: "Library Management System",
    desc: "Campus-scale catalog with issue/return cycles, fine tracking, and role-based access.",
    stack: ["Python", "SQL", "Desktop"],
  },
  {
    img: p5,
    title: "Voice AI Ordering Agent",
    desc: "Realtime voice agent that takes restaurant orders, recommends items, and syncs a live menu.",
    stack: ["Realtime API", "LLM", "WebRTC"],
  },
  {
    img: p6,
    title: "Code Claw Machine",
    desc: "Cardboard arcade claw driven by Arduino servos and a Python control loop over serial.",
    stack: ["Arduino", "Python", "Hardware"],
  },
];

export function Projects() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".projects-head > *", {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#projects", start: "top 80%" },
      });
    });

    // Cards use IntersectionObserver so they always reveal, regardless of
    // smooth-scroll hijacking or ScrollTrigger refresh timing.
    const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    gsap.set(cards, { opacity: 0, y: 60, scale: 0.94 });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          const idx = cards.indexOf(entry.target as HTMLElement);
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: Math.max(idx, 0) * 0.12,
            ease: "power3.out",
          });
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    cards.forEach((c) => io.observe(c));

    // Safety: never leave an on-screen card hidden.
    const bail = window.setTimeout(() => {
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const onScreen = r.top < window.innerHeight && r.bottom > 0;
        if (onScreen && Number(getComputedStyle(c).opacity) < 1) {
          gsap.to(c, { opacity: 1, y: 0, scale: 1, duration: 0.6, overwrite: "auto" });
        }
      });
    }, 6000);

    return () => {
      window.clearTimeout(bail);
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" className="relative overflow-hidden py-28 sm:py-36">
      <div className="glow-orb glow-orb-float top-10 right-0 h-80 w-80 bg-glow/15" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="projects-head max-w-2xl">
          <p className="text-[11px] font-light tracking-[0.35em] text-muted-foreground uppercase">
            Projects
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Selected <span className="text-gradient">work</span>
          </h2>
          <p className="mt-5 leading-relaxed font-light text-muted-foreground">
            Six builds spanning agentic AI, full-stack platforms, graph systems, and hardware.
          </p>
        </div>
      </div>

      <div className="project-rail mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-[max(1.5rem,calc((100vw-80rem)/2))] [&::-webkit-scrollbar]:hidden">
        {projects.map((p) => (
          <article
            key={p.title}
            className="project-card group relative w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:glow-ring sm:w-[62vw] lg:w-[30rem]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.img}
                alt={`${p.title} project screenshot`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
            </div>

            <div className="relative p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                <span className="rounded-full glass p-2 text-ice opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:glow-ring">
                  <ArrowUpRight size={16} weight="light" />
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground">
                {p.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ice/15 bg-secondary/40 px-3 py-1 text-[11px] font-light tracking-wide text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mx-auto max-w-7xl px-6 text-[11px] font-light tracking-[0.25em] text-muted-foreground uppercase">
        Swipe / scroll horizontally
      </p>
    </section>
  );
}