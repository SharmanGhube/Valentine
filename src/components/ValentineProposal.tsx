"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NoButtonProps {
  onYes: () => void;
}

/* ---- Typewriter lines for the glass card ---- */
const cardLines = [
  { text: "Every moment with you feels like a dream come true.", style: "normal" as const },
  { text: "You make my heart skip a beat every single day.", style: "highlight" as const },
  { text: "So here I am, asking the most important question...", style: "dim" as const },
];

/* ---- Typewriter hook ---- */
function useTypewriter(lines: typeof cardLines, startDelay: number) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || done) return;

    if (currentLine >= lines.length) {
      setDone(true);
      return;
    }

    const fullText = lines[currentLine].text;

    if (currentChar <= fullText.length) {
      const speed = currentChar === 0 ? 400 : 28 + Math.random() * 18;
      const t = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = fullText.slice(0, currentChar);
          return next;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }
  }, [started, currentLine, currentChar, done, lines]);

  return { displayed, done, currentLine };
}

export default function ValentineProposal({ onYes }: NoButtonProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [showMobileMessage, setShowMobileMessage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noSize, setNoSize] = useState(1);
  const [noRotation, setNoRotation] = useState(0);
  const [noOpacity, setNoOpacity] = useState(1);
  const [noTrail, setNoTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [noLabel, setNoLabel] = useState("No");
  const [yesClicked, setYesClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const trailId = useRef(0);

  const { displayed, currentLine } = useTypewriter(cardLines, 3000);

  const noMessages = [
    "Are you sure?",
    "Really? Think again!",
    "Please? Pretty please?",
    "Don't do this to me!",
    "I'll be sad forever!",
    "You're breaking my heart!",
    "Noooo! Try again!",
    "The right answer is Yes!",
    "Just click Yes already!",
    "I won't give up!",
  ];

  const noLabels = [
    "No", "Nope", "Hmm...", "😢", "...", "🥺", "Fine, No", "💔", "Still no?", "😭",
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.innerWidth < 768
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const moveNoButton = useCallback(() => {
    const buttonWidth = 120;
    const buttonHeight = 44;
    const margin = 20;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const safeX = margin + buttonWidth / 2;
    const safeY = margin + buttonHeight / 2;
    const maxX = vw - margin - buttonWidth / 2;
    const maxY = vh - margin - buttonHeight / 2;

    const targetX = safeX + Math.random() * (maxX - safeX);
    const targetY = safeY + Math.random() * (maxY - safeY);

    const centerX = vw / 2;
    const centerY = vh / 2;

    const newX = targetX - centerX;
    const newY = targetY - centerY;

    if (hasMoved) {
      trailId.current += 1;
      setNoTrail((prev) => [
        ...prev.slice(-5),
        { x: noPosition.x, y: noPosition.y, id: trailId.current },
      ]);
    }

    setNoPosition({ x: newX, y: newY });
    setHasMoved(true);
  }, [hasMoved, noPosition]);

  const handleNoInteraction = () => {
    const attempts = noAttempts + 1;
    setNoAttempts(attempts);
    setYesScale((prev) => Math.min(prev + 0.12, 1.8));

    setNoSize(Math.max(1 - attempts * 0.07, 0.4));
    setNoRotation((prev) => prev + (Math.random() > 0.5 ? 1 : -1) * (5 + attempts * 2));
    setNoOpacity(Math.max(1 - attempts * 0.06, 0.3));
    setNoLabel(noLabels[attempts % noLabels.length]);

    if (isMobile) {
      setShowMobileMessage(true);
      setTimeout(() => setShowMobileMessage(false), 2000);
    }
    moveNoButton();
  };

  const handleNoHover = () => {
    if (!isMobile) {
      handleNoInteraction();
    }
  };

  const handleYesClick = () => {
    setYesClicked(true);
    setTimeout(() => onYes(), 200);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center w-full max-w-lg mx-auto gap-3 sm:gap-5"
    >
      {/* ---- Heading section ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center w-full"
      >
        {/* Heartbeat SVG */}
        <motion.div className="flex justify-center mb-2 animate-heartbeat">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="sm:w-[36px] sm:h-[36px]">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#heartGrad)"
            />
            <defs>
              <linearGradient id="heartGrad" x1="2" y1="3" x2="22" y2="21">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-1.5 tracking-tight leading-none"
          style={{
            fontFamily: "var(--font-playfair), serif",
            background: "linear-gradient(135deg, #f472b6 0%, #fb7185 30%, #fda4af 60%, #f9a8d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundSize: "200% 200%",
            animation: "gradient-shift 6s ease infinite",
          }}
        >
          Khushi
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-sm sm:text-base text-gray-500 font-light tracking-wide mb-1"
        >
          I have a question for you
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, type: "spring" }}
          className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
          style={{
            fontFamily: "var(--font-playfair), serif",
            background: "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 50%, #e5e7eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Will you be my Valentine?
        </motion.h2>
      </motion.div>

      {/* ---- Glass Card with Typewriter ---- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.8 }}
        className="w-full max-w-sm sm:max-w-md mx-auto rounded-2xl sm:rounded-3xl p-4 sm:p-5 relative overflow-hidden"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(244, 114, 182, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 60px rgba(244, 114, 182, 0.05)",
        }}
      >
        {/* Wandering glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(244,114,182,0.06) 0%, transparent 60%)",
              "radial-gradient(circle at 80% 50%, rgba(244,114,182,0.06) 0%, transparent 60%)",
              "radial-gradient(circle at 50% 80%, rgba(244,114,182,0.06) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 50%, rgba(244,114,182,0.06) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 text-center space-y-2">
          {/* Line 1 */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light min-h-[1.5em]">
            {displayed[0] || ""}
            {currentLine === 0 && displayed[0] !== undefined && displayed[0].length < cardLines[0].text.length && (
              <span className="inline-block w-[2px] h-[1em] bg-pink-400/60 ml-0.5 align-middle animate-cursor-blink" />
            )}
          </p>

          {/* Line 2 — highlight */}
          <p className="min-h-[1.5em]">
            {displayed[1] !== undefined && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm sm:text-base font-normal leading-relaxed"
                style={{
                  background: "linear-gradient(135deg, #f472b6, #fb7185)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 8px rgba(244,114,182,0.3))",
                }}
              >
                {displayed[1]}
              </motion.span>
            )}
            {currentLine === 1 && displayed[1] !== undefined && displayed[1].length < cardLines[1].text.length && (
              <span className="inline-block w-[2px] h-[1em] bg-pink-400/60 ml-0.5 align-middle animate-cursor-blink" />
            )}
          </p>

          {/* Line 3 — dim */}
          <div className="min-h-[1.5em]">
            {displayed[2] !== undefined && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 text-xs sm:text-sm leading-relaxed"
              >
                {displayed[2]}
                {currentLine === 2 && displayed[2].length < cardLines[2].text.length && (
                  <span className="inline-block w-[2px] h-[1em] bg-gray-500/60 ml-0.5 align-middle animate-cursor-blink" />
                )}
              </motion.p>
            )}
          </div>

          {/* Hearts after typing completes */}
          <AnimatePresence>
            {displayed[2] && displayed[2].length === cardLines[2].text.length && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex justify-center gap-2 pt-1"
              >
                {[0, 1, 2].map((i) => (
                  <motion.svg
                    key={i}
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill={`rgba(244, 114, 182, ${0.25 + i * 0.1})`}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </motion.svg>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ---- Buttons ---- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 relative min-h-[60px] sm:min-h-[80px] w-full justify-center"
      >
        {/* YES Button with heartbeat + heart morph on click */}
        <motion.button
          whileHover={
            !yesClicked
              ? {
                  boxShadow:
                    "0 12px 50px rgba(244, 114, 182, 0.45), 0 0 30px rgba(244, 114, 182, 0.2)",
                }
              : {}
          }
          whileTap={!yesClicked ? { scale: yesScale * 0.95 } : {}}
          animate={
            yesClicked
              ? {
                  scale: [yesScale, yesScale * 1.3, yesScale * 0.9],
                  borderRadius: ["16px", "50%", "50%"],
                }
              : { scale: yesScale }
          }
          transition={
            yesClicked
              ? { duration: 0.5, ease: "easeInOut" }
              : { type: "spring", stiffness: 300, damping: 20 }
          }
          onClick={handleYesClick}
          disabled={yesClicked}
          className="px-7 sm:px-9 py-2.5 sm:py-3 text-white text-base sm:text-lg font-semibold rounded-2xl z-10 cursor-pointer tracking-wide relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #ec4899 0%, #f43f5e 50%, #e11d48 100%)",
            boxShadow: "0 8px 30px rgba(244, 114, 182, 0.25)",
            fontFamily: "var(--font-inter), sans-serif",
            animation: yesClicked ? "none" : "heartbeat 1.2s ease-in-out infinite",
          }}
        >
          {/* Shimmer */}
          {!yesClicked && (
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2.5s linear infinite",
              }}
            />
          )}
          {/* Text fades, heart appears */}
          <AnimatePresence mode="wait">
            {!yesClicked ? (
              <motion.span
                key="text"
                className="relative z-10"
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.15 }}
              >
                Yes, I&apos;d love to
              </motion.span>
            ) : (
              <motion.span
                key="heart"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3, type: "spring" }}
                className="relative z-10 flex items-center justify-center"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* NO button ghost trail */}
        <AnimatePresence>
          {noTrail.map((pos) => (
            <motion.div
              key={pos.id}
              initial={{ opacity: 0.4, scale: noSize }}
              animate={{ opacity: 0, scale: noSize * 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed px-6 py-2 rounded-2xl pointer-events-none z-0"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            />
          ))}
        </AnimatePresence>

        {/* NO Button */}
        <motion.button
          ref={noButtonRef}
          animate={{
            x: hasMoved ? noPosition.x : 0,
            y: hasMoved ? noPosition.y : 0,
            scale: noSize,
            rotate: noRotation,
            opacity: noOpacity,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onMouseEnter={handleNoHover}
          onClick={handleNoInteraction}
          className="px-6 sm:px-8 py-2.5 sm:py-3 text-gray-300 text-sm sm:text-base rounded-2xl z-10 cursor-pointer select-none font-medium tracking-wide whitespace-nowrap"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 255, 255, 0.03)",
            fontFamily: "var(--font-inter), sans-serif",
            position: hasMoved ? "fixed" : "relative",
            left: hasMoved ? "50%" : undefined,
            top: hasMoved ? "50%" : undefined,
          }}
        >
          {noLabel}
        </motion.button>
      </motion.div>

      {/* Mobile "try again" popup */}
      <AnimatePresence>
        {showMobileMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 z-50 text-center max-w-[280px] sm:max-w-xs w-full"
            style={{
              background: "rgba(15, 15, 15, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(244, 114, 182, 0.15)",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.5), 0 0 80px rgba(244, 114, 182, 0.08)",
            }}
          >
            <p className="text-lg sm:text-xl text-gray-200 font-medium mb-2">
              {noMessages[noAttempts % noMessages.length]}
            </p>
            <p className="text-pink-400/70 text-xs sm:text-sm font-normal">
              Tap &quot;Yes&quot; instead
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attempt feedback */}
      <AnimatePresence>
        {noAttempts > 0 && (
          <motion.p
            key={noAttempts}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-gray-600 text-[10px] sm:text-xs text-center tracking-wide"
          >
            {noAttempts === 1 && "Hmm... the No button seems scared of you"}
            {noAttempts === 2 && "It's getting smaller... just like your chances of escaping 😏"}
            {noAttempts === 3 && "You can't escape love, Khushi"}
            {noAttempts === 4 && "The No button is having an existential crisis"}
            {noAttempts === 5 && "It's almost invisible now... take the hint?"}
            {noAttempts >= 6 && `${noAttempts} attempts — the No button is begging for mercy`}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
