"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/features/theme-toggle";
import { LinkButton } from "@/components/ui/button";

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const ids = siteConfig.nav.map((n) => n.href.replace("#", ""));
  const active = useScrollSpy(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled
            ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]"
            : "border border-transparent bg-transparent"
        )}
        aria-label="Navegación principal"
      >
        <a
          href="#inicio"
          className="flex items-center gap-2.5 text-foreground"
          aria-label="Flinn Nieto, inicio"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-strong to-fuchsia font-display text-sm font-bold text-background shadow-[0_0_20px_-4px_var(--glow)]">
            FN
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-tight sm:block">
            Flinn Nieto
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-2 border border-border"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            aria-label="Abrir paleta de comandos (Ctrl K)"
            className="hidden h-11 items-center gap-2 rounded-full border border-border bg-surface-2/70 px-3 text-xs text-faint transition-colors hover:border-border-strong hover:text-muted sm:flex"
          >
            <Command className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">Comandos</span>
            <kbd className="hidden rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted lg:inline">
              Ctrl K
            </kbd>
          </button>
          <ThemeToggle />
          <LinkButton
            href={siteConfig.cvFile}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Descargar CV
          </LinkButton>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-2/70 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass-strong absolute top-[76px] w-[calc(100%-2rem)] max-w-6xl rounded-2xl p-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <LinkButton
                  href={siteConfig.cvFile}
                  size="sm"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Descargar CV
                </LinkButton>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
