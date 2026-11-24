import { withBasePath } from "@/lib/base-path";

export function SkyWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(72vh,40rem)] sky-wash"
      style={{
        backgroundImage: `url(${withBasePath("/images/sky-light.jpg")})`,
      }}
    />
  );
}
