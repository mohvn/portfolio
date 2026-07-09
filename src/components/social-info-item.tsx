import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/components/lib/utils";

export function SocialInfoItem({
  icon: Icon,
  children,
  className,
}: {
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 font-mono text-sm",
        className,
      )}
    >
        <Icon
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden
        />
      {children}
    </div>
  );
}
