"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionGrid, SectionHeading } from "@/components/ui/section";
import { profile } from "@/lib/data/profile";
import { cn } from "@/lib/utils";

interface FormState {
  nombre: string;
  email: string;
  mensaje: string;
}

const initial: FormState = { nombre: "", email: "", mensaje: "" };

export function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const next: Partial<FormState> = {};
    if (form.nombre.trim().length < 2) next.nombre = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Correo no válido.";
    if (form.mensaje.trim().length < 10)
      next.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nCorreo: ${form.email}\n\n${form.mensaje}`
    );
    const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Contacto desde el portafolio — ${form.nombre}`
    )}&body=${body}`;
    window.location.href = mailto;
    setSending(false);
    setSent(true);
    setForm(initial);
    setTimeout(() => setSent(false), 5000);
  };

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-xl border bg-surface-2/50 px-4 py-3 text-sm text-foreground placeholder:text-faint transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--ring)]",
      hasError ? "border-danger/60" : "border-border focus:border-border-strong"
    );

  return (
    <SectionGrid id="contacto">
      <SectionHeading
        eyebrow="Contacto"
        title={
          <>
            ¿Trabajemos <span className="text-gradient">juntos</span>?
          </>
        }
        description="Cuéntame sobre tu proyecto: tengo disponibilidad para colaboraciones freelance y oportunidades remotas."
      />

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="card-base flex h-full flex-col justify-between p-6">
            <div>
              <h3 className="mb-3 font-display text-xl font-semibold text-foreground">
                Información de contacto
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted">
                ¿Prefieres escribirme directamente? Aquí están todas las vías.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: Mail, label: "Correo", value: profile.email, href: `mailto:${profile.email}` },
                  { icon: MessageCircle, label: "WhatsApp", value: profile.phone, href: profile.whatsapp },
                  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/flinn-nieto", href: profile.linkedin },
                  { icon: GithubIcon, label: "GitHub", value: "github.com/slade1930", href: profile.github },
                ].map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/40 p-3.5 transition-colors hover:border-border-strong"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-strong to-fuchsia text-background">
                        <c.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-xs text-faint">{c.label}</span>
                        <span className="text-sm font-medium text-foreground">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-xs text-faint">
              Ubicado en {profile.location} · Zona horaria GMT-5
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="card-base p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre" className="mb-1.5 block text-sm font-medium text-foreground">
                  Nombre
                </label>
                <input
                  id="nombre"
                  value={form.nombre}
                  onChange={set("nombre")}
                  placeholder="Tu nombre"
                  className={inputClass(Boolean(errors.nombre))}
                  autoComplete="name"
                />
                {errors.nombre && (
                  <p className="mt-1 text-xs text-danger">{errors.nombre}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Correo
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="tu@correo.com"
                  className={inputClass(Boolean(errors.email))}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-danger">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="mensaje" className="mb-1.5 block text-sm font-medium text-foreground">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                value={form.mensaje}
                onChange={set("mensaje")}
                rows={6}
                placeholder="Cuéntame sobre tu proyecto…"
                className={cn(inputClass(Boolean(errors.mensaje)), "resize-none")}
              />
              {errors.mensaje && (
                <p className="mt-1 text-xs text-danger">{errors.mensaje}</p>
              )}
            </div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-4"
              initial={false}
              animate={sent ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Button type="submit" size="lg" disabled={sending}>
                {sending ? "Enviando…" : (
                  <>
                    Enviar mensaje
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
              {sent && (
                <span className="inline-flex items-center gap-2 text-sm font-medium text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  ¡Gracias! Se abrió tu cliente de correo.
                </span>
              )}
            </motion.div>
          </form>
        </Reveal>
      </div>
    </SectionGrid>
  );
}
