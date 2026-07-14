import { withBasePath } from "@/lib/base-path";

const clips = new Map<string, HTMLAudioElement>();

function getClip(src: string, volume = 0.5) {
  let base = clips.get(src);
  if (!base) {
    base = new Audio(src);
    base.preload = "auto";
    base.volume = volume;
    clips.set(src, base);
  }
  return base;
}

export function playUiSound(src = "/sounds/toggle.wav", volume = 0.5) {
  if (typeof window === "undefined") return;

  const base = getClip(withBasePath(src), volume);
  const clip = base.cloneNode(true) as HTMLAudioElement;
  clip.volume = volume;
  void clip.play().catch(() => {});
}
