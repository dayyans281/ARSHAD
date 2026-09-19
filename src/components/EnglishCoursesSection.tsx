import React from 'react';
import { MessageSquare, Globe, PenTool, Briefcase, ArrowRight, CheckCircle2, Mic, Volume2 } from 'lucide-react';
import { ENGLISH_COURSES } from '../data/instituteData';
import { Course } from '../types';

interface EnglishCoursesSectionProps {
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseTitle: string) => void;
}

export function EnglishCoursesSection({ onSelectCourse, onEnrollCourse }: EnglishCoursesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare': return <MessageSquare className="w-6 h-6 text-amber-400" />;
      case 'Globe': return <Globe className="w-6 h-6 text-amber-400" />;
      case 'PenTool': return <PenTool className="w-6 h-6 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-400" />;
      default: return <MessageSquare className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="english-courses" className="py-16 sm:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5" />
            Linguistic & Communication Mastery
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            ENGLISH LANGUAGE <span className="text-gold-gradient">COURSES</span>
          </h2>
          <p className="text-base text-slate-300">
            Break language barriers and gain international confidence. Designed specifically for Pakistani students, job seekers, and study abroad candidates.
          </p>
        </div>

        {/* 4 English Language Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGLISH_COURSES.map(course => (
            <div
              key={course.id}
              className="group bg-[#0A192F] rounded-2xl border border-amber-500/20 hover:border-amber-400/60 p-6 shadow-xl transition-all duration-300 flex flex-col justify-between relative hover:scale-[1.02]"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform">
                    {getIcon(course.icon)}
                  </div>
                  {course.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[10px] font-bold">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
                  {course.title}
                </h3>
                <div className="text-xs text-amber-400 font-semibold mb-3">
                  {course.duration}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {course.shortDesc}
                </p>

                {/* Highlights */}
                <div className="space-y-1 mb-6 pt-3 border-t border-white/10">
                  {course.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action: Course Details Button */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <button
                  onClick={() => onSelectCourse(course)}
                  className="w-full bg-white/5 hover:bg-amber-400 hover:text-slate-950 text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-white/10 hover:border-amber-400 transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <span>Course Details →</span>
                </button>

                <button
                  onClick={() => onEnrollCourse(course.title)}
                  className="w-full text-center text-[11px] text-amber-300/80 hover:text-amber-200 font-bold py-1 transition-colors"
                >
                  Quick Apply
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Speaking Practice Guarantee Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#0B1E3D] via-[#0D2447] to-[#0B1E3D] rounded-2xl border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Daily English Speaking & Pronunciation Labs</h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                We believe you can only learn to speak by speaking! UCC offers dedicated speaking circles, audio playback, and one-on-one interview grooming sessions.
              </p>
            </div>
          </div>
          <button
            onClick={() => onEnrollCourse('Spoken English')}
            className="w-full md:w-auto bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-all shrink-0"
          >
            JOIN SPOKEN ENGLISH BATCH
          </button>
        </div>

      </div>
    </section>
  );
}
