"use client";

import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
}) {
  return (
    <div id={id} className="mx-auto mb-14 max-w-2xl scroll-mt-28 text-center">
      <Reveal>
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
          <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p className="mt-4 text-base text-muted sm:text-lg">{description}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function SectionGrid({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${className ?? ""}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}
