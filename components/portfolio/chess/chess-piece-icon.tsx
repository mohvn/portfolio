import type { ImgHTMLAttributes } from "react";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/utils";

/** Knight piece (cburnett) for inline / header use. */
export function ChessPieceIcon({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath("/icons/chess/wN.svg")}
      alt=""
      aria-hidden
      draggable={false}
      width={32}
      height={32}
      className={cn("object-contain select-none", className)}
      {...props}
    />
  );
}
