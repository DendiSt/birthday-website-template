"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimelineConnectorProps {
  sections: { id: string; title: string; date: string; flower: string }[];
}

const flowerEmoji: Record<string, string> = {
  sakura: "🌸",
  tulip: "🌷",
  lavender: "🪻",
  rose: "🌹",
  daisy: "🌼",
  peony: "🪷",
};

export default function TimelineConnector({ sections }: TimelineConnectorProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <div className="hidden md:flex fixed left-6 top-0 bottom-0 z-30 items-center pointer-events-none">
      <div className="relative h-[70vh] flex flex-col justify-between items-center">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-200 via-pink-400 to-pink-200"></div>

        {/* Nodes */}
        {sections.map((section, i) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 + i * 0.3, type: "spring" }}
            className="relative z-10 flex items-center group pointer-events-auto cursor-pointer"
            onClick={() => {
              const el = document.getElementById(section.id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white border-2 border-pink-400 flex items-center justify-center shadow-md hover:scale-125 transition-transform">
              <span className="text-sm">{flowerEmoji[section.flower] || "🌸"}</span>
            </div>
            
            {/* Tooltip on hover */}
            <div className="absolute left-11 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-pink-100">
              <p className="text-xs font-bold text-pink-700 font-body">{section.title}</p>
              <p className="text-[10px] text-pink-400 font-body">{section.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
