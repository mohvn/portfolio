"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  href: string;
  status?: "building" | "live" | "comingSoon" | "private";
  statusLabel?: string;
  screenshot?: string;
  comingSoon?: boolean;
}

export function ProjectCard({
  title,
  description,
  href,
  status = "live",
  statusLabel,
  screenshot,
  comingSoon = false,
}: ProjectCardProps) {
  const statusConfig = {
    building: {
      label: "Building",
      color: "text-red-500",
      bgColor: "bg-red-500",
    },
    live: {
      label: "Live",
      color: "text-green-500",
      bgColor: "bg-green-500",
    },
    comingSoon: {
      label: "Coming Soon",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    private: {
      label: "Private",
      color: "text-muted-foreground",
      bgColor: "bg-muted-foreground",
    },
  };

  const config = statusConfig[status || "live"];
  const displayLabel = statusLabel ?? config.label;

  return (
    <div className="relative z-10 p-3">
      <Link
        href={href}
        className="flex flex-col gap-2 cursor-pointer group w-full"
      >
        <div className="p-[4px] rounded-[12px] border border-border bg-background">
          <div className="relative w-full aspect-[1200/660] bg-muted rounded-[8px] border border-border overflow-hidden select-none">
            {comingSoon && (
              <h1 className="absolute top-2 left-2 z-10 text-xs text-muted-foreground group-hover:text-foreground font-medium transition-all duration-300 group-hover:left-1/2 group-hover:-translate-x-1/2">
                Coming Soon
              </h1>
            )}
            {screenshot && (
              <Image
                alt={`${title} Screenshot`}
                src={screenshot}
                width={1500}
                height={1000}
                className="absolute inset-0 w-full h-full object-contain"
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div className="px-2 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="text-[1.10rem] leading-[1.10] text-foreground font-bold">
              {title}
            </h3>
            <div className="flex items-center gap-1 select-none">
              {(status === "building" || status === "live") && (
                <div className="relative flex items-center justify-center w-3.5 h-3.5">
                  <div
                    className={`absolute inset-0 m-auto animate-ping group-hover:hidden ${config.bgColor}`}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      opacity: 0.4,
                    }}
                  />
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className={`relative z-10 ${config.color} w-3.5 h-3.5`}
                  >
                    <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
                  </svg>
                </div>
              )}
              <p className="text-sm text-muted-foreground font-medium">{displayLabel}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </Link>
      <div className="block md:hidden">
        <div className="h-px w-full bg-border" />
      </div>
    </div>
  );
}
