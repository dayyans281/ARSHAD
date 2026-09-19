import React, { useState } from 'react';
import { X, ShieldCheck, Users, BookOpen, GraduationCap, CheckCircle, Clock, Search, Filter, Trash2, Download, Plus, AlertCircle, ToggleLeft, ToggleRight, Phone, MessageSquare, Check, RefreshCw, Star, Newspaper } from 'lucide-react';
import { Registration, Announcement, BlogComment } from '../types';
import { INSTITUTE_INFO, PROGRAMS, COMPUTER_COURSES, ENGLISH_COURSES } from '../data/instituteData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: Registration[];
  onUpdateStatus: (id: string, newStatus: 'Pending' | 'Contacted' | 'Confirmed' | 'Rejected') => void;
  onDeleteRegistration: (id: string) => void;
  announcements: Announcement[];
  onAddAnnouncement: (announcement: Announcement) => void;
  onToggleAnnouncement: (id: string) => void;
  admissionsOpen: boolean;
  onToggleAdmissions: () => void;
  comments?: BlogComment[];
  onDeleteComment?: (id: string) => void;
}

export function AdminDashboardModal({
  isOpen,
  onClose,
  registrations,
  onUpdateStatus,
  onDeleteRegistration,
  announcements,
  onAddAnnouncement,
  onToggleAnnouncement,
  admissionsOpen,
  onToggleAdmissions,
  comments = [],
  onDeleteComment
}: AdminDashboardModalProps) {
  const [activeTab, setActiveTab] = useState<'registrations' | 'announcements' | 'blog-comments' | 'institute-settings'>('registrations');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [newAnnouncementText, setNewAnnouncementText] = useState('');
  const [newAnnouncementTag, setNewAnnouncementTag] = useState('Admissions');

  if (!isOpen) return null;

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch =
      reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.slipNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.phone.includes(searchQuery) ||
      reg.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.course.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = registrations.filter(r => r.status === 'Pending').length;
  const contactedCount = registrations.filter(r => r.status === 'Contacted').length;
  const confirmedCount = registrations.filter(r => r.status === 'Confirmed').length;
  const rejectedCount = registrations.filter(r => r.status === 'Rejected').length;

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncementText.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnouncementText.trim(),
      tag: newAnnouncementTag,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      active: true
    };
    onAddAnnouncement(newAnn);
    setNewAnnouncementText('');
  };

  const exportCSV = () => {
    const headers = ['Slip Number', 'Student Name', 'Father Name', 'Phone', 'WhatsApp', 'Email', 'Program', 'Course', 'Status', 'Date'];
    const rows = registrations.map(r => [
      r.slipNumber,
      `"${r.studentName}"`,
      `"${r.fatherName}"`,
      `"${r.phone}"`,
      `"${r.whatsapp}"`,
      `"${r.email}"`,
      `"${r.program}"`,
      `"${r.course}"`,
      r.status,
      new Date(r.createdAt).toLocaleDateString()
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `UCC_Registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#091A33] border-2 border-amber-400/40 rounded-3xl shadow-2xl overflow-hidden my-auto text-white">
        
        {/* Header Bar */}
        <div className="bg-[#050D1A] p-4 sm:p-6 border-b border-amber-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                  ADMIN PORTAL — UNIQUE COMMERCE CENTRE
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                  Director: {INSTITUTE_INFO.director}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Manage registrations, admissions status, courses, and announcements.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
            aria-label="Close Admin Portal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 4 Key Metric Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-6 bg-[#08162D] border-b border-white/5">
          <div className="bg-[#0B1E3D] p-3.5 rounded-xl border border-amber-500/20">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Total Registrations</div>
            <div className="text-2xl font-black text-amber-300 font-heading">{registrations.length}</div>
            <div className="text-[10px] text-slate-400">Online Applicants</div>
          </div>

          <div className="bg-[#0B1E3D] p-3.5 rounded-xl border border-amber-500/20">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Pending Inquiries</div>
            <div className="text-2xl font-black text-amber-400 font-heading">{pendingCount}</div>
            <div className="text-[10px] text-amber-300">Requires follow-up call</div>
          </div>

          <div className="bg-[#0B1E3D] p-3.5 rounded-xl border border-amber-500/20">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Confirmed Students</div>
            <div className="text-2xl font-black text-emerald-400 font-heading">{confirmedCount}</div>
            <div className="text-[10px] text-slate-400">Seats Reserved</div>
          </div>

          <div className="bg-[#0B1E3D] p-3.5 rounded-xl border border-amber-500/20 flex flex-col justify-between">
            <div className="text-[11px] font-bold text-slate-400 uppercase">Admissions Status</div>
            <div className="flex items-center justify-between mt-1">
              <span className={`text-sm font-black ${admissionsOpen ? 'text-emerald-400' : 'text-rose-400'}`}>
                {admissionsOpen ? '🟢 OPEN (2026–27)' : '🔴 CLOSED'}
              </span>
              <button
                onClick={onToggleAdmissions}
                className="text-xs text-amber-300 underline font-semibold"
              >
                Toggle
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-4 border-b border-white/10 bg-[#091A33]">
          <button
            onClick={() => setActiveTab('registrations')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'registrations'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Student Registrations ({registrations.length})
          </button>
          <button
            onClick={() => setActiveTab('announcements')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'announcements'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Announcements ({announcements.length})
          </button>
          <button
            onClick={() => setActiveTab('blog-comments')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'blog-comments'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Blog & Comments ({comments.length})
          </button>
          <button
            onClick={() => setActiveTab('institute-settings')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              activeTab === 'institute-settings'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Institute Information
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          
          {/* TAB 1: REGISTRATIONS */}
          {activeTab === 'registrations' && (
            <div className="space-y-4">
              
              {/* Search, Filter & Export */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search student, slip #, phone, course..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#061224] border border-white/10 focus:border-amber-400 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 outline-none"
                    />
                  </div>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#061224] border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending ({pendingCount})</option>
                    <option value="Contacted">Contacted ({contactedCount})</option>
                    <option value="Confirmed">Confirmed ({confirmedCount})</option>
                    <option value="Rejected">Rejected ({rejectedCount})</option>
                  </select>
                </div>

                <button
                  onClick={exportCSV}
                  className="bg-amber-400/15 hover:bg-amber-400 hover:text-slate-950 text-amber-300 text-xs font-bold py-2 px-4 rounded-xl border border-amber-400/40 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Registrations Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#061224]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#050D1A] text-slate-400 border-b border-white/10 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Slip #</th>
                      <th className="p-3">Student & Father</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Program & Course</th>
                      <th className="p-3">Qualification</th>
                      <th className="p-3">Status Action</th>
                      <th className="p-3 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No registrations found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3 font-mono font-bold text-amber-400 whitespace-nowrap">
                            {reg.slipNumber}
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-white">{reg.studentName}</div>
                            <div className="text-[10px] text-slate-400">S/O {reg.fatherName}</div>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <a href={`tel:${reg.phone}`} className="font-bold text-slate-200 hover:text-amber-300 block">
                              {reg.phone}
                            </a>
                            <a
                              href={`https://wa.me/92${reg.whatsapp.replace(/[^0-9]/g, '').slice(-10)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] text-emerald-400 hover:underline inline-flex items-center gap-0.5 mt-0.5"
                            >
                              WhatsApp Chat
                            </a>
                          </td>
                          <td className="p-3">
                            <div className="text-white font-semibold">{reg.program}</div>
                            <div className="text-[10px] text-amber-300/90">{reg.course}</div>
                          </td>
                          <td className="p-3 text-slate-300 max-w-xs truncate" title={reg.previousQualification}>
                            {reg.previousQualification || 'N/A'}
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <select
                              value={reg.status}
                              onChange={(e) => onUpdateStatus(reg.id, e.target.value as any)}
                              className={`text-[11px] font-bold rounded-lg py-1 px-2 border outline-none cursor-pointer ${
                                reg.status === 'Confirmed'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                                  : reg.status === 'Contacted'
                                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                                  : reg.status === 'Rejected'
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                              }`}
                            >
                              <option value="Pending" className="bg-[#0A192F] text-amber-300">Pending</option>
                              <option value="Contacted" className="bg-[#0A192F] text-sky-300">Contacted</option>
                              <option value="Confirmed" className="bg-[#0A192F] text-emerald-300">Confirmed</option>
                              <option value="Rejected" className="bg-[#0A192F] text-rose-300">Rejected</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => onDeleteRegistration(reg.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              {/* Add New Announcement Form */}
              <form onSubmit={handleCreateAnnouncement} className="bg-[#061224] p-4 rounded-xl border border-white/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" /> Publish New Header Announcement
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Matric Board Revision Batch Starting Next Monday..."
                    value={newAnnouncementText}
                    onChange={(e) => setNewAnnouncementText(e.target.value)}
                    className="sm:col-span-3 bg-[#091A33] border border-white/15 focus:border-amber-400 rounded-xl py-2 px-3 text-xs text-white placeholder:text-slate-500 outline-none"
                  />
                  <select
                    value={newAnnouncementTag}
                    onChange={(e) => setNewAnnouncementTag(e.target.value)}
                    className="bg-[#091A33] border border-white/15 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="AI Course">AI Course</option>
                    <option value="Board Exams">Board Exams</option>
                    <option value="Important">Important</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-amber-400 text-slate-950 font-bold text-xs py-2 px-4 rounded-xl hover:bg-amber-300 transition-colors"
                >
                  Publish Announcement
                </button>
              </form>

              {/* List of active announcements */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Announcements</h4>
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-3 bg-[#061224] rounded-xl border border-white/10 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-[10px] shrink-0">
                        {ann.tag}
                      </span>
                      <span className="text-slate-200 truncate">{ann.title}</span>
                    </div>

                    <button
                      onClick={() => onToggleAnnouncement(ann.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-lg shrink-0 ${
                        ann.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {ann.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BLOG & COMMENTS */}
          {activeTab === 'blog-comments' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#061224] border border-white/10">
                <div>
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-amber-400" />
                    Community Comments & Inquiries ({comments.length})
                  </h4>
                  <p className="text-xs text-slate-400">
                    Real-time feedback submitted by students, parents, and visitors on UCC articles.
                  </p>
                </div>
                <div className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold">
                  ⭐ Avg Rating: 5.0 / 5.0
                </div>
              </div>

              {comments.length === 0 ? (
                <div className="text-center py-10 bg-[#061224] rounded-xl border border-white/10 text-slate-400 text-xs">
                  No comments submitted yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {comments.map((comm) => (
                    <div
                      key={comm.id}
                      className="p-4 rounded-xl bg-[#061224] border border-white/10 hover:border-amber-500/30 transition-colors flex flex-col sm:flex-row items-start justify-between gap-3"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-white text-sm">{comm.authorName}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/30 font-medium">
                            {comm.authorRole}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(comm.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          <div className="flex items-center gap-0.5 ml-auto sm:ml-0">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${s <= comm.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          "{comm.comment}"
                        </p>
                        <div className="text-[10px] text-slate-500">
                          Target Post ID: <span className="font-mono text-amber-400/80">{comm.postId}</span>
                        </div>
                      </div>

                      {onDeleteComment && (
                        <button
                          onClick={() => onDeleteComment(comm.id)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors shrink-0"
                          title="Remove comment"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INSTITUTE SETTINGS */}
          {activeTab === 'institute-settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#061224] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="font-bold text-amber-400 uppercase">Campus Details</div>
                  <div><span className="text-slate-400">Institute:</span> {INSTITUTE_INFO.name}</div>
                  <div><span className="text-slate-400">Director:</span> {INSTITUTE_INFO.director}</div>
                  <div><span className="text-slate-400">Helpline:</span> {INSTITUTE_INFO.phone}</div>
                  <div><span className="text-slate-400">Location:</span> {INSTITUTE_INFO.address}</div>
                  <div><span className="text-slate-400">Timings:</span> {INSTITUTE_INFO.timings}</div>
                </div>

                <div className="bg-[#061224] p-4 rounded-xl border border-white/10 space-y-2">
                  <div className="font-bold text-amber-400 uppercase">Curriculum Summary</div>
                  <div><span className="text-slate-400">Academic Divisions:</span> Secondary, Matric, Intermediate (Commerce/Science), Graduation, Masters</div>
                  <div><span className="text-slate-400">Computer Certifications:</span> C.I.T, Graphic Design, Special Class of A.I, MS Office, Digital Skills, Fundamentals</div>
                  <div><span className="text-slate-400">Language Dept:</span> Spoken English, IELTS Band 7.0+, Grammar & Writing, Corporate Comm</div>
                </div>
              </div>

              <div className="p-4 bg-amber-400/10 border border-amber-400/30 rounded-xl text-xs text-amber-200">
                💡 Tip: As new students register through the website, their details appear immediately in the "Student Registrations" tab. You can update their status to "Contacted" or "Confirmed" and export the student database to CSV anytime.
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#050D1A] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Unique Commerce Centre Karachi Admin System</span>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-1.5 rounded-lg transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
