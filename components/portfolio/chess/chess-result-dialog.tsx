"use client";

import { AnimatePresence, motion } from "motion/react";
import type { ChessCopy } from "./chess-board";
import { ChessPieceIcon } from "./chess-piece-icon";

export type ChessResult = {
  kind: "win" | "lose" | "draw";
  score: "1-0" | "0-1" | "½-½";
  reason: string;
  moves: string[];
};

function pairMoves(moves: string[]) {
  const rows: { n: number; white?: string; black?: string }[] = [];
  for (let i = 0; i < moves.length; i += 2) {
    rows.push({
      n: i / 2 + 1,
      white: moves[i],
      black: moves[i + 1],
    });
  }
  return rows;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ChessResultDialog({
  open,
  onOpenChange,
  result,
  copy,
  onNewGame,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: ChessResult | null;
  copy: ChessCopy;
  onNewGame: () => void;
}) {
  const title =
    result?.kind === "win"
      ? copy.resultWin
      : result?.kind === "lose"
        ? copy.resultLose
        : copy.resultDraw;

  const rows = result ? pairMoves(result.moves) : [];
  const scoreLabel = result?.score.replace("-", "–");

  return (
    <AnimatePresence>
      {open && result ? (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          role="dialog"
          aria-modal
          aria-label={title}
        >
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-background/82 backdrop-blur-[10px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--foreground)_4%,transparent),transparent_60%)]"
          />

          <motion.div
            className="relative z-10 flex w-full max-w-sm flex-col items-center text-center"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4, ease, delay: 0.04 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease, delay: 0.06 }}
            >
              <ChessPieceIcon className="size-8 text-foreground" />
            </motion.div>

            <motion.p
              className="mt-6 text-[11px] tracking-[0.22em] text-muted-foreground uppercase"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.1 }}
            >
              {scoreLabel}
            </motion.p>

            <motion.h3
              className="mt-2 text-[1.75rem] leading-tight font-medium tracking-tight text-foreground sm:text-[2rem]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.14 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="mt-2 text-[15px] text-foreground-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
            >
              {result.reason}
            </motion.p>

            <motion.div
              className="mt-8 w-full max-h-44 overflow-y-auto px-1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease, delay: 0.24 }}
            >
              {rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">{copy.noMoves}</p>
              ) : (
                <ol className="mx-auto grid max-w-[16rem] grid-cols-[2rem_1fr_1fr] gap-x-2 gap-y-1.5 text-left text-[13px] leading-none">
                  {rows.map((row, index) => (
                    <motion.li
                      key={row.n}
                      className="contents"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.28 + Math.min(index, 12) * 0.02,
                      }}
                    >
                      <span className="pt-0.5 text-muted-foreground tabular-nums">
                        {row.n}.
                      </span>
                      <span className="pt-0.5 font-medium tracking-tight text-foreground">
                        {row.white}
                      </span>
                      <span className="pt-0.5 tracking-tight text-foreground-secondary">
                        {row.black ?? ""}
                      </span>
                    </motion.li>
                  ))}
                </ol>
              )}
            </motion.div>

            <motion.div
              className="mt-10 flex items-center gap-5 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.32 }}
            >
              <button
                type="button"
                onClick={() => {
                  onNewGame();
                  onOpenChange(false);
                }}
                className="text-foreground underline decoration-foreground-decoration underline-offset-4 transition-colors hover:decoration-foreground-decoration-hover"
              >
                {copy.newGame}
              </button>
              <span className="text-muted-foreground/40" aria-hidden>
                ·
              </span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="text-foreground-secondary underline decoration-foreground-decoration underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground-decoration-hover"
              >
                {copy.close}
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
