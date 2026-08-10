"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { invitationData } from "@/data/invitation";
import SectionDivider from "@/components/SectionDivider";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const { partner1, partner2 } = invitationData.couple;

  return (
    <section className="relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden pt-16 pb-32 md:pb-40">
      {/* Cinematic Parallax Background with Slow Zoom */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center transform-gpu will-change-transform"
        style={{ y, opacity: 0.15 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Golden Frame */}
      <div className="absolute inset-4 md:inset-8 border border-brand-gold/30 rounded-2xl md:rounded-3xl pointer-events-none z-10" />
      <div className="absolute inset-5 md:inset-10 border border-brand-gold/10 rounded-xl md:rounded-2xl pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="mb-8 flex items-center justify-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="Couple Monogram Logo"
            className="w-40 h-40 md:w-52 md:h-52 object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8"
        >
          <span className="font-inter text-xs md:text-sm tracking-[0.3em] uppercase text-brand-gold mb-2 block">
            Join us for
          </span>
          <span className="w-12 h-[1px] bg-brand-gold/50 mx-auto block mb-4" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-cormorant text-lg md:text-xl text-brand-text/80 mb-12 tracking-widest uppercase"
        >
          The Wedding Celebration of
        </motion.p>

        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 z-20">
          {/* Bride */}
          <div className="flex flex-col items-center text-center w-full perspective-[1500px]">
            <h1 className="font-playfair text-5xl leading-none text-brand-text font-medium italic mb-3 tracking-wide break-words w-full flex flex-wrap justify-center">
              {partner1.firstName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.05, type: "spring", bounce: 0.4 }}
                  className="inline-block transform-gpu will-change-transform drop-shadow-sm"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            {partner1.parents && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="font-cormorant text-sm text-brand-text/70 italic max-w-sm transform-gpu will-change-transform whitespace-pre-line"
              >
                {partner1.parents}
              </motion.p>
            )}
          </div>

          {/* Ampersand */}
          <motion.div
            className="perspective-[1000px] z-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 1, type: "spring" }}
          >
            <motion.span
              className="font-vibes text-6xl font-bold text-brand-gold py-6 inline-block transform-gpu will-change-transform"
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.1 }}
            >
              &
            </motion.span>
          </motion.div>

          {/* Groom */}
          <div className="flex flex-col items-center text-center w-full perspective-[1500px]">
            <h1 className="font-playfair text-5xl leading-none text-brand-text font-medium italic mb-3 tracking-wide break-words w-full flex flex-wrap justify-center">
              {partner2.firstName.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: 90, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  transition={{ duration: 1, delay: 1 + index * 0.05, type: "spring", bounce: 0.4 }}
                  className="inline-block transform-gpu will-change-transform drop-shadow-sm"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>
            {partner2.parents && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="font-cormorant text-sm text-brand-text/70 italic max-w-sm transform-gpu will-change-transform whitespace-pre-line"
              >
                {partner2.parents}
              </motion.p>
            )}
          </div>
        </div>

      </div>
      <SectionDivider fillColor="#FDFBF7" position="bottom" />
    </section>
  );
}
