import { useEffect, useState } from "react";
import { List, X, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import gsap from "gsap";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.from(".nav-item", {
      opacity: 0,
      y: -14,
      duration: 0.7,
      stagger: 0.08,
      delay: 0.2,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    gsap.from(".tray-item", {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      duration: 0.5,
      stagger: 0.06,
      ease: "power3.out",
    });
  }, [open]);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="#home"
            className="nav-item text-sm font-semibold tracking-[0.25em] text-foreground uppercase"
          >
            Wasiq
          </a>

          <nav className="hidden items-center gap-1 rounded-full glass px-2 py-1.5 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-item rounded-full px-4 py-1.5 text-sm font-light text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-item hidden items-center gap-3 md:flex">
            <a
              href="https://github.com/wasiqsulaman91-hue"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full glass p-2 text-muted-foreground transition-all hover:text-ice hover:glow-ring"
            >
              <GithubLogo size={18} weight="light" />
            </a>
            <a
              href="https://www.linkedin.com/in/wasiqsulaman"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full glass p-2 text-muted-foreground transition-all hover:text-ice hover:glow-ring"
            >
              <LinkedinLogo size={18} weight="light" />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="nav-item rounded-full glass p-2.5 text-foreground md:hidden"
          >
            <List size={20} weight="light" />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-60 flex flex-col bg-background/95 backdrop-blur-2xl md:hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-50" />
          <div className="flex justify-end px-6 py-5">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="rounded-full glass p-2.5 text-foreground"
            >
              <X size={20} weight="light" />
            </button>
          </div>
          <nav className="relative flex flex-1 flex-col justify-center gap-2 px-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="tray-item border-b border-border py-5 text-3xl font-light tracking-tight text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="tray-item mt-8 flex gap-3">
              <a
                href="https://github.com/wasiqsulaman91-hue"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="rounded-full glass p-3 text-muted-foreground"
              >
                <GithubLogo size={20} weight="light" />
              </a>
              <a
                href="https://www.linkedin.com/in/wasiqsulaman"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full glass p-3 text-muted-foreground"
              >
                <LinkedinLogo size={20} weight="light" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
