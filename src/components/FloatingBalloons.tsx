"use client";

import { useEffect, useState } from "react";

interface GlowOrb {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  blur: number;
}

const orbColors = [
  "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(251,113,133,0.06) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(190,24,93,0.07) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)",
  "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
];

export default function FloatingBalloons() {
  const [orbs, setOrbs] = useState<GlowOrb[]>([]);

  useEffect(() => {
    const generated: GlowOrb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
      size: Math.random() * 200 + 100,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
      color: orbColors[Math.floor(Math.random() * orbColors.length)],
      blur: Math.random() * 40 + 30,
    }));
    setOrbs(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full animate-float-orb"
          style={{
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
