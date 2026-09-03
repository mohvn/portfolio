export function FooterSection() {
  return (
    <footer
      aria-hidden
      className="mt-auto overflow-hidden pt-12 text-foreground"
      style={{ opacity: "var(--footer-signature-opacity)" }}
    >
      <div className="relative w-full overflow-hidden leading-none">
        <p className="pointer-events-none -mb-[0.22em] select-none whitespace-nowrap text-[min(28vw,9.5rem)] font-medium tracking-tighter">
          mohan
        </p>
      </div>
    </footer>
  );
}
