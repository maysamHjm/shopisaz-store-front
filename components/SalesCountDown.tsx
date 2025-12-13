"use client";

import { useEffect, useState } from "react";

function formatTime(num: number) {
  return num.toString().padStart(2, "0");
}

export default function SalesCountDown({
  caption,
  time,
  className,
}: {
  caption: string;
  time: Date;
  className?: string;
}) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const target = new Date(time).getTime();

    const update = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setRemaining("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setRemaining(
        `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`
      );
    };

    update(); // run immediately
    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, [time]);

  return (
    <div className={`text-error ${className || ""}`}>
      {caption} {remaining}
    </div>
  );
}
