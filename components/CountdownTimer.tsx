"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate: string; // ISO string e.g. "2026-10-15"
  onReached: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate, onReached }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const target = new Date(targetDate + "T00:00:00").getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        onReached();
        return null;
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const tl = calculateTimeLeft();
      if (tl === null) {
        clearInterval(timer);
      }
      setTimeLeft(tl);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onReached]);

  if (!isMounted || timeLeft === null) return null;

  const blocks = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-pink-600 font-body text-sm mb-6 tracking-wider uppercase"
      >
        Sesuatu yang spesial sedang menunggumu...
      </motion.p>
      
      <div className="flex justify-center gap-3 sm:gap-5">
        {blocks.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-2xl w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center shadow-lg">
              <motion.span
                key={block.value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-2xl sm:text-4xl font-bold text-pink-700 font-body tabular-nums"
              >
                {String(block.value).padStart(2, "0")}
              </motion.span>
            </div>
            <span className="text-xs sm:text-sm text-pink-500 mt-2 font-body font-medium">{block.label}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-pink-400 font-body text-xs mt-8"
      >
        Kembali lagi nanti ya 💕
      </motion.p>
    </div>
  );
}
