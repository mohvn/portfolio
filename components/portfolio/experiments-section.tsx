import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import type { Portfolio } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function ExperimentPreview({ type }: { type: string }) {
  const previews: Record<string, ReactNode> = {
    react: (
      <div className="rounded-lg border border-grayscale-12 bg-grayscale-12 px-3 py-1.5 text-xs font-medium text-grayscale-2 dark:border-grayscale-6 dark:bg-grayscale-5 dark:text-grayscale-11">
        Button
      </div>
    ),
    next: (
      <div className="flex items-center gap-2 rounded-lg border border-grayscale-3 bg-white px-3 py-2 dark:border-grayscale-5 dark:bg-grayscale-4">
        <span className="font-mono text-xs text-grayscale-11">▲ Next.js</span>
      </div>
    ),
    tailwind: (
      <div className="flex gap-1">
        {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
          <div
            key={c}
            className="size-6 rounded-md border border-grayscale-3"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    ),
    typescript: (
      <code className="rounded-lg bg-grayscale-12 px-3 py-2 font-mono text-xs text-grayscale-2 dark:bg-grayscale-5 dark:text-grayscale-11">
        type App = {"{"} ... {"}"}
      </code>
    ),
    python: (
      <code className="rounded-lg border border-grayscale-3 bg-white px-3 py-2 font-mono text-xs text-grayscale-11 dark:border-grayscale-5 dark:bg-grayscale-4">
        def automate():
      </code>
    ),
    astro: (
      <div className="rounded-lg border border-grayscale-3 bg-white px-4 py-2 text-xs font-medium text-grayscale-11 dark:border-grayscale-5 dark:bg-grayscale-4">
        # Docs
      </div>
    ),
  };

  return (
    <div className="flex h-40 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-grayscale-2 p-3 transition-colors group-hover:bg-grayscale-3 dark:bg-grayscale-2 dark:group-hover:bg-grayscale-3">
      {previews[type] ?? previews.react}
    </div>
  );
}

export function ExperimentsSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui } = portfolio;

  return (
    <section id="experiments" className="flex flex-col gap-3">
      <div className="flex flex-col gap-px p-2">
        <h2 className="font-display text-xl font-bold">
          {ui.sections.experiments.title}
        </h2>
        <p className="max-w-xl text-sm text-balance text-grayscale-10">
          {ui.sections.experiments.description}
        </p>
      </div>

      <div className="grid gap-1.5 rounded-2xl border border-grayscale-3 bg-grayscale-2 p-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {portfolio.experiments.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              "group flex min-h-64 flex-col overflow-hidden rounded-[13px] border border-grayscale-3 bg-grayscale-1 p-1 small-shadow transition-colors hover:border-grayscale-4 hover:bg-grayscale-2 focus-visible:ring-2 focus-visible:ring-grayscale-7 focus-visible:outline-none dark:border-grayscale-4 dark:bg-grayscale-3 dark:shadow-none dark:hover:border-grayscale-6 dark:hover:bg-grayscale-4",
              "span" in item && item.span === "lg" && "sm:col-span-2 lg:col-span-3",
            )}
          >
            <div aria-hidden className="p-2">
              <ExperimentPreview type={item.preview} />
            </div>
            <div className="mt-auto flex flex-col px-2 pt-4 pb-2">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-medium text-grayscale-12">
                  {item.title}
                </h3>
                <ArrowRight className="mt-0.5 size-[15px] shrink-0 text-grayscale-9 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-grayscale-11" />
              </div>
              <p className="mt-2 text-xs leading-5 text-pretty text-grayscale-10">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
