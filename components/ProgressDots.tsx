"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressDotsProps {
  sections: string[];
}

export default function ProgressDots({ sections }: ProgressDotsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const sectionElements = sections.map((id) => document.getElementById(id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  if (!isMounted) return null;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 items-center"
    >
      {sections.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group relative flex items-center"
          aria-label={`Go to section ${id}`}
        >
          {/* Tooltip */}
          <span className="absolute right-8 bg-pink-600 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
            {id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
          
          {/* Dot */}
          <motion.div
            className={`rounded-full transition-all duration-300 ${
              activeIndex === i
                ? "w-3.5 h-3.5 bg-pink-500 shadow-md shadow-pink-400/50"
                : "w-2.5 h-2.5 bg-pink-300 hover:bg-pink-400"
            }`}
            layoutId={activeIndex === i ? "activeDot" : undefined}
          />
        </button>
      ))}
    </motion.div>
  );
}
