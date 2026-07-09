"use client";

import { Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function SectionLinkButton({
  href,
  label = "Copy link to section",
}: {
  href: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = new URL(window.location.href);
    url.hash = href.startsWith("#") ? href : `#${href}`;
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="absolute top-1 ml-1 size-7 shrink-0 border-none text-muted-foreground opacity-0 transition-opacity group-hover/panel-title:opacity-100"
      aria-label={label}
      onClick={handleCopy}
    >
      {copied ? <Check className="size-4" aria-hidden /> : <LinkIcon className="size-4" aria-hidden />}
    </Button>
  );
}

