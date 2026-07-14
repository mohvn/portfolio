"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Portfolio } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { FlickeringGrid } from "@/components/ui/flicker";

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

export function FeaturedCard({ portfolio }: { portfolio: Portfolio }) {
  const { featured } = portfolio;
  const isDark = useIsDark();

  return (
    <a
      href={featured.href}
      aria-label={`${featured.label} Empreender`}
      className="group relative flex min-h-48 w-full overflow-hidden rounded-[13px] border border-grayscale-3 bg-grayscale-1 small-shadow transition-colors hover:border-grayscale-4 focus-visible:outline-2 focus-visible:outline-grayscale-12 focus-visible:outline-offset-2 dark:border-grayscale-4 dark:bg-grayscale-3 dark:hover:border-grayscale-5"
    >
      <FlickeringGrid
        className="absolute inset-0 opacity-20"
        color={isDark ? "rgb(180, 180, 180)" : "rgb(100, 100, 100)"}
        maxOpacity={0.35}
        flickerChance={0.3}
        squareSize={4}
        gridGap={6}
      />

      <div className="relative z-10 flex min-h-full w-full flex-col items-center justify-center gap-px p-8 text-center uppercase leading-none text-grayscale-12">
        <span className="mb-2 text-xs font-medium leading-none text-grayscale-8 transition-colors group-hover:text-grayscale-9">
          {featured.label}
        </span>
        <Image
          src={withBasePath("/empreender.svg")}
          alt="Empreender"
          width={167}
          height={25}
          className="h-6 w-auto invert transition-opacity group-hover:opacity-90 dark:invert-0"
        />
      </div>
    </a>
  );
}
