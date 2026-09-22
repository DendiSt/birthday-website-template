"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerDivider } from "./FlowerDecorations";
import confetti from "canvas-confetti";

interface Gift {
  title: string;
  description: string;
}

interface GiftBoxProps {
  gifts: Gift[];
}

export default function VirtualGiftBox({ gifts }: GiftBoxProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleTitle, setShuffleTitle] = useState("");

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#F472B6", "#EC4899", "#FCD34D", "#FDE047"]
    });
  };

  const handleOpenGift = () => {
    if (!isOpened) {
      setIsModalOpen(true);
      setIsShuffling(true);

      // Pilih hadiah secara acak di balik layar
      const finalIndex = Math.floor(Math.random() * gifts.length);
      setSelectedGift(gifts[finalIndex]);

      // Tunggu 2.5 detik untuk efek kartu dibalik (mystery)
      setTimeout(() => {
        setIsShuffling(false);
        setIsOpened(true);
        triggerConfetti();
      }, 2500);
    } else {
      // Jika sudah dibuka sebelumnya, langsung tampilkan tanpa shuffle
      setIsModalOpen(true);
    }
  };

  return (
    <section id="virtual-gift" className="py-20 px-4 max-w-4xl mx-auto relative z-10">
      <FlowerDivider />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-script text-rose-deep dark:text-pink-300 mb-2 transition-colors">Virtual Gift Box</h2>
        <p className="text-gray-500 dark:text-gray-400 font-body transition-colors">Ada satu kado spesial untukmu. Coba tebak isinya!</p>
      </motion.div>

      <div className="flex justify-center">
        <motion.div
          className="relative cursor-pointer flex flex-col items-center"
          whileHover={!isOpened ? { scale: 1.1, rotate: [0, -5, 5, -5, 0] } : { scale: 1.05 }}
          onClick={handleOpenGift}
        >
          {/* Box Icon (Simple CSS/SVG) */}
          <div className="w-40 h-40 md:w-48 md:h-48 relative flex items-end justify-center">
            {isOpened ? (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-full h-full bg-pink-100 border-2 border-pink-300 rounded-xl flex items-center justify-center p-2 shadow-inner"
              >
                <span className="text-6xl md:text-7xl">💌</span>
              </motion.div>
            ) : (
              <motion.div 
                className="w-full h-28 md:h-32 bg-rose-deep rounded-md relative shadow-2xl"
                whileTap={{ scale: 0.9 }}
              >
                {/* Ribbon Vertical */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-5 md:w-6 bg-yellow-300 shadow-sm"></div>
                {/* Ribbon Horizontal */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-5 md:h-6 bg-yellow-300 shadow-sm"></div>
                {/* Bow */}
                <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 w-16 md:w-20 h-10 flex justify-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 border-4 md:border-8 border-yellow-300 rounded-full -mr-3 md:-mr-4 shadow-sm"></div>
                  <div className="w-10 h-10 md:w-12 md:h-12 border-4 md:border-8 border-yellow-300 rounded-full -ml-3 md:-ml-4 shadow-sm"></div>
                </div>
              </motion.div>
            )}
          </div>
          <p className="mt-6 font-bold text-gray-700 md:text-lg font-body bg-white/50 px-6 py-2 rounded-full backdrop-blur-sm shadow-sm">
            {isOpened ? "Kado Sudah Terbuka" : "Buka Kado"}
          </p>
        </motion.div>
      </div>

      {/* Modal Hadiah (3D Card Flip) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 perspective-1000"
            style={{ perspective: 1000 }} // Untuk efek 3D
            onClick={!isShuffling ? () => setIsModalOpen(false) : undefined}
          >
            <motion.div 
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-full max-w-sm relative aspect-[3/4]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Card Container yang berputar */}
              <motion.div
                animate={{ rotateY: isShuffling ? 180 : 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Sisi Depan (Hadiah Asli) - Terlihat saat rotateY = 0 */}
                <div 
                  className="absolute inset-0 bg-white dark:bg-slate-800 p-8 md:p-10 rounded-3xl shadow-2xl border-8 border-pink-100 dark:border-slate-700 flex flex-col justify-center items-center text-center overflow-hidden transition-colors"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-300 via-transparent to-transparent"></div>
                  
                  {selectedGift && (
                    <>
                      <h3 className="text-4xl font-script text-rose-deep dark:text-pink-300 mb-4 transition-colors">Yeay! 🎉</h3>
                      <div className="bg-yellow-50 dark:bg-yellow-900/40 border-2 border-dashed border-yellow-400 dark:border-yellow-600/50 p-6 rounded-xl mb-8 relative shadow-sm w-full transition-colors">
                        <div className="absolute -top-3 -left-3 w-6 h-6 bg-yellow-400 dark:bg-yellow-500 rounded-full transition-colors"></div>
                        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-yellow-400 dark:bg-yellow-500 rounded-full transition-colors"></div>
                        <h4 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-3 transition-colors">{selectedGift.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300 font-body text-sm leading-relaxed transition-colors">{selectedGift.description}</p>
                      </div>
                      
                      <button 
                        onClick={() => setIsModalOpen(false)}
                        className="px-8 py-3 bg-rose-deep text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-rose-600 transition-all active:scale-95 w-full relative z-10"
                      >
                        Simpan Kupon
                      </button>
                    </>
                  )}
                </div>

                {/* Sisi Belakang (Kartu Misteri) - Terlihat saat rotateY = 180 */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-deep p-8 rounded-3xl shadow-2xl border-8 border-pink-300 flex flex-col justify-center items-center text-center"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <motion.div
                    animate={{ rotate: [-5, 5, -5, 5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
                    className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-inner backdrop-blur-sm border-2 border-white/50"
                  >
                    <span className="text-7xl text-white font-script">?</span>
                  </motion.div>
                  <h3 className="text-3xl font-script text-white mb-2">Mengacak Hadiah...</h3>
                  <p className="text-pink-100 font-body text-sm animate-pulse">Semoga beruntung!</p>
                </div>

              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
