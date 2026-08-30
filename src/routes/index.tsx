import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Toaster } from "@/components/ui/sonner";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wasiq — Agentic AI Engineer & Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Wasiq, an agentic AI engineer building autonomous agents, AI workflows, data architecture, and production-grade full-stack systems.",
      },
      { property: "og:title", content: "Wasiq — Agentic AI Engineer" },
      {
        property: "og:description",
        content:
          "Autonomous agents, AI workflows, and production systems — selected work by Wasiq, agentic AI engineer.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let scroll: { destroy: () => void } | null = null;
    let cancelled = false;

    (async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const mod = await import("locomotive-scroll");
      if (cancelled) return;
      const LocomotiveScroll = mod.default;
      scroll = new LocomotiveScroll({ lenisOptions: { lerp: 0.09, wheelMultiplier: 1 } });
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      scroll?.destroy();
    };
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    const tl = gsap.fromTo(
      ".site-main",
      { opacity: 0, filter: "blur(8px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1, ease: "power2.out" },
    );
    ScrollTrigger.refresh();
    return () => {
      tl.kill();
    };
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="site-main relative min-h-screen bg-background" style={{ opacity: loading ? 0 : 1 }}>
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
}