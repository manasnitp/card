"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";

export default function RSVP() {
  return (
    <section className="relative z-10 overflow-hidden flex flex-col items-center pt-20 pb-20 md:pt-40 px-6 bg-[#fce8e8]">
      <SectionDivider fillColor="#FDFBF7" position="top" />

      {/* Top floral divider */}
      <div className="w-full flex items-center justify-center mb-12">
        <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-brand-gold/40" />
        <svg viewBox="0 0 80 40" className="w-20 h-10 mx-3 text-brand-gold" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 20 Q20 0 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M40 20 Q60 0 80 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M40 20 Q30 35 20 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M40 20 Q50 35 60 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="40" cy="20" r="3" fill="currentColor" opacity="0.6"/>
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4"/>
          <circle cx="68" cy="12" r="2" fill="currentColor" opacity="0.4"/>
        </svg>
        <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-brand-gold/40 to-brand-gold/40" />
      </div>

      {/* Left floral branch */}
      <svg viewBox="0 0 80 200" className="absolute left-0 bottom-0 w-16 md:w-24 text-brand-gold/30 opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,200 Q 30,150 20,100 Q 10,50 40,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 20,150 Q 0,130 5,110" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M 22,110 Q 50,100 45,80" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M 18,70 Q -5,60 0,40" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="5" cy="110" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="45" cy="80" r="2.5" fill="currentColor" opacity="0.4"/>
        <circle cx="0" cy="40" r="3" fill="currentColor" opacity="0.5"/>
      </svg>

      {/* Right floral branch */}
      <svg viewBox="0 0 80 200" className="absolute right-0 bottom-0 w-16 md:w-24 text-brand-gold/30 opacity-70 scale-x-[-1]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,200 Q 30,150 20,100 Q 10,50 40,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M 20,150 Q 0,130 5,110" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M 22,110 Q 50,100 45,80" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M 18,70 Q -5,60 0,40" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="5" cy="110" r="3" fill="currentColor" opacity="0.5"/>
        <circle cx="45" cy="80" r="2.5" fill="currentColor" opacity="0.4"/>
        <circle cx="0" cy="40" r="3" fill="currentColor" opacity="0.5"/>
      </svg>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center relative z-10 max-w-sm mx-auto"
      >
        <p className="font-cormorant text-xl text-brand-text/80 italic leading-relaxed">
          The Chakraborty Family &amp; The Mukherjee Family would love to host you as they celebrate this joyous occasion.
        </p>
      </motion.div>

      {/* Bottom botanical cluster */}
      <div className="mt-12 flex items-end justify-center gap-1">
        <svg viewBox="0 0 40 60" className="w-8 h-12 text-brand-gold/50" fill="none">
          <path d="M20 60 Q10 40 15 20 Q20 5 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 35 Q0 28 5 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M17 20 Q30 15 28 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="5" cy="18" r="2.5" fill="currentColor" opacity="0.5"/>
          <circle cx="28" cy="5" r="2" fill="currentColor" opacity="0.4"/>
        </svg>
        <svg viewBox="0 0 40 80" className="w-10 h-16 text-brand-gold/60" fill="none">
          <path d="M20 80 Q15 55 18 30 Q20 10 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M18 55 Q0 45 5 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M19 35 Q38 25 35 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="5" cy="30" r="3" fill="currentColor" opacity="0.5"/>
          <circle cx="35" cy="10" r="2.5" fill="currentColor" opacity="0.4"/>
          <circle cx="20" cy="0" r="3.5" fill="currentColor" opacity="0.6"/>
        </svg>
        <svg viewBox="0 0 40 60" className="w-8 h-12 text-brand-gold/50 scale-x-[-1]" fill="none">
          <path d="M20 60 Q10 40 15 20 Q20 5 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M15 35 Q0 28 5 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <path d="M17 20 Q30 15 28 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="5" cy="18" r="2.5" fill="currentColor" opacity="0.5"/>
          <circle cx="28" cy="5" r="2" fill="currentColor" opacity="0.4"/>
        </svg>
      </div>

      <p className="mt-6 font-inter text-[10px] tracking-[0.3em] text-brand-gold/60 uppercase">With love &amp; joy</p>
      <p className="mt-2 font-inter text-[12px] tracking-[0.2em] text-brand-gold font-semibold">#AbhigotHisShrey</p>
    </section>
  );
}
