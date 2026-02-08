"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import FloatingBalloons from "@/components/FloatingBalloons";
import KissesAndSparkles from "@/components/KissesAndSparkles";
import PetalRain from "@/components/PetalRain";
import ValentineProposal from "@/components/ValentineProposal";
import CelebrationScreen from "@/components/CelebrationScreen";

export default function ValentinePage() {
  const [saidYes, setSaidYes] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleYes = () => {
    // Start heart morph transition, then switch to celebration
    setTransitioning(true);
    setTimeout(() => {
      setSaidYes(true);
      setTransitioning(false);
    }, 1400);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Subtle background gradients */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(190,24,93,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 10%, rgba(244,63,94,0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(236,72,153,0.1) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40 animate-gradient"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(190,24,93,0.08) 25%, transparent 50%, rgba(244,63,94,0.06) 75%, transparent 100%)",
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      {/* Background animation layers */}
      <AnimatePresence>
        {!saidYes && (
          <>
            <FloatingHearts />
            <FloatingBalloons />
            <KissesAndSparkles />
            <PetalRain />
          </>
        )}
      </AnimatePresence>

      {/* Heart morph overlay during transition */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* The morphing heart */}
            <motion.div
              initial={{ scale: 0.3, borderRadius: "16px", rotate: 0 }}
              animate={{
                scale: [0.3, 1.8, 40],
                borderRadius: ["16px", "50%", "50%"],
                rotate: [0, 0, 0],
              }}
              transition={{
                duration: 1.4,
                times: [0, 0.5, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex items-center justify-center"
              style={{ width: 80, height: 80 }}
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="w-full h-full"
                initial={{ opacity: 1 }}
                animate={{ opacity: [1, 1, 0] }}
                transition={{ duration: 1.4, times: [0, 0.6, 1] }}
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="url(#morphHeartGrad)"
                />
                <defs>
                  <linearGradient id="morphHeartGrad" x1="2" y1="3" x2="22" y2="21">
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </motion.div>
            {/* Pink wash that fills the screen */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.6, 0] }}
              transition={{ duration: 1.4, times: [0, 0.5, 0.8, 1] }}
              style={{ background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(10,10,10,0.95) 70%)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {!saidYes ? (
          <motion.main
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: transitioning ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center justify-center h-[100dvh] px-4 py-4 sm:py-6 overflow-hidden"
          >
            <ValentineProposal onYes={handleYes} />

            {/* Minimal bottom decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 1 }}
              className="mt-3 sm:mt-4 text-center"
            >
              <div className="flex items-center gap-3 justify-center">
                <div
                  className="w-8 h-px"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(244,114,182,0.2))",
                  }}
                />
                <p className="text-gray-600 text-xs tracking-widest uppercase font-light">
                  Made with love, by Sharman
                </p>
                <div
                  className="w-8 h-px"
                  style={{
                    background: "linear-gradient(90deg, rgba(244,114,182,0.2), transparent)",
                  }}
                />
              </div>
            </motion.div>
          </motion.main>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CelebrationScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
