"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/**
 * targetDate: ISO string for when the offer ends. Update this to match a
 * real promotion — the component just counts down to whatever date it's given.
 */
export default function CountdownTimer({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime();
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Ngày", value: time?.days },
    { label: "Giờ", value: time?.hours },
    { label: "Phút", value: time?.minutes },
    { label: "Giây", value: time?.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {units.map((u) => (
        <div
          key={u.label}
          className="countdown-box flex w-16 flex-col items-center justify-center py-3 sm:w-20 sm:py-4"
        >
          <span className="countdown-digit text-2xl font-extrabold tabular-nums sm:text-3xl">
            {u.value === undefined ? "--" : String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
