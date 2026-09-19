import React, { useState } from 'react';
import { Sparkles, Check, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface AboutSectionProps {
  onRegisterClick: () => void;
  onContactClick: () => void;
}

export function AboutSection({ onRegisterClick, onContactClick }: AboutSectionProps) {
  const [imageSrc, setImageSrc] = useState('/src/assets/images/students_hero_1789799480943.jpg');

  const features = [
    { title: "Experienced Teaching Support", desc: "Dedicated subject specialists and Karachi Board mentors led by Sir Arshad Siddiqui." },
    { title: "Career-Focused Learning", desc: "Curriculums mapped directly to university admissions and corporate employment requirements." },
    { title: "Modern Digital Skills", desc: "Hands-on IT labs covering Artificial Intelligence tools, CIT, and Graphic Design." },
    { title: "Student-Friendly Environment", desc: "Supportive atmosphere, individual counseling, and comfortable air-cooled lecture rooms." },
    { title: "Practical Education", desc: "Active project work and computer practice rather than rote textbook memorization." },
    { title: "Professional Development", desc: "English fluency, presentation training, and professional guidance for lifelong success." }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#041229] text-white relative border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INSTITUTE PROFILE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            About <span className="text-gold-gradient">Unique Commerce Centre</span>
          </h2>
          <p className="text-lg sm:text-xl text-amber-200 font-medium italic font-serif max-w-2xl mx-auto">
            “Education with a future-focused approach.”
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image with Frame & Director Crest */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl bg-[#071A3A] group">
              <img
                src={imageSrc}
                alt="Unique Commerce Centre Students & Classroom Learning"
                referrerPolicy="no-referrer"
                onError={() => setImageSrc('/assets/billboard_coaching.jpg')}
                className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041229] via-[#041229]/30 to-transparent"></div>
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#071A3A]/95 backdrop-blur-md border border-amber-400/30">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-amber-300 font-bold text-xs">UNIQUE COMMERCE CENTRE</span>
                    <h4 className="text-sm font-bold text-white">Excellence in Commerce, IT & AI</h4>
                  </div>
                  <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded">
                    Est. Karachi
                  </span>
                </div>
              </div>
            </div>

            {/* Director Information Card */}
            <div className="bg-[#071A3A] rounded-xl p-4 border border-amber-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Director: {INSTITUTE_INFO.director}</h4>
                  <p className="text-xs text-slate-300">Guiding thousands of students toward Board Positions & University Admissions</p>
                </div>
              </div>
              <a
                href={`tel:${INSTITUTE_INFO.phone}`}
                className="hidden sm:inline-flex items-center gap-1.5 bg-amber-400/15 text-amber-300 hover:bg-amber-400 hover:text-slate-950 font-bold text-xs px-3.5 py-2 rounded-lg border border-amber-400/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

          {/* Right Column: Professional Content & Features List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                Preparing Tomorrow's Leaders with Practical Excellence
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Unique Commerce Centre is a premier educational institution in Orangi Town, Karachi, dedicated to bridging academic coaching with contemporary industry skills. We provide:
              </p>
              
              {/* Highlighted Offerings Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Academic Education', 'Computer Training', 'AI Learning', 'Graphic Design', 'English Language Courses', 'Career-Focused Skills'].map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 font-semibold text-xs"
                  >
                    • {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Mandated Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-[#071A3A] p-3.5 rounded-xl border border-amber-500/20 hover:border-amber-400/40 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{feat.title}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{feat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onRegisterClick}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-sm px-6 py-3 rounded-xl shadow-lg hover:brightness-105 transition-all flex items-center gap-2"
              >
                <span>REGISTER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onContactClick}
                className="bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-6 py-3 rounded-xl border border-white/20 transition-colors"
              >
                <span>CONTACT CAMPUS</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
