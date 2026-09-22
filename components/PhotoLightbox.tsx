"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface PhotoLightboxProps {
  photos: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function PhotoLightbox({ photos, initialIndex, onClose }: PhotoLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('lightbox-open'));
    return () => {
      window.dispatchEvent(new CustomEvent('lightbox-close'));
    };
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowRight") goNext();
    if (e.key === "ArrowLeft") goPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label="Photo lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/70 text-sm font-body">
        {currentIndex + 1} / {photos.length}
      </div>

      {/* Navigation buttons */}
      {photos.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 z-[110] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Next photo"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Photo */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative w-[90vw] h-[80vh] max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photos[currentIndex]}
            alt={`Photo ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="90vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="absolute bottom-6 flex gap-2">
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                i === currentIndex ? "border-pink-400 scale-110" : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image src={photo} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="56px" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
