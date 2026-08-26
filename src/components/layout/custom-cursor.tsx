"use client";

import { useEffect, useState } from "react";
import { usePrefersFinePointer } from "@/hooks/use-media";

export function CustomCursor() {
  const fine = usePrefersFinePointer();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");

    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;

    let tx = -100;
    let ty = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx - 3.5}px, ${ty - 3.5}px)`;
      if (!raf) {
        raf = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      raf = 0;
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      ring.style.transform = `translate(${rx - 17}px, ${ry - 17}px)`;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-cursor]");
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [fine]);

  if (!fine) return null;

  return (
    <>
      <div className="cursor-dot" aria-hidden />
      <div className={`cursor-ring ${hovering ? "is-hover" : ""}`} aria-hidden />
    </>
  );
}
