import {
  Chess,
  type Color,
  type Move,
  type PieceSymbol,
  type Square,
} from "chess.js";

const PIECE_VALUE: Record<PieceSymbol, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

/** Position key without halfmove/fullmove clocks. */
function positionKey(fen: string) {
  return fen.split(" ").slice(0, 4).join(" ");
}

/**
 * Tiny opening book (black replies). Keys are FEN position prefixes
 * after White's common first moves.
 */
const OPENING_BOOK: Record<string, string[]> = {
  // 1.e4
  "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq -": [
    "e5",
    "c5",
    "e6",
    "c6",
  ],
  // 1.d4
  "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq -": [
    "d5",
    "Nf6",
    "e6",
    "c5",
  ],
  // 1.Nf3
  "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq -": [
    "d5",
    "Nf6",
    "c5",
  ],
  // 1.c4
  "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq -": [
    "e5",
    "c5",
    "Nf6",
    "e6",
  ],
  // 1.e4 e5 2.Nf3
  "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq -": [
    "Nc6",
    "Nf6",
    "d6",
  ],
  // 1.e4 c5 2.Nf3
  "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq -": [
    "d6",
    "Nc6",
    "e6",
  ],
  // 1.d4 d5 2.c4
  "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq -": [
    "e6",
    "c6",
    "dxc4",
    "Nf6",
  ],
  // 1.d4 Nf6 2.c4
  "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq -": [
    "e6",
    "g6",
    "c5",
    "e5",
  ],
};

function evaluate(game: Chess, perspective: Color): number {
  if (game.isCheckmate()) {
    return game.turn() === perspective ? -100000 : 100000;
  }
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }

  let score = 0;
  for (const row of game.board()) {
    for (const piece of row) {
      if (!piece) continue;
      const value = PIECE_VALUE[piece.type];
      score += piece.color === perspective ? value : -value;
    }
  }

  if (game.isCheck()) {
    score += game.turn() === perspective ? -18 : 18;
  }

  return score;
}

/** Capture-only search so we don't stop mid-exchange and hang pieces. */
function quiesce(
  game: Chess,
  alpha: number,
  beta: number,
  maximizing: boolean,
  ply: number,
  ctx: SearchContext,
): number {
  if (ctx.aborted || timedOut(ctx) || ply > 4) {
    return evaluate(game, ctx.perspective);
  }

  const standPat = evaluate(game, ctx.perspective);
  if (maximizing) {
    if (standPat >= beta) return beta;
    if (standPat > alpha) alpha = standPat;
  } else {
    if (standPat <= alpha) return alpha;
    if (standPat < beta) beta = standPat;
  }

  const captures = game
    .moves({ verbose: true })
    .filter((move) => move.captured || move.promotion)
    .sort((a, b) => scoreMove(b, []) - scoreMove(a, []));

  for (const move of captures) {
    game.move(move);
    const score = quiesce(game, alpha, beta, !maximizing, ply + 1, ctx);
    game.undo();
    if (ctx.aborted) return standPat;

    if (maximizing) {
      if (score > alpha) alpha = score;
      if (alpha >= beta) break;
    } else {
      if (score < beta) beta = score;
      if (beta <= alpha) break;
    }
  }

  return maximizing ? alpha : beta;
}

function scoreMove(move: Move, killers: Move[]): number {
  let score = 0;
  if (move.captured) {
    score +=
      10_000 +
      PIECE_VALUE[move.captured] * 10 -
      PIECE_VALUE[move.piece];
  }
  if (move.promotion) score += 9000;
  if (killers.some((k) => k.from === move.from && k.to === move.to)) {
    score += 8000;
  }
  const toFile = move.to.charCodeAt(0) - 97;
  const toRank = Number(move.to[1]);
  score += 3 - Math.abs(3.5 - toFile);
  score += toRank === 4 || toRank === 5 ? 2 : 0;
  return score;
}

function orderedMoves(game: Chess, killers: Move[]): Move[] {
  const moves = game.moves({ verbose: true });
  return moves
    .map((move) => ({ move, score: scoreMove(move, killers) }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.move);
}

type SearchContext = {
  perspective: Color;
  deadline: number;
  aborted: boolean;
  killers: Move[][];
};

function timedOut(ctx: SearchContext) {
  if (performance.now() >= ctx.deadline) {
    ctx.aborted = true;
    return true;
  }
  return false;
}

function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  ply: number,
  ctx: SearchContext,
): number {
  if (ctx.aborted || timedOut(ctx)) return evaluate(game, ctx.perspective);
  if (game.isGameOver()) return evaluate(game, ctx.perspective);
  if (depth === 0) {
    return quiesce(game, alpha, beta, maximizing, ply, ctx);
  }

  const killers = ctx.killers[ply] ?? [];
  const moves = orderedMoves(game, killers);

  if (maximizing) {
    let best = -Infinity;
    for (const move of moves) {
      game.move(move);
      const score = minimax(
        game,
        depth - 1,
        alpha,
        beta,
        false,
        ply + 1,
        ctx,
      );
      game.undo();
      if (ctx.aborted) return best;

      if (score > best) {
        best = score;
        const slot = ctx.killers[ply] ?? (ctx.killers[ply] = []);
        if (!slot.some((k) => k.from === move.from && k.to === move.to)) {
          slot.unshift(move);
          if (slot.length > 2) slot.length = 2;
        }
      }
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }

  let best = Infinity;
  for (const move of moves) {
    game.move(move);
    const score = minimax(game, depth - 1, alpha, beta, true, ply + 1, ctx);
    game.undo();
    if (ctx.aborted) return best;

    if (score < best) {
      best = score;
      const slot = ctx.killers[ply] ?? (ctx.killers[ply] = []);
      if (!slot.some((k) => k.from === move.from && k.to === move.to)) {
        slot.unshift(move);
        if (slot.length > 2) slot.length = 2;
      }
    }
    beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}

function pickFromBook(fen: string): Move | null {
  const game = new Chess(fen);
  const replies = OPENING_BOOK[positionKey(fen)];
  if (!replies?.length) return null;

  const shuffled = [...replies].sort(() => Math.random() - 0.5);
  for (const san of shuffled) {
    const played = game.move(san);
    if (played) return played;
  }
  return null;
}

function searchRoot(
  fen: string,
  color: Color,
  depth: number,
  deadline: number,
): { move: Move; score: number } | null {
  const game = new Chess(fen);
  const ctx: SearchContext = {
    perspective: color,
    deadline,
    aborted: false,
    killers: [],
  };

  const moves = orderedMoves(game, []);
  if (moves.length === 0) return null;

  let bestScore = -Infinity;
  let bestMoves: Move[] = [moves[0]];

  for (const move of moves) {
    if (timedOut(ctx)) break;
    game.move(move);
    const score = minimax(game, depth - 1, -Infinity, Infinity, false, 1, ctx);
    game.undo();
    if (ctx.aborted && bestScore === -Infinity) {
      // No completed score yet — keep exploring lightly.
      continue;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [move];
    } else if (score === bestScore) {
      bestMoves.push(move);
    }
  }

  return {
    move: bestMoves[Math.floor(Math.random() * bestMoves.length)]!,
    score: bestScore,
  };
}

export type ComputerMove = {
  from: Square;
  to: Square;
  promotion?: string;
};

/** Depth 3 always; deepen to 4 if time remains. Default budget 700ms. */
export function pickComputerMove(
  fen: string,
  color: Color = "b",
  timeMs = 700,
): ComputerMove | null {
  const book = pickFromBook(fen);
  if (book) {
    return {
      from: book.from,
      to: book.to,
      promotion: book.promotion,
    };
  }

  const deadline = performance.now() + timeMs;
  let best: ComputerMove | null = null;

  // Depth 3 always completes (quiescence handles hanging pieces at leaves).
  const depth3 = searchRoot(fen, color, 3, Number.POSITIVE_INFINITY);
  if (depth3) {
    best = {
      from: depth3.move.from,
      to: depth3.move.to,
      promotion: depth3.move.promotion,
    };
  }

  // Optional deepen to 4 with remaining budget.
  if (performance.now() < deadline) {
    const depth4 = searchRoot(fen, color, 4, deadline);
    if (depth4) {
      best = {
        from: depth4.move.from,
        to: depth4.move.to,
        promotion: depth4.move.promotion,
      };
    }
  }

  return best;
}

export type BoardSquare = {
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null;

export function getBoardMatrix(fen: string): BoardSquare[][] {
  return new Chess(fen).board();
}
