"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchCardProps {
  children: React.ReactNode;
  text?: string;
  onReveal?: () => void;
}

export default function ScratchCard({ children, text = "Scratch to Reveal", onReveal }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;
    
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Fill with an elegant gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#C9A86A"); // brand-gold
    gradient.addColorStop(0.5, "#E2C792"); // lighter gold
    gradient.addColorStop(1, "#967945"); // darker gold
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text pattern
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 28px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillText("Use your finger or mouse", canvas.width / 2, canvas.height / 2 + 25);
    
    // Set drawing mode to erase
    ctx.globalCompositeOperation = "destination-out";
  }, [text]);

  const scratch = (x: number, y: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    ctx.beginPath();
    ctx.arc(x, y, 35, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.cancelable) e.preventDefault(); 
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const doScratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault(); 
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const stopScratch = () => {
    setIsDrawing(false);
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    const step = 4 * 4; 
    let totalSampled = 0;

    for (let i = 3; i < pixels.length; i += step) {
      totalSampled++;
      if (pixels[i] < 128) transparentPixels++;
    }

    const percentScratched = (transparentPixels / totalSampled) * 100;

    if (percentScratched > 40 && !isRevealed) {
      setIsRevealed(true);
      onReveal?.();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative select-none w-full h-full max-w-sm mx-auto touch-none"
    >
      <div className="w-full h-full relative z-10">
        {children}
      </div>

      <AnimatePresence>
        {!isRevealed && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full rounded-3xl shadow-xl z-20 cursor-crosshair touch-none"
            onMouseDown={startScratch}
            onMouseMove={doScratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onTouchStart={startScratch}
            onTouchMove={doScratch}
            onTouchEnd={stopScratch}
            style={{ touchAction: 'none' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
