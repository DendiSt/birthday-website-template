"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import content from "../data/content.json";
import PinInput from "../components/PinInput";
import CountdownTimer from "../components/CountdownTimer";
import { FallingPetals } from "../components/FlowerDecorations";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  const handleCountdownReached = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleSuccess = () => {
    setTimeout(() => {
      router.push("/story");
    }, 800);
  };

  return (
    <main className="min-h-[100dvh] flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200">
      <FallingPetals />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 bg-white/70 backdrop-blur-md p-6 sm:p-12 rounded-3xl shadow-xl max-w-md w-full border border-pink-200 text-center"
      >
        <div className="mb-4 sm:mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
            className="text-4xl sm:text-5xl mb-2 sm:mb-4"
          >
            🎁
          </motion.div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-script text-pink-600 mb-1 sm:mb-2">
            Hallo Sayanggkuu
          </h1>
          <p className="text-pink-500 font-body text-xs sm:text-sm">
            {isReady
              ? "Masukkan PIN untuk membuka hadiahmu 💕"
              : "Ada sesuatu yang menunggumu..."}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isReady ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <CountdownTimer
                targetDate={content.birthdayDate}
                onReached={handleCountdownReached}
              />
            </motion.div>
          ) : (
            <motion.div
              key="pin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PinInput onSuccess={handleSuccess} expectedHash={content.pinHash} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 sm:mt-8 pt-4 sm:pt-6 border-t border-pink-100">
          <p className="text-[10px] sm:text-xs text-pink-400 font-body flex items-center justify-center gap-1">
            Made with <span className="text-red-500 text-sm sm:text-base">❤</span> for you
          </p>
        </div>
      </motion.div>
    </main>
  );
}
