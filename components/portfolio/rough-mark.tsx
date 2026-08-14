"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";

export function RoughMark({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let annotation: RoughAnnotation | undefined;
    let observer: IntersectionObserver | undefined;
    let shown = false;

    const show = () => {
      if (shown || !el.isConnected) return;
      shown = true;
      annotation = annotate(el, {
        type: "underline",
        color: "color-mix(in srgb, #f97316 28%, transparent)",
        strokeWidth: 1.5,
        padding: [0, 1],
        iterations: 3,
        multiline: true,
        animationDuration: reduced ? 0 : 600,
      });
      annotation.show();
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer?.disconnect();
      annotation?.remove();
    };
  }, []);

  return (
    <span ref={ref} className="text-grayscale-12">
      {children}
    </span>
  );
}
