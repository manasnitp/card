"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    attending: "yes",
    guests: "1",
    arrivalDate: "25 November",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      // Replace YOUR_ACCESS_KEY_HERE with the actual Web3Forms access key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7d8500c4-066b-4041-94d9-b17019dab1e7",
          subject: `New RSVP from ${formData.name}`,
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="relative z-10 overflow-hidden flex flex-col items-center pt-20 pb-20 md:pt-40 px-6 bg-[#fce8e8]" id="rsvp">
      <SectionDivider fillColor="#FDFBF7" position="top" />

      {/* Top floral divider */}
      <div className="w-full flex items-center justify-center mb-12">
        <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-brand-gold/40" />
        <svg viewBox="0 0 80 40" className="w-20 h-10 mx-3 text-brand-gold" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 20 Q20 0 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 20 Q60 0 80 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M40 20 Q30 35 20 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 20 Q50 35 60 38" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="40" cy="20" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="68" cy="12" r="2" fill="currentColor" opacity="0.4" />
        </svg>
        <span className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-brand-gold/40 to-brand-gold/40" />
      </div>

      {/* Left floral branch */}
      <svg viewBox="0 0 80 200" className="absolute left-0 bottom-0 w-16 md:w-24 text-brand-gold/30 opacity-70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,200 Q 30,150 20,100 Q 10,50 40,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 20,150 Q 0,130 5,110" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22,110 Q 50,100 45,80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M 18,70 Q -5,60 0,40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="5" cy="110" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="45" cy="80" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="0" cy="40" r="3" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Right floral branch */}
      <svg viewBox="0 0 80 200" className="absolute right-0 bottom-0 w-16 md:w-24 text-brand-gold/30 opacity-70 scale-x-[-1]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,200 Q 30,150 20,100 Q 10,50 40,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 20,150 Q 0,130 5,110" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M 22,110 Q 50,100 45,80" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M 18,70 Q -5,60 0,40" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <circle cx="5" cy="110" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="45" cy="80" r="2.5" fill="currentColor" opacity="0.4" />
        <circle cx="0" cy="40" r="3" fill="currentColor" opacity="0.5" />
      </svg>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="text-center relative z-10 w-full max-w-md mx-auto"
      >
        <h2 className="font-cormorant text-4xl md:text-5xl text-brand-gold mb-6 font-medium">RSVP</h2>
        <p className="font-cormorant text-xl text-brand-text/80 italic leading-relaxed mb-10">
          We would love to host you as we celebrate this joyous occasion.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-brand-gold/20 flex flex-col items-center shadow-sm"
          >
            <CheckCircle2 className="w-12 h-12 text-green-600/80 mb-4" />
            <h3 className="font-cormorant text-2xl text-brand-gold mb-2">Thank You!</h3>
            <p className="text-brand-text/70 font-inter text-sm">Your RSVP has been successfully received.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-brand-gold/20 text-left space-y-5 shadow-sm">
            {status === "error" && (
              <div className="bg-red-50/80 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>Something went wrong. Please try again later.</p>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-text/80 mb-1">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/60 border border-brand-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="attending" className="block text-sm font-medium text-brand-text/80 mb-1">Will you be attending? *</label>
              <select
                id="attending"
                name="attending"
                required
                value={formData.attending}
                onChange={handleChange}
                className="w-full bg-white/60 border border-brand-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent transition-all"
              >
                <option value="yes">Joyfully Accept</option>
                <option value="no">Regretfully Decline</option>
              </select>
            </div>

            {formData.attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-5"
              >
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-brand-text/80 mb-1 mt-1">Number of Guests *</label>
                  <select
                    id="guests"
                    name="guests"
                    required={formData.attending === "yes"}
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-white/60 border border-brand-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? "Person" : "People"}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="arrivalDate" className="block text-sm font-medium text-brand-text/80 mb-1 mt-1">Date of Arrival *</label>
                  <select
                    id="arrivalDate"
                    name="arrivalDate"
                    required={formData.attending === "yes"}
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    className="w-full bg-white/60 border border-brand-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent transition-all"
                  >
                    <option value="25 November">25 November</option>
                    <option value="26 November">26 November</option>
                  </select>
                </div>
              </motion.div>
            )}

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-text/80 mb-1 mt-1">Special Message / Wish (Optional)</label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/60 border border-brand-gold/30 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent transition-all resize-none"
                placeholder="Leave a message for the couple..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full mt-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center disabled:opacity-70"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send RSVP"
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* Bottom botanical cluster */}
      <div className="mt-16 flex items-end justify-center gap-1">
        <svg viewBox="0 0 40 60" className="w-8 h-12 text-brand-gold/50" fill="none">
          <path d="M20 60 Q10 40 15 20 Q20 5 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 35 Q0 28 5 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M17 20 Q30 15 28 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="5" cy="18" r="2.5" fill="currentColor" opacity="0.5" />
          <circle cx="28" cy="5" r="2" fill="currentColor" opacity="0.4" />
        </svg>
        <svg viewBox="0 0 40 80" className="w-10 h-16 text-brand-gold/60" fill="none">
          <path d="M20 80 Q15 55 18 30 Q20 10 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M18 55 Q0 45 5 30" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M19 35 Q38 25 35 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="5" cy="30" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="35" cy="10" r="2.5" fill="currentColor" opacity="0.4" />
          <circle cx="20" cy="0" r="3.5" fill="currentColor" opacity="0.6" />
        </svg>
        <svg viewBox="0 0 40 60" className="w-8 h-12 text-brand-gold/50 scale-x-[-1]" fill="none">
          <path d="M20 60 Q10 40 15 20 Q20 5 20 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 35 Q0 28 5 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M17 20 Q30 15 28 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <circle cx="5" cy="18" r="2.5" fill="currentColor" opacity="0.5" />
          <circle cx="28" cy="5" r="2" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      <p className="mt-8 font-inter text-[10px] tracking-[0.3em] text-brand-gold/60 uppercase">With love &amp; joy</p>
      <p className="mt-2 font-inter text-[12px] tracking-[0.2em] text-brand-gold font-semibold">#AbhigotHisShrey</p>
    </section>
  );
}
