"use client";

import { useState, useRef, useEffect } from "react";
import { Music, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicPlayerProps {
  url: string;
}

export default function MusicPlayer({ url }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audioRef.current = audio;
    
    // Attempt auto-play (browser might allow it since user clicked a button/entered PIN to get here)
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((e) => {
        console.log("Auto-play prevented by browser. User must click play.", e);
      });
      
    const handleVideoPlaying = () => {
      if (audioRef.current) {
        wasPlayingRef.current = !audioRef.current.paused;
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleVideoPaused = () => {
      if (audioRef.current && wasPlayingRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => console.log("Audio resume failed:", e));
      }
    };

    window.addEventListener('video-playing', handleVideoPlaying);
    window.addEventListener('video-paused', handleVideoPaused);
    
    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener('video-playing', handleVideoPlaying);
      window.removeEventListener('video-paused', handleVideoPaused);
    };
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? (
        <Music className="w-6 h-6 animate-pulse" />
      ) : (
        <VolumeX className="w-6 h-6" />
      )}
    </motion.button>
  );
}
