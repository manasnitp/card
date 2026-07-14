"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloralBorder from "./FloralBorder";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Sequence: Flap opens with magic edge glow -> envelope scales up & fades -> trigger main content
    setTimeout(() => {
      setIsRemoving(true);
      setTimeout(() => {
        onOpen();
      }, 1200);
    }, 1800);
  };

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#C9A86A]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 20 }}
          transition={{ duration: 1.5, ease: [0.8, 0, 0.2, 1] }}
          onClick={handleOpen}
        >
          {/* Blinding Light Flash on exit */}
          <motion.div
            className="absolute inset-0 bg-brand-gold z-50 pointer-events-none mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={isRemoving ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Subtle Ambient Lighting */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold/15 via-transparent to-transparent pointer-events-none" />

          {/* Envelope Container */}
          <motion.div
            className="relative w-[320px] h-[480px] md:w-[400px] md:h-[600px] cursor-pointer perspective-[2000px] z-10"
            style={{ transformStyle: "preserve-3d" }}
            animate={isOpen ? { scale: 1.1, y: -20, rotateX: 5 } : { scale: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Back of Envelope */}
            <div className="absolute inset-0 bg-[#EFE3D0] rounded-lg shadow-2xl overflow-hidden border border-brand-gold/20" />

            {/* Floral Embossed Borders */}
            <FloralBorder className="left-0 w-16 md:w-20 text-[#E2D4BB]" />
            <FloralBorder className="right-0 w-16 md:w-20 text-[#E2D4BB] scale-x-[-1]" />

            {/* Inner Golden Glow (revealed when flap opens) */}
            <motion.div
              className="absolute inset-0 top-0 h-[40%] bg-gradient-to-b from-brand-gold/80 via-brand-gold/20 to-transparent blur-xl z-10"
              initial={{ opacity: 0 }}
              animate={isOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            />

            {/* Bottom Flap with glowing edges when open */}
            <motion.div
              className="absolute bottom-0 w-full h-[60%] bg-[#FDFBF7] rounded-b-lg border-t border-brand-gold/10 z-10 drop-shadow-[0_-5px_10px_rgba(0,0,0,0.05)]"
              style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
              animate={isOpen ? { filter: "drop-shadow(0 -4px 10px rgba(201,168,106,0.6))" } : { filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))" }}
              transition={{ duration: 1 }}
            />

            {/* Top Flap (Animated) with edge glow */}
            <motion.div
              className="absolute top-0 w-full h-[55%] bg-[#FDFBF7] rounded-t-lg origin-top z-20 flex justify-center items-end pb-8 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              animate={isOpen ? { rotateX: 180, zIndex: 0, filter: "drop-shadow(0 -10px 15px rgba(201,168,106,0.4))" } : { rotateX: 0, filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))" }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* Highly Thick 3D Dark Amber Wax Seal */}
            <motion.div
              className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-24 h-24 rounded-full bg-[#5A1C1D] flex items-center justify-center"
              style={{ boxShadow: 'inset 0 6px 15px rgba(0,0,0,0.7), inset 0 -4px 10px rgba(255,255,255,0.1), 0 15px 30px rgba(0,0,0,0.6), 0 5px 15px rgba(201,168,106,0.3)' }}
              animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeIn" }}
            >
              {/* Inner gold ring */}
              <div className="absolute inset-2 border-2 border-brand-gold/70 rounded-full pointer-events-none opacity-80 mix-blend-overlay" />
              {/* Couple Initials */}
              <span className="font-playfair italic text-brand-gold text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pr-1 font-semibold">
                S <span className="font-vibes text-3xl font-normal">&</span> A
              </span>
            </motion.div>

            {/* "TAP TO OPEN" Text */}
            <motion.div
              className="absolute -bottom-16 left-0 right-0 text-center z-30"
              animate={isOpen ? { opacity: 0 } : { opacity: 0.8 }}
            >
              <span className="font-inter text-sm tracking-[0.4em] text-[#FDFBF7] uppercase">Tap to open</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
