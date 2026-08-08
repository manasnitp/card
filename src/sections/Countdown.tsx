"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "@/data/invitation";
import ScratchCard from "@/components/ScratchCard";

const HeartDrop = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="url(#heart-grad)" xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em', opacity: 0.9 }}>
    <defs>
      <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffb3c6" />
        <stop offset="100%" stopColor="#ff4d6d" />
      </linearGradient>
    </defs>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const BubbleDrop = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" style={{ width: '1em', height: '1em' }}>
    <circle cx="12" cy="12" r="10" fill="rgba(201, 168, 106, 0.15)" stroke="rgba(201, 168, 106, 0.5)" strokeWidth="1" />
    <path d="M6 10 C6 7, 9 5, 12 5" fill="none" stroke="rgba(201, 168, 106, 0.9)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [drops, setDrops] = useState<{ id: number, x: number, burstX: number, burstY: number, delay: number, duration: number, size: number, type: 'heart'|'bubble', rotationX: number, rotationY: number, rotationZ: number }[]>([]);

  useEffect(() => {
    if (isRevealed && drops.length === 0) {
      setDrops(
        Array.from({ length: 200 }).map((_, i) => ({
          id: i,
          x: Math.random() * 100, // Spans entire width of the page
          burstX: (Math.random() - 0.5) * 400, // horizontal drift
          burstY: -(Math.random() * 500 + 100), // shoot up initially
          delay: Math.random() * 0.1, // Almost instant burst
          duration: Math.random() * 3 + 3, // 3 to 6 seconds total
          size: Math.random() * 1.5 + 1.0,
          type: Math.random() > 0.4 ? 'heart' : 'bubble',
          rotationX: (Math.random() - 0.5) * 540,
          rotationY: (Math.random() - 0.5) * 540,
          rotationZ: (Math.random() - 0.5) * 540,
        }))
      );
    }
  }, [isRevealed, drops.length]);

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

  // No timeout needed, timer appears below when revealed

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6 flex flex-col items-center bg-brand-bg relative z-10 perspective-[1200px] gap-6 overflow-hidden">
      {/* Raining Hearts and Bubbles */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div 
            className="absolute inset-0 pointer-events-none z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {drops.map((drop) => (
              <motion.div
                key={drop.id}
                className="absolute top-[30%] will-change-transform"
                style={{ left: `${drop.x}%`, fontSize: `${drop.size}rem`, marginLeft: '-15px' }}
                initial={{ y: 0, x: 0, rotate: 0, scale: 0, opacity: 1 }}
                animate={{ 
                  y: [0, drop.burstY, 800],
                  x: [0, drop.burstX * 0.5, drop.burstX],
                  rotateX: drop.type === 'heart' ? [0, drop.rotationX * 0.5, drop.rotationX] : 0,
                  rotateY: drop.type === 'heart' ? [0, drop.rotationY * 0.5, drop.rotationY] : 0,
                  rotateZ: [0, drop.rotationZ * 0.5, drop.rotationZ],
                  scale: [0, 1, 1],
                  opacity: [1, 1, 0] 
                }}
                transition={{ 
                  duration: drop.duration, 
                  delay: drop.delay,
                  times: [0, 0.4, 1], // Peaks at 40% of duration
                  ease: "easeInOut"
                }}
              >
                {drop.type === 'heart' ? <HeartDrop /> : <BubbleDrop />}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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

            <motion.div
              key="date"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
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
          </motion.div>
        </ScratchCard>
      </div>

      {/* Countdown shown below the card after reveal */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4, delay: 0.3 }}
            className="w-full max-w-sm mt-8 flex justify-between items-center px-2 relative z-10"
          >
            {timeBlocks.map((block, index) => (
              <div key={block.label} className="flex flex-col items-center relative z-10">
                <div className="relative w-[55px] h-[50px] flex justify-center items-center overflow-hidden bg-white/5 backdrop-blur-md rounded-xl border border-brand-gold/20 shadow-[0_5px_15px_rgba(0,0,0,0.1)]">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={block.value}
                      initial={{ opacity: 0, y: -20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      exit={{ opacity: 0, y: 20, rotateX: 90 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
                      className="font-playfair text-2xl md:text-3xl text-brand-text font-medium"
                    >
                      {block.value.toString().padStart(2, "0")}
                    </motion.div>
                  </AnimatePresence>
                </div>
                <span className="font-inter text-[9px] tracking-widest uppercase text-brand-gold mt-3">
                  {block.label}
                </span>
                {index < timeBlocks.length - 1 && (
                  <span className="absolute top-3 -right-[1rem] font-playfair text-2xl text-brand-gold/50 font-bold">
                    :
                  </span>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
