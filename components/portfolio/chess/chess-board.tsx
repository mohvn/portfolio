"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { cn } from "@/lib/utils";
import { requestComputerMove } from "./chess-ai";
import { ChessPieceSvg } from "./chess-pieces";
import {
  ChessResultDialog,
  type ChessResult,
} from "./chess-result-dialog";

export type ChessCopy = {
  title: string;
  you: string;
  computer: string;
  yourTurn: string;
  thinking: string;
  check: string;
  checkmateWin: string;
  checkmateLose: string;
  stalemate: string;
  draw: string;
  newGame: string;
  hint: string;
  close: string;
  resultWin: string;
  resultLose: string;
  resultDraw: string;
  noMoves: string;
};

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const RANKS = [8, 7, 6, 5, 4, 3, 2, 1] as const;

function playerStatus(game: Chess, copy: ChessCopy) {
  if (game.isCheckmate()) {
    return game.turn() === "w" ? copy.checkmateLose : copy.checkmateWin;
  }
  if (game.isStalemate()) return copy.stalemate;
  if (game.isDraw()) return copy.draw;
  if (game.turn() === "b") return "—";
  if (game.isCheck()) return copy.check;
  return copy.yourTurn;
}

function buildResult(
  game: Chess,
  moves: string[],
  copy: ChessCopy,
): ChessResult {
  if (game.isCheckmate()) {
    const whiteWon = game.turn() === "b";
    return {
      kind: whiteWon ? "win" : "lose",
      score: whiteWon ? "1-0" : "0-1",
      reason: whiteWon ? copy.checkmateWin : copy.checkmateLose,
      moves,
    };
  }
  return {
    kind: "draw",
    score: "½-½",
    reason: game.isStalemate() ? copy.stalemate : copy.draw,
    moves,
  };
}

export function ChessBoard({
  copy,
  onNewGame,
}: {
  copy: ChessCopy;
  onNewGame?: () => void;
}) {
  const [fen, setFen] = useState(() => new Chess().fen());
  const [moves, setMoves] = useState<string[]>([]);
  const [selected, setSelected] = useState<Square | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(
    null,
  );
  const [resultOpen, setResultOpen] = useState(false);
  const [result, setResult] = useState<ChessResult | null>(null);
  const [pending, setPending] = useState(false);
  const resultShownForFen = useRef<string | null>(null);

  const game = useMemo(() => new Chess(fen), [fen]);
  const board = game.board();
  const legalTargets = useMemo(() => {
    if (!selected || game.turn() !== "w" || game.isGameOver()) {
      return new Set<Square>();
    }
    return new Set(
      game.moves({ square: selected, verbose: true }).map((move) => move.to),
    );
  }, [game, selected]);

  useEffect(() => {
    if (!game.isGameOver()) {
      resultShownForFen.current = null;
      return;
    }
    // Wait until moves catch up with the terminal fen (same tick batch).
    const timer = window.setTimeout(() => {
      if (resultShownForFen.current === fen) return;
      resultShownForFen.current = fen;
      setResult(buildResult(game, moves, copy));
      setResultOpen(true);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [fen, game, moves, copy]);

  useEffect(() => {
    if (game.turn() !== "b" || game.isGameOver()) return;

    const controller = new AbortController();
    setPending(true);

    void requestComputerMove(fen, 700, controller.signal).then((move) => {
      if (controller.signal.aborted || !move) {
        setPending(false);
        return;
      }
      const next = new Chess(fen);
      const played = next.move(
        move.promotion
          ? {
              from: move.from,
              to: move.to,
              promotion: move.promotion as "q" | "r" | "b" | "n",
            }
          : { from: move.from, to: move.to },
      );
      if (!played) {
        setPending(false);
        return;
      }
      setFen(next.fen());
      setMoves((prev) => [...prev, played.san]);
      setLastMove({ from: move.from, to: move.to });
      setSelected(null);
      setPending(false);
    });

    return () => {
      controller.abort();
      setPending(false);
    };
  }, [fen, game]);

  function reset() {
    resultShownForFen.current = null;
    setFen(new Chess().fen());
    setMoves([]);
    setSelected(null);
    setLastMove(null);
    setResult(null);
    setResultOpen(false);
    onNewGame?.();
  }

  function onSquareClick(square: Square) {
    if (game.isGameOver() || game.turn() !== "w" || pending) return;

    const piece = game.get(square);

    if (selected) {
      if (legalTargets.has(square)) {
        const next = new Chess(fen);
        const played = next.move({
          from: selected,
          to: square,
          promotion: "q",
        });
        if (played) {
          setFen(next.fen());
          setMoves((prev) => [...prev, played.san]);
          setLastMove({ from: selected, to: square });
          setSelected(null);
        }
        return;
      }

      if (piece?.color === "w") {
        setSelected(square);
        return;
      }

      setSelected(null);
      return;
    }

    if (piece?.color === "w") setSelected(square);
  }

  const status = playerStatus(game, copy);
  const thinking = game.turn() === "b" && !game.isGameOver();

  return (
    <div className="relative flex w-full max-w-[min(100%,34rem)] flex-col gap-5 sm:gap-6">
      <ChessResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        result={result}
        copy={copy}
        onNewGame={reset}
      />
        <div className="flex items-end justify-between gap-4 px-0.5">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{copy.computer}</p>
            <p
              className={cn(
                "truncate text-sm text-foreground-secondary transition-opacity",
                thinking && "animate-pulse",
              )}
            >
              {thinking ? copy.thinking : "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="shrink-0 text-sm text-foreground-secondary underline decoration-foreground-decoration transition-colors hover:text-foreground hover:decoration-foreground-decoration-hover"
          >
            {copy.newGame}
          </button>
        </div>

        <div
          className="chess-board mx-auto w-full overflow-hidden rounded-xl border border-border shadow-[0_1px_0_color-mix(in_oklab,var(--foreground)_5%,transparent)]"
          role="grid"
          aria-label={copy.title}
        >
          <div
            className="grid w-full"
            style={{
              aspectRatio: "1 / 1",
              gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
              gridTemplateRows: "repeat(8, minmax(0, 1fr))",
            }}
          >
            {RANKS.map((rank, rankIndex) =>
              FILES.map((file, fileIndex) => {
                const square = `${file}${rank}` as Square;
                const piece = board[rankIndex][fileIndex];
                const dark = (rankIndex + fileIndex) % 2 === 1;
                const isSelected = selected === square;
                const isTarget = legalTargets.has(square);
                const inLast =
                  lastMove?.from === square || lastMove?.to === square;

                return (
                  <button
                    key={square}
                    type="button"
                    role="gridcell"
                    aria-label={square}
                    onClick={() => onSquareClick(square)}
                    className={cn(
                      "chess-square relative flex items-center justify-center p-[4%] outline-none",
                      dark ? "chess-square-dark" : "chess-square-light",
                      inLast && "chess-square-last",
                      isSelected && "chess-square-selected",
                      !game.isGameOver() &&
                        game.turn() === "w" &&
                        "cursor-pointer",
                    )}
                  >
                    {fileIndex === 0 ? (
                      <span
                        className={cn(
                          "pointer-events-none absolute top-1 left-1 text-[9px] leading-none font-medium sm:text-[10px]",
                          dark
                            ? "text-[color-mix(in_oklab,var(--chess-light)_70%,transparent)]"
                            : "text-[color-mix(in_oklab,var(--chess-dark)_70%,transparent)]",
                        )}
                      >
                        {rank}
                      </span>
                    ) : null}
                    {rankIndex === 7 ? (
                      <span
                        className={cn(
                          "pointer-events-none absolute right-1 bottom-1 text-[9px] leading-none font-medium sm:text-[10px]",
                          dark
                            ? "text-[color-mix(in_oklab,var(--chess-light)_70%,transparent)]"
                            : "text-[color-mix(in_oklab,var(--chess-dark)_70%,transparent)]",
                        )}
                      >
                        {file}
                      </span>
                    ) : null}

                    {piece ? (
                      <ChessPieceSvg type={piece.type} color={piece.color} />
                    ) : null}

                    {isTarget ? (
                      <span
                        className={cn(
                          "pointer-events-none absolute rounded-full",
                          piece
                            ? "inset-[10%] border-[3px] border-foreground/20"
                            : "size-[22%] bg-foreground/25",
                        )}
                      />
                    ) : null}
                  </button>
                );
              }),
            )}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 px-0.5">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">{copy.you}</p>
            <p className="text-sm text-foreground">{status}</p>
          </div>
          <p className="max-w-[14rem] text-right text-xs leading-relaxed text-muted-foreground">
            {copy.hint}
          </p>
        </div>
    </div>
  );
}
