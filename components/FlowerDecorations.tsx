"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function FallingPetals() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  const petals = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-pink-300 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}vw`,
            top: -20,
            borderRadius: "50% 0 50% 50%",
          }}
          animate={{
            y: ["0vh", "100vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

export function FloatingHearts() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  // Jumlahnya ditingkatkan agar lebih rapat, terutama untuk mobile yang halamannya lebih panjang
  const hearts = Array.from({ length: 120 });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 md:text-8xl text-7xl"
          style={{
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}%`, // Disebar secara acak dari atas sampai bawah halaman
            willChange: "transform, opacity"
          }}
          animate={{
            y: [0, -400], // Jarak melayang ke atas sedikit ditambah
            x: [0, Math.sin(i) * 50, -Math.sin(i) * 50, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15, // Dipercepat sedikit (15-25s)
            repeat: Infinity,
            delay: Math.random() * 15,
            ease: "linear"
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
}

export function FlowerCorner({ position = "top-left", type = "rose" }: { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right", type?: string }) {
  const posClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-[-1]",
  };

  // Simple SVG flower representation for placeholder
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`absolute w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-70 ${posClasses[position]}`}
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-pink-300 drop-shadow-sm">
        <path d="M50 0C60 30 80 40 100 50C80 60 60 70 50 100C40 70 20 60 0 50C20 40 40 30 50 0Z" fill="currentColor" />
        <circle cx="50" cy="50" r="10" fill="#F472B6" />
      </svg>
    </motion.div>
  );
}

export function FlowerDivider() {
  return (
    <div className="flex justify-center items-center py-8 w-full">
      <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1 max-w-xs"></div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="mx-4 text-pink-400"
      >
        ✿
      </motion.div>
      <div className="h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent flex-1 max-w-xs"></div>
    </div>
  );
}
