"use client";

import { useEffect, useState } from "react";

interface HeartParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  blur: number;
}

const heartColors = [
  "rgba(244, 114, 182, 0.15)",
  "rgba(251, 113, 133, 0.12)",
  "rgba(248, 113, 113, 0.1)",
  "rgba(252, 165, 165, 0.13)",
  "rgba(249, 168, 212, 0.16)",
  "rgba(253, 164, 175, 0.12)",
];

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const generated: HeartParticle[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 12,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      blur: Math.random() > 0.5 ? 1 : 0,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-drift-up-sway"
          style={{
            left: `${heart.left}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{ filter: `blur(${heart.blur}px)` }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
