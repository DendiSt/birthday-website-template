"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface ReasonsLoveProps {
  reasons: string[];
  recipientName: string;
}

export default function ReasonsLove({ reasons, recipientName }: ReasonsLoveProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <section id="reasons-love" className="py-20 px-4 bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden transition-colors duration-500">
      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-400 dark:text-pink-600 transition-colors"
            style={{
              left: `${12 + i * 12}%`,
              top: `${10 + (i % 3) * 30}%`,
              fontSize: `${20 + i * 5}px`,
              transform: `rotate(${-15 + i * 10}deg)`,
            }}
          >
            ❤
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-script text-rose-deep dark:text-pink-300 mb-3 transition-colors">
          Alasan Aku Sayang Kamuuu
        </h2>
        <p className="text-pink-500 dark:text-pink-400 font-body text-sm transition-colors">
          Setiap hari ada alasan baru, tapi ini beberapa favoritku...
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-2xl border border-pink-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all group"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Heart className="w-4 h-4 text-white fill-white" />
            </div>
            <div>
              <span className="text-xs text-pink-400 dark:text-pink-300 font-body font-bold transition-colors">#{i + 1}</span>
              <p className="text-gray-700 dark:text-gray-200 font-body text-sm leading-relaxed transition-colors">{reason}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
