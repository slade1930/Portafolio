"use client";

import {
  Calendar,
  Clock,
  Cpu,
  Layers,
  Rocket,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { useCountUp, useInView } from "@/hooks/use-animation";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { stats, type Stat } from "@/lib/data/stats";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  Github: GithubIcon,
  Layers,
  Rocket,
  Calendar,
  Clock,
  Cpu,
};

function Counter({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix?: string;
  start: boolean;
}) {
  const count = useCountUp(value, 1600, start);
  return (
    <span className="font-display text-4xl font-bold text-gradient sm:text-5xl">
      {count.toLocaleString("es")}
      {suffix}
    </span>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  const Icon = icons[stat.icon] ?? Layers;
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      className="card-base card-hover flex h-full flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <Icon className="h-5 w-5 text-accent-bright" />
      <Counter value={stat.value} suffix={stat.suffix} start={inView} />
      <p className="text-xs leading-snug text-muted">{stat.label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <SectionGrid>
      <SectionHeading
        eyebrow="Números"
        title={
          <>
            Cifras que respaldan el <span className="text-gradient">trabajo</span>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <StatCard stat={s} />
          </Reveal>
        ))}
      </div>
    </SectionGrid>
  );
}
