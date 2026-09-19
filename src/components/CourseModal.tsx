import React from 'react';
import { X, CheckCircle2, Clock, Award, ArrowRight, Laptop, Sparkles } from 'lucide-react';
import { Course } from '../types';
import { INSTITUTE_INFO } from '../data/instituteData';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (courseTitle: string) => void;
}

export function CourseModal({ course, onClose, onEnroll }: CourseModalProps) {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-2xl w-full bg-[#0A192F] text-white rounded-3xl border-2 border-amber-400/50 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#061224] p-6 border-b border-white/10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
                {course.category === 'computer' ? 'Computer Course' : 'English Language Course'}
              </span>
              {course.badge && (
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-bold">
                  {course.badge}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-black font-heading text-white">
              {course.title}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Duration: <span className="text-amber-300 font-semibold">{course.duration}</span> • Level: {course.level}
            </p>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Course Summary</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {course.fullDesc}
            </p>
          </div>

          {/* Modules List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Curriculum Modules</h4>
            <div className="space-y-2">
              {course.modules.map((mod, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/10 text-xs text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {i + 1}
                  </div>
                  <span className="font-medium">{mod}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights & Perks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Course Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {course.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#0B1E3D] p-2.5 rounded-xl border border-amber-500/20 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lab & Certificate note */}
          <div className="bg-amber-400/10 border border-amber-400/30 p-3.5 rounded-xl text-xs text-amber-200 flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold block">Official UCC Certificate of Completion</span>
              <span className="text-slate-300">Awarded upon passing the final practical workstation project and attendance criteria.</span>
            </div>
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
              onEnroll(course.title);
            }}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>Enroll in {course.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
