"use client";

import { AsciiOcean } from "@/lib/ascii-sharks/react";
import type { SharkSpec } from "@/lib/ascii-sharks/world";

const SHARKS: SharkSpec[] = [
  { kind: "thresher", size: 1 },
  { kind: "hammerhead", size: 0.9 },
  { kind: "mako", size: 0.8 },
  { kind: "nurse", size: 0.7 },
];

export function FooterSection() {
  return (
    <footer aria-hidden className="relative mt-10 w-full overflow-hidden bg-background">
      <div className="relative h-[50svh] min-h-[16rem] w-full overflow-hidden font-mono">
        <div className="absolute inset-x-0 top-0 h-[100svh]">
          <AsciiOcean className="block h-full w-full bg-background" sharks={SHARKS} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
      </div>
    </footer>
  );
}

export default FooterSection;
