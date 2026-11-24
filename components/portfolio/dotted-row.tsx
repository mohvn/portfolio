import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DottedRow({
  title,
  meta,
  href,
  className,
}: {
  title: ReactNode;
  meta: ReactNode;
  href?: string;
  className?: string;
}) {
  const inner = (
    <>
      <span className="shrink-0 text-foreground-secondary transition-colors group-hover:text-foreground">
        {title}
      </span>
      <span
        aria-hidden
        className="mx-3 hidden min-w-6 flex-1 border-b border-dotted border-border sm:block"
      />
      <span className="min-w-0 truncate text-muted-foreground transition-colors group-hover:text-foreground-secondary sm:max-w-[58%] sm:text-right">
        {meta}
      </span>
    </>
  );

  const rowClass = cn(
    "group flex min-w-0 flex-col gap-0.5 py-1 text-sm leading-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={rowClass}
      >
        {inner}
      </a>
    );
  }

  return <div className={rowClass}>{inner}</div>;
}
