"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GithubIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { projects, type Project } from "@/lib/data/projects";
import { cn, initials } from "@/lib/utils";

const statusColor: Record<Project["status"], string> = {
  Producción: "text-success",
  "En desarrollo": "text-cyan",
  Demo: "text-warning",
  Práctica: "text-accent-bright",
  Académico: "text-muted",
};

function Cover({ project }: { project: Project }) {
  const image = project.images?.[0];
  const count = project.images?.length ?? 0;

  if (!image) {
    return (
      <div
        className={cn(
          "relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br",
          project.accent
        )}
      >
        <div className="absolute inset-0 opacity-[0.18] grid-lines" />
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-background/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-background/15 blur-3xl" />
        <span className="relative font-display text-6xl font-bold text-background/85 drop-shadow-lg">
          {initials(project.name).slice(0, 2)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-surface-2">
      <Image
        src={image}
        alt={`Captura de ${project.name}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
      {count > 1 && (
        <span className="absolute right-3 top-3 rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur-sm">
          {count} capturas
        </span>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Reveal className="h-full">
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="card-base group flex h-full flex-col overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <Cover project={project} />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-strong to-fuchsia px-4 py-2 text-sm font-semibold text-background">
              Ver detalles
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex items-center justify-between gap-2">
            <Badge className="text-accent-bright">{project.category}</Badge>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium",
                statusColor[project.status]
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {project.status}
            </span>
          </div>

          <h3 className="mb-2 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-accent-bright">
            {project.name}
          </h3>
          <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-surface-2/60 px-2 py-1 text-[11px] text-faint"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="rounded-md px-2 py-1 text-[11px] text-faint">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <span className="font-mono text-xs text-faint">{project.year}</span>
            <div className="flex items-center gap-2">
              <Link
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Repositorio de ${project.name}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent-bright"
              >
                <GithubIcon className="h-4 w-4" />
              </Link>
              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Ver detalles de ${project.name}`}
                className="inline-flex h-9 items-center rounded-full bg-surface-2 px-4 text-xs font-semibold text-foreground transition-all hover:bg-gradient-to-r hover:from-accent-strong hover:to-fuchsia hover:text-background"
              >
                Detalles
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <SectionGrid id="proyectos">
      <SectionHeading
        eyebrow="Portafolio"
        title={
          <>
            Proyectos que <span className="text-gradient">demuestran</span>{" "}
            el trabajo
          </>
        }
        description="Desde plataformas de IA con RAG hasta sistemas empresariales y análisis numérico. Cada proyecto con su análisis técnico completo."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </SectionGrid>
  );
}
