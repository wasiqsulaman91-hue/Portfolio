import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".footer-inner",
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: "footer", start: "top 92%" },
        },
      );
      gsap.to(".particle", {
        y: -26,
        opacity: 0.9,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: { each: 0.25, from: "random" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-border py-14">
      <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-orb -bottom-32 left-1/2 h-72 w-72 -translate-x-1/2 bg-glow/20" />
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="particle absolute h-1 w-1 rounded-full bg-ice/60"
            style={{
              left: `${(i * 37) % 97}%`,
              top: `${(i * 53) % 88}%`,
              opacity: 0.3,
              boxShadow: "0 0 10px var(--glow)",
            }}
          />
        ))}
      </div>

      <div className="footer-inner relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="text-sm font-semibold tracking-[0.25em] uppercase">Wasiq</p>
          <p className="mt-2 text-xs font-light text-muted-foreground">
            Agentic AI Engineer · Building autonomous systems
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-light text-muted-foreground transition-colors hover:text-ice"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          <a
            href="https://github.com/wasiqsulaman91-hue"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full glass p-2.5 text-muted-foreground transition-all hover:text-ice hover:glow-ring"
          >
            <GithubLogo size={18} weight="light" />
          </a>
          <a
            href="https://www.linkedin.com/in/wasiqsulaman"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full glass p-2.5 text-muted-foreground transition-all hover:text-ice hover:glow-ring"
          >
            <LinkedinLogo size={18} weight="light" />
          </a>
        </div>
      </div>
    </footer>
  );
}
