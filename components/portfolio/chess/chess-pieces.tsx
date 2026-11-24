import type { Color, PieceSymbol } from "chess.js";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

const TYPE_FILE: Record<PieceSymbol, string> = {
  k: "K",
  q: "Q",
  r: "R",
  b: "B",
  n: "N",
  p: "P",
};

export function ChessPieceSvg({
  type,
  color,
  className,
}: {
  type: PieceSymbol;
  color: Color;
  className?: string;
}) {
  const src = withBasePath(`/icons/chess/${color}${TYPE_FILE[type]}.svg`);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      data-piece={color}
      draggable={false}
      className={cn(
        "pointer-events-none relative z-[1] size-[88%] max-h-[88%] max-w-[88%] select-none object-contain",
        className,
      )}
    />
  );
}
