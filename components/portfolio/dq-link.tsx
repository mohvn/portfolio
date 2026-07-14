import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border-grayscale-12 bg-grayscale-12 text-grayscale-2 hover:bg-grayscale-12/90 dark:border-grayscale-6 dark:bg-grayscale-5 dark:text-grayscale-11 dark:hover:border-grayscale-7 dark:hover:bg-grayscale-6",
  secondary:
    "border-grayscale-3 bg-white text-grayscale-11 hover:border-grayscale-4 hover:bg-grayscale-2 dark:border-grayscale-4 dark:bg-grayscale-3 dark:text-grayscale-11 dark:hover:border-grayscale-5 dark:hover:bg-grayscale-4",
} as const;

export function DqLink({
  href,
  children,
  variant = "secondary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "flex h-7 w-max cursor-pointer flex-row items-center justify-center gap-1.5 rounded-lg border px-2 text-sm font-medium transition-colors",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}
