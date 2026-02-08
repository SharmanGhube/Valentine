"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  delay: number;
  size: number;
  opacity: number;
}

export default function CelebrationScreen() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);

    const celebHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: Math.random() * 20 + 12,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setHearts(celebHearts);

    const timer = setTimeout(() => setShowConfetti(false), 8000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
      {/* Clean gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f0f 40%, #0a0a0a 60%, #0d0d0d 100%)",
        }}
      />
      {/* Subtle dark glow */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, rgba(236,72,153,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Confetti */}
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={250}
          recycle={true}
          colors={[
            "#f472b6",
            "#fb7185",
            "#ec4899",
            "#f43f5e",
            "#f9a8d4",
            "#fda4af",
            "#a855f7",
            "#fbbf24",
          ]}
          gravity={0.08}
          wind={0.01}
          opacity={0.8}
        />
      )}

      {/* Floating SVG hearts in background */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8],
            opacity: [0, heart.opacity, 0],
            y: [0, -60, -120],
          }}
          transition={{
            duration: 4,
            delay: heart.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="rgba(244,114,182,0.2)">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {/* Main celebration content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="relative z-10 text-center px-5 sm:px-6 py-6 sm:py-8 max-w-md sm:max-w-lg mx-auto my-auto"
      >
        {/* Animated heart SVG */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-4 sm:mb-5"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="sm:w-[64px] sm:h-[64px]">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#celebHeartGrad)"
            />
            <defs>
              <linearGradient id="celebHeartGrad" x1="2" y1="3" x2="22" y2="21">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Yayy text */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-3 tracking-tight pb-1 leading-[1.15]"
          style={{
            fontFamily: "var(--font-playfair), serif",
            background: "linear-gradient(135deg, #f472b6 0%, #fb7185 50%, #fda4af 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          She said yes!
        </motion.h1>

        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl font-medium text-gray-400 mb-4 sm:mb-5 tracking-wide"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          I always knew it would be you
        </motion.h2>

        {/* Love message - glass card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 mb-4 sm:mb-6"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(244, 114, 182, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(244, 114, 182, 0.05)",
          }}
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light">
            You know that feeling when everything finally makes sense?
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed font-light mt-3 sm:mt-4">
            That&apos;s what it felt like the day I met you,{" "}
            <span
              className="font-semibold"
              style={{
                background: "linear-gradient(135deg, #ec4899, #f43f5e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Khushi
            </span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 font-light leading-relaxed">
            I don&apos;t need a special day to tell you this — but I&apos;ll take any excuse
            to remind you that my favourite place in the world is wherever you are.
          </p>

          {/* Minimal animated hearts row */}
          <div className="flex justify-center gap-3 mt-4 sm:mt-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={`rgba(244, 114, 182, ${0.3 + i * 0.12})`}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Together forever */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.p
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide"
            style={{
              fontFamily: "var(--font-playfair), serif",
              background: "linear-gradient(135deg, #d1d5db, #9ca3af)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Yours, always.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 3.5, duration: 1 }}
            className="text-sm sm:text-base font-light tracking-wider mt-1"
            style={{
              fontFamily: "var(--font-playfair), serif",
              color: "rgba(244, 114, 182, 0.5)",
            }}
          >
            — Sharman
          </motion.p>
          <div
            className="w-16 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.4), transparent)" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
