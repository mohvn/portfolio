import {
  pickComputerMove,
  type ComputerMove,
} from "./chess-engine";
import type {
  ChessWorkerRequest,
  ChessWorkerResponse,
} from "./chess.worker";

let worker: Worker | null = null;
let seq = 0;

function getWorker() {
  if (typeof window === "undefined") return null;
  if (worker) return worker;

  try {
    worker = new Worker(new URL("./chess.worker.ts", import.meta.url));
    return worker;
  } catch {
    worker = null;
    return null;
  }
}

/** Ask the engine for a move — prefers a Web Worker, falls back to main thread. */
export function requestComputerMove(
  fen: string,
  timeMs = 700,
  signal?: AbortSignal,
): Promise<ComputerMove | null> {
  const active = getWorker();

  if (!active) {
    return Promise.resolve(pickComputerMove(fen, "b", timeMs));
  }

  const id = ++seq;

  return new Promise((resolve) => {
    if (signal?.aborted) {
      resolve(null);
      return;
    }

    const onMessage = (event: MessageEvent<ChessWorkerResponse>) => {
      if (event.data.id !== id) return;
      cleanup();
      resolve(event.data.move);
    };

    const onAbort = () => {
      cleanup();
      resolve(null);
    };

    const cleanup = () => {
      active.removeEventListener("message", onMessage);
      signal?.removeEventListener("abort", onAbort);
    };

    active.addEventListener("message", onMessage);
    signal?.addEventListener("abort", onAbort, { once: true });

    const request: ChessWorkerRequest = { id, fen, timeMs };
    active.postMessage(request);
  });
}

export function terminateChessWorker() {
  worker?.terminate();
  worker = null;
}
