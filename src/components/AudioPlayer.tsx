"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    // ─── HOW TO ADD YOUR MUSIC ──────────────────────────────────────────────────
    // 1. Place your MP3 file inside the /public folder
    //    e.g. carf-main/public/wedding-song.mp3
    // 2. Update the filename below to match your file name
    // ────────────────────────────────────────────────────────────────────────────
    const MUSIC_FILE = "/wedding-song.mp3";

    const audio = new Audio(MUSIC_FILE);
    audioRef.current = audio;
    audio.loop = true;
    audio.volume = 0.5;
    audio.onerror = () => {
      // Silently ignore — music file not yet added to /public
    };

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (isMounted && err.name !== "AbortError") {
            setIsPlaying(false);
          }
        });
      }
    }

    return () => {
      isMounted = false;
      audio.pause();
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1 }}
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-brand-bg/80 backdrop-blur-md shadow-lg border border-brand-gold/30 text-brand-gold hover:scale-110 active:scale-95 transition-transform"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
    </motion.button>

  );
}
