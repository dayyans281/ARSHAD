import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, Award, Users, BookOpen, Clock, ShieldCheck } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { UCCLogo } from './UCCLogo';

interface HeroProps {
  onRegisterClick: () => void;
  onProgramsClick: () => void;
  onBillboardClick: () => void;
}

export function Hero({ onRegisterClick, onProgramsClick, onBillboardClick }: HeroProps) {
  const [billboardSrc, setBillboardSrc] = useState('/assets/billboard_coaching.jpg');

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#071A3A] via-[#041229] to-[#124B86] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-amber-500/20">
      {/* Background Decorative Gold Particles, Geometric Patterns & Soft Glow */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#124B86]/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Subtle Floating Gold Particles */}
      <div className="absolute top-12 left-10 hidden md:block animate-pulse duration-1000">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_12px_#F4B82A]"></span>
      </div>
      <div className="absolute top-1/3 right-12 hidden md:block animate-pulse duration-700">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FFD45A] shadow-[0_0_15px_#FFD45A]"></span>
      </div>
      <div className="absolute bottom-16 right-1/4 hidden md:block animate-pulse duration-500">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_#F4B82A]"></span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Specified Heading, Subheading, CTAs & Small Stats */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Small Badge: ADMISSIONS OPEN • 2026–2027 */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/50 text-amber-300 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-md shadow-amber-500/10">
              <UCCLogo size="xs" withRing={false} className="w-5 h-5 rounded-md" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              <span>ADMISSIONS OPEN • 2026–2027</span>
            </div>

            {/* Large Heading: LEARN TODAY. LEAD TOMORROW. (Highlight LEAD TOMORROW in gold) */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.08] text-white">
                LEARN TODAY.<br />
                <span className="text-gold-gradient drop-shadow-md">LEAD TOMORROW.</span>
              </h1>
              <p className="text-sm sm:text-base font-bold text-amber-300/90 tracking-widest uppercase">
                UNIQUE COMMERCE CENTRE • KARACHI
              </p>
            </div>

            {/* Description as explicitly mandated */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Professional education, computer training, AI skills and English language courses designed to help students build a brighter future.
            </p>

            {/* Buttons: REGISTER NOW (Primary Gold) + EXPLORE PROGRAMS (Secondary) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onRegisterClick}
                id="hero-register-btn"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base px-8 py-4 rounded-xl shadow-xl shadow-amber-500/25 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-slate-950" />
              </button>

              <button
                onClick={onProgramsClick}
                id="hero-explore-btn"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 text-white font-bold text-base px-7 py-4 rounded-xl border border-white/25 hover:border-amber-400/50 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>EXPLORE PROGRAMS</span>
              </button>

              <button
                onClick={onBillboardClick}
                className="text-xs text-amber-300/90 hover:text-amber-200 underline underline-offset-4 font-semibold transition-colors"
              >
                View Full Billboard
              </button>
            </div>

            {/* Mandated Small Information Stats:
                - 5+ Academic Programs
                - 4+ Professional Courses
                - Career-Focused Learning */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-xs sm:text-sm text-slate-200 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">5+ Academic Programs</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">4+ Professional Courses</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">Career-Focused Learning</span>
              </div>
            </div>

            {/* Campus Info & Director line */}
            <div className="pt-2 text-xs text-slate-300 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <span>Director: <strong className="text-amber-300 font-bold">{INSTITUTE_INFO.director}</strong></span>
              <span>•</span>
              <span>Rehmat Chowk, Sector 1-F, Orangi Town, Karachi</span>
              <span>•</span>
              <a href={`tel:${INSTITUTE_INFO.phone}`} className="text-amber-300 hover:underline font-bold">
                {INSTITUTE_INFO.phone}
              </a>
            </div>

          </div>

          {/* Right Column: Uploaded Billboard Campaign Poster Card with 3D effect, white border & floating */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none group">
              
              {/* Soft gold radial glow behind card */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-yellow-300/20 to-blue-500/30 blur-lg opacity-80 group-hover:opacity-100 transition-opacity"></div>

              {/* Premium Rounded Card with White Border, Soft Shadow & 3D Effect */}
              <div 
                onClick={onBillboardClick}
                className="relative rounded-2xl overflow-hidden border-2 border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] bg-[#041229] cursor-pointer hover:scale-[1.01] transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Main Billboard Image */}
                <img
                  src={billboardSrc}
                  alt="Unique Commerce Centre Billboard Admission Campaign"
                  referrerPolicy="no-referrer"
                  onError={() => setBillboardSrc('/assets/images/billboard_uploaded.jpg')}
                  className="w-full h-auto object-cover max-h-[520px] rounded-2xl"
                />

                {/* Subtle Gradient Vignette at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#041229] via-[#041229]/60 to-transparent"></div>

                {/* Campaign Poster Details Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#071A3A]/95 backdrop-blur-md border border-amber-400/40 text-left flex items-center justify-between gap-3 shadow-lg">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>OFFICIAL ADMISSION CAMPAIGN</span>
                    </div>
                    <p className="text-xs text-white font-semibold mt-0.5">
                      Session 2026–2027 • Karachi Board Coaching
                    </p>
                  </div>
                  <span className="shrink-0 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-[11px] px-2.5 py-1.5 rounded-lg shadow">
                    VIEW POSTER
                  </span>
                </div>
              </div>

              {/* SECTION 5: MANDATED PREMIUM GOLD ADMISSION BADGE WITH PULSE / GLOW */}
              <div className="absolute -top-4 -right-4 sm:-right-6 z-20">
                <div className="relative group">
                  {/* Glowing Pulse Ring */}
                  <div className="absolute -inset-1 rounded-2xl bg-amber-400 blur-md opacity-70 animate-pulse"></div>
                  
                  {/* Badge Container */}
                  <div className="relative bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 text-slate-950 px-4 py-2.5 rounded-2xl shadow-2xl border-2 border-white text-center font-black">
                    <span className="block text-[10px] tracking-widest uppercase font-extrabold text-slate-900 leading-tight">
                      ADMISSIONS OPEN
                    </span>
                    <span className="block text-base sm:text-lg font-black tracking-tight leading-none text-slate-950 mt-0.5">
                      2026–2027
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge Bottom Left */}
              <div className="absolute -bottom-4 -left-3 sm:-left-5 z-20 bg-[#071A3A] border-2 border-amber-400/60 text-white px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <p className="text-[10px] text-amber-300 font-bold leading-none">ESTABLISHED ACADEMY</p>
                  <p className="text-xs font-black text-white leading-none mt-1">Orangi Town, Karachi</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Bottom Counter Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 lg:mt-16 pt-8 border-t border-amber-500/20">
          <div className="bg-[#071A3A]/80 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">15+</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">Years Experience</div>
            <div className="text-[11px] text-slate-300 mt-1">Dedicated academic coaching</div>
          </div>

          <div className="bg-[#071A3A]/80 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">10,000+</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">Trained Students</div>
            <div className="text-[11px] text-slate-300 mt-1">Commerce, IT & Academics</div>
          </div>

          <div className="bg-[#071A3A]/80 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">Practical Education</div>
            <div className="text-[11px] text-slate-300 mt-1">Modern Computer & AI Lab</div>
          </div>

          <div className="bg-[#071A3A]/80 backdrop-blur-sm p-4 rounded-xl border border-amber-500/20 text-center hover:border-amber-400/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">A-1 Grades</div>
            <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">BSEK & BIEK Results</div>
            <div className="text-[11px] text-slate-300 mt-1">Special Board Exam Coaching</div>
          </div>
        </div>

      </div>
    </section>
  );
}
