import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { profile } from "@/lib/data/profile";

export function About() {
  return (
    <SectionGrid id="sobre-mi">
      <SectionHeading
        eyebrow="Sobre mí"
        title={
          <>
            Un desarrollador que une{" "}
            <span className="text-gradient">frontend, backend e IA</span>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="prose-portfolio space-y-5 text-lg">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="card-base p-6">
            <h3 className="mb-5 font-display text-lg font-semibold text-foreground">
              Datos rápidos
            </h3>
            <dl className="space-y-4">
              {profile.quickFacts.map((f) => (
                <div key={f.label} className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-wider text-faint">
                    {f.label}
                  </dt>
                  <dd className="text-sm font-medium text-foreground">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {["React", "Next.js", "FastAPI", "Node.js", "PostgreSQL", "IA"].map(
                (t) => (
                  <Badge key={t} className="text-accent-bright">
                    {t}
                  </Badge>
                )
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </SectionGrid>
  );
}
