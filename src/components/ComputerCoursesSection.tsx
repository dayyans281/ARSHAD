import { useState } from 'react';
import { Cpu, Palette, Sparkles, Table, TrendingUp, Monitor, ArrowRight, CheckCircle2, Laptop, Award } from 'lucide-react';
import { COMPUTER_COURSES } from '../data/instituteData';
import { Course } from '../types';

interface ComputerCoursesSectionProps {
  onSelectCourse: (course: Course) => void;
  onEnrollCourse: (courseTitle: string) => void;
}

export function ComputerCoursesSection({ onSelectCourse, onEnrollCourse }: ComputerCoursesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-amber-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />;
      case 'Table': return <Table className="w-6 h-6 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-400" />;
      case 'Monitor': return <Monitor className="w-6 h-6 text-amber-400" />;
      default: return <Laptop className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <section id="computer-courses" className="py-16 sm:py-20 bg-[#061224] text-white relative border-t border-b border-amber-500/20">
      {/* Background glow and subtle dots */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Laptop className="w-3.5 h-3.5" />
            Modern IT & Tech Skills
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            COMPUTER <span className="text-gold-gradient">COURSES</span>
          </h2>
          <p className="text-base text-slate-300">
            Equip yourself with practical, employment-ready digital skills. From official CIT diplomas and graphic design to our modern Special Class of A.I.
          </p>
        </div>

        {/* Highlight Banner: Special AI Class & Computer Lab */}
        <div className="mb-12 rounded-2xl p-1 bg-gradient-to-r from-amber-500/40 via-cyan-500/30 to-amber-500/40 shadow-2xl">
          <div className="rounded-xl bg-[#091A33] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Featured Future Course
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Special Class of A.I & Prompt Engineering 🤖
              </h3>
              <p className="text-sm text-slate-300 max-w-2xl">
                Unique Commerce Centre brings high-level Artificial Intelligence literacy to Orangi Town, Karachi. Learn prompt engineering, generative design, automated workflows, and ChatGPT for business productivity.
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-300 pt-1 justify-center lg:justify-start">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Hands-on Workstations</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Certificate of Completion</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Real-world Project Portfolio</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => onEnrollCourse('Special Class of A.I')}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm px-6 py-3 rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-all text-center"
              >
                ENROLL IN A.I CLASS NOW
              </button>
              <button
                onClick={() => {
                  const course = COMPUTER_COURSES.find(c => c.id === 'special-ai');
                  if (course) onSelectCourse(course);
                }}
                className="bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 text-center transition-colors"
              >
                View A.I Syllabus
              </button>
            </div>
          </div>
        </div>

        {/* 6 Modern Computer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPUTER_COURSES.map(course => {
            const isAI = course.id === 'special-ai';

            return (
              <div
                key={course.id}
                className={`group rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  isAI
                    ? 'bg-gradient-to-b from-[#0F294D] to-[#0A192F] border-2 border-amber-400 shadow-xl shadow-amber-400/10'
                    : 'bg-[#0B1E3D] border border-amber-500/20 hover:border-amber-400/50 shadow-lg'
                }`}
              >
                <div>
                  {/* Top Bar: Icon + Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center p-2.5 ${
                      isAI
                        ? 'bg-amber-400/20 border border-amber-400/50'
                        : 'bg-white/5 border border-white/10 group-hover:border-amber-400/30'
                    }`}>
                      {getIcon(course.icon)}
                    </div>
                    {course.badge && (
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        isAI
                          ? 'bg-amber-400 text-slate-950 shadow'
                          : 'bg-amber-400/10 border border-amber-400/30 text-amber-300'
                      }`}>
                        {course.badge}
                      </span>
                    )}
                  </div>

                  {/* Course Title */}
                  <h3 className="text-xl font-black font-heading text-white group-hover:text-amber-300 transition-colors">
                    {course.title}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium mb-3">
                    Duration: <span className="text-amber-400 font-semibold">{course.duration}</span> • {course.level}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {course.shortDesc}
                  </p>

                  {/* Syllabus Highlights */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-white/10">
                    <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">Key Modules:</div>
                    <ul className="space-y-1">
                      {course.modules.slice(0, 3).map((mod, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{mod}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white hover:text-amber-300 text-xs font-bold py-2.5 px-3 rounded-xl border border-white/10 hover:border-amber-400/40 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onEnrollCourse(course.title)}
                    className={`text-xs font-black py-2.5 px-4 rounded-xl transition-all hover:scale-105 shrink-0 ${
                      isAI
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                        : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
                    }`}
                  >
                    ENROLL NOW
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Lab Facilities Banner */}
        <div className="mt-12 bg-[#0A192F] rounded-2xl border border-amber-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Dedicated 1-Student-per-PC Lab</h4>
              <p className="text-xs text-slate-300">High-speed broadband internet, generator backup during Karachi load shedding, and personal trainer assistance.</p>
            </div>
          </div>
          <button
            onClick={() => onEnrollCourse('C.I.T (Certificate in IT)')}
            className="w-full md:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-colors shrink-0"
          >
            Reserve Your Workstation
          </button>
        </div>

      </div>
    </section>
  );
}
