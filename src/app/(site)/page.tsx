import type { Metadata } from "next";
import { About } from "@/components/sections/about";
import { CertificationsEducationLanguages } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { GitHubSection } from "@/components/sections/github";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Stats } from "@/components/sections/stats";
import { Timeline } from "@/components/sections/timeline";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.role}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[12%] top-[18%] h-80 w-80 rounded-full bg-accent-strong/10 blur-[130px]" />
        <div className="absolute right-[8%] top-[55%] h-72 w-72 rounded-full bg-fuchsia/10 blur-[120px]" />
        <div className="absolute bottom-[8%] left-[30%] h-80 w-80 rounded-full bg-cyan/10 blur-[140px]" />
      </div>

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Timeline />
      <Stats />
      <GitHubSection />
      <CertificationsEducationLanguages />
      <Contact />

      <Footer />
    </>
  );
}
