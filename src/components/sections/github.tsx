import { CalendarDays, GitFork, Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { fetchGithubData } from "@/lib/github";
import { formatDate } from "@/lib/utils";

export const revalidate = 86400;

export async function GitHubSection() {
  const data = await fetchGithubData();
  const topRepos = data.repos.slice(0, 8);
  const maxCommits = Math.max(
    1,
    ...data.commitActivity.map((w) => w.total)
  );
  const totalLang =
    data.languages.reduce((acc, l) => acc + l.count, 0) || 1;

  return (
    <SectionGrid id="github">
      <SectionHeading
        eyebrow="GitHub"
        title={
          <>
            Código en <span className="text-gradient">GitHub</span>
          </>
        }
        description="Datos reales de mi cuenta pública, actualizados automáticamente cada 24 horas."
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Reveal>
          <div className="card-base flex flex-col items-center gap-4 p-8 text-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-accent-strong to-fuchsia opacity-40 blur-lg" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.user.avatarUrl}
                alt={`Avatar de ${data.user.login}`}
                width={88}
                height={88}
                className="relative rounded-full border-2 border-border-strong"
              />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">
                @{data.user.login}
              </h3>
              <p className="text-sm text-muted">Cuenta pública</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-2">
              {[
                { label: "Repos", value: data.user.publicRepos },
                { label: "Seguidores", value: data.user.followers },
                { label: "Siguiendo", value: data.user.following },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-border bg-surface-2/60 p-3"
                >
                  <p className="font-display text-xl font-bold text-foreground">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-faint">{s.label}</p>
                </div>
              ))}
            </div>
            <a
              href={data.user.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-strong to-fuchsia px-4 py-2.5 text-sm font-semibold text-background transition-all hover:brightness-110"
            >
              Visitar perfil
            </a>
            <p className="text-[11px] text-faint">
              Sincronizado:{" "}
              {data.fetchedAt === "offline"
                ? "modo offline"
                : formatDate(data.fetchedAt)}
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          <Reveal delay={0.05}>
            <div className="card-base p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Actividad de commits (últimas 16 semanas)
                </h3>
                <Badge className="text-accent-bright">
                  {data.totalCommits.toLocaleString("es")} commits
                </Badge>
              </div>
              {data.commitActivity.length > 0 ? (
                <div className="flex h-32 items-end gap-1.5">
                  {data.commitActivity.map((w) => (
                    <div key={w.week} className="group flex flex-1 flex-col items-center gap-1">
                      <span className="text-[10px] text-faint opacity-0 transition-opacity group-hover:opacity-100">
                        {w.total}
                      </span>
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-accent-strong to-fuchsia transition-all group-hover:brightness-125"
                        style={{
                          height: `${Math.max(6, (w.total / maxCommits) * 100)}%`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-10 text-center text-sm text-faint">
                  Sin datos de actividad disponibles.
                </p>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-base p-6">
              <h3 className="mb-5 font-display text-lg font-semibold text-foreground">
                Lenguajes más usados
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.languages.map((l) => (
                  <span
                    key={l.name}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3 py-1.5 text-sm"
                  >
                    <span className="font-medium text-foreground">{l.name}</span>
                    <span className="text-xs text-faint">
                      {Math.round((l.count / totalLang) * 100)}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-4 sm:grid-cols-2">
              {topRepos.map((repo) => (
                <Link
                  key={repo.id}
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="card-base card-hover group flex h-full flex-col p-5"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h4 className="truncate font-mono text-sm font-semibold text-foreground">
                      {repo.name}
                    </h4>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-faint">
                      <Star className="h-3.5 w-3.5 text-warning" />
                      {repo.stars}
                    </span>
                  </div>
                  <p className="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-muted">
                    {repo.description ?? "Sin descripción"}
                  </p>
                  <div className="flex items-center justify-between text-xs text-faint">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {repo.language ?? "—"}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" />
                        {repo.forks}
                      </span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(repo.updatedAt)}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </SectionGrid>
  );
}
