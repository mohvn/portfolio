import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CONTACT } from "@/lib/contact";

const socialButtonClassName =
  "size-8 rounded-lg border-border bg-background text-foreground/80 shadow-none hover:bg-muted hover:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 [&_svg:not([class*='size-'])]:size-4.5";

const socialLinks = [
  {
    href: CONTACT.github,
    label: "GitHub",
    Icon: Github,
  },
  {
    href: CONTACT.linkedin,
    label: "LinkedIn",
    Icon: Linkedin,
  },
] as const;

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-2">
      {socialLinks.map(({ href, label, Icon }) => (
        <li key={label}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={socialButtonClassName}
                render={
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <Icon aria-hidden />
                <span className="sr-only">{label}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
}
