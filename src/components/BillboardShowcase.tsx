import React, { useState } from 'react';
import { Sparkles, Phone, MapPin, CheckCircle, ExternalLink, Maximize2, ShieldCheck, Download } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

interface BillboardShowcaseProps {
  onRegisterClick: () => void;
}

export function BillboardShowcase({ onRegisterClick }: BillboardShowcaseProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="billboard-showcase" className="py-12 bg-[#08152B] text-white border-b border-amber-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Official Institute Branding
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white">
            The Iconic <span className="text-gold-gradient">Billboard Identity</span> of UCC
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Rooted in our signature deep navy blue, golden yellow typography, and student-focused academic excellence at Rehmat Chowk, Orangi Town, Karachi.
          </p>
        </div>

        {/* Billboard Frame */}
        <div className="relative rounded-2xl p-1 bg-gradient-to-r from-amber-500/40 via-yellow-400/50 to-amber-600/40 shadow-2xl">
          <div className="relative rounded-xl overflow-hidden bg-[#0A192F]">
            
            {/* The Billboard Image */}
            <div className="relative group cursor-pointer" onClick={() => setLightboxOpen(true)}>
              <img
                src="/assets/billboard_coaching.jpg"
                onError={(e) => {
                  // Fallback if public asset has path issue
                  (e.currentTarget as HTMLImageElement).src = '/assets/images/billboard_uploaded.jpg';
                }}
                alt="Unique Commerce Centre Karachi Billboard Branding"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[500px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm shadow-xl flex items-center gap-2">
                  <Maximize2 className="w-4 h-4" /> Click to Expand Billboard
                </span>
              </div>

              {/* Billboard Stamp in Corner */}
              <div className="absolute top-3 left-3 bg-[#061224]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-400/40 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-amber-300 font-bold">Official Billboard Reference</span>
              </div>
            </div>

            {/* Bottom info bar extracted from Billboard */}
            <div className="bg-[#050D1A] p-4 sm:p-6 border-t border-amber-500/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                
                {/* Director & Contact */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-amber-300 uppercase tracking-wider font-bold">Principal / Director</div>
                    <div className="text-base font-black text-white">{INSTITUTE_INFO.director}</div>
                    <a href={`tel:${INSTITUTE_INFO.phone}`} className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {INSTITUTE_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Exact Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="text-xs text-slate-300 leading-snug">
                    <div className="text-amber-300 font-bold uppercase tracking-wider">Campus Location</div>
                    <div className="text-white font-medium">Near Musharaf Ritoaz Ghar, Rehmat Chowk</div>
                    <div className="text-slate-300">Sector 1-F, Orangi Town, Karachi</div>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex items-center justify-start md:justify-end gap-3">
                  <button
                    onClick={onRegisterClick}
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all"
                  >
                    🟡 Apply for Admissions
                  </button>
                  <a
                    href={`https://wa.me/923442302526?text=${encodeURIComponent("Assalam-o-Alaikum, I want information about admission at Unique Commerce Centre.")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors shrink-0"
                  >
                    WhatsApp
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* 4 Architectural Brand Pillars from Billboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-6">
          <div className="bg-[#0B1E3D]/60 p-3 rounded-xl border border-amber-500/20 text-xs">
            <span className="text-amber-400 font-bold block">1. Deep Navy & Royal Blue</span>
            <span className="text-slate-300">Symbolizes academic stability, depth and prestige.</span>
          </div>
          <div className="bg-[#0B1E3D]/60 p-3 rounded-xl border border-amber-500/20 text-xs">
            <span className="text-amber-400 font-bold block">2. Golden Yellow Typography</span>
            <span className="text-slate-300">Represents enlightened knowledge, high values and success.</span>
          </div>
          <div className="bg-[#0B1E3D]/60 p-3 rounded-xl border border-amber-500/20 text-xs">
            <span className="text-amber-400 font-bold block">3. Authentic Pakistani Identity</span>
            <span className="text-slate-300">Tailored to BSEK, BIEK Karachi board curriculums.</span>
          </div>
          <div className="bg-[#0B1E3D]/60 p-3 rounded-xl border border-amber-500/20 text-xs">
            <span className="text-amber-400 font-bold block">4. Futuristic IT & AI Skills</span>
            <span className="text-slate-300">Modern technical literacy for real-world employment.</span>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Billboard */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-[#0A192F] rounded-2xl overflow-hidden border-2 border-amber-400/50 p-2 shadow-2xl">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 bg-slate-950/80 text-amber-400 hover:text-white p-2 rounded-full border border-amber-400/30"
            >
              ✕ Close
            </button>
            <img
              src="/assets/billboard_coaching.jpg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/src/assets/images/billboard_uploaded.jpg';
              }}
              alt="Unique Commerce Centre Billboard Expanded"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
            <div className="p-3 text-center text-xs text-amber-200">
              Unique Commerce Centre — Billboard Branding Reference | Karachi (Sir Arshad Siddiqui: 0344-2302526)
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
