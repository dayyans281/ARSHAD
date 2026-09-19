import React, { useState } from 'react';
import { Phone, MapPin, Mail, MessageCircle, Clock, Navigation, ExternalLink, Sparkles, Send, Check } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

export function ContactSection() {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryText, setInquiryText] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 5000);
    setInquiryText({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#041229] text-white relative border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAMPUS ASSISTANCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            CONTACT <span className="text-gold-gradient">UNIQUE COMMERCE CENTRE</span>
          </h2>
          <p className="text-base text-slate-300">
            Have questions about admission criteria, fee structures, or batch schedules? Call, message, or visit our campus office in Orangi Town, Karachi.
          </p>
        </div>

        {/* Mandated 3 Cards: CALL US | WHATSAPP | VISIT US */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: CALL US */}
          <div className="bg-[#071A3A] rounded-2xl p-7 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Director & Head of Academy</span>
                <h3 className="text-xl font-black text-white mt-0.5">CALL US</h3>
                <p className="text-sm font-bold text-slate-200 mt-1">Director: <strong className="text-amber-300">{INSTITUTE_INFO.director}</strong></p>
                <div className="text-xl font-bold text-amber-300 mt-1">{INSTITUTE_INFO.phone}</div>
                <p className="text-xs text-slate-300 mt-2">Available for student counseling and parent consultations during office hours.</p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/10">
              <a
                href={`tel:${INSTITUTE_INFO.phone}`}
                className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>📞 Call Now</span>
              </a>
            </div>
          </div>

          {/* Card 2: WHATSAPP */}
          <div className="bg-[#071A3A] rounded-2xl p-7 border border-emerald-500/30 hover:border-emerald-400/60 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Instant WhatsApp Desk</span>
                <h3 className="text-xl font-black text-white mt-0.5">WHATSAPP</h3>
                <p className="text-sm font-bold text-slate-200 mt-1">Direct Helpline: <strong className="text-emerald-300">0344-2302526</strong></p>
                <div className="text-lg font-bold text-emerald-300 mt-1">+92 344 2302526</div>
                <p className="text-xs text-slate-300 mt-2">Get instant admission fee breakdown, course prospectus, and batch schedule PDFs.</p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/10">
              <a
                href={`https://wa.me/923442302526?text=${encodeURIComponent("Assalam-o-Alaikum, I want information about admission at Unique Commerce Centre.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
              >
                <span>💬 WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Card 3: VISIT US */}
          <div className="bg-[#071A3A] rounded-2xl p-7 border border-amber-500/20 hover:border-amber-400/50 transition-all shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Campus Location</span>
                <h3 className="text-xl font-black text-white mt-0.5">VISIT US</h3>
                <p className="text-xs font-bold text-amber-300 mt-1">Near Musharaf Ritoaz Ghar</p>
                <div className="text-sm font-semibold text-slate-200 mt-1 leading-snug">
                  Rehmat Chowk, Sector 1-F, Orangi Town, Karachi
                </div>
                <p className="text-xs text-slate-300 mt-2">Open 7 days a week: 8:00 AM – 9:30 PM for campus tours and direct registrations.</p>
              </div>
            </div>
            <div className="pt-5 mt-4 border-t border-white/10">
              <a
                href={INSTITUTE_INFO.mapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white/10 hover:bg-white/20 text-white font-black text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/20"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>📍 GET DIRECTIONS</span>
              </a>
            </div>
          </div>

        </div>

        {/* Embedded Google Map + Quick Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Google Map Area + GET DIRECTIONS BUTTON */}
          <div className="lg:col-span-7 bg-[#071A3A] rounded-2xl p-3 border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-3 bg-[#041229] rounded-xl mb-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="font-bold">Google Maps — Rehmat Chowk, Sector 1-F, Orangi Town</span>
              </div>
              <a
                href={INSTITUTE_INFO.mapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="text-amber-300 hover:underline flex items-center gap-1 font-semibold"
              >
                Open Large Map <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Embedded Google Map */}
            <div className="relative w-full h-[320px] sm:h-[380px] rounded-xl overflow-hidden bg-slate-900 border border-white/10">
              <iframe
                title="Unique Commerce Centre Karachi Google Map Location"
                src={INSTITUTE_INFO.mapsEmbedUrl}
                className="w-full h-full border-0 grayscale-[15%] contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer"
                allowFullScreen
              ></iframe>
            </div>

            <div className="p-3 mt-2 bg-[#041229] rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Office Timings: 8:00 AM – 9:30 PM (Daily)</span>
              </span>
              <a
                href={INSTITUTE_INFO.mapsQueryUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Navigation className="w-3 h-3 text-slate-950" />
                <span>GET DIRECTIONS</span>
              </a>
            </div>
          </div>

          {/* Right: Quick Direct Message Form */}
          <div className="lg:col-span-5 bg-[#071A3A] rounded-2xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Fast Response</span>
                <h3 className="text-xl font-bold font-heading text-white">
                  Send a Quick Question
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Leave your inquiry below and Sir Arshad Siddiqui's office will get back to you promptly.
                </p>
              </div>

              {inquirySent ? (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-center space-y-2 py-8">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-white">Inquiry Received!</h4>
                  <p className="text-xs text-slate-300">
                    Sir Arshad Siddiqui's office will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickInquiry} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Farhan Ali"
                      value={inquiryText.name}
                      onChange={(e) => setInquiryText({ ...inquiryText, name: e.target.value })}
                      className="w-full bg-[#041229] border border-white/15 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Phone or WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0344-XXXXXXX"
                      value={inquiryText.phone}
                      onChange={(e) => setInquiryText({ ...inquiryText, phone: e.target.value })}
                      className="w-full bg-[#041229] border border-white/15 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Message / Course of Interest
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="I want details about I.Com Commerce and Special AI batch timings..."
                      value={inquiryText.message}
                      onChange={(e) => setInquiryText({ ...inquiryText, message: e.target.value })}
                      className="w-full bg-[#041229] border border-white/15 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* Direct Email */}
            <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{INSTITUTE_INFO.email}</span>
              </span>
              <a
                href={`mailto:${INSTITUTE_INFO.email}?subject=Admission%20Inquiry%20Unique%20Commerce%20Centre`}
                className="text-amber-300 hover:underline font-semibold shrink-0"
              >
                Send Email
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
