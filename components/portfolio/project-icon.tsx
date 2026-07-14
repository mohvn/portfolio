"use client";

import { useState } from "react";
import { getFaviconUrl } from "@/lib/favicon";
import { cn } from "@/lib/utils";
import type { IconColor } from "@/lib/portfolio-shared";

const iconColors: Record<IconColor, string> = {
  teal: "text-teal-9",
  blue: "text-blue-9",
  orange: "text-orange-9",
  grass: "text-grass-9",
};

export function ProjectIcon({
  href,
  favicon: faviconOverride,
  fallback,
  color,
  title,
}: {
  href: string;
  favicon?: string;
  fallback: string;
  color: IconColor;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const favicon = faviconOverride ?? getFaviconUrl(href);

  if (!favicon || failed) {
    return (
      <span className={cn("text-sm font-semibold", iconColors[color])}>
        {fallback}
      </span>
    );
  }

  return (
    <img
      src={favicon}
      alt={`${title} favicon`}
      width={20}
      height={20}
      className="size-5 rounded-sm object-contain"
      onError={() => setFailed(true)}
    />
  );
}
