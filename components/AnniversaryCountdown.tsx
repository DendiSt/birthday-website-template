"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string; // ISO string e.g. "2027-08-05T00:00:00"
}

export default function AnniversaryCountdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return null; // Mencegah hydration error di Next.js

  const TimeBox = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-1 md:mx-4">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl shadow-lg border border-pink-100 dark:border-slate-700 flex items-center justify-center mb-3 transition-colors">
        <span className="text-2xl md:text-5xl font-bold text-rose-deep dark:text-pink-300 font-body transition-colors">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-sm font-bold text-pink-500 dark:text-pink-400 uppercase tracking-widest transition-colors">{label}</span>
    </div>
  );

  return (
    <section id="countdown" className="py-24 px-4 bg-gradient-to-b from-transparent to-pink-50 dark:to-slate-900 relative z-10 border-t border-pink-100 dark:border-slate-700 mt-20 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-script text-rose-deep dark:text-pink-300 mb-4 transition-colors">Menuju Hari Anniversary</h2>
        <p className="text-gray-600 dark:text-gray-400 font-body mb-12 transition-colors">Menghitung mundur setiap detik untuk kembali merayakan hari jadi kita.</p>

        <div className="flex justify-center items-center">
          <TimeBox value={timeLeft.days} label="Hari" />
          <span className="text-2xl md:text-4xl font-bold text-pink-300 pb-8 mx-1 md:mx-2">:</span>
          <TimeBox value={timeLeft.hours} label="Jam" />
          <span className="text-2xl md:text-4xl font-bold text-pink-300 pb-8 mx-1 md:mx-2">:</span>
          <TimeBox value={timeLeft.minutes} label="Menit" />
          <span className="text-2xl md:text-4xl font-bold text-pink-300 pb-8 mx-1 md:mx-2">:</span>
          <TimeBox value={timeLeft.seconds} label="Detik" />
        </div>
      </motion.div>
    </section>
  );
}
