"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMounted, useReducedMotion } from "@/hooks/use-media";

export function Loader() {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => setShow(false), reduce ? 300 : 1600);
    return () => clearTimeout(timer);
  }, [mounted, reduce]);

  useEffect(() => {
    if (!mounted || reduce) return;
    const start = performance.now();
    const duration = 900;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mounted, reduce]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          aria-hidden
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-surface shadow-[0_0_60px_-10px_var(--glow)]"
          >
            <span className="font-display text-3xl font-bold text-gradient">
              FN
            </span>
          </motion.div>
          <div className="mt-8 h-px w-48 overflow-hidden rounded bg-border">
            <div
              className="h-full bg-gradient-to-r from-accent-strong to-fuchsia transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="mt-3 font-mono text-xs text-faint">
            {String(progress).padStart(3, "0")}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
