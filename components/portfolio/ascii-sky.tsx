"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/base-path";
import { getCurrentTheme, type Theme } from "@/lib/theme";

const CHARSET = " .:+*ox%#";
const CELL_W = 7;
const CELL_H = 12;
const SCROLL_PX_PER_SEC = 18;

const SKY = {
  light: {
    source: "/images/sky-light.jpg",
    still: "/images/sky-ascii-still.jpg",
  },
  dark: {
    source: "/images/sky-dark.jpg",
    still: "/images/sky-ascii-still-dark.jpg",
  },
} as const;

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function AsciiSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const still = stillRef.current;
    if (!canvasEl) return;

    const canvas = canvasEl;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let alive = true;
    let sourceW = 0;
    let sourceH = 0;
    let pixels: Uint8ClampedArray | null = null;
    let scrollX = 0;
    let last = performance.now();
    let theme: Theme = getCurrentTheme();
    let loading: Promise<void> | null = null;

    function bakeSource(img: HTMLImageElement) {
      const targetH = 692;
      const scale = targetH / img.naturalHeight;
      sourceW = Math.max(1, Math.round(img.naturalWidth * scale));
      sourceH = targetH;
      const off = document.createElement("canvas");
      off.width = sourceW;
      off.height = sourceH;
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;
      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(img, 0, 0, sourceW, sourceH);
      pixels = offCtx.getImageData(0, 0, sourceW, sourceH).data;
    }

    async function loadTheme(next: Theme) {
      theme = next;
      if (still) {
        still.style.backgroundImage = `url(${withBasePath(SKY[next].still)})`;
        still.style.opacity = "0.45";
      }
      canvas.removeAttribute("data-ready");
      canvas.style.opacity = "0";
      const img = await loadImage(withBasePath(SKY[next].source));
      if (!alive || theme !== next) return;
      bakeSource(img);
    }

    function paint(now: number) {
      if (!alive || !ctx || !pixels) {
        raf = requestAnimationFrame(paint);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth || window.innerWidth;
      const cssH = canvas.clientHeight || 692;
      const pixelW = Math.max(1, Math.floor(cssW * dpr));
      const pixelH = Math.max(1, Math.floor(cssH * dpr));

      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced.matches) {
        scrollX = (scrollX + SCROLL_PX_PER_SEC * dt) % sourceW;
      }

      const cols = Math.ceil(cssW / CELL_W) + 1;
      const rows = Math.ceil(cssH / CELL_H) + 1;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.font = `600 ${CELL_H}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textBaseline = "top";

      for (let row = 0; row < rows; row++) {
        const sy = Math.min(
          sourceH - 1,
          Math.floor(((row + 0.5) / rows) * sourceH),
        );
        for (let col = 0; col < cols; col++) {
          const worldX = Math.floor(col * CELL_W + scrollX);
          const x = ((worldX % sourceW) + sourceW) % sourceW;
          const i = (sy * sourceW + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          const ch =
            CHARSET[
              Math.min(CHARSET.length - 1, Math.floor(lum * CHARSET.length))
            ];
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillText(ch, col * CELL_W, row * CELL_H);
        }
      }

      if (!canvas.dataset.ready) {
        canvas.dataset.ready = "";
        canvas.style.opacity = "1";
        if (still) still.style.opacity = "0";
      }

      raf = requestAnimationFrame(paint);
    }

    function onTheme(event: Event) {
      const next = (event as CustomEvent<Theme>).detail;
      if (next !== "light" && next !== "dark") return;
      loading = loadTheme(next).catch(() => undefined);
    }

    loading = loadTheme(theme)
      .then(() => {
        if (!alive) return;
        raf = requestAnimationFrame(paint);
      })
      .catch(() => undefined);

    window.addEventListener("portfolio-theme", onTheme);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("portfolio-theme", onTheme);
      void loading;
    };
  }, []);

  return (
    <div
      aria-hidden
      className="ascii-sky pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden select-none"
    >
      <div className="ascii-sky-frame absolute inset-0">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-700 data-[ready]:opacity-100"
        />
        <div
          ref={stillRef}
          className="ascii-sky-still absolute inset-0 -z-10 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${withBasePath("/images/sky-ascii-still.jpg")})`,
          }}
        />
      </div>
    </div>
  );
}
