"use client";

import { Icon } from "@iconify/react";
import type { Portfolio } from "@/lib/i18n";

export function SkillsSection({ portfolio }: { portfolio: Portfolio }) {
  const { ui, skills } = portfolio;

  return (
    <section aria-labelledby="skills-heading" className="flex flex-col gap-5">
      <h2 id="skills-heading">{ui.sections.skills}</h2>
      <div className="space-y-4">
        {skills.map((group) => (
          <div
            key={group.id}
            className="grid grid-cols-[clamp(6.4rem,20vw,8rem)_minmax(0,1fr)] gap-2"
          >
            <h3 className="text-[13px] text-foreground-tertiary">{group.title}</h3>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2">
              {group.items.map((item) => (
                <li key={`${group.id}-${item.name}`}>
                  <a
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                    className="flex items-center gap-1.5 text-[13px] text-foreground-secondary hover:text-foreground"
                  >
                    <span
                      aria-hidden
                      className="flex size-[13px] shrink-0 items-center justify-center text-current opacity-70 sm:size-3.5 [&_svg]:size-full"
                    >
                      <Icon icon={item.icon} />
                    </span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
