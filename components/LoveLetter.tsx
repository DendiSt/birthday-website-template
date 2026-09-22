"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";

interface LoveLetterProps {
  title: string;
  content: string;
  photos: string[];
  senderName: string;
}

export default function LoveLetter({ title, content, photos, senderName }: LoveLetterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerConfetti = () => {
    const duration = 4000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.7 },
        colors: ["#F472B6", "#EC4899", "#DB2777", "#FBCFE8", "#FDF2F8"],
        shapes: ["circle"],
        ticks: 100,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.7 },
        colors: ["#F472B6", "#EC4899", "#DB2777", "#FBCFE8", "#FDF2F8"],
        shapes: ["circle"],
        ticks: 100,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleOpen = () => {
    setIsOpen(true);
    triggerConfetti();
  };

  return (
    <section
      id="love-letter"
      className="min-h-screen relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500"
    >
      {/* Surrounding Photos — Desktop Arc */}
      <div className="absolute inset-0 pointer-events-none hidden md:block z-0">
        {photos.map((photo, i) => {
          const angle = (i * (360 / photos.length) - 90) * (Math.PI / 180);
          // i=0 (Atas), i=2 (Bawah) dibuat lebih dekat agar tidak terpotong tepi layar
          const radius = (i === 0 || i === 2) ? 220 : 320; 
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.2 }}
              className="absolute left-1/2 top-1/2 w-36 h-36 bg-white dark:bg-slate-800 p-2 rounded-sm shadow-xl transition-colors"
              style={{
                x: `calc(-50% + ${x}px)`,
                y: `calc(-50% + ${y}px)`,
                rotate: (i * 15 - 20),
              }}
            >
              <Image src={photo} alt="Memory" fill className="object-cover" sizes="144px" />
            </motion.div>
          );
        })}
      </div>

      {/* Love Letter Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0, rotateY: 90 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-pink-300 to-pink-400 dark:from-pink-800 dark:to-pink-900 w-full max-w-md mx-auto aspect-[4/3] rounded-xl shadow-2xl flex flex-col items-center justify-center cursor-pointer hover:shadow-pink-400/60 dark:hover:shadow-pink-900/60 transition-all relative overflow-hidden group"
              onClick={handleOpen}
            >
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0 overflow-hidden">
                <div
                  className="w-0 h-0 mx-auto transition-transform group-hover:scale-y-90 border-l-[210px] border-r-[210px] border-l-transparent border-r-transparent border-t-[100px] border-t-pink-300 dark:border-t-pink-800"
                />
              </div>

              {/* Seal */}
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-rose-deep flex items-center justify-center shadow-lg mb-4 z-10"
              >
                <span className="text-white text-2xl">💌</span>
              </motion.div>

              <p className="text-white text-xl font-body font-medium mb-3 z-10 drop-shadow transition-colors">
                Ada surat untukmu
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white dark:bg-slate-800 text-pink-600 dark:text-pink-300 rounded-full font-bold shadow-lg hover:bg-pink-50 dark:hover:bg-slate-700 transition-all z-10"
              >
                💕 Buka Surat
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-cream dark:bg-slate-800 w-full p-8 md:p-14 rounded-xl shadow-2xl relative border-2 border-pink-200 dark:border-slate-700 transition-colors"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 31px, #FBCFE833 31px, #FBCFE833 32px)",
              }}
            >
              {/* Decorative corners */}
              <div className="absolute top-3 left-3 text-pink-300 dark:text-pink-800 text-2xl opacity-40 transition-colors">✿</div>
              <div className="absolute top-3 right-3 text-pink-300 dark:text-pink-800 text-2xl opacity-40 transition-colors">✿</div>
              <div className="absolute bottom-3 left-3 text-pink-300 dark:text-pink-800 text-2xl opacity-40 transition-colors">✿</div>
              <div className="absolute bottom-3 right-3 text-pink-300 dark:text-pink-800 text-2xl opacity-40 transition-colors">✿</div>

              <h2 className="text-4xl md:text-5xl font-script text-pink-600 dark:text-pink-300 text-center mb-10 transition-colors">
                {title}
              </h2>

              <div className="text-gray-700 dark:text-gray-200 font-body text-lg md:text-xl leading-[2] whitespace-pre-line text-center md:text-left mb-10 transition-colors">
                {content}
              </div>

              <div className="text-right mt-14 border-t border-pink-100 dark:border-slate-700 pt-6 transition-colors">
                <p className="text-gray-500 dark:text-gray-400 mb-2 font-body text-sm transition-colors">Dari yang selalu sayang kamu,</p>
                <p className="font-script text-3xl text-pink-600 dark:text-pink-300 transition-colors">{senderName}</p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <a
                  href={`https://wa.me/6285295619819?text=${encodeURIComponent("Makaciii banyakk sayanggkuu cintakuuu, akuu senangg sekalii sayangggg, I Love U")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-bold shadow-lg hover:shadow-pink-400/50 hover:-translate-y-1 transition-all text-center font-body"
                >
                  💬 Balas Surat via WhatsApp
                </a>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="px-8 py-3 bg-white dark:bg-slate-800 text-pink-500 dark:text-pink-300 border border-pink-200 dark:border-slate-600 rounded-full font-bold shadow-sm hover:bg-pink-50 dark:hover:bg-slate-700 transition-all text-center font-body"
                >
                  🔄 Ulangi dari Awal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Surrounding Photos */}
      <div className="md:hidden flex flex-wrap justify-center gap-4 mt-12 z-0">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-28 h-28 bg-white dark:bg-slate-800 p-2 rounded-sm shadow-md transition-colors"
            style={{ rotate: (i * 8 - 12) }}
          >
            <div className="relative w-full h-full">
              <Image src={photo} alt="Memory" fill className="object-cover" sizes="112px" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
