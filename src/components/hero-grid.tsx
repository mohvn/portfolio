import { WordRotate } from "@/components/ui/word-rotate";
import { cn } from "@/components/lib/utils";

interface HeroGridProps {
  name: string;
  roles: readonly string[];
  avatarSrc: string;
  className?: string;
}

export function HeroGrid({
  name,
  roles,
  avatarSrc,
  className,
}: HeroGridProps) {
  return (
    <div
      className={cn(
        "screen-line-bottom flex items-end overflow-y-clip",
        className,
      )}
    >
      <div className="screen-line-top shrink-0 border-r border-border">
        <div className="relative">
          <img
            className="block size-30 min-[24rem]:size-32 sm:size-40 rounded-full object-cover select-none ring-1 ring-border ring-offset-0 ring-offset-background"
            src={avatarSrc}
            alt={name}
            fetchPriority="high"
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_1px] shadow-foreground/10"
            aria-hidden
          />
        </div>
      </div>

      <div className="flex min-h-40 flex-1 flex-col justify-end sm:min-h-48">
        <div className="border-t border-border">
          <div className="flex items-center gap-2 pl-4 py-3">
            <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight">
              {name}
            </h1>
          </div>
        </div>
        <div className="h-[3.125rem] border-t border-border py-1 pl-4 sm:h-9">
          <WordRotate
            words={[...roles]}
            className="inline-block font-mono text-sm text-balance text-muted-foreground shimmer shimmer-once"
            motionProps={{
              initial: { opacity: 0, filter: "blur(4px)" },
              animate: { opacity: 1, filter: "blur(0px)" },
              exit: { opacity: 0, filter: "blur(4px)" },
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          />
        </div>
      </div>
    </div>
  );
}
