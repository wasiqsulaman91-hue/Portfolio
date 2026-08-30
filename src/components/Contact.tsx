import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubLogo, LinkedinLogo, PaperPlaneTilt } from "@phosphor-icons/react";
import { toast } from "sonner";

export function Contact() {
  const btn = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".contact-head > *", {
        opacity: 0,
        y: 36,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#contact", start: "top 80%" },
      });
      gsap.from(".contact-field", {
        opacity: 0,
        x: -60,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
      });
    });
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    gsap.fromTo(
      btn.current,
      { scale: 1 },
      { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" },
    );
    toast.success("Message sent — I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const field =
    "w-full rounded-2xl glass px-4 py-3.5 text-sm font-light text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-ice/40 focus:glow-ring";

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="glow-orb glow-orb-float bottom-0 left-1/4 h-80 w-80 bg-violet/20" />
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="contact-head">
          <p className="text-[11px] font-light tracking-[0.35em] text-muted-foreground uppercase">
            Contact
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Let&apos;s build something <span className="text-gradient">autonomous</span>
          </h2>
          <p className="mt-6 max-w-md leading-relaxed font-light text-muted-foreground">
            Have an agent, pipeline, or product idea? Send a note and I&apos;ll reply with how
            I&apos;d approach it.
          </p>
          <div className="mt-10 flex gap-3">
            <a
              href="https://github.com/wasiqsulaman91-hue"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-2xl glass p-3.5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-ice hover:glow-ring"
            >
              <GithubLogo size={22} weight="light" />
            </a>
            <a
              href="https://www.linkedin.com/in/wasiqsulaman"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-2xl glass p-3.5 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:text-ice hover:glow-ring"
            >
              <LinkedinLogo size={22} weight="light" />
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="contact-form flex flex-col gap-4">
          <div className="contact-field">
            <label htmlFor="name" className="mb-2 block text-xs font-light tracking-wider">
              Name
            </label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className={field}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="email" className="mb-2 block text-xs font-light tracking-wider">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@domain.com"
              className={field}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="message" className="mb-2 block text-xs font-light tracking-wider">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="What are you building?"
              className={`${field} resize-none`}
            />
          </div>
          <button
            ref={btn}
            type="submit"
            className="contact-submit pulse-glow mt-2 inline-flex items-center justify-center gap-2 rounded-2xl violet-fill px-6 py-4 text-sm font-semibold tracking-wide text-primary-foreground transition-transform duration-300 hover:scale-[1.02]"
          >
            Send message
            <PaperPlaneTilt size={18} weight="light" />
          </button>
        </form>
      </div>
    </section>
  );
}
