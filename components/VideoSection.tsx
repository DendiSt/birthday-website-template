"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FlowerDivider } from "./FlowerDecorations";

interface VideoSectionProps {
  url: string;
  title: string;
  description: string;
}

export default function VideoSection({ url, title, description }: VideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      // @ts-ignore - webkitFullscreenElement is for safari
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // Exited fullscreen, scroll back to video to prevent mobile jump bug
        setTimeout(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <section ref={sectionRef} id="video-kenangan" className="py-20 px-4 flex flex-col items-center justify-center max-w-4xl mx-auto relative z-10">
      <FlowerDivider />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-script text-rose-deep dark:text-pink-300 mb-4 transition-colors">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 font-body text-lg transition-colors">{description}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-xl border border-pink-100 dark:border-slate-700 rotate-1 hover:rotate-0 transition-all duration-500"
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black transition-colors">
          <video 
            src={url}
            controls
            className="w-full h-full object-contain"
            preload="metadata"
            onPlay={() => window.dispatchEvent(new CustomEvent('video-playing'))}
            onPause={() => window.dispatchEvent(new CustomEvent('video-paused'))}
            onEnded={() => window.dispatchEvent(new CustomEvent('video-paused'))}
          />
        </div>
        <div className="mt-4 flex flex-col items-center gap-3">
          <a
            href={url}
            download
            className="px-6 py-2 bg-pink-100 dark:bg-pink-900/50 hover:bg-pink-200 dark:hover:bg-pink-800 text-pink-700 dark:text-pink-300 rounded-full font-body font-medium text-sm transition-colors shadow-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Unduh Video
          </a>
          <div className="flex gap-2">
            <span className="text-pink-400">✧</span>
            <span className="text-pink-300">✦</span>
            <span className="text-pink-400">✧</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
