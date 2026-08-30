import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Buildings, Certificate, ArrowUpRight } from "@phosphor-icons/react";
import senariosLogo from "@/assets/senarios-logo.png";
import photoCert from "@/assets/Photo.pdf";
import wasiqCert from "@/assets/wasiq.pdf";

const experiences = [
  {
    company: "Senarios Pvt Ltd",
    role: "ML / AI Intern",
    duration: "2 months",
    dates: "6 June 2026 – 5 August 2026",
    description:
      "Completed a hands-on AI/ML internship at Senarios Pvt. Ltd., building and evaluating machine-learning pipelines, deploying model prototypes, and turning real datasets into actionable AI features.",
  },
];

const certificates = [
  {
    title: "Internship Completion Letter",
    issuer: "Senarios Pvt. Ltd.",
    date: "18th August 2026",
    file: photoCert,
    label: "View letter",
  },
  {
    title: "Certificate of Internship Completion",
    issuer: "Senarios Pvt. Ltd.",
    date: "18th August 2026",
    file: wasiqCert,
    label: "View certificate",
  },
];

export function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".experience-head > *", {
        opacity: 0,
        y: 40,
        filter: "blur(10px)",
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#experience", start: "top 80%" },
      });
    });

    const cards = gsap.utils.toArray<HTMLElement>(".experience-card, .certificate-card");
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.96 });
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
    <section id="experience" className="relative overflow-hidden py-28 sm:py-36">
      <div className="glow-orb glow-orb-float bottom-1/3 -right-24 h-72 w-72 bg-glow/15" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="experience-head max-w-2xl">
          <p className="text-[11px] font-light tracking-[0.35em] text-muted-foreground uppercase">
            Experience
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Where I&apos;ve <span className="text-gradient">worked</span>
          </h2>
          <p className="mt-5 leading-relaxed font-light text-muted-foreground">
            Hands-on internships shaping real AI products and production-grade workflows.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="experience-card group relative overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:glow-ring"
            >
              <div className="relative p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-secondary/60">
                      <img
                        src={senariosLogo}
                        alt="Senarios logo"
                        className="h-8 w-8 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{exp.company}</h3>
                      <p className="text-sm font-light text-muted-foreground">{exp.role}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ice/15 bg-secondary/40 px-3 py-1 text-[11px] font-light tracking-wide text-muted-foreground">
                    <Calendar size={12} weight="light" />
                    {exp.duration}
                  </span>
                </div>

                <p className="mt-6 leading-relaxed font-light text-muted-foreground">
                  {exp.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] font-light tracking-wide text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Buildings size={14} weight="light" />
                    {exp.company}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={14} weight="light" />
                    {exp.dates}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24">
          <div className="experience-head max-w-2xl">
            <p className="text-[11px] font-light tracking-[0.35em] text-muted-foreground uppercase">
              Credentials
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Certificates & <span className="text-gradient">verification</span>
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {certificates.map((cert) => (
              <a
                key={cert.title}
                href={cert.file}
                target="_blank"
                rel="noreferrer"
                className="certificate-card group relative flex flex-col overflow-hidden rounded-3xl glass transition-all duration-500 hover:-translate-y-2 hover:glow-ring"
              >
                <div className="relative p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/60 text-ice">
                      <Certificate size={24} weight="light" />
                    </div>
                    <span className="rounded-full glass p-2 text-ice opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:glow-ring">
                      <ArrowUpRight size={16} weight="light" />
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight">{cert.title}</h3>
                  <p className="mt-2 text-sm font-light text-muted-foreground">{cert.issuer}</p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-light tracking-wide text-muted-foreground">
                      <Calendar size={12} weight="light" />
                      {cert.date}
                    </span>
                    <span className="text-xs font-light tracking-wide text-ice transition-colors group-hover:text-foreground">
                      {cert.label}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
