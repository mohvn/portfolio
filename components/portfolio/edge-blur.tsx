"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

function BlurLayers() {
  return (
    <>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </>
  );
}

/**
 * Progressive edge blur — same technique as https://www.cmrg.me/
 * Banded backdrop-filter layers + soft bg gradient.
 */
export function EdgeBlur() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        aria-hidden
        className={cn(
          "blur-overlay pointer-events-none fixed top-0 left-0 z-50 h-[clamp(40px,10vh,160px)] w-full origin-bottom -translate-y-full rotate-180",
          "bg-linear-to-b from-transparent to-grayscale-1 **:transform-gpu",
        )}
      >
        <BlurLayers />
      </div>
      <div
        aria-hidden
        className={cn(
          "blur-overlay pointer-events-none fixed bottom-0 left-0 z-50 h-[clamp(40px,10vh,160px)] w-full origin-bottom",
          "bg-linear-to-b from-transparent to-grayscale-1 **:transform-gpu",
        )}
      >
        <BlurLayers />
      </div>
    </>,
    document.body,
  );
}
