"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/data/invitation";
import ScratchCard from "@/components/ScratchCard";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  useEffect(() => {
    const targetDate = new Date(invitationData.weddingDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // When scratch card is revealed, wait 500ms then show countdown
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setShowCountdown(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 flex flex-col items-center bg-brand-bg relative z-10 perspective-[1200px] gap-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-4"
      >
        <p className="font-inter text-xs tracking-[0.3em] uppercase text-brand-gold mb-2">
          Save The Date
        </p>
        <h2 className="font-vibes text-4xl text-brand-text">
          Our Special Day
        </h2>
        <span className="w-10 h-[1px] bg-brand-gold/50 mx-auto block mt-3" />
      </motion.div>

      <div className="w-full max-w-sm h-[220px]">
        <ScratchCard onReveal={() => setIsRevealed(true)} text="Scratch to Reveal">
          <motion.div
            className="glass-panel rounded-3xl p-6 w-full h-full flex justify-center items-center shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden transform-gpu"
            initial={{ opacity: 0, y: 50, rotateX: -30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.5 }}
          >
            {/* Subtle Background Glow inside the panel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand-gold/10 blur-3xl pointer-events-none rounded-full" />

            <AnimatePresence mode="wait">
              {!showCountdown ? (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-center justify-center text-center w-full z-10"
                >
                  <p className="font-playfair text-3xl md:text-4xl text-brand-gold font-medium italic">
                    {invitationData.weddingDateFormatted}
                  </p>
                  <p className="font-inter text-xs tracking-widest text-brand-text/70 mt-4 uppercase">
                    Mark Your Calendar
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8 }}
                  className="flex justify-between items-center w-full z-10 px-2"
                >
                  {timeBlocks.map((block, index) => (
                    <div key={block.label} className="flex flex-col items-center relative z-10">
                      <div className="relative w-[50px] h-[40px] flex justify-center items-center overflow-hidden">
                        <AnimatePresence mode="popLayout">
                          <motion.div
                            key={block.value}
                            initial={{ opacity: 0, y: -20, rotateX: -90 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, y: 20, rotateX: 90 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                            className="font-playfair text-3xl text-brand-text font-medium"
                          >
                            {block.value.toString().padStart(2, "0")}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                      <span className="font-inter text-[9px] tracking-widest uppercase text-brand-gold mt-2">
                        {block.label}
                      </span>
                      {index < timeBlocks.length - 1 && (
                        <span className="absolute top-2 -right-[0.85rem] font-playfair text-2xl text-brand-gold/30">
                          :
                        </span>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </ScratchCard>
      </div>
    </section>
  );
}
