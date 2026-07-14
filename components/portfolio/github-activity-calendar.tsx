"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { LocaleCopy } from "@/lib/i18n/types";

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
  labels: LocaleCopy["ui"]["github"];
  months: string[];
}

const CONTRIBUTION_LEVELS = [
  { level: 0 },
  { level: 1 },
  { level: 2 },
  { level: 3 },
  { level: 4 },
];

const getColor = (level: number, isDark: boolean) => {
  const colors = isDark
    ? ["#1a1a1a", "#404040", "#707070", "#a8a8a8", "#eeeeee"]
    : ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"];
  return colors[level] || colors[0];
};

function formatLabel(template: string, values: Record<string, string | number>) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template,
  );
}

export function GitHubActivityCalendar({
  username = "mohvn",
  labels,
  months,
}: GitHubActivityCalendarProps) {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const isDark = useIsDark();

  useEffect(() => {
    let cancelled = false;

    const fetchContributions = async () => {
      try {
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        const currentYear = today.getFullYear();
        const previousYear = oneYearAgo.getFullYear();

        const promises = [
          axios.get<ContributionsData>(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=${currentYear}`,
          ),
        ];

        if (previousYear !== currentYear) {
          promises.push(
            axios.get<ContributionsData>(
              `https://github-contributions-api.jogruber.de/v4/${username}?y=${previousYear}`,
            ),
          );
        }

        const responses = await Promise.all(promises);

        if (cancelled) return;

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
        setFailed(false);
      } catch (err) {
        if (!cancelled) {
          setFailed(true);
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchContributions();

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="text-sm text-grayscale-10">{labels.loading}</div>
      </div>
    );
  }

  if (failed || !data) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="text-sm text-grayscale-10">
          {failed ? labels.error : labels.noData}
        </div>
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);
  oneYearAgo.setHours(0, 0, 0, 0);

  const lastYearContributions = data.contributions.filter((contrib) => {
    const contribDate = new Date(contrib.date);
    return contribDate >= oneYearAgo && contribDate <= today;
  });

  const totalContributions = lastYearContributions.reduce(
    (sum, contrib) => sum + contrib.count,
    0,
  );

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
  const daysDiff = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  for (let i = 0; i <= daysDiff; i++) {
    const currentDate = new Date(startDate.getTime());
    currentDate.setDate(currentDate.getDate() + i);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const contrib = contributionsMap.get(dateString);

    currentWeek.push(
      contrib ?? {
        date: dateString,
        count: 0,
        level: 0,
      },
    );

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
        if (dayOfMonth === 1 && !monthStarts.has(month)) {
          monthStarts.add(month);
          monthLabels.push({ month, weekIndex });
        }
      }
    });
  });

  return (
    <TooltipProvider>
      <div className="mt-4 flex w-full justify-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col overflow-visible">
            <div className="mb-1 flex overflow-visible">
              {weeks.map((week, weekIndex) => {
                const monthLabel = monthLabels.find(
                  (ml) => ml.weekIndex === weekIndex,
                );
                return (
                  <div
                    key={weekIndex}
                    className="shrink-0 text-[10px] leading-none text-grayscale-10"
                    style={{ width: "12.5px" }}
                  >
                    {monthLabel ? months[monthLabel.month] : ""}
                  </div>
                );
              })}
            </div>

            <div className="flex overflow-visible">
              <div className="flex overflow-visible" style={{ gap: "2.5px" }}>
                {weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="flex shrink-0 flex-col"
                    style={{ gap: "2.5px" }}
                  >
                    {week.map((day, dayIndex) => {
                      if (day === null) {
                        return (
                          <div
                            key={`empty-${weekIndex}-${dayIndex}`}
                            className="shrink-0"
                            style={{
                              width: "10px",
                              height: "10px",
                              minWidth: "10px",
                              minHeight: "10px",
                            }}
                          />
                        );
                      }

                      const bgColor = getColor(day.level, isDark);

                      return (
                        <Tooltip key={day.date}>
                          <TooltipTrigger
                            delay={0}
                            render={
                              <div
                                className="shrink-0 cursor-pointer rounded-xs"
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  minWidth: "10px",
                                  minHeight: "10px",
                                  backgroundColor: bgColor,
                                }}
                              />
                            }
                          />
                          <TooltipContent className="border-grayscale-3 bg-grayscale-1 text-grayscale-11">
                            <span className="text-xs">
                              {formatLabel(labels.contributionOn, {
                                count: day.count,
                                date: day.date,
                              })}
                            </span>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-4 text-[10px] text-grayscale-10">
            <span className="text-xs">
              {formatLabel(labels.contributions, { count: totalContributions })}
            </span>
            <div className="flex items-center gap-2">
              <span>{labels.less}</span>
              <div className="flex" style={{ gap: "2.5px" }}>
                {CONTRIBUTION_LEVELS.map((level) => (
                  <div
                    key={level.level}
                    className="rounded-xs"
                    style={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: getColor(level.level, isDark),
                    }}
                  />
                ))}
              </div>
              <span>{labels.more}</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
