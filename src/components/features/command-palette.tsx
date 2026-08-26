"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Download,
  FileText,
  Globe,
  Mail,
  MessageSquare,
  Rocket,
  User,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/data/projects";
import { profile } from "@/lib/data/profile";

const sections = [
  { label: "Inicio", href: "#inicio", icon: ArrowDown },
  { label: "Sobre mí", href: "#sobre-mi", icon: User },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Proyectos", href: "#proyectos", icon: Rocket },
  { label: "Experiencia", href: "#experiencia", icon: FileText },
  { label: "GitHub", href: "#github", icon: GithubIcon },
  { label: "Contacto", href: "#contacto", icon: MessageSquare },
];

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const go = (href: string) => {
    onClose();
    setQuery("");
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      router.push(href);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_24px_80px_-24px_rgba(0,0,0,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              label="Paleta de comandos"
              className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-faint [&_[cmdk-item]]:px-4 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item]]:text-sm [&_[cmdk-item]]:text-muted [&_[cmdk-item][data-selected=true]]:bg-surface-2 [&_[cmdk-item][data-selected=true]]:text-foreground"
            >
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <Command className="h-4 w-4 text-faint" />
                <Command.Input
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-faint"
                  placeholder="Buscar secciones, proyectos, enlaces…"
                  value={query}
                  onValueChange={setQuery}
                  autoFocus
                />
              </div>

              <Command.List className="max-h-80 overflow-y-auto py-2">
                <Command.Empty className="px-4 py-8 text-center text-sm text-faint">
                  Sin resultados para «{query}»
                </Command.Empty>

                <Command.Group heading="Secciones">
                  {sections.map(({ label, href, icon: Icon }) => (
                    <Command.Item
                      key={href}
                      value={`seccion-${label}`}
                      onSelect={() => go(href)}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Proyectos">
                  {projects.map((p) => (
                    <Command.Item
                      key={p.slug}
                      value={`proyecto-${p.name}`}
                      onSelect={() => go(`/projects/${p.slug}`)}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Globe className="h-4 w-4" />
                      {p.name}
                      <span className="ml-auto text-xs text-faint">{p.category}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="Enlaces">
                  <Command.Item
                    value="github"
                    onSelect={() => window.open(profile.github, "_blank")}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <GithubIcon className="h-4 w-4" /> GitHub
                  </Command.Item>
                  <Command.Item
                    value="linkedin"
                    onSelect={() => window.open(profile.linkedin, "_blank")}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <LinkedinIcon className="h-4 w-4" /> LinkedIn
                  </Command.Item>
                  <Command.Item
                    value="correo"
                    onSelect={() => window.open(`mailto:${profile.email}`)}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Mail className="h-4 w-4" /> Enviar correo
                  </Command.Item>
                  <Command.Item
                    value="cv"
                    onSelect={() => window.open(profile.resume, "_blank")}
                    className="flex cursor-pointer items-center gap-3"
                  >
                    <Download className="h-4 w-4" /> Descargar CV
                  </Command.Item>
                </Command.Group>
              </Command.List>

              <div className="border-t border-border px-4 py-2.5 text-[11px] text-faint">
                <span className="mr-4">↑↓ navegar</span>
                <span className="mr-4">↵ seleccionar</span>
                <span>esc cerrar</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
