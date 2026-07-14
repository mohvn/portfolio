import type { Portfolio } from "@/lib/i18n";

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0"
      className={className}
      aria-hidden
    >
      <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
    </svg>
  );
}

export function QuoteSection({ portfolio }: { portfolio: Portfolio }) {
  const { text, author } = portfolio.ui.quote;

  return (
    <div className="relative mx-auto flex max-w-[690px] flex-col items-center p-3 py-4 text-center sm:py-6">
      <QuoteMark className="mb-4 size-6 shrink-0 text-grayscale-6 sm:mb-6 sm:size-10 dark:text-grayscale-5" />

      <blockquote className="relative z-10 max-w-2xl px-1 sm:px-4">
        <p className="text-xl leading-relaxed font-bold tracking-tight text-grayscale-12 italic sm:text-3xl">
          “{text}”
        </p>
      </blockquote>

      <div className="z-10 mt-6 flex items-center gap-3 sm:mt-8">
        <div className="h-px w-8 bg-grayscale-5 dark:bg-grayscale-6" />
        <span className="text-xs font-semibold tracking-widest text-grayscale-9 uppercase sm:text-sm">
          {author}
        </span>
        <div className="h-px w-8 bg-grayscale-5 dark:bg-grayscale-6" />
      </div>
    </div>
  );
}
