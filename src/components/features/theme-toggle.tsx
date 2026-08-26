"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-media";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-2/70 text-foreground transition-colors hover:border-border-strong"
    >
      {mounted ? (
        <span className="relative block h-4 w-4">
          <Sun
            className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
              dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
            }`}
          />
          <Moon
            className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
              dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </span>
      ) : (
        <span className="h-4 w-4 rounded-full bg-border" />
      )}
    </button>
  );
}
