import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';
import { UCCLogo } from './UCCLogo';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
  pendingCount?: number;
}

export function Navbar({ onOpenRegister, onOpenAdmin, pendingCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'programs', 'computer-courses', 'english-courses', 'why-us', 'gallery', 'blog', 'admissions', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top micro bar for Karachi contact & timings */}
      <div className="bg-[#050D1A] text-slate-300 text-xs py-1.5 px-4 border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 truncate">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Rehmat Chowk, Sector 1-F, Orangi Town, Karachi</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-300">
              Timings: 8:00 AM – 9:30 PM
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${INSTITUTE_INFO.phone}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{INSTITUTE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary Sticky Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A192F]/95 backdrop-blur-md shadow-2xl border-b border-amber-500/30 py-3'
            : 'bg-[#0B1E3D] py-4 border-b border-amber-500/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Institute Identity */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            {/* Official Logo Emblem */}
            <div className="group-hover:scale-105 transition-transform">
              <UCCLogo size="md" withRing={true} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg sm:text-xl md:text-2xl text-white tracking-tight group-hover:text-amber-300 transition-colors">
                  UNIQUE <span className="text-amber-400 font-serif">COMMERCE</span> CENTRE
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-300/90 font-medium tracking-wide flex items-center gap-1.5">
                <span>“Learn Today, Lead Tomorrow”</span>
                <span className="hidden sm:inline w-1 h-1 rounded-full bg-amber-400"></span>
                <span className="hidden sm:inline text-slate-300">Karachi</span>
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold">
            <button
              onClick={() => scrollToSection('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'home'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'about'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              ABOUT
            </button>
            <button
              onClick={() => scrollToSection('programs')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'programs'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              PROGRAMS
            </button>
            <button
              onClick={() => scrollToSection('computer-courses')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'computer-courses'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              COURSES
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'gallery'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'blog'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              BLOG / NEWS
            </button>
            <button
              onClick={() => scrollToSection('admissions')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'admissions'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              ADMISSIONS
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeSection === 'contact'
                  ? 'text-amber-300 bg-amber-500/10 border border-amber-500/30'
                  : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              CONTACT
            </button>
          </div>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              id="nav-register-btn"
              className="relative group overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>REGISTER NOW</span>
              <span className="text-[11px] font-black bg-slate-950/10 px-1.5 py-0.5 rounded-md border border-slate-950/20">
                2026–27
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenRegister}
              className="bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg sm:hidden shadow-md"
            >
              REGISTER
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg bg-white/5 text-amber-300 hover:bg-white/10 hover:text-amber-200 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-3 pb-6 border-t border-amber-500/20 bg-[#0A192F]/98 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-2 py-2">
              <button
                onClick={() => scrollToSection('home')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                ABOUT UNIQUE COMMERCE CENTRE
              </button>
              <button
                onClick={() => scrollToSection('programs')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                PROGRAMS OFFERED
              </button>
              <button
                onClick={() => scrollToSection('computer-courses')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                COMPUTER COURSES & AI
              </button>
              <button
                onClick={() => scrollToSection('english-courses')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                ENGLISH LANGUAGE COURSES
              </button>
              <button
                onClick={() => scrollToSection('why-us')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                WHY CHOOSE US
              </button>
              <button
                onClick={() => scrollToSection('gallery')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                CAMPUS GALLERY
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                BLOG / NEWS
              </button>
              <button
                onClick={() => scrollToSection('admissions')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                ADMISSIONS 2026–2027
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left px-4 py-2.5 rounded-lg text-slate-200 hover:text-amber-300 hover:bg-white/5 font-semibold text-sm"
              >
                CONTACT & LOCATION
              </button>

              <div className="pt-4 border-t border-amber-500/20 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegister();
                  }}
                  className="w-full text-center bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold py-3 rounded-xl shadow-lg"
                >
                  🟡 REGISTER NOW (2026–2027)
                </button>
                <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-400">
                  <a
                    href={`tel:${INSTITUTE_INFO.phone}`}
                    className="flex items-center gap-1 text-amber-300 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" /> {INSTITUTE_INFO.phone}
                  </a>
                  <span className="text-[11px] text-slate-400">
                    Karachi, Sindh
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
