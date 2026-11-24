"use client";

import { useState } from "react";
import type { Portfolio } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";
import { ChessOverlay } from "./chess/chess-overlay";
import { ChessPieceIcon } from "./chess/chess-piece-icon";

const companies: Record<
  string,
  { name: string; href: string; wordmark: string }
> = {
  empreender: {
    name: "Empreender",
    href: "https://empreender.com.br/",
    wordmark: withBasePath("/empreender.svg"),
  },
};

const techIcons: Record<string, { label: string; src: string }> = {
  typescript: {
    label: "TypeScript",
    src: withBasePath("/icons/typescript.svg"),
  },
};

function RichText({
  text,
  onChessClick,
  chessLabel,
}: {
  text: string;
  onChessClick?: () => void;
  chessLabel?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\]|\{\{[^}]+\}\})/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("{{") && part.endsWith("}}")) {
          const id = part.slice(2, -2);

          if (id === "chess") {
            return (
              <button
                key={index}
                type="button"
                onClick={onChessClick}
                aria-label={chessLabel}
                title={chessLabel}
                className="ml-[0.2em] inline-block h-[1.4em] w-[1.4em] align-[-0.28em] transition-opacity hover:opacity-75"
              >
                <ChessPieceIcon className="size-full drop-shadow-sm" />
              </button>
            );
          }

          const icon = techIcons[id];
          if (!icon) return <span key={index}>{part}</span>;
          return (
            <span key={index} className="whitespace-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={icon.src}
                alt=""
                aria-hidden
                width={16}
                height={16}
                className="mr-1 inline-block h-[0.875em] w-auto align-[-0.12em] object-contain"
              />
              {icon.label}
            </span>
          );
        }

        if (part.startsWith("[[") && part.endsWith("]]")) {
          const id = part.slice(2, -2);
          const company = companies[id];
          if (!company) return <span key={index}>{part}</span>;
          return (
            <a
              key={index}
              href={company.href}
              target="_blank"
              rel="noreferrer"
              aria-label={company.name}
              className="inline-block align-baseline text-current no-underline transition-opacity hover:opacity-80"
            >
              <span
                aria-hidden
                className="mx-[0.12em] inline-block h-[0.92em] w-[6.15em] bg-current align-[-0.14em]"
                style={{
                  mask: `url(${company.wordmark}) no-repeat center / contain`,
                  WebkitMask: `url(${company.wordmark}) no-repeat center / contain`,
                }}
              />
            </a>
          );
        }

        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={index} className="text-foreground">
              {part.slice(2, -2)}
            </span>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function SocialLink({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="text-foreground-secondary underline decoration-foreground-decoration transition-colors hover:text-foreground hover:decoration-foreground-decoration-hover"
    >
      {children}
    </a>
  );
}

export function Hero({ portfolio }: { portfolio: Portfolio }) {
  const { contact, ui, avatar } = portfolio;
  const [chessOpen, setChessOpen] = useState(false);
  const [chessSession, setChessSession] = useState(0);

  function openChess() {
    setChessSession((session) => session + 1);
    setChessOpen(true);
  }

  return (
    <section aria-label="Hero" className="relative z-10 flex flex-col gap-6">
      <div className="flex items-center gap-3.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt=""
          width={44}
          height={44}
          className="size-11 rounded-full object-cover"
        />
        <div className="min-w-0">
          <h1 className="text-base font-medium tracking-tight">
            {portfolio.name}
          </h1>
          <p className="text-sm text-muted-foreground">{portfolio.role}</p>
        </div>
      </div>

      <div className="space-y-3 text-base leading-7 text-foreground-secondary">
        {portfolio.paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <RichText
              text={paragraph}
              onChessClick={openChess}
              chessLabel={ui.chess.openLabel}
            />
          </p>
        ))}
        <p>
          {ui.reach.before}{" "}
          <SocialLink href={contact.github}>{ui.footer.github}</SocialLink>
          {ui.reach.sep}
          <SocialLink href={contact.linkedin}>{ui.footer.linkedin}</SocialLink>
          {ui.reach.and}{" "}
          <SocialLink href={`mailto:${contact.email}`}>
            {ui.footer.email}
          </SocialLink>
          {ui.reach.after}
        </p>
      </div>

      <ChessOverlay
        open={chessOpen}
        onOpenChange={setChessOpen}
        session={chessSession}
        copy={ui.chess}
      />
    </section>
  );
}
