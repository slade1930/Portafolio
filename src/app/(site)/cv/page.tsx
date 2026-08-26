import type { Metadata } from "next";
import { Download } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";
import { education } from "@/lib/data/education";
import { experiences as experience } from "@/lib/data/experience";
import { profile } from "@/lib/data/profile";
import { skillCategories } from "@/lib/data/skills";

export const metadata: Metadata = {
  title: "Currículum",
  description: "Currículum vitae de Flinn Nieto — Full Stack Developer.",
};

export default function CvPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mb-8 hidden justify-between sm:flex print:hidden">
        <LinkButton href={profile.resume} target="_blank" size="md">
          <Download className="h-4 w-4" />
          Descargar PDF
        </LinkButton>
        <span className="text-xs text-muted">
          Versión imprimible · Ctrl/Cmd + P
        </span>
      </div>

      <article className="rounded-3xl border border-border bg-surface-1 p-8 shadow-xl print:rounded-none print:border-0 print:p-0 print:shadow-none sm:p-12">
        <header className="border-b border-border pb-8 print:pb-6">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-accent-bright">
            {profile.role}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {profile.headline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
            <li>{profile.location}</li>
            <li>
              <a href={`mailto:${profile.email}`} className="hover:text-foreground">
                {profile.email}
              </a>
            </li>
            <li>{profile.phone}</li>
            <li>
              github.com/{profile.githubUser}
            </li>
            <li>linkedin.com/in/flinn-nieto</li>
          </ul>
        </header>

        <section className="mt-8 space-y-8">
          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
              Sobre mí
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              {profile.about[0]} {profile.about[1]}
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
              Experiencia
            </h2>
            <div className="space-y-5">
              {experience.map((job) => (
                <div key={job.period}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-sm font-semibold text-foreground">
                      {job.role} · {job.company}
                    </h3>
                    <span className="text-xs text-muted">{job.period}</span>
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
              Habilidades
            </h2>
            <div className="space-y-3">
              {skillCategories.map((cat) => (
                <div key={cat.title} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                  <span className="font-medium text-foreground">
                    {cat.title}:
                  </span>
                  <span className="text-muted">
                    {cat.skills.map((s) => s.name).join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
              Proyectos destacados
            </h2>
            <div className="space-y-4">
              {projects.slice(0, 5).map((p) => (
                <div key={p.slug}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-sm font-semibold text-foreground">
                      {p.name}
                      <span className="ml-2 font-normal text-muted">
                        {p.tagline}
                      </span>
                    </h3>
                    <span className="text-xs text-muted">{p.year}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {p.description}
                  </p>
                  <p className="mt-1.5 text-xs text-accent-bright">
                    {p.tech.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-foreground">
              Educación
            </h2>
            <div className="space-y-4">
              {education.map((e) => (
                <div key={e.degree}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="text-sm font-semibold text-foreground">
                      {e.degree}
                    </h3>
                    <span className="text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted">{e.institution}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {e.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
