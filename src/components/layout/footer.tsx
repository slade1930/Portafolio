import { Heart, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { profile } from "@/lib/data/profile";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 sm:px-8">
        <div className="flex items-center gap-2 text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-strong to-fuchsia font-display text-xs font-bold text-background">
            FN
          </span>
          <span className="font-display text-sm font-semibold">
            {profile.name}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2/60 text-muted transition-all hover:border-accent hover:text-accent-bright hover:shadow-[0_0_20px_-4px_var(--glow)]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2/60 text-muted transition-all hover:border-accent hover:text-accent-bright hover:shadow-[0_0_20px_-4px_var(--glow)]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Correo"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-2/60 text-muted transition-all hover:border-accent hover:text-accent-bright hover:shadow-[0_0_20px_-4px_var(--glow)]"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent-bright" />
            {profile.location}
          </span>
          <a
            href={siteConfig.url}
            className="text-muted transition-colors hover:text-foreground"
          >
            flinnnieto.dev
          </a>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-faint">
          Hecho con
          <Heart className="h-3.5 w-3.5 fill-fuchsia text-fuchsia" />
          por {profile.name} · {year}
        </p>
      </div>
    </footer>
  );
}
