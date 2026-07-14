"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function SkillIcon({
  icon,
  name,
  className,
}: {
  icon: string;
  name: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const mark = name
    .replace(/\.js$/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (failed) {
    return (
      <span className="font-mono text-[10px] font-medium tracking-tight text-grayscale-10">
        {mark}
      </span>
    );
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${icon}`}
      alt=""
      width={14}
      height={14}
      className={cn(
        "size-3.5 shrink-0 object-contain brightness-0 opacity-50 dark:invert dark:opacity-65",
        className,
      )}
      onError={() => setFailed(true)}
    />
  );
}
