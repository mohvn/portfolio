/// <reference lib="webworker" />

import { pickComputerMove, type ComputerMove } from "./chess-engine";

export type ChessWorkerRequest = {
  id: number;
  fen: string;
  timeMs?: number;
};

export type ChessWorkerResponse = {
  id: number;
  move: ComputerMove | null;
};

self.onmessage = (event: MessageEvent<ChessWorkerRequest>) => {
  const { id, fen, timeMs = 700 } = event.data;
  const move = pickComputerMove(fen, "b", timeMs);
  const response: ChessWorkerResponse = { id, move };
  self.postMessage(response);
};
