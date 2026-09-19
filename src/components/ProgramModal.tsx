import React from 'react';
import { X, CheckCircle2, Clock, Calendar, ArrowRight, ShieldCheck, BookOpen } from 'lucide-react';
import { Program } from '../types';
import { INSTITUTE_INFO } from '../data/instituteData';

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
  onApply: (programName: string) => void;
}

export function ProgramModal({ program, onClose, onApply }: ProgramModalProps) {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full bg-[#0A192F] text-white rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#061224] p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Academic Program Details
            </span>
            <h3 className="text-2xl font-black font-heading text-white">
              {program.name}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">{program.level}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Program Overview</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {program.fullDetails}
            </p>
          </div>

          {/* Timing & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#0B1E3D] p-3 rounded-xl border border-white/10 text-xs">
              <span className="text-slate-400 block font-medium">Session Duration:</span>
              <span className="text-white font-bold">{program.duration}</span>
            </div>
            <div className="bg-[#0B1E3D] p-3 rounded-xl border border-white/10 text-xs">
              <span className="text-slate-400 block font-medium">Class Timings:</span>
              <span className="text-white font-bold">{program.timings}</span>
            </div>
          </div>

          {/* Subjects & Curriculum */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Subjects & Syllabus Covered</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {program.subjects.map((sub, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Karachi Board & Affiliation note */}
          <div className="bg-amber-400/10 border border-amber-400/30 p-3.5 rounded-xl text-xs text-amber-200 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Karachi Board (BSEK & BIEK) Exam System
            </p>
            <p className="text-slate-300">
              Includes comprehensive chapter-wise MCQs, model test series, past paper solutions, and board topper answer sheet analysis led by Sir Arshad Siddiqui.
            </p>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-[#061224] border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-4 py-2"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(program.name);
            }}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>Apply for this Program</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
