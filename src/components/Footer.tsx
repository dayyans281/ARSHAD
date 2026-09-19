import React from 'react';
import { Phone, MapPin, Mail, MessageCircle, ArrowUp, Sparkles } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { UCCLogo } from './UCCLogo';

interface FooterProps {
  onOpenAdmin: () => void;
  onSelectProgram: (progName: string) => void;
  onSelectCourse: (courseName: string) => void;
  onSelectBlog?: () => void;
}

export function Footer({ onOpenAdmin, onSelectProgram, onSelectCourse, onSelectBlog }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#040A14] text-white border-t-2 border-amber-500/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Left: UNIQUE COMMERCE CENTRE & Tagline (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <UCCLogo size="md" withRing={true} />
              <div>
                <h3 className="font-heading font-black text-xl text-white tracking-tight">
                  UNIQUE <span className="text-gold-gradient">COMMERCE</span> CENTRE
                </h3>
                <p className="text-xs text-amber-300 italic font-serif">
                  “Learn Today. Lead Tomorrow.”
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              Dedicated to academic superiority and contemporary digital skill empowerment for students across Karachi. Offering comprehensive BSEK & BIEK Karachi board coaching, degree preparation, CIT, and AI education.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-md"
                  aria-label="Facebook Page"
                >
                  <span className="font-bold text-sm">f</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-md"
                  aria-label="Instagram Profile"
                >
                  <span className="font-bold text-xs">IG</span>
                </a>
                <a
                  href={`https://wa.me/923442302526?text=${encodeURIComponent("Assalam-o-Alaikum, I want information about admission at Unique Commerce Centre.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-md"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${INSTITUTE_INFO.email}`}
                  className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-500 flex items-center justify-center text-white transition-transform hover:scale-105 shadow-md"
                  aria-label="Email UCC"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Center: Mandated Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-amber-300 transition-colors">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('programs')} className="hover:text-amber-300 transition-colors">
                  Programs
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('courses')} className="hover:text-amber-300 transition-colors">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gallery')} className="hover:text-amber-300 transition-colors">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('admissions')} className="hover:text-amber-300 transition-colors">
                  Admissions
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-amber-300 transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button onClick={onSelectBlog || (() => scrollTo('blog'))} className="text-amber-400 hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Blog & News
                </button>
              </li>
            </ul>
          </div>

          {/* Right: Mandated Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-heading">
              Contact Info
            </h4>
            <div className="text-xs text-slate-300 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Director & Helpline:</span>
                  <a href={`tel:${INSTITUTE_INFO.phone}`} className="text-sm font-bold text-amber-300 hover:underline">
                    0344-2302526
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Campus Location:</span>
                  <p className="font-semibold text-white">
                    Rehmat Chowk, Sector 1-F, Orangi Town, Karachi
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Near Musharaf Ritoaz Ghar</p>
                </div>
              </div>

              <div className="bg-[#071A3A] p-3 rounded-xl border border-amber-500/20 mt-3 text-[11px] text-slate-300">
                <p className="font-bold text-amber-300">Campus Working Hours:</p>
                <p>Monday – Sunday: 8:00 AM – 9:30 PM</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright: © 2026 Unique Commerce Centre. All Rights Reserved. */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 <span className="text-white font-semibold">Unique Commerce Centre</span>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-[11px]">
              Sector 1-F, Orangi Town, Karachi
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-slate-400 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
