import { bind, play, setVolume, type SoundName } from "cuelume";

let initialized = false;

export function initUiSound() {
  if (typeof window === "undefined" || initialized) return;
  setVolume(0.55);
  bind();
  initialized = true;
}

export function playUiSound(name: SoundName = "toggle") {
  if (typeof window === "undefined") return;
  try {
    play(name);
  } catch {
    // ignore audio failures (unsupported name / blocked autoplay)
  }
}
