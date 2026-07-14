export function getFaviconUrl(href: string): string | null {
  if (!href || href === "#") return null;

  try {
    const { hostname } = new URL(href);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return null;
  }
}
