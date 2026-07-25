"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface InvitationLayoutProps {
  children: ReactNode;
}

export default function InvitationLayout({ children }: InvitationLayoutProps) {
  return (
    <div className="relative min-h-screen w-full bg-brand-bg">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full min-h-screen bg-brand-bg overflow-x-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}
