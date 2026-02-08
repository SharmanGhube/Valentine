"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LightStreak {
  id: number;
  left: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  opacity: number;
  angle: number;
}

export default function PetalRain() {
  const [streaks, setStreaks] = useState<LightStreak[]>([]);

  useEffect(() => {
    const generated: LightStreak[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      width: Math.random() * 2 + 0.5,
      height: Math.random() * 80 + 40,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.08 + 0.03,
      angle: Math.random() * 20 - 10,
    }));
    setStreaks(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft light streaks */}
      {streaks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            width: `${s.width}px`,
            height: `${s.height}px`,
            background: `linear-gradient(180deg, transparent 0%, rgba(244, 114, 182, ${s.opacity * 0.7}) 50%, transparent 100%)`,
            transform: `rotate(${s.angle}deg)`,
          }}
          animate={{
            y: ["-20%", "120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
