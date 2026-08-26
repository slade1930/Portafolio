"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const go = (next: number) =>
    setIndex((next + images.length) % images.length);

  return (
    <div className="card-base overflow-hidden border-border/60">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-surface-2/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="ml-2 font-mono text-xs text-faint">
            {name.toLowerCase().replace(/\s+/g, "")}.dev
          </span>
        </div>
        <span className="font-mono text-xs text-faint">
          {index + 1} / {images.length}
        </span>
      </div>

      <div className="relative">
        <div className="relative aspect-video w-full bg-background">
          <Image
            key={images[index]}
            src={images[index]}
            alt={`Captura ${index + 1} de ${name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 64rem"
            className="object-cover object-top"
            priority={index === 0}
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Captura anterior"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Siguiente captura"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-border/60 p-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Ver captura ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border transition-all",
                i === index
                  ? "border-accent ring-1 ring-accent/60"
                  : "border-border/60 opacity-60 hover:opacity-100"
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="112px"
                className="object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
