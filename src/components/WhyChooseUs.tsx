import React from 'react';
import { GraduationCap, Laptop, Bot, MessageCircle, UserCheck, Trophy, Sparkles, CheckCircle } from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      emoji: "🎓",
      icon: <GraduationCap className="w-7 h-7 text-amber-400" />,
      title: "QUALITY EDUCATION",
      description: "Experienced academic support with comprehensive test sessions, past papers solving, and board-standard evaluation."
    },
    {
      emoji: "💻",
      icon: <Laptop className="w-7 h-7 text-amber-400" />,
      title: "DIGITAL SKILLS",
      description: "Modern computer training in dedicated individual PC labs covering CIT, Office automation, and Graphic Design."
    },
    {
      emoji: "🤖",
      icon: <Bot className="w-7 h-7 text-amber-400" />,
      title: "AI LEARNING",
      description: "Introduction to modern AI tools, prompt engineering, generative models, and digital productivity workflows."
    },
    {
      emoji: "🗣️",
      icon: <MessageCircle className="w-7 h-7 text-amber-400" />,
      title: "ENGLISH TRAINING",
      description: "Improve communication skills, spoken fluency, professional vocabulary, and IELTS preparation with experienced linguists."
    },
    {
      emoji: "👨‍🏫",
      icon: <UserCheck className="w-7 h-7 text-amber-400" />,
      title: "PROFESSIONAL GUIDANCE",
      description: "Support for academic and career development under the personal mentorship of Sir Arshad Siddiqui and senior faculty."
    },
    {
      emoji: "🏆",
      icon: <Trophy className="w-7 h-7 text-amber-400" />,
      title: "CAREER FOCUS",
      description: "Skills designed for future opportunities, university entrance test readiness, and marketplace career empowerment."
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#071A3A] text-white relative border-t border-b border-amber-500/20">
      <div className="absolute inset-0 bg-islamic-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXCELLENCE GUARANTEED</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            WHY CHOOSE <span className="text-gold-gradient">UNIQUE COMMERCE CENTRE?</span>
          </h2>
          <p className="text-base text-slate-300">
            For over 15 years, we have set the benchmark in academic rigor, IT empowerment, and student success in Karachi.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-[#041229] rounded-2xl p-7 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Gold Top Border Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Gold Icon Box with Navy Backdrop */}
                <div className="w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>

                {/* Title with Emoji */}
                <h3 className="text-lg sm:text-xl font-bold font-heading text-white group-hover:text-amber-300 transition-colors mb-2.5 flex items-center gap-2">
                  <span>{item.emoji}</span>
                  <span>{item.title}</span>
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom indicator */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Standard at UCC</span>
              </div>
            </div>
          ))}
        </div>

        {/* Director Quote Credo */}
        <div className="mt-14 max-w-4xl mx-auto text-center p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-[#0B1E3D] to-amber-500/10 border border-amber-400/30">
          <p className="text-base sm:text-lg text-amber-200 italic font-serif">
            “Our vision is simple: Give every student in Karachi the highest standard of academic guidance and future-ready digital skills, regardless of their background.”
          </p>
          <p className="text-xs font-bold text-white uppercase tracking-wider mt-2">
            — Sir Arshad Siddiqui, Director & Founder
          </p>
        </div>

      </div>
    </section>
  );
}
