"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { invitationData } from "@/data/invitation";

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * (invitationData.timeline.length - 1));
    setActiveIndex(index);
  });

  const getProgress = (index: number, total: number) => {
    if (total <= 1) return 1;
    // The first dot is approx 8% down the container, the last is approx 98% down.
    const start = 0.08;
    const end = 0.98;
    return start + (index / (total - 1)) * (end - start);
  };

  return (
    <section className="py-24 px-6 bg-brand-bg relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="font-vibes text-4xl text-brand-burgundy mb-2">Schedule</h2>
          <p className="font-inter text-xs tracking-[0.2em] uppercase text-brand-gold">Order of Events</p>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Vertical Line Background */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-brand-gold/20" />
          
          {/* Vertical Line Animated Progress (Snapped to Flower) */}
          <motion.div 
            className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-brand-gold origin-top"
            style={{ height: "100%" }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: getProgress(activeIndex, invitationData.timeline.length) }}
            transition={{ 
              type: "spring", 
              stiffness: 60, 
              damping: 14,
              mass: 0.8,
              restDelta: 0.001
            }}
          />

          {invitationData.timeline.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50, rotateX: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.4 }}
                className="relative flex items-center mb-16 last:mb-0 md:mb-24 flex-row perspective-[1000px]"
              >
                {/* Timeline Node with Pulse */}
                <div className="absolute left-6 md:left-1/2 flex items-center justify-center -translate-x-[7px] md:-translate-x-1/2 z-10">
                  <motion.div 
                    className="absolute w-8 h-8 rounded-full bg-brand-gold/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                  />
                  <div className="w-4 h-4 bg-brand-bg border-4 border-brand-gold rounded-full shadow-[0_0_15px_rgba(201,168,106,0.8)] relative z-10 flex items-center justify-center">
                    {activeIndex === index && (
                      <motion.div
                        layoutId="timeline-flower"
                        className="absolute z-20 pointer-events-none flex items-center justify-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 60, 
                          damping: 14,
                          mass: 0.8,
                          restDelta: 0.001
                        }}
                      >
                         <span 
                           className="text-2xl animate-spin drop-shadow-md block" 
                           style={{ 
                             animationDuration: '10s', 
                             lineHeight: 1,
                             fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif'
                           }}
                         >
                           🌸
                         </span>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Card Container */}
                <div className={`pl-16 md:pl-0 w-full flex md:w-1/2 ${isEven ? 'md:pr-16 md:justify-end' : 'md:ml-auto md:pl-16 md:justify-start'}`}>
                  <motion.div 
                    className={`w-full max-w-sm md:max-w-lg p-8 md:p-10 rounded-2xl bg-white/50 backdrop-blur-md border border-brand-gold/20 shadow-[0_10px_40px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgb(201,168,106,0.15)] flex flex-col relative overflow-hidden text-left items-start ${isEven ? 'md:text-right md:items-end' : ''}`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Subtle glassmorphism highlight */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
                    
                    <span className="font-inter text-[10px] tracking-widest uppercase text-brand-gold/90 block mb-3 relative z-10">
                      {event.date} <span className="mx-2 opacity-50">•</span> {event.time}
                    </span>
                    <h3 className="font-playfair text-2xl md:text-3xl text-brand-text mb-2 relative z-10">{event.title}</h3>
                    <p className="font-cormorant text-base md:text-lg text-brand-text/80 mb-3 font-medium relative z-10">{event.location}</p>
                    {event.description && (
                      <div className="font-cormorant text-sm md:text-base italic leading-relaxed relative z-10 space-y-1">
                        {event.description.split("\n").map((line, i) =>
                          line.startsWith("Dress Code") ? (
                            <p key={i} className={`font-semibold not-italic text-yellow-600 text-sm tracking-wide flex ${isEven ? 'md:justify-end justify-start' : 'justify-start'} items-center gap-1`}>
                              🌼 {line.replace("Dress Code:", "Dress Code:")}
                            </p>
                          ) : (
                            <p key={i} className="text-brand-text/60">{line}</p>
                          )
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
