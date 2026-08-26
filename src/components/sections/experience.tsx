import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { experiences } from "@/lib/data/experience";

export function Experience() {
  return (
    <SectionGrid id="experiencia">
      <SectionHeading
        eyebrow="Trayectoria"
        title={
          <>
            Experiencia <span className="text-gradient">profesional</span>
          </>
        }
      />

      <div className="relative mx-auto max-w-3xl space-y-8">
        <div
          aria-hidden
          className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-strong via-fuchsia/50 to-transparent sm:left-[23px]"
        />
        {experiences.map((exp, i) => (
          <Reveal key={exp.role} delay={i * 0.1}>
            <article className="relative pl-14 sm:pl-16">
              <span className="absolute left-0 top-1.5 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface shadow-[0_0_20px_-6px_var(--glow)] sm:h-12 sm:w-12">
                <span className="h-2.5 w-2.5 rounded-full bg-accent glow-dot" />
              </span>

              <div className="card-base group p-6">
                <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {exp.role}
                  </h3>
                  {exp.current && (
                    <Badge className="border-success/30 text-success">
                      Actual
                    </Badge>
                  )}
                </div>
                <p className="mb-1 text-sm font-medium text-accent-bright">
                  {exp.company}
                </p>
                <p className="mb-4 font-mono text-xs text-faint">{exp.period}</p>
                <p className="mb-4 text-sm leading-relaxed text-muted">
                  {exp.summary}
                </p>
                <ul className="mb-5 grid gap-2 sm:grid-cols-2">
                  {exp.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionGrid>
  );
}
