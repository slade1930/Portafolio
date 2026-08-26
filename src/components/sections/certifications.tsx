import { Award, Brain, GraduationCap, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { certifications, education, languages } from "@/lib/data/education";
import { cn } from "@/lib/utils";

export function CertificationsEducationLanguages() {
  return (
    <SectionGrid>
      <SectionHeading
        eyebrow="Formación"
        title={
          <>
            Educación y <span className="text-gradient">certificaciones</span>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Reveal>
          <div className="card-base h-full p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-fuchsia text-background">
                <Brain className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Certificaciones
              </h3>
            </div>
            {certifications.map((c) => (
              <div
                key={c.title}
                className="rounded-xl border border-border bg-surface-2/50 p-4"
              >
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h4 className="font-medium text-foreground">{c.title}</h4>
                  <span className="shrink-0 font-mono text-xs text-faint">
                    {c.year}
                  </span>
                </div>
                <p className="mb-3 text-xs font-medium text-accent-bright">
                  {c.issuer}
                </p>
                <p className="text-sm leading-relaxed text-muted">{c.description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card-base h-full p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 text-background">
                <GraduationCap className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Educación
              </h3>
            </div>
            <div className="space-y-4">
              {education.map((e) => (
                <div
                  key={e.institution}
                  className="relative rounded-xl border border-border bg-surface-2/50 p-4"
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-foreground">
                      <Award className="h-3.5 w-3.5 text-warning" />
                      {e.institution}
                    </span>
                    <span className="font-mono text-xs text-faint">
                      {e.period}
                    </span>
                  </div>
                  <h4 className="mb-2 font-medium text-foreground">{e.degree}</h4>
                  <p className="text-sm leading-relaxed text-muted">
                    {e.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="card-base h-full p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-amber-400 text-background">
                <Languages className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Idiomas
              </h3>
            </div>
            <div className="space-y-6">
              {languages.map((l) => (
                <div key={l.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">
                      {l.name}
                    </span>
                    <Badge className="text-accent-bright">{l.level}</Badge>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={cn(
                        "h-full rounded-full bg-gradient-to-r from-accent-strong to-fuchsia transition-all duration-1000",
                        l.name === "Español" && "w-full"
                      )}
                      style={{
                        width:
                          l.name === "Español" ? "100%" : `${l.proficiency}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionGrid>
  );
}
