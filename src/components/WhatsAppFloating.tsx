import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/instituteData';

export function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('Assalam-o-Alaikum, I want information about admission at Unique Commerce Centre.');

  const defaultMsg = 'Assalam-o-Alaikum, I want information about admission at Unique Commerce Centre.';
  const directLink = `https://wa.me/923442302526?text=${encodeURIComponent(userMsg || defaultMsg)}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end print:hidden">
      
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-[#0A192F] text-white rounded-2xl border-2 border-emerald-400 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">UCC Admissions Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Sir Arshad Siddiqui: 0344-2302526
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-emerald-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-3 bg-[#061224]">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-slate-200 space-y-1">
              <p className="font-bold text-amber-300">👋 Assalam-o-Alaikum!</p>
              <p>Welcome to Unique Commerce Centre Karachi. How can we help you today with admissions for 2026–2027?</p>
            </div>

            <textarea
              rows={2}
              value={userMsg}
              onChange={(e) => setUserMsg(e.target.value)}
              className="w-full bg-[#0A192F] border border-emerald-500/40 rounded-xl p-2.5 text-xs text-white outline-none focus:border-emerald-400 resize-none"
            />

            <a
              href={directLink}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              <span>Start WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="WhatsApp Admission Support"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 relative"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-[9px] font-bold text-slate-950 items-center justify-center">1</span>
          </span>
          <MessageCircle className="w-7 h-7" />
        </button>

        {/* Hover Pill Label */}
        {!isOpen && (
          <span className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 bg-[#0A192F] text-emerald-300 border border-emerald-400/40 font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp Admission Desk
          </span>
        )}
      </div>

    </div>
  );
}
