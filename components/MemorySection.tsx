"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { FlowerDivider } from "./FlowerDecorations";
import PhotoLightbox from "./PhotoLightbox";
import { useRef } from "react";

interface MemorySectionProps {
  title: string;
  date: string;
  description: string;
  photos: string[];
  flower?: string;
  index: number;
  id: string;
}

const flowerEmoji: Record<string, string> = {
  sakura: "🌸",
  tulip: "🌷",
  lavender: "🪻",
  rose: "🌹",
  daisy: "🌼",
  peony: "🪷",
};

export default function MemorySection({ title, date, description, photos, flower, index, id }: MemorySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const isEven = index % 2 === 0;

  return (
    <>
      <section
        ref={sectionRef}
        id={id}
        className="py-16 px-4 md:px-8 min-h-screen flex flex-col justify-center max-w-5xl mx-auto relative overflow-hidden"
      >
        {/* Parallax background element */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none opacity-5"
        >
          <div className="absolute top-1/4 left-1/4 text-[200px]">
            {flowerEmoji[flower || "sakura"]}
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-[150px] rotate-45">
            {flowerEmoji[flower || "sakura"]}
          </div>
        </motion.div>

        <FlowerDivider />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative z-10"
        >
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.3 }}
            className="text-5xl mb-4 block"
          >
            {flowerEmoji[flower || "sakura"]}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-script text-rose-deep dark:text-pink-300 mb-2 transition-colors">{title}</h2>
          {date !== "—" && (
            <p className="text-pink-500 dark:text-pink-400 font-medium tracking-wider text-sm uppercase font-body transition-colors">{date}</p>
          )}
        </motion.div>

        <div
          className={`flex flex-col md:flex-row gap-8 items-center relative z-10 ${
            isEven ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {photos.map((photo, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                  className={`relative w-full aspect-square bg-white dark:bg-slate-800 p-3 pb-10 rounded-sm shadow-xl cursor-pointer group transition-colors ${
                    photos.length === 1 ? "sm:col-span-2 max-w-md mx-auto" : ""
                  }`}
                  style={{ transform: `rotate(${(i * 2.5 - 2.5)}deg)` }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src={photo}
                      alt={`${title} photo ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {/* Click hint */}
                  <div className="absolute inset-3 bottom-10 rounded-sm bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="text-white text-sm font-body opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-3 py-1 rounded-full">
                      Klik untuk memperbesar
                    </span>
                  </div>
                  {/* Decorative sticker */}
                  <div className="absolute bottom-2 right-4 text-pink-400 dark:text-pink-300 text-2xl rotate-12 opacity-80 transition-colors">
                    {flowerEmoji[flower || "sakura"]}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full text-center md:text-left bg-white/40 dark:bg-slate-800/40 p-6 md:p-10 rounded-3xl backdrop-blur-sm border border-pink-100 dark:border-slate-700 shadow-sm transition-colors"
          >
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-lg font-body transition-colors">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
