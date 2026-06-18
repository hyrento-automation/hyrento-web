"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

interface StatsCounterProps {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  label: string;
}

export function StatsCounter({
  value,
  suffix = "",
  decimals = 0,
  duration = 2,
  label,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (!inView) return;

    const end = value;
    const totalFrames = Math.min(Math.floor(duration * 60), 120);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = end * (progress * (2 - progress));
      
      setCount(current);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [inView, value, duration]);

  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div ref={ref} className="text-center">
      <div className="text-stats font-heading font-800 text-brand-navy tracking-tight mb-2">
        <span className="gradient-text">
          {formatNumber(count)}
          {suffix}
        </span>
      </div>
      <p className="font-heading font-600 text-body-sm text-text-secondary uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}
