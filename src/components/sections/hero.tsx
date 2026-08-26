"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Mail,
  MousePointer2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { LinkButton } from "@/components/ui/button";
import { RevealText } from "@/components/ui/reveal";
import { profile } from "@/lib/data/profile";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong/20 blur-[140px] animate-pulse-glow" />
        <div className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-fuchsia/10 blur-[100px]" />
        <div className="absolute left-[8%] bottom-[15%] h-72 w-72 rounded-full bg-cyan/10 blur-[110px]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <div className="mb-6 flex items-center gap-2 rounded-full border border-border bg-surface-2/70 px-4 py-1.5 text-xs font-medium text-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Disponible para proyectos freelance
          </div>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          className="relative mb-6"
        >
          <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-accent-strong to-fuchsia opacity-30 blur-2xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-border-strong bg-surface shadow-[0_0_50px_-8px_var(--glow)] animate-float">
            <span className="font-display text-4xl font-bold text-gradient">
              {profile.initials}
            </span>
          </div>
        </motion.div>

        <motion.p
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="mb-3 font-mono text-sm tracking-[0.3em] text-accent-bright uppercase"
        >
          {profile.role}
        </motion.p>

        <h1 className="hero-name max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-7xl md:text-8xl">
          <RevealText text="Hola, soy" />
          <br />
          <RevealText
            text="Flinn Nieto"
            className="text-gradient"
            delay={0.15}
          />
        </h1>

        <motion.p
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.headline}
        </motion.p>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <LinkButton href="#proyectos" size="lg">
            Ver proyectos
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href={profile.resume} size="lg" variant="secondary">
            <Download className="h-4 w-4" />
            Descargar CV
          </LinkButton>
          <LinkButton
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="ghost"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </LinkButton>
          <LinkButton
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            size="lg"
            variant="ghost"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </LinkButton>
          <LinkButton href="#contacto" size="lg" variant="ghost">
            <Mail className="h-4 w-4" />
            Contacto
          </LinkButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-faint"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.span
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <MousePointer2 className="h-4 w-4 rotate-90" />
        </motion.span>
        <ArrowDown className="h-3 w-3" />
      </motion.div>
    </section>
  );
}
