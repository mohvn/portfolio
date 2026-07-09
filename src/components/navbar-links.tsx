"use client";

import { cn } from "@/components/lib/utils";
import { useEffect, useState } from "react";

const sectionIds = ["experiences", "projects", "skills"] as const;

export interface NavbarLinkItem {
  href: string;
  label: string;
  id: string;
}

export function NavbarLinks({ items }: { items: NavbarLinkItem[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const id of sectionIds) {
      const element = document.getElementById(id);
      if (!element) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <nav className="flex items-center gap-4 max-sm:hidden">
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            className={cn(
              "text-sm font-medium tracking-wide text-muted-foreground transition-[color] hover:text-foreground",
              isActive && "text-foreground",
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
