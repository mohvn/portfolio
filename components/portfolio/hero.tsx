import Image from "next/image";
import type { ReactNode } from "react";
import type { Portfolio } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong
              key={index}
              className="font-medium text-grayscale-12"
            >
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export function Hero({
  portfolio,
  actions,
}: {
  portfolio: Portfolio;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-8">
      <div>
        <div className="relative aspect-[4/1] w-full overflow-hidden rounded-2xl bg-grayscale-3 dark:bg-grayscale-4">
          <Image
            src={withBasePath("/images/banner.png")}
            alt=""
            fill
            priority
            sizes="(max-width: 800px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        <div className="relative z-10 -mt-9 flex items-end gap-3 px-1 sm:-mt-11 sm:gap-4">
          <Image
            src={portfolio.avatar}
            alt={portfolio.name}
            width={84}
            height={84}
            priority
            className="size-[84px] shrink-0 rounded-full bg-grayscale-1 object-cover ring-[3px] ring-grayscale-1 sm:size-[88px]"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-0.5 pt-8 sm:pt-14">
            <div className="flex items-center justify-between gap-3">
              <h1 className="min-w-0 truncate text-xl font-semibold tracking-tight text-grayscale-12 sm:text-2xl">
                {portfolio.name}
              </h1>
              {actions ? (
                <div className="flex shrink-0 items-center gap-2">
                  {actions}
                </div>
              ) : null}
            </div>
            <p className="truncate text-sm text-grayscale-10">{portfolio.role}</p>
          </div>
        </div>
      </div>

      <ul className="flex list-disc flex-col gap-2.5 pl-5 text-sm leading-relaxed text-grayscale-11 marker:text-grayscale-8">
        {portfolio.bio.items.map((item) => (
          <li key={item.text} className="pl-1 text-pretty">
            <RichText text={item.text} />
            {item.children && item.children.length > 0 ? (
              <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-5 marker:text-grayscale-7">
                {item.children.map((child) => (
                  <li key={child} className="text-grayscale-10">
                    <RichText text={child} />
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </header>
  );
}
