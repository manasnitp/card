"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralBorder from "./FloralBorder";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  // 0: Closed, 1: Flap Opening, 2: Letter Pulls Out / Envelope Drops, 3: Letter Expands
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [lights, setLights] = useState<{ id: number; x: number; y: number; scale: number; duration: number; rotation: number }[]>([]);

  const handleOpen = () => {
    if (step > 0) return;
    setStep(1); // Flap opens

    // Generate elegant magical light drift (reduced count for performance)
    setLights(
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 500,
        y: -100 - Math.random() * 500,
        scale: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 2 + 2,
        rotation: Math.random() * 360,
      }))
    );

    setTimeout(() => {
      setStep(2); // Letter pulls out, envelope drops

      setTimeout(() => {
        setStep(3); // Letter expands

        setTimeout(() => {
          onOpen();
        }, 500);
      }, 4000);
    }, 700);
  };

  const envelopeAnim =
    step === 0 ? { y: 0, rotateX: 0, opacity: 1, scale: 1 } :
      step === 1 ? { y: 10, rotateX: 5, opacity: 1, scale: 1.01 } :
        { y: 1000, rotateX: 20, opacity: 0, scale: 0.8 };

  const letterAnim =
    step === 0 ? { y: 0, scale: 0.95, opacity: 1 } :
      step === 1 ? { y: -10, scale: 0.95, opacity: 1 } :
        step === 2 ? { y: -50, scale: 1.15, opacity: 1, zIndex: 30 } :
          { y: 0, scale: 8, opacity: 0 }; // Reduced scale to prevent texture explosion lag

  const smoothTransition = { duration: 1.8, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#C9A86A] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          onClick={handleOpen}
        >
          {/* Subtle Ambient Lighting - Removed mix-blend-overlay for performance */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

          {/* Container for absolute positioning */}
          <div className="relative w-[320px] h-[480px] md:w-[400px] md:h-[600px] perspective-[2000px]">

            {/* Envelope Inside Back */}
            <motion.div
              className="absolute inset-0 bg-[#EFE3D0] rounded-lg shadow-2xl border border-brand-gold/20 z-0 transform-gpu will-change-transform"
              animate={envelopeAnim}
              transition={smoothTransition}
            />

            {/* The Letter */}
            <motion.div
              className="absolute inset-3 md:inset-4 bg-[#FDFBF7] rounded shadow-lg border border-brand-gold/30 z-10 flex flex-col items-center justify-center p-6 md:p-8 transform-gpu will-change-transform"
              animate={letterAnim}
              transition={smoothTransition}
            >
              <div className="w-full h-full border border-brand-gold/40 p-4 flex flex-col items-center justify-center gap-2 md:gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none" />
                
                <span className="text-[#9B1B30] text-2xl md:text-3xl mb-1 z-10 drop-shadow-sm">
                  ॐ
                </span>
                
                <span className="font-playfair font-semibold text-brand-gold text-sm md:text-base z-10 drop-shadow-sm text-center px-4 leading-tight tracking-widest mt-1">
                  ॥ श्री श्री प्रजापतये नमः ॥
                </span>
                
                <span className="font-vibes text-brand-gold text-2xl md:text-3xl z-10 drop-shadow-sm text-center px-4 leading-tight mt-1">
                  Shree Shree Prajapataya Namah
                </span>

                <div className="w-8 h-[1px] bg-brand-gold/30 my-2 z-10" />

                <span className="font-inter text-[9px] md:text-[10px] tracking-[0.2em] text-brand-text/70 uppercase z-10 text-center px-2 max-w-[220px] leading-relaxed">
                  You are cordially invited to join the wedding of
                </span>

                <span className="font-playfair text-brand-text text-xl md:text-2xl font-medium italic z-10 drop-shadow-sm text-center mt-1">
                  Shreya <span className="font-vibes text-brand-gold text-3xl mx-1">&</span> Abhishek
                </span>
              </div>
            </motion.div>

            {/* Envelope Front Flaps */}
            <motion.div 
              className="absolute inset-0 z-20 pointer-events-none transform-gpu will-change-transform"
              animate={envelopeAnim}
              transition={smoothTransition}
            >
              {/* Left Flap (Tan + Floral Border) */}
              <div
                className="absolute inset-0 bg-[#EFE3D0] rounded-l-lg pointer-events-auto"
                style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)" }}
              >
                <FloralBorder className="absolute left-0 w-16 md:w-20 text-[#E2D4BB]" />
              </div>

              {/* Right Flap (Tan + Floral Border) */}
              <div
                className="absolute inset-0 bg-[#EFE3D0] rounded-r-lg pointer-events-auto"
                style={{ clipPath: "polygon(100% 0, 100% 100%, 50% 50%)" }}
              >
                <FloralBorder className="absolute right-0 w-16 md:w-20 text-[#E2D4BB] scale-x-[-1]" />
              </div>

              {/* Inner Golden Glow (revealed when flap opens) */}
              <motion.div
                className="absolute inset-0 top-0 h-[40%] bg-gradient-to-b from-brand-gold/60 via-brand-gold/10 to-transparent blur-xl z-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={step > 0 ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              />

              {/* Bottom Flap (Cream) */}
              <div
                className="absolute bottom-0 w-full h-[60%] bg-[#FDFBF7] rounded-b-lg border-t border-brand-gold/10 z-20 drop-shadow-[0_-5px_10px_rgba(0,0,0,0.05)] pointer-events-auto flex items-end justify-center pb-8 md:pb-12"
                style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
              >
                <span className="font-inter text-[10px] md:text-xs tracking-[0.2em] text-brand-gold font-medium uppercase drop-shadow-sm">#AbhigotHisShrey</span>
              </div>

              {/* Top Flap (Animated Cream) */}
              <motion.div
                className="absolute top-0 w-full h-[55%] bg-[#FDFBF7] rounded-t-lg origin-top z-30 flex justify-center items-end pb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] pointer-events-auto cursor-pointer"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                animate={step > 0 ? { rotateX: 180, zIndex: 15 } : { rotateX: 0 }}
                transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] as [number, number, number, number] }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none" />
              </motion.div>

              {/* Wax Seal */}
              <motion.div
                className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-24 h-24 rounded-full bg-[#5A1C1D] flex items-center justify-center pointer-events-auto cursor-pointer"
                style={{ boxShadow: 'inset 0 6px 15px rgba(0,0,0,0.7), inset 0 -4px 10px rgba(255,255,255,0.1), 0 15px 30px rgba(0,0,0,0.6), 0 5px 15px rgba(201,168,106,0.3)' }}
                animate={step > 0 ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeIn" }}
              >
                <div className="absolute inset-2 border-2 border-brand-gold/70 rounded-full pointer-events-none opacity-80 mix-blend-overlay" />
                <span className="font-playfair italic text-brand-gold text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pr-1 font-semibold">
                  S <span className="font-vibes text-3xl font-normal">&</span> A
                </span>
              </motion.div>

              {/* "TAP TO OPEN" Text */}
              <motion.div
                className="absolute -bottom-16 left-0 right-0 text-center z-40"
                animate={step > 0 ? { opacity: 0 } : { opacity: 0.8 }}
              >
                <span className="font-inter text-sm tracking-[0.4em] text-[#FDFBF7] uppercase drop-shadow-md">Tap to open</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Elegant Magical Sparkles */}
          {step > 0 && lights.map((light) => (
            <motion.div
              key={light.id}
              className="absolute top-[40%] left-1/2 w-3 h-3 bg-brand-gold/80 rounded-full mix-blend-screen pointer-events-none z-[60]"
              style={{
                boxShadow: "0 0 10px 3px rgba(201,168,106,0.8), 0 0 20px 5px rgba(201,168,106,0.4)"
              }}
              initial={{ x: "-50%", y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: `calc(-50% + ${light.x}px)`,
                y: light.y,
                opacity: [0, 1, 0.8, 0],
                scale: light.scale,
                rotate: light.rotation
              }}
              transition={{ duration: light.duration, ease: "easeInOut" }}
            />
          ))}

        </motion.div>
      )}
    </AnimatePresence>
  );
}
