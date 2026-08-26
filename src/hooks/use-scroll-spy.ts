"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120): string | null {
  const [active, setActive] = useState<string | null>(null);
  const ticking = useRef(false);
  const activeRef = useRef<string | null>(null);
  const idsKey = ids.join("|");

  useEffect(() => {
    const currentIds = idsKey.split("|");
    const compute = () => {
      ticking.current = false;
      let current: string | null = null;
      for (const id of currentIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = id;
      }
      if (current !== activeRef.current) {
        activeRef.current = current;
        setActive(current);
      }
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(compute);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    compute();
    return () => window.removeEventListener("scroll", onScroll);
  }, [idsKey, offset]);

  return active;
}
