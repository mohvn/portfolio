"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

function useIsDark() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: { [year: string]: number };
  contributions: ContributionDay[];
}

interface GitHubActivityCalendarProps {
  username?: string;
}

const CONTRIBUTION_LEVELS = [
  { level: 0, light: "#f4f4f5", dark: "#161b22" },
  { level: 1, light: "#d4d4d8", dark: "#0e4429" },
  { level: 2, light: "#a1a1aa", dark: "#006d32" },
  { level: 3, light: "#52525b", dark: "#26a641" },
  { level: 4, light: "#18181b", dark: "#39d353" },
];

const getColor = (level: number, isDark: boolean) => {
  const colors = isDark
    ? [
      "#161b22", // level 0
      "#0e4429", // level 1
      "#006d32", // level 2
      "#26a641", // level 3
      "#39d353", // level 4
    ]
    : [
      "#f4f4f5", // level 0
      "#d4d4d8", // level 1
      "#a1a1aa", // level 2
      "#52525b", // level 3
      "#18181b", // level 4
    ];
  return colors[level] || colors[0];
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function GitHubActivityCalendar({ username = "mohvn" }: GitHubActivityCalendarProps) {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isDark = useIsDark();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const currentYear = today.getFullYear();
        const previousYear = oneYearAgo.getFullYear();

        // Fetch data for both years if they differ
        const promises = [axios.get<ContributionsData>(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`
        )];

        if (previousYear !== currentYear) {
          promises.push(axios.get<ContributionsData>(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${previousYear}`
          ));
        }

        const responses = await Promise.all(promises);

        // Combine contributions from all years
        const allContributions: ContributionDay[] = [];
        const totalContributions: { [year: string]: number } = {};

        responses.forEach((response) => {
          allContributions.push(...response.data.contributions);
          Object.assign(totalContributions, response.data.total);
        });

        setData({
          total: totalContributions,
          contributions: allContributions,
        });
        setError(null);
      } catch (err) {
        setError("Failed to load contributions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">Loading contributions...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">{error || "No data available"}</div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setHours(0, 0, 0, 0);

  const yearContributions = data.contributions;

  // Filter contributions to only include the last year
  const lastYearContributions = yearContributions.filter((contrib) => {
    const contribDate = new Date(contrib.date);
    return contribDate >= oneYearAgo && contribDate <= today;
  });

  const totalContributions = lastYearContributions.reduce((sum, contrib) => sum + contrib.count, 0);

  const contributionsMap = new Map<string, ContributionDay>();
  lastYearContributions.forEach((contrib) => {
    contributionsMap.set(contrib.date, contrib);
  });

  const weeks: (ContributionDay | null)[][] = [];
  let currentWeek: (ContributionDay | null)[] = [];

  const startDate = new Date(oneYearAgo);
  const startDayOfWeek = startDate.getDay();

  for (let i = 0; i < startDayOfWeek; i++) {
    currentWeek.push(null);
  }

  const endDate = new Date(today);
  const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  for (let i = 0; i <= daysDiff; i++) {
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(currentDate.getDate() + i);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const contrib = contributionsMap.get(dateString);

    if (contrib) {
      currentWeek.push(contrib);
    } else {
      currentWeek.push({
        date: dateString,
        count: 0,
        level: 0,
      });
    }

    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  const monthLabels: { month: number; weekIndex: number }[] = [];
  const monthStarts = new Set<number>();

  weeks.forEach((week, weekIndex) => {
    week.forEach((day) => {
      if (day !== null) {
        const date = new Date(day.date);
        const dayOfMonth = date.getDate();
        const month = date.getMonth();
        // Only label the first day of each month
        if (dayOfMonth === 1 && !monthStarts.has(month)) {
          monthStarts.add(month);
          monthLabels.push({ month, weekIndex });
        }
      }
    });
  });

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">

        </div>

        <div className="flex flex-col overflow-visible">
          <div className="flex mb-1 overflow-visible">
            {weeks.map((week, weekIndex) => {
              const monthLabel = monthLabels.find((ml) => ml.weekIndex === weekIndex);
              return (
                <div
                  key={weekIndex}
                  className="text-[10px] text-muted-foreground leading-none flex-shrink-0"
                  style={{ width: "12.5px" }}
                >
                  {monthLabel ? MONTHS[monthLabel.month] : ""}
                </div>
              );
            })}
          </div>

          <div className="flex overflow-visible">
            <div className="flex overflow-visible" style={{ gap: "2.5px" }}>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col flex-shrink-0" style={{ gap: "2.5px" }}>
                  {/* Days */}
                  {week.map((day, dayIndex) => {
                    if (day === null) {
                      return (
                        <div
                          key={`empty-${weekIndex}-${dayIndex}`}
                          className="rounded-sm flex-shrink-0"
                          style={{ width: "10px", height: "10px", minWidth: "10px", minHeight: "10px" }}
                        />
                      );
                    }

                    const bgColor = getColor(day.level, isDark);

                    return (
                      <Tooltip key={day.date} delayDuration={0}>
                        <TooltipTrigger>
                          <div
                            className="rounded-sm cursor-pointer flex-shrink-0"
                            style={{
                              width: "10px",
                              height: "10px",
                              minWidth: "10px",
                              minHeight: "10px",
                              backgroundColor: bgColor,
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="flex w-full gap-2 border border-border bg-popover p-2 text-popover-foreground">
                          <span className="text-xs">{day.count} contributions on {day.date}</span>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with legend */}
        <div className="flex items-center justify-between gap-2 text-[10px] text-muted-foreground mt-2">
          <span className="text-xs">
            {totalContributions} contributions in the last year
          </span>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex" style={{ gap: "2.5px" }}>
              {CONTRIBUTION_LEVELS.map((level) => {
                const bgColor = getColor(level.level, isDark);
                return (
                  <div
                    key={level.level}
                    className="rounded-sm"
                    style={{ width: "10px", height: "10px", backgroundColor: bgColor }}
                  />
                );
              })}
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
