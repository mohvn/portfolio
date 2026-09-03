import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MarkIcon({
  children,
  size = "md",
  className,
}: {
  children: ReactNode;
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "squircle flex shrink-0 items-center justify-center rounded-mark border border-border bg-accent text-foreground-secondary",
        size === "md" && "size-8 [&_svg]:size-4.5",
        size === "sm" && "size-6 [&_svg]:size-3.5",
        className,
      )}
    >
      {children}
    </span>
  );
}
