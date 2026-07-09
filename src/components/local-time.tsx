"use client";

import { useEffect, useState } from "react";

function getTimeData(timezone: string) {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const localOffset = -now.getTimezoneOffset();
  const targetOffset =
    (new Date(
      now.toLocaleString("en-US", { timeZone: timezone }),
    ).getTime() -
      new Date(now.toLocaleString("en-US", { timeZone: "UTC" })).getTime()) /
    60_000;
  const diffHours = Math.abs(targetOffset - localOffset) / 60;
  const diff =
    diffHours < 1
      ? " // same time"
      : ` // ${Math.floor(diffHours)}h ${targetOffset > localOffset ? "ahead" : "behind"}`;

  return { time, diff };
}

export function LocalTime({ timezone }: { timezone: string }) {
  const [data, setData] = useState(() => getTimeData(timezone));

  useEffect(() => {
    const update = () => setData(getTimeData(timezone));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [timezone]);

  return (
    <p className="text-balance">
      <span>{data.time}</span>
      <span className="text-muted-foreground" aria-hidden>
        {data.diff}
      </span>
    </p>
  );
}
