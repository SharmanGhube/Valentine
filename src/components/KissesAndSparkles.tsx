"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  type: "dot" | "ring" | "diamond";
  color: string;
}

const particleColors = [
  "rgba(244, 114, 182, 0.3)",
  "rgba(251, 113, 133, 0.25)",
  "rgba(249, 168, 212, 0.28)",
  "rgba(168, 85, 247, 0.2)",
  "rgba(253, 164, 175, 0.22)",
];

export default function KissesAndSparkles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: Array<"dot" | "ring" | "diamond"> = ["dot", "ring", "diamond"];
    const generated: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 95 + 2.5,
      top: Math.random() * 95 + 2.5,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 5 + 4,
      delay: Math.random() * 8,
      type: types[Math.floor(Math.random() * types.length)],
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
          }}
          animate={{
            opacity: [0, 1, 0.6, 0],
            scale: [0.5, 1.2, 1, 0.5],
            y: [0, -30, -60],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.type === "dot" && (
            <div
              className="rounded-full"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          )}
          {p.type === "ring" && (
            <div
              className="rounded-full border"
              style={{
                width: `${p.size * 2}px`,
                height: `${p.size * 2}px`,
                borderColor: p.color,
                borderWidth: "1.5px",
              }}
            />
          )}
          {p.type === "diamond" && (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                transform: "rotate(45deg)",
                borderRadius: "2px",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
