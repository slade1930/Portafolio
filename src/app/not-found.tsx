import { ArrowLeft } from "lucide-react";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-accent/10 blur-[130px]" />
      </div>

      <p className="font-display text-7xl font-bold text-gradient sm:text-9xl">
        404
      </p>
      <h1 className="mt-6 font-display text-2xl font-bold text-foreground sm:text-3xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-muted">
        El enlace que seguiste parece no existir. Vuelve al inicio para seguir
        explorando el portafolio.
      </p>

      <LinkButton href="/" size="lg" className="mt-10">
        <ArrowLeft className="h-4 w-4" />
        Volver al inicio
      </LinkButton>
      <span className="mt-16 text-xs text-muted">
        Flinn Nieto — Full Stack Developer
      </span>
    </div>
  );
}
