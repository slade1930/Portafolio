import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { ProjectGallery } from "@/components/ui/project-gallery";
import { Reveal } from "@/components/ui/reveal";
import { getProject, projects } from "@/lib/data/projects";
import { siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };
  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      type: "article",
      locale: "es_PA",
      url: `${siteConfig.url}/projects/${project.slug}`,
      title: `${project.name} — ${project.category}`,
      description: project.tagline,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${project.category}`,
      description: project.tagline,
    },
  };
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-base border-border/60 p-6 sm:p-8">
      <h3 className="mb-4 inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div className="relative">
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[420px] -z-10 bg-gradient-to-b to-transparent opacity-20 blur-2xl",
          project.accent
        )}
      />

      <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Reveal>
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a proyectos
          </Link>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge className="border-accent/40 text-accent-bright">
              {project.category}
            </Badge>
            <Badge>{project.status}</Badge>
            <Badge>{project.year}</Badge>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h1
            className={cn(
              "mt-6 bg-gradient-to-r bg-clip-text font-display text-4xl font-bold tracking-tight text-transparent sm:text-6xl",
              project.accent
            )}
          >
            {project.name}
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <LinkButton
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              size="md"
              variant="secondary"
            >
              <GithubIcon className="h-4 w-4" />
              Código fuente
            </LinkButton>
            {project.live ? (
              <LinkButton
                href={project.live}
                target="_blank"
                rel="noreferrer"
                size="md"
              >
                <ExternalLink className="h-4 w-4" />
                Ver demo
              </LinkButton>
            ) : null}
          </div>
        </Reveal>

        {project.images && project.images.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-12">
              <ProjectGallery images={project.images} name={project.name} />
            </div>
          </Reveal>
        )}

        <div className="mt-16 grid gap-6">
          <Reveal delay={0.05}>
            <Block title="Descripción">{project.description}</Block>
          </Reveal>
          <Reveal delay={0.1}>
            <Block title="Problema que resuelve">{project.problem}</Block>
          </Reveal>
          <Reveal delay={0.15}>
            <Block title="Arquitectura">{project.architecture}</Block>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-base border-border/60 p-6 sm:p-8">
              <h3 className="mb-5 inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
                Características
              </h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-base border-border/60 p-6 sm:p-8">
              <h3 className="mb-5 inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
                Stack tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface-2/70 px-3.5 py-1.5 text-xs font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Block title="Retos y desafíos">
              <ul className="space-y-3">
                {project.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fuchsia" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>

          <Reveal delay={0.1}>
            <Block title="Aprendizajes">
              <ul className="space-y-3">
                {project.learnings.map((learning) => (
                  <li key={learning} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                    {learning}
                  </li>
                ))}
              </ul>
            </Block>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border/60 pt-10 sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group inline-flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted">
                  Anterior
                </span>
                {prev.name}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group inline-flex items-center gap-3 text-right text-sm text-muted transition-colors hover:text-foreground"
            >
              <span>
                <span className="block text-xs uppercase tracking-widest text-muted">
                  Siguiente
                </span>
                {next.name}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
