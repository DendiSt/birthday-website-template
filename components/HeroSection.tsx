"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FlowerCorner } from "./FlowerDecorations";
import BirthdayCake from "./BirthdayCake";

interface HeroSectionProps {
  message: string;
  recipientName: string;
  onCakeComplete?: () => void;
}

export default function HeroSection({ message, recipientName, onCakeComplete }: HeroSectionProps) {
  const [cakeComplete, setCakeComplete] = useState(false);

  const handleCakeComplete = () => {
    setCakeComplete(true);
    if (onCakeComplete) {
      onCakeComplete();
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      <FlowerCorner position="top-left" />
      <FlowerCorner position="top-right" />
      <FlowerCorner position="bottom-left" />
      <FlowerCorner position="bottom-right" />

      <div className="z-10 text-center px-4">
        {!cakeComplete ? (
          <BirthdayCake
            onComplete={handleCakeComplete}
            recipientName={recipientName}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-script text-rose-deep dark:text-pink-300 mb-6 drop-shadow-sm leading-tight transition-colors">
              {message.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-pink-700 dark:text-pink-400 text-lg md:text-xl font-body transition-colors"
            >
              Scroll ke bawah untuk melihat perjalanan kita 💕
            </motion.p>
          </motion.div>
        )}
      </div>

      {cakeComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 3, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 z-10 text-pink-500 dark:text-pink-400 transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      )}
    </section>
  );
}
