"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlowerDivider } from "./FlowerDecorations";

interface Wish {
  sender: string;
  message: string;
}

interface WishWallProps {
  wishes: Wish[];
}

export default function WishWall({ wishes }: WishWallProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // States for drag and auto-scroll
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mencegah scroll body saat modal terbuka
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Auto-scroll logic (berjalan terus jika tidak di-hover atau di-drag/disentuh)
  useEffect(() => {
    let animationId: number;
    
    const scroll = () => {
      if (scrollRef.current && !isHovered && !isDragging && !isTouching) {
        scrollRef.current.scrollLeft += 0.7; // Kecepatan auto-scroll
        
        // Looping mulus saat setengah perjalanan terlampaui
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging, isTouching]);

  // Handler untuk Dragging (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current!.offsetLeft);
    setScrollLeft(scrollRef.current!.scrollLeft);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current!.offsetLeft;
    const walk = (x - startX) * 1.5; // Sensitivitas geser
    scrollRef.current!.scrollLeft = scrollLeft - walk;
  };
  
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const colors = [
    "bg-yellow-100 dark:bg-yellow-900/40 border border-transparent dark:border-yellow-700/50",
    "bg-pink-100 dark:bg-pink-900/40 border border-transparent dark:border-pink-700/50",
    "bg-blue-100 dark:bg-blue-900/40 border border-transparent dark:border-blue-700/50",
    "bg-green-100 dark:bg-green-900/40 border border-transparent dark:border-green-700/50",
    "bg-purple-100 dark:bg-purple-900/40 border border-transparent dark:border-purple-700/50"
  ];

  // Gandakan array beberapa kali agar panjangnya cukup menutupi layar untuk looping
  const duplicatedWishes = Array(10).fill(wishes).flat();

  // Fungsi pembantu untuk menggambar kertas
  const renderNote = (wish: Wish, i: number, inModal = false) => {
    const color = colors[i % colors.length];
    const rotation = (i % 2 === 0 ? 1 : -1) * ((i * 3) % 6 + 2); 
    
    return (
      <div
        key={i}
        // Jika di dalam modal, gunakan w-[calc(33.33%-16px)] untuk 3 kolom di desktop. Jika di luar, gunakan w-64
        className={`${inModal ? 'w-[calc(50%-8px)] md:w-[calc(33.33%-16px)]' : 'w-64 flex-shrink-0'} p-4 md:p-5 shadow-md cursor-pointer rounded-bl-xl ${color} relative flex flex-col justify-between min-h-[160px] md:min-h-[180px] hover:scale-105 hover:z-10 transition-all duration-300 ${!inModal && (isDragging || isTouching) ? 'cursor-grabbing' : ''}`}
        style={{ rotate: `${inModal ? rotation : (rotation / 2)}deg` }}
        onClick={!inModal && !isDragging ? () => setIsModalOpen(true) : undefined}
      >
        {/* Efek selotip di atas */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/50 dark:bg-white/20 backdrop-blur-sm shadow-sm rotate-2"></div>
        <p className={`font-script ${inModal ? 'text-lg md:text-xl' : 'text-xl'} leading-relaxed text-gray-800 dark:text-gray-200 mb-4 mt-3 select-none pointer-events-none transition-colors`}>"{wish.message}"</p>
        <p className="font-body font-bold text-xs md:text-sm text-gray-600 dark:text-gray-400 text-right select-none pointer-events-none transition-colors">- {wish.sender}</p>
      </div>
    );
  };

  return (
    <>
      <section id="wish-wall" className="py-20 max-w-full overflow-hidden relative z-10">
        <FlowerDivider />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 px-4"
        >
          <h2 className="text-4xl md:text-5xl font-script text-rose-deep dark:text-pink-300 mb-2 transition-colors">Dinding Harapan</h2>
          <p className="text-gray-500 dark:text-gray-400 font-body transition-colors">Pesan-pesan manis dari orang tersayang.</p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full py-8">
          {/* Gradient Edges untuk efek memudar di ujung layar */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-pink-50 dark:from-slate-900 to-transparent z-10 pointer-events-none transition-colors"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-pink-50 dark:from-slate-900 to-transparent z-10 pointer-events-none transition-colors"></div>
          
          {/* Track animasi marquee yang bisa digeser */}
          <div 
            ref={scrollRef}
            className={`flex w-full overflow-x-auto gap-6 px-6 no-scrollbar ${isDragging || isTouching ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); handleMouseUpOrLeave(); }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onTouchStart={() => setIsTouching(true)}
            onTouchEnd={() => setIsTouching(false)}
            onTouchCancel={() => setIsTouching(false)}
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} // Hide scrollbar untuk firefox/IE
          >
            {/* Supaya hide scrollbar bekerja di Chrome */}
            <style>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {duplicatedWishes.map((wish, i) => renderNote(wish, i, false))}
          </div>
        </div>

        {/* Tombol Lihat Semua */}
        <div className="flex justify-center mt-8">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 bg-rose-deep text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 hover:bg-rose-600 transition-all active:scale-95"
          >
            Baca Semua Pesan ({wishes.length})
          </button>
        </div>
      </section>

      {/* Modal / Popup Layar Penuh */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-pink-50 dark:bg-slate-900 w-full max-w-5xl max-h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-colors"
              onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup jika isinya di-klik
            >
              {/* Header Modal */}
              <div className="p-4 md:p-6 border-b border-pink-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 sticky top-0 z-20 transition-colors">
                <h3 className="text-2xl md:text-3xl font-script text-rose-deep dark:text-pink-300 transition-colors">Dinding Harapan</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 bg-pink-100 dark:bg-slate-700 text-rose-deep dark:text-pink-300 rounded-full flex items-center justify-center font-bold hover:bg-pink-200 dark:hover:bg-slate-600 transition-colors"
                >
                  X
                </button>
              </div>

              {/* Area isi modal yang bisa di-scroll */}
              <div className="p-4 md:p-8 overflow-y-auto flex-1">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full pb-8">
                  {wishes.map((wish, i) => renderNote(wish, i, true))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
