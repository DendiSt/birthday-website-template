"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Cek preferensi user saat pertama kali load
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }

    const onOpen = () => setIsHidden(true);
    const onClose = () => setIsHidden(false);
    
    window.addEventListener('lightbox-open', onOpen);
    window.addEventListener('lightbox-close', onClose);
    
    return () => {
      window.removeEventListener('lightbox-open', onOpen);
      window.removeEventListener('lightbox-close', onClose);
    };
  }, []);

  if (isHidden) return null;

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 md:top-8 md:right-8 z-[100] w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors border border-pink-200 dark:border-slate-600"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {isDark ? "🌙" : "☀️"}
      </motion.div>
    </button>
  );
}
