import React from 'react';
import { Sparkles, ArrowRight, Phone, CheckCircle2 } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface AdmissionCTAProps {
  onRegisterClick: () => void;
  onContactClick: () => void;
}

export function AdmissionCTA({ onRegisterClick, onContactClick }: AdmissionCTAProps) {
  return (
    <section id="admissions" className="py-16 sm:py-24 bg-gradient-to-b from-[#071A3A] via-[#041229] to-[#071A3A] text-white relative overflow-hidden">
      
      {/* Background Ornaments */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-15 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* High-Contrast Card with Mandated Gold Decorative Border */}
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 bg-[#091A33] border-4 border-amber-400/80 shadow-[0_0_50px_rgba(244,184,42,0.15)] text-center">
          
          {/* Inner Decorative Corner Accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-300"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-300"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-300"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-300"></div>

          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/50 text-amber-300 font-bold text-xs sm:text-sm uppercase tracking-widest mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>OFFICIAL ADMISSIONS NOTICE</span>
          </div>

          {/* Heading: “ADMISSIONS OPEN FOR 2026–2027” */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white mb-4">
            ADMISSIONS OPEN FOR <span className="text-gold-gradient block sm:inline">2026–2027</span>
          </h2>

          {/* Text: “Take the first step toward your educational and professional future.” */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-medium max-w-2xl mx-auto mb-8">
            Take the first step toward your educational and professional future.
          </p>

          {/* 3 Value Points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-10 text-xs sm:text-sm text-slate-200">
            <div className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Merit Scholarships Available</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Installment Fee Options</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Karachi Board & IT Labs</span>
            </div>
          </div>

          {/* Buttons: REGISTER NOW & CONTACT US */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onRegisterClick}
              id="admissions-register-btn"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base sm:text-lg px-9 py-4 rounded-xl shadow-2xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>REGISTER NOW</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onContactClick}
              className="w-full sm:w-auto bg-[#071A3A] hover:bg-[#0A224D] text-white font-bold text-base sm:text-lg px-8 py-4 rounded-xl border-2 border-amber-400/60 hover:border-amber-400 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5 text-amber-400" />
              <span>CONTACT US</span>
            </button>
          </div>

          {/* Location reminder */}
          <div className="mt-8 text-xs text-slate-400">
            Campus Address: {INSTITUTE_INFO.address} | Helpline: {INSTITUTE_INFO.phone}
          </div>

        </div>

      </div>
    </section>
  );
}
