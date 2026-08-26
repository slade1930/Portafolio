import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { timeline } from "@/lib/data/stats";

export function Timeline() {
  return (
    <SectionGrid>
      <SectionHeading
        eyebrow="Evolución"
        title={
          <>
            El recorrido de <span className="text-gradient">crecimiento</span>
          </>
        }
        description="Cómo cada etapa sumó a mi formación como desarrollador full stack."
      />

      <div className="relative mx-auto max-w-4xl">
        <div
          aria-hidden
          className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-accent-strong via-fuchsia/40 to-transparent sm:left-1/2 sm:-translate-x-px"
        />
        <div className="space-y-10">
          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <Reveal key={item.title} delay={0.05}>
                <div
                  className={`relative flex flex-col gap-3 pl-14 sm:w-1/2 sm:pl-0 ${
                    left
                      ? "sm:pr-12 sm:text-right"
                      : "sm:ml-auto sm:pl-12"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-[30px] flex h-6 w-6 items-center justify-center rounded-full border border-accent/40 bg-surface shadow-[0_0_16px_-2px_var(--glow)] sm:left-auto ${
                      left
                        ? "sm:-right-3"
                        : "sm:-left-3"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-xs text-faint">
                    {item.year}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SectionGrid>
  );
}
