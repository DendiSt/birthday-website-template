"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BirthdayCakeProps {
  onComplete: () => void;
  recipientName: string;
}

export default function BirthdayCake({ onComplete, recipientName }: BirthdayCakeProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [heartParticles, setHeartParticles] = useState<
    { id: number; emoji: string; x: number; y: number; rotate: number; delay: number }[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);

    // Generate sparkles
    const newSparkles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 300 - 150,
      y: Math.random() * -200 - 50,
    }));
    setSparkles(newSparkles);

    // Generate heart explosion (pops slightly above candles, flies forward)
    const heartEmojis = ["❤️", "💖", "🤍", "💕", "💗"];
    const newHearts = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      x: Math.random() * 300 - 150, // -150px to 150px horizontally
      y: -(Math.random() * 100 + 80), // -80px to -180px vertically (just above the cake)
      rotate: Math.random() * 120 - 60, // gentle rotation
      delay: Math.random() * 0.2, // faster staggered start
    }));

    setTimeout(() => {
      setHeartParticles(newHearts);
      setShowHearts(true);
    }, 300);

    setTimeout(() => {
      setShowMessage(true);
    }, 2500);

    setTimeout(() => {
      onComplete();
    }, 6000);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-8 relative">
      {/* Heart Explosion */}
      <AnimatePresence>
        {showHearts && (
          <div className="absolute top-1/3 left-0 right-0 flex items-center justify-center pointer-events-none z-50">
            {heartParticles.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  x: h.x, 
                  y: [0, h.y, 600], // pop up, then fall down off screen
                  scale: [0, 1.2, 1], // pop up, then fall at normal size
                  rotate: [0, h.rotate, h.rotate * 2] 
                }}
                transition={{ 
                  duration: 3 + Math.random(), 
                  ease: "easeInOut", // smooth arc (slow at the peak, speeds up falling)
                  delay: h.delay 
                }}
                className="absolute text-3xl md:text-5xl"
                style={{ willChange: "transform, opacity" }} // Force hardware acceleration
              >
                {h.emoji}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Sparkle effects */}
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: s.x, y: s.y, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-yellow-300 text-xl z-20"
            style={{ top: "40%" }}
          >
            ✦
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Cake SVG */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        className="relative"
      >
        <svg width="260" height="220" viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cake base - bottom tier */}
          <rect x="30" y="140" width="200" height="60" rx="12" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" />
          <rect x="30" y="140" width="200" height="20" rx="8" fill="#FBCFE8" />

          {/* Cake middle tier */}
          <rect x="55" y="90" width="150" height="55" rx="10" fill="#FBCFE8" stroke="#F472B6" strokeWidth="2" />
          <rect x="55" y="90" width="150" height="18" rx="8" fill="#FDF2F8" />

          {/* Cake top tier */}
          <rect x="80" y="50" width="100" height="45" rx="8" fill="#FDF2F8" stroke="#F9A8D4" strokeWidth="2" />
          <rect x="80" y="50" width="100" height="15" rx="6" fill="white" />

          {/* Decorative dots (icing) */}
          {[45, 75, 105, 135, 165, 195, 215].map((x, i) => (
            <circle key={`dot1-${i}`} cx={x} cy="155" r="4" fill="#EC4899" opacity="0.7" />
          ))}
          {[70, 95, 120, 145, 170, 190].map((x, i) => (
            <circle key={`dot2-${i}`} cx={x} cy="105" r="3.5" fill="#F472B6" opacity="0.6" />
          ))}

          {/* Heart decorations */}
          <text x="115" y="180" fontSize="18" textAnchor="middle" fill="#DB2777" opacity="0.6">♥</text>
          <text x="145" y="180" fontSize="18" textAnchor="middle" fill="#DB2777" opacity="0.6">♥</text>

          {/* Candles */}
          {[105, 125, 145, 155, 135, 115].map((x, i) => (
            <g key={`candle-${i}`}>
              {/* Candle stick */}
              <rect x={x - 3} y={25} width={6} height={28} rx="2" fill={i % 2 === 0 ? "#EC4899" : "#F472B6"} />
              <rect x={x - 1} y={25} width={2} height={28} rx="1" fill="white" opacity="0.3" />

              {/* Flame */}
              <AnimatePresence>
                {candlesLit && (
                  <motion.g
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <motion.ellipse
                      cx={x}
                      cy={18}
                      rx={4}
                      ry={8}
                      fill="#FDE68A"
                      animate={{
                        ry: [8, 9, 7, 8],
                        rx: [4, 3.5, 4.5, 4],
                      }}
                      transition={{
                        duration: 0.5 + Math.random() * 0.3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.ellipse
                      cx={x}
                      cy={19}
                      rx={2}
                      ry={5}
                      fill="#FB923C"
                      animate={{
                        ry: [5, 6, 4, 5],
                      }}
                      transition={{
                        duration: 0.4 + Math.random() * 0.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {/* Glow */}
                    <circle cx={x} cy={16} r={10} fill="#FDE68A" opacity="0.15" />
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          ))}

          {/* Plate */}
          <ellipse cx="130" cy="203" rx="120" ry="12" fill="#FADADD" stroke="#F9A8D4" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Message and interaction */}
      <AnimatePresence mode="wait">
        {!showMessage ? (
          <motion.div
            key="blow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-pink-600 font-body text-lg mb-4">
              {candlesLit ? "Tiup lilinnya dulu, yuk!" : "✨"}
            </p>
            {candlesLit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBlowCandles}
                className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-pink-400/50 transition-all"
              >
                🌬️ Tiup Lilin
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-script text-rose-deep mb-3 drop-shadow-sm leading-tight">
              Happy Birthday!
            </h1>
            <p className="text-pink-500 font-body text-xl">Cintakuu 🎂</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
