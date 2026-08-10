"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeartIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 32 29.6" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
  </svg>
);

const BubbleIcon = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <span
    className={`block rounded-full border border-[#f6b6c8]/55 bg-[#f6b6c8]/10 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.55),0_0_8px_rgba(246,182,200,0.28)] ${className ?? ""}`}
    style={style}
  >
    <span className="block w-1/3 h-1/3 mt-[18%] ml-[18%] rounded-full bg-white/60" />
  </span>
);

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);
  const [particles] = useState(() => 
    Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2, 
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      xEnd: Math.random() * 10 - 5,
    }))
  );

  const [hearts] = useState(() => 
    Array.from({ length: 18 }).map((_, i) => ({
      id: `heart-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 10,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 15,
      rotation: Math.random() * 30 - 15,
      targetRotation: Math.random() > 0.5 ? 30 : -30,
      xEnd: Math.random() * 20 - 10,
    }))
  );

  const [bubbles] = useState(() =>
    Array.from({ length: 22 }).map((_, i) => ({
      id: `bubble-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 18 + 8,
      duration: Math.random() * 16 + 14,
      delay: Math.random() * 14,
      xEnd: Math.random() * 24 - 12,
      scaleEnd: Math.random() * 0.5 + 0.9,
    }))
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {/* Ambient Pulsing Light */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#f6b6c8]/12 via-transparent to-transparent opacity-50 mix-blend-screen"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Pink Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#f6b6c8] opacity-40 shadow-[0_0_8px_rgba(246,182,200,0.8)] transform-gpu will-change-transform"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: ["0vh", "-100vh"], x: ["0vw", `${p.xEnd}vw`], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-[#f6b6c8]/65 transform-gpu will-change-transform"
          style={{ 
            width: h.size, 
            height: h.size, 
            left: `${h.x}%`, 
            top: `${h.y}%`,
            filter: "drop-shadow(0 2px 4px rgba(246,182,200,0.35))"
          }}
          animate={{ 
            y: ["0vh", "-100vh"], 
            x: ["0vw", `${h.xEnd}vw`],
            rotate: [h.rotation, h.rotation + h.targetRotation],
            opacity: [0, 0.6, 0] 
          }}
          transition={{ duration: h.duration, repeat: Infinity, delay: h.delay, ease: "linear" }}
        >
          <HeartIcon className="w-full h-full" />
        </motion.div>
      ))}

      {/* Floating Bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute text-[#f6b6c8]/65 transform-gpu will-change-transform"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
          }}
          animate={{
            y: ["0vh", "-100vh"],
            x: [0, `${bubble.xEnd}vw`],
            scale: [0.7, bubble.scaleEnd, 0.85],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: bubble.duration, repeat: Infinity, delay: bubble.delay, ease: "linear" }}
        >
          <BubbleIcon className="w-full h-full" />
        </motion.div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/5 to-brand-bg/15 pointer-events-none" />
    </div>
  );
}
