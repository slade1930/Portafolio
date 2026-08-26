"use client";

import { useEffect, useState } from "react";
import { BackToTop } from "@/components/layout/back-to-top";
import { CustomCursor } from "@/components/layout/custom-cursor";
import { Loader } from "@/components/layout/loader";
import { Navbar } from "@/components/layout/navbar";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CommandPalette } from "@/components/features/command-palette";
import { Particles } from "@/components/features/particles";
import { SmoothScroll } from "@/components/features/smooth-scroll";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      } else if (e.key === "Escape") {
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <Loader />
      <SmoothScroll />
      <Particles />
      <CustomCursor />
      <ScrollProgress />
      <div className="noise" aria-hidden />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <main className="relative z-10 flex-1">{children}</main>
      <BackToTop />
    </>
  );
}
