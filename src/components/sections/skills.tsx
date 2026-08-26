"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import {
  skillCategories,
  skillLevels,
  type SkillLevel,
} from "@/lib/data/skills";
import { cn } from "@/lib/utils";

const levelDot: Record<SkillLevel, string> = {
  avanzado: "bg-success",
  intermedio: "bg-warning",
  aprendiendo: "bg-accent",
};

export function Skills() {
  return (
    <SectionGrid id="skills">
      <SectionHeading
        eyebrow="Stack tecnológico"
        title={
          <>
            Tecnologías que <span className="text-gradient">domino</span>
          </>
        }
        description="Organizado por categorías y clasificado por nivel de dominio real, sin porcentajes inflados."
      />

      <Reveal className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm">
        <span className="inline-flex items-center gap-2 text-muted">
          <span className="h-2 w-2 rounded-full bg-success" />
          {skillLevels.avanzado}
        </span>
        <span className="inline-flex items-center gap-2 text-muted">
          <span className="h-2 w-2 rounded-full bg-warning" />
          {skillLevels.intermedio}
        </span>
        <span className="inline-flex items-center gap-2 text-muted">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {skillLevels.aprendiendo}
        </span>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, i) => (
          <Reveal key={cat.title} delay={(i % 3) * 0.08}>
            <SpotlightCard className="group h-full p-6">
              <div
                className={cn(
                  "mb-4 inline-flex rounded-xl bg-gradient-to-br p-2.5 text-background",
                  cat.accent
                )}
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 2 3 7v10l9 5 9-5V7z" />
                  <path d="M12 22V12" />
                  <path d="M3 7l9 5 9-5" />
                </svg>
              </div>

              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {cat.title}
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-muted">
                {cat.description}
              </p>

              <ul className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.li
                    key={skill.name}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    <span
                      className={cn("h-1.5 w-1.5 rounded-full", levelDot[skill.level])}
                      title={skillLevels[skill.level]}
                    />
                    {skill.name}
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </SectionGrid>
  );
}
