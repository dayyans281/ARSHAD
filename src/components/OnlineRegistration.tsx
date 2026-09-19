import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Phone, Calendar, User, Mail, MapPin, BookOpen, GraduationCap, Award, Printer, Copy, Check, Sparkles } from 'lucide-react';
import { INSTITUTE_INFO, PROGRAMS, COMPUTER_COURSES, ENGLISH_COURSES } from '../data/instituteData';
import { Registration } from '../types';
import { UCCLogo } from './UCCLogo';

interface OnlineRegistrationProps {
  preselectedProgram?: string;
  preselectedCourse?: string;
  onNewRegistration: (reg: Registration) => void;
}

export function OnlineRegistration({ preselectedProgram = '', preselectedCourse = '', onNewRegistration }: OnlineRegistrationProps) {
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dob: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    program: preselectedProgram || 'Intermediate',
    course: preselectedCourse || 'None (Academic Only)',
    previousQualification: '',
    message: ''
  });

  const [submittedReg, setSubmittedReg] = useState<Registration | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (preselectedProgram) {
      setFormData(prev => ({ ...prev, program: preselectedProgram }));
    }
  }, [preselectedProgram]);

  useEffect(() => {
    if (preselectedCourse) {
      setFormData(prev => ({ ...prev, course: preselectedCourse }));
    }
  }, [preselectedCourse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const slipNumber = `UCC-2026-${randomNum}`;

    const newReg: Registration = {
      id: `reg-${Date.now()}`,
      slipNumber,
      studentName: formData.studentName.trim(),
      fatherName: formData.fatherName.trim(),
      dob: formData.dob,
      phone: formData.phone.trim(),
      whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      program: formData.program,
      course: formData.course,
      previousQualification: formData.previousQualification.trim(),
      message: formData.message.trim(),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      onNewRegistration(newReg);
      setSubmittedReg(newReg);
      setIsSubmitting(false);
    }, 600);
  };

  const copySlip = async () => {
    if (submittedReg) {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(submittedReg.slipNumber);
        } else {
          const ta = document.createElement('textarea');
          ta.value = submittedReg.slipNumber;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
      } catch (err) {
        // Fallback gracefully without error
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetForm = () => {
    setSubmittedReg(null);
    setFormData({
      studentName: '',
      fatherName: '',
      dob: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: '',
      program: 'Intermediate',
      course: 'None (Academic Only)',
      previousQualification: '',
      message: ''
    });
  };

  return (
    <section id="registration" className="py-16 sm:py-20 bg-[#08152B] text-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions 2026–2027
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight text-white">
            ONLINE <span className="text-gold-gradient">REGISTRATION</span>
          </h2>
          <p className="text-base text-slate-300">
            Submit your application form online to reserve your seat in the upcoming batch. Our admissions counselor will contact you within 24 hours.
          </p>
        </div>

        {/* Form or Confirmation Card */}
        <div className="rounded-3xl p-1 bg-gradient-to-r from-amber-500/30 via-yellow-400/40 to-blue-600/30 shadow-2xl">
          <div className="rounded-[22px] bg-[#0A192F] p-6 sm:p-10 border border-amber-500/20">
            
            {submittedReg ? (
              /* Success Confirmation View */
              <div className="text-center py-6 sm:py-10 space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-xl">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black font-heading text-white">
                    “Thank you! Your registration request has been received.”
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
                    Welcome to Unique Commerce Centre! Your provisional admission token has been logged into our portal.
                  </p>
                </div>

                {/* Admission Receipt Box */}
                <div className="max-w-md mx-auto bg-[#061224] rounded-2xl p-6 border-2 border-amber-400/50 text-left space-y-4 shadow-xl">
                  {/* Official Institute Crest Header on Slip */}
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <UCCLogo size="sm" withRing={true} />
                    <div>
                      <h4 className="text-sm font-black font-heading text-white">UNIQUE COMMERCE CENTRE</h4>
                      <p className="text-[10px] text-amber-300 font-serif italic">Official Provisional Registration Slip • 2026–2027</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] text-amber-400 font-bold uppercase">Registration Slip ID</span>
                      <div className="text-xl font-black text-white flex items-center gap-2">
                        <span>{submittedReg.slipNumber}</span>
                        <button
                          onClick={copySlip}
                          className="p-1 text-slate-400 hover:text-amber-300 transition-colors"
                          title="Copy Slip Number"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <span className="bg-amber-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold px-2.5 py-1 rounded">
                      Status: {submittedReg.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Student:</span>
                      <span className="text-white font-bold">{submittedReg.studentName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Father:</span>
                      <span className="text-white font-bold">{submittedReg.fatherName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Selected Program:</span>
                      <span className="text-amber-300 font-semibold">{submittedReg.program}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Course:</span>
                      <span className="text-amber-300 font-semibold">{submittedReg.course}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Contact Phone:</span>
                      <span className="text-white font-semibold">{submittedReg.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Campus:</span>
                      <span className="text-white font-semibold">Orangi Town, Karachi</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400">
                    Please bring this reference number or receipt to the campus counter at Rehmat Chowk, Sector 1-F, Orangi Town.
                  </div>
                </div>

                {/* Next Steps Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/923442302526?text=${encodeURIComponent(`Assalam-o-Alaikum Sir Arshad, I have submitted online registration. My Slip Number is ${submittedReg.slipNumber} for ${submittedReg.studentName} (Program: ${submittedReg.program}, Course: ${submittedReg.course}).`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-colors flex items-center gap-2"
                  >
                    <span>💬 Confirm on WhatsApp</span>
                  </a>

                  <button
                    onClick={handlePrint}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-white/20 transition-colors flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Slip</span>
                  </button>

                  <button
                    onClick={resetForm}
                    className="text-xs text-amber-300 hover:underline px-4 py-3"
                  >
                    Register Another Student
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Student Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Student Name <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Bilal"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Father/Guardian Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Father / Guardian Name <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Mahmood"
                        value={formData.fatherName}
                        onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Date of Birth <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="date"
                        required
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Phone Number <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="0344-XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      WhatsApp Number
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-emerald-400" />
                      <input
                        type="tel"
                        placeholder="WhatsApp (if different from phone)"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Residential Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                    Residential Address (Karachi Area / Sector) <span className="text-amber-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sector 1-F, Rehmat Chowk, Orangi Town, Karachi"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Program & Course Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select Program */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Select Academic Program <span className="text-amber-400">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400" />
                      <select
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Secondary">Secondary (Class IX & X)</option>
                        <option value="Matric">Matric (BSEK Karachi Board Preparation)</option>
                        <option value="Intermediate">Intermediate (I.Com Commerce / Pre-Eng / Pre-Med)</option>
                        <option value="Graduation">Graduation (B.Com / ADC / ADA / University prep)</option>
                        <option value="Masters">Masters (M.Com / MA / MBA prep)</option>
                        <option value="Short Courses Only">Short Courses / Skills Only</option>
                      </select>
                    </div>
                  </div>

                  {/* Select Course */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                      Select Computer / Language Course
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-400" />
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 pl-10 pr-3.5 text-sm text-white outline-none transition-colors"
                      >
                        <option value="None (Academic Only)">None (Academic Studies Only)</option>
                        <optgroup label="Computer Courses">
                          <option value="C.I.T (Certificate in IT)">C.I.T (Certificate in IT - 6 Months)</option>
                          <option value="Graphic Design">Graphic Design (Photoshop & Illustrator)</option>
                          <option value="Special Class of A.I">Special Class of A.I (Prompting & Automation)</option>
                          <option value="MS Office Suite">MS Office Suite (Advanced Excel & Word)</option>
                          <option value="Digital Skills & Freelancing">Digital Skills & Freelancing</option>
                          <option value="Computer Fundamentals">Computer Fundamentals</option>
                        </optgroup>
                        <optgroup label="English Language Courses">
                          <option value="Spoken English">Spoken English (Fluency & Accent)</option>
                          <option value="IELTS Preparation">IELTS Preparation (Band 7.0+ Focus)</option>
                          <option value="Grammar & Writing">Grammar & Writing</option>
                          <option value="Corporate Communication">Corporate Communication</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Previous Qualification */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                    Previous Qualification & Marks / Grade <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Matric Science (BSEK) - 78% Grade A"
                    value={formData.previousQualification}
                    onChange={(e) => setFormData({ ...formData, previousQualification: e.target.value })}
                    className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-200">
                    Special Message / Preferred Timing / Questions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Prefer evening batch after 4:00 PM; need scholarship information..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#061224] border border-white/15 focus:border-amber-400 rounded-xl py-2.5 px-3.5 text-sm text-white placeholder:text-slate-500 outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base py-4 rounded-xl shadow-xl shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        Processing Registration...
                      </span>
                    ) : (
                      <>
                        <span>SUBMIT REGISTRATION</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-2.5">
                    🔒 Your information is confidential and sent directly to Sir Arshad Siddiqui's administration office.
                  </p>
                </div>

              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
