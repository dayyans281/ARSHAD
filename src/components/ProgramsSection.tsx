import { useState } from 'react';
import { BookOpen, GraduationCap, Building2, Award, Scroll, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { PROGRAMS } from '../data/instituteData';
import { Program } from '../types';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program) => void;
  onApplyProgram: (programName: string) => void;
}

export function ProgramsSection({ onSelectProgram, onApplyProgram }: ProgramsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-amber-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'Award': return <Award className="w-6 h-6 text-amber-400" />;
      case 'Scroll': return <Scroll className="w-6 h-6 text-amber-400" />;
      default: return <GraduationCap className="w-6 h-6 text-amber-400" />;
    }
  };

  const filteredPrograms = selectedCategory === 'all'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === selectedCategory);

  return (
    <section id="programs" className="py-16 sm:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Academic Divisions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            PROGRAMS <span className="text-gold-gradient">OFFERED</span>
          </h2>
          <p className="text-base text-slate-300">
            From foundational school education to Karachi Board excellence and postgraduate degrees, empowering students at every academic milestone.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { key: 'all', label: 'All Programs' },
            { key: 'secondary', label: 'Secondary' },
            { key: 'matric', label: 'Matric (BSEK)' },
            { key: 'intermediate', label: 'Intermediate (Commerce / Science)' },
            { key: 'graduation', label: 'Graduation' },
            { key: 'masters', label: 'Masters' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelectedCategory(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                selectedCategory === tab.key
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-[#0B1E3D] text-slate-300 hover:text-white hover:bg-[#102A54] border border-amber-500/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(program => (
            <div
              key={program.id}
              className="group bg-[#0A192F] rounded-2xl border border-amber-500/20 hover:border-amber-400/60 p-6 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle top shimmer */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Header Icon + Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-amber-400/10 to-amber-600/20 border border-amber-400/30 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                    {getIcon(program.icon)}
                  </div>
                  {program.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold">
                      {program.badge}
                    </span>
                  )}
                </div>

                {/* Program Name */}
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors">
                  {program.name}
                </h3>
                <div className="text-xs text-amber-400 font-semibold mb-3">
                  {program.level}
                </div>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {program.description}
                </p>

                {/* Key subjects / features preview */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-white/10">
                  <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">Core Syllabus Focus:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {program.subjects.slice(0, 3).map((sub, idx) => (
                      <span key={idx} className="inline-flex items-center gap-1 text-xs bg-white/5 text-slate-200 px-2 py-0.5 rounded border border-white/10">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        {sub}
                      </span>
                    ))}
                    {program.subjects.length > 3 && (
                      <span className="text-xs text-amber-300/80 px-1 py-0.5">+{program.subjects.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={() => onSelectProgram(program)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white hover:text-amber-300 text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl border border-white/10 hover:border-amber-400/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onApplyProgram(program.name)}
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black py-2.5 px-3.5 rounded-xl transition-all hover:scale-105 shrink-0"
                >
                  Apply
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom helper note */}
        <div className="mt-10 p-4 rounded-xl bg-[#0B1E3D]/80 border border-amber-500/20 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="text-slate-300">
            Need guidance regarding intermediate group selection (Pre-Medical vs Pre-Engineering vs I.Com Commerce)?
          </span>
          <a
            href="tel:03442302526"
            className="text-amber-300 font-bold hover:underline shrink-0"
          >
            Call Career Counselor Sir Arshad Siddiqui: 0344-2302526
          </a>
        </div>

      </div>
    </section>
  );
}
