"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { XIcon } from "lucide-react";
import { ChessBoard, type ChessCopy } from "./chess-board";
import { ChessPieceIcon } from "./chess-piece-icon";

export function ChessOverlay({
  open,
  onOpenChange,
  session,
  copy,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: number;
  copy: ChessCopy;
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="chess-overlay"
          role="dialog"
          aria-modal
          aria-label={copy.title}
          className="fixed inset-0 z-[100] flex flex-col bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--foreground)_5%,transparent),transparent_55%)]"
          />

          <header className="relative z-10 flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-7">
            <div className="flex min-w-0 items-center gap-2.5">
              <ChessPieceIcon className="size-5 text-foreground" />
              <h2 className="text-sm font-medium tracking-tight text-foreground">
                {copy.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label={copy.close}
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              <XIcon className="size-4" />
            </button>
          </header>

          <motion.div
            className="relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-5 py-8 sm:px-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
          >
            <ChessBoard key={session} copy={copy} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
