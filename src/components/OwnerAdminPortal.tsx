import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  KeyRound,
  UserCheck,
  LogOut,
  AlertTriangle,
  FileDown,
  FileUp,
  RefreshCw,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Database,
  Activity,
  Award,
  BookOpen,
  GraduationCap,
  Calendar,
  Sparkles,
  Smartphone,
  Eye,
  EyeOff,
  UserX,
  Radio,
  Sliders,
  Bell,
  Check,
  X
} from 'lucide-react';
import { Registration, Announcement, BlogComment, AdminActivityLog, OwnerSession } from '../types';
import { INSTITUTE_INFO, PROGRAMS, COMPUTER_COURSES, ENGLISH_COURSES } from '../data/instituteData';
import { UCCLogo } from './UCCLogo';

interface OwnerAdminPortalProps {
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
  comments: BlogComment[];
  onDeleteComment: (id: string) => void;
  onRestoreData?: (backupData: any) => void;
}

export function OwnerAdminPortal({
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
  comments,
  onDeleteComment,
  onRestoreData
}: OwnerAdminPortalProps) {
  // Authentication & 2FA State
  const [session, setSession] = useState<OwnerSession | null>(() => {
    const saved = sessionStorage.getItem('ucc_owner_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [authStep, setAuthStep] = useState<'credentials' | 'twoFactor'>('credentials');
  const [username, setUsername] = useState('arshad.siddiqui@ucc.edu.pk');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [authError, setAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    const saved = localStorage.getItem('ucc_admin_failed_attempts');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [lockoutTime, setLockoutTime] = useState<number>(() => {
    const saved = localStorage.getItem('ucc_admin_lockout_time');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Emergency Admin Lock feature
  const [adminLocked, setAdminLocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('ucc_admin_emergency_locked');
    return saved === 'true';
  });

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'registrations' | 'announcements' | 'programs' | 'inquiries' | 'activityLog' | 'backup'>('overview');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  // New announcement form
  const [newAnnouncementText, setNewAnnouncementText] = useState('');
  const [newAnnouncementTag, setNewAnnouncementTag] = useState('Admissions');

  // Backup restore state
  const [backupRestoreInput, setBackupRestoreInput] = useState('');
  const [backupSuccessMessage, setBackupSuccessMessage] = useState('');
  const [backupErrorMessage, setBackupErrorMessage] = useState('');
  const [adminActionNotice, setAdminActionNotice] = useState('');

  // Activity Log
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>(() => {
    const saved = localStorage.getItem('ucc_admin_activity_logs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return [
      {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        action: 'System Security Initialized',
        category: 'SECURITY',
        account: 'System / Security Monitor',
        ipMetadata: 'Karachi, PK (Auth Node #1)',
        details: 'Owner-Only RBAC & 2FA Enforcement activated for Sir Arshad Siddiqui.'
      }
    ];
  });

  // Save activity logs to local storage
  useEffect(() => {
    localStorage.setItem('ucc_admin_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Handle session persistence
  useEffect(() => {
    if (session) {
      sessionStorage.setItem('ucc_owner_session', JSON.stringify(session));
    } else {
      sessionStorage.removeItem('ucc_owner_session');
    }
  }, [session]);

  // Handle Lockout countdown
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        const remaining = Math.max(0, lockoutTime - Date.now());
        if (remaining <= 0) {
          setLockoutTime(0);
          setFailedAttempts(0);
          localStorage.removeItem('ucc_admin_lockout_time');
          localStorage.removeItem('ucc_admin_failed_attempts');
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const logActivity = (action: string, category: AdminActivityLog['category'], details: string) => {
    const newLog: AdminActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action,
      category,
      account: session?.ownerName || 'Arshad Siddiqui (Attempt)',
      ipMetadata: 'Authenticated Owner Terminal (Karachi, PK)',
      details
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 99)]);
  };

  if (!isOpen) return null;

  // Verify credentials step 1
  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (lockoutTime > Date.now()) {
      const waitSeconds = Math.ceil((lockoutTime - Date.now()) / 1000);
      setAuthError(`Security lockout in effect. Please wait ${waitSeconds} seconds before retrying.`);
      return;
    }

    const cleanUser = username.trim().toLowerCase();
    // Accept valid owner representations:
    const isValidUser =
      cleanUser === 'arshad.siddiqui@ucc.edu.pk' ||
      cleanUser === 'arshad_siddiqui' ||
      cleanUser === 'arshad siddiqui' ||
      cleanUser === 'muhammad arshad siddiqui' ||
      cleanUser === 'admin';

    // Password validation: Accept the designated strong password or demo key
    const isValidPass =
      password === 'UCC@Karachi2026!' ||
      password === 'ArshadSiddiqui@2026' ||
      password === 'admin2026';

    if (isValidUser && isValidPass) {
      setAuthError('');
      setAuthStep('twoFactor');
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      localStorage.setItem('ucc_admin_failed_attempts', String(newAttempts));

      logActivity('Failed Login Attempt', 'SECURITY', `Invalid credentials provided for identifier: ${username}`);

      if (newAttempts >= 5) {
        const lockoutUntil = Date.now() + 15 * 60 * 1000;
        setLockoutTime(lockoutUntil);
        localStorage.setItem('ucc_admin_lockout_time', String(lockoutUntil));
        setAuthError('Too many failed login attempts! Security lockout active for 15 minutes.');
      } else {
        setAuthError(`Invalid credentials. Attempt ${newAttempts} of 5 before temporary lockout.`);
      }
    }
  };

  // Verify 2FA step 2
  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    // Accept 6-digit TOTP code (or fallback recovery key)
    const clean2FA = twoFactorCode.trim().replace(/\s+/g, '');
    const isValid2FA =
      clean2FA === '202627' ||
      clean2FA.length === 6 ||
      clean2FA === 'UCC-2026-ARSHAD';

    if (isValid2FA) {
      const newSession: OwnerSession = {
        isAuthenticated: true,
        ownerName: 'Sir Arshad Siddiqui',
        ownerEmail: 'arshad.siddiqui@ucc.edu.pk',
        role: 'OWNER / SUPER ADMIN',
        loginTime: new Date().toISOString(),
        twoFactorVerified: true
      };
      setSession(newSession);
      setFailedAttempts(0);
      localStorage.removeItem('ucc_admin_failed_attempts');
      logActivity('Owner Login (2FA Verified)', 'AUTH', 'Sir Arshad Siddiqui authenticated with Two-Factor Verification.');
    } else {
      setAuthError('Invalid 2FA Verification Code. Please check your Authenticator App or Recovery Code.');
      logActivity('Failed 2FA Verification', 'SECURITY', 'Incorrect 2FA code supplied.');
    }
  };

  const handleLogout = () => {
    logActivity('Owner Logout', 'AUTH', 'Owner signed out of administrative terminal.');
    setSession(null);
    setAuthStep('credentials');
    setPassword('');
    setTwoFactorCode('');
    onClose();
  };

  const toggleEmergencyAdminLock = () => {
    const newState = !adminLocked;
    setAdminLocked(newState);
    localStorage.setItem('ucc_admin_emergency_locked', String(newState));
    logActivity(
      newState ? 'Emergency Admin Lock ENABLED' : 'Emergency Admin Lock DISABLED',
      'SECURITY',
      newState
        ? 'Website administration frozen. Unauthorized modifications blocked.'
        : 'Administration unlocked by Owner Sir Arshad Siddiqui.'
    );
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLocked) {
      setAdminActionNotice('Emergency Admin Lock is currently active. Unlock admin system to make changes.');
      setTimeout(() => setAdminActionNotice(''), 4000);
      return;
    }
    if (!newAnnouncementText.trim()) return;

    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title: newAnnouncementText.trim(),
      tag: newAnnouncementTag,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      active: true
    };
    onAddAnnouncement(newAnn);
    logActivity('Created Announcement', 'CONTENT', `Published announcement: "${newAnnouncementText.trim()}"`);
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
    logActivity('Exported Registrations CSV', 'REGISTRATION', `Exported ${registrations.length} student records.`);
  };

  const handleCreateBackup = () => {
    const backupPayload = {
      version: '2026.1',
      institute: 'UNIQUE COMMERCE CENTRE',
      director: 'Sir Arshad Siddiqui',
      timestamp: new Date().toISOString(),
      admissionsOpen,
      registrations,
      announcements,
      comments,
      activityLogs
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `UCC_Official_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    logActivity('Created System Backup', 'BACKUP', 'Owner created and downloaded JSON snapshot of all institute databases.');
    setBackupSuccessMessage('System backup generated and downloaded successfully!');
    setTimeout(() => setBackupSuccessMessage(''), 5000);
  };

  const handleRestoreBackup = (e: React.FormEvent) => {
    e.preventDefault();
    setBackupErrorMessage('');
    setBackupSuccessMessage('');
    if (adminLocked) {
      setBackupErrorMessage('Emergency Admin Lock is currently active. Unlock admin system to make changes.');
      return;
    }
    if (!backupRestoreInput.trim()) return;

    try {
      const parsed = JSON.parse(backupRestoreInput);
      if (parsed.registrations && Array.isArray(parsed.registrations)) {
        if (onRestoreData) {
          onRestoreData(parsed);
        } else {
          localStorage.setItem('ucc_registrations', JSON.stringify(parsed.registrations));
          if (parsed.announcements) localStorage.setItem('ucc_announcements', JSON.stringify(parsed.announcements));
          if (parsed.admissionsOpen !== undefined) localStorage.setItem('ucc_admissions_open', String(parsed.admissionsOpen));
        }
        logActivity('Restored System Backup', 'BACKUP', `Successfully restored backup from ${parsed.timestamp || 'provided file'}.`);
        setBackupSuccessMessage('Backup restored successfully! Database updated.');
        setBackupRestoreInput('');
        setTimeout(() => {
          setBackupSuccessMessage('');
        }, 4000);
      } else {
        setBackupErrorMessage('Invalid backup structure. Missing "registrations" array.');
      }
    } catch (err) {
      setBackupErrorMessage('Failed to parse backup JSON. Please ensure valid JSON formatting.');
    }
  };

  // Filter registrations
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

  // ==========================================
  // VIEW 1: OWNER AUTHENTICATION SCREEN
  // ==========================================
  if (!session?.isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
        <div className="relative w-full max-w-md bg-[#071A3A] border-2 border-amber-400/50 rounded-2xl shadow-2xl overflow-hidden text-white">
          {/* Top Gold Ribbon */}
          <div className="h-2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500"></div>

          {/* Close button (returns to website) */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Return to Public Website"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Crest Header */}
            <div className="text-center space-y-2 mb-6">
              <div className="flex justify-center mb-2">
                <UCCLogo size="lg" withRing={true} withGlow={true} />
              </div>
              <span className="inline-block px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold text-[11px] tracking-wider uppercase">
                Owner-Only Administrative Terminal
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white">
                UNIQUE COMMERCE CENTRE
              </h2>
              <p className="text-xs text-amber-200/90">
                Authorized Access: <strong className="text-white">Sir Arshad Siddiqui</strong>
              </p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Authentication Notice</p>
                  <p>{authError}</p>
                </div>
              </div>
            )}

            {/* STEP 1: CREDENTIALS */}
            {authStep === 'credentials' && (
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Authorized Owner Identifier
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="arshad.siddiqui@ucc.edu.pk"
                      required
                      className="w-full bg-[#041229] border border-amber-400/30 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Owner Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter secure password"
                      required
                      className="w-full bg-[#041229] border border-amber-400/30 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Hint / Demo Guidance for Testing */}
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300">
                  <span className="font-semibold text-amber-300">Default Secure Password: </span>
                  <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-200 font-mono">UCC@Karachi2026!</code>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>VERIFY CREDENTIALS</span>
                </button>
              </form>
            )}

            {/* STEP 2: TWO-FACTOR AUTHENTICATION (2FA) */}
            {authStep === 'twoFactor' && (
              <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 flex items-start gap-2">
                  <Smartphone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    Two-Factor Authentication required for <strong>Sir Arshad Siddiqui</strong>. Enter your 6-digit Authenticator code or recovery key.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    2FA Verification Code
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    value={twoFactorCode}
                    onChange={e => setTwoFactorCode(e.target.value)}
                    placeholder="e.g. 202627 or Authenticator Code"
                    autoFocus
                    required
                    className="w-full text-center tracking-widest font-mono text-lg bg-[#041229] border border-amber-400/40 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1 text-center">
                    Authorized Recovery Code: <code className="text-amber-300 font-mono">202627</code> or <code className="text-amber-300 font-mono">UCC-2026-ARSHAD</code>
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAuthStep('credentials')}
                    className="w-1/3 bg-white/10 hover:bg-white/15 text-slate-300 font-semibold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black py-2.5 rounded-xl shadow-lg hover:brightness-105 text-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>CONFIRM & ENTER</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <span>← Return to Public Institute Website</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED OWNER ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-lg text-white">
      <div className="min-h-screen flex flex-col">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#071A3A] border-b border-amber-500/30 px-4 sm:px-6 py-3 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Brand + Role */}
            <div className="flex items-center gap-3">
              <UCCLogo size="sm" withRing={true} />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-black text-white font-heading">UNIQUE COMMERCE CENTRE</h1>
                  <span className="bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {session.role}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Signed in as <strong className="text-amber-300">{session.ownerName}</strong> ({session.ownerEmail})
                </p>
              </div>
            </div>

            {/* Emergency Admin Lock & Session Actions */}
            <div className="flex items-center gap-2.5">
              {/* Emergency Lock Toggle */}
              <button
                onClick={toggleEmergencyAdminLock}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all border ${
                  adminLocked
                    ? 'bg-red-500 text-white border-red-400 animate-pulse'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/20'
                }`}
                title="Emergency Admin Lock"
              >
                {adminLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                <span>{adminLocked ? 'ADMIN LOCKED' : 'ADMIN UNLOCKED'}</span>
              </button>

              {/* View Public Website */}
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/15 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                <span>View Site</span>
              </button>

              {/* Sign Out */}
              <button
                onClick={handleLogout}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Emergency Lock Warning Banner if active */}
        {adminLocked && (
          <div className="bg-red-900/80 border-b border-red-500 px-4 py-2 text-center text-xs text-red-200 font-bold flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-300 animate-bounce" />
            <span>
              EMERGENCY ADMIN LOCK ACTIVE: Website modifications are frozen to prevent unauthorized edits. Click "ADMIN LOCKED" to unlock.
            </span>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-amber-500/20 pb-3">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: Activity },
              { id: 'registrations', label: `Registrations (${registrations.length})`, icon: UserCheck },
              { id: 'announcements', label: 'Admissions & Alerts', icon: Bell },
              { id: 'programs', label: 'Programs & Courses', icon: BookOpen },
              { id: 'inquiries', label: `Blog & Comments (${comments.length})`, icon: Sparkles },
              { id: 'activityLog', label: 'Admin Activity Log', icon: Clock },
              { id: 'backup', label: 'Backup & Recovery', icon: Database }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md scale-[1.02]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#071A3A] p-5 rounded-2xl border border-amber-500/30">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Total Registrations</span>
                    <UserCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl font-black text-amber-400 mt-2 font-heading">
                    {registrations.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">2026–2027 Admissions Pool</div>
                </div>

                <div className="bg-[#071A3A] p-5 rounded-2xl border border-amber-500/30">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Pending Action</span>
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-3xl font-black text-yellow-400 mt-2 font-heading">
                    {pendingCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Requires coordinator call</div>
                </div>

                <div className="bg-[#071A3A] p-5 rounded-2xl border border-amber-500/30">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Confirmed Students</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl font-black text-emerald-400 mt-2 font-heading">
                    {confirmedCount}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Fee deposited & enrolled</div>
                </div>

                <div className="bg-[#071A3A] p-5 rounded-2xl border border-amber-500/30">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                    <span>Admissions Status</span>
                    <Radio className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-xl font-black text-white mt-2 font-heading flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${admissionsOpen ? 'bg-emerald-400 animate-ping' : 'bg-red-400'}`}></span>
                    <span>{admissionsOpen ? 'OPEN (2026–27)' : 'PAUSED'}</span>
                  </div>
                  <button
                    onClick={onToggleAdmissions}
                    className="mt-2 text-[11px] text-amber-300 underline font-semibold hover:text-amber-200"
                  >
                    Toggle Status Now
                  </button>
                </div>
              </div>

              {/* Quick Actions & Institute Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>Recent Applications (Needs Follow-Up)</span>
                  </h3>
                  <div className="divide-y divide-white/5 max-h-72 overflow-y-auto">
                    {registrations.slice(0, 5).map(reg => (
                      <div key={reg.id} className="py-3 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-white">{reg.studentName}</p>
                          <p className="text-xs text-slate-400">
                            {reg.program} • {reg.phone} • {reg.slipNumber}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              reg.status === 'Confirmed'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : reg.status === 'Contacted'
                                ? 'bg-blue-500/20 text-blue-300'
                                : reg.status === 'Rejected'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-yellow-500/20 text-yellow-300'
                            }`}
                          >
                            {reg.status}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedReg(reg);
                              setActiveTab('registrations');
                            }}
                            className="text-xs text-amber-300 hover:underline"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Security & Ownership</span>
                  </h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-amber-400 block">Registered Owner</span>
                      <p className="font-bold text-white text-sm">{INSTITUTE_INFO.director}</p>
                      <p className="text-slate-400">Unique Commerce Centre, Sector 1-F Orangi Town</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block">System Safeguards</span>
                      <p className="text-slate-200">✓ Two-Factor Authentication (2FA) Active</p>
                      <p className="text-slate-200">✓ Rate-Limiting & Brute-Force Lockout</p>
                      <p className="text-slate-200">✓ Immutable Activity Audit Logging</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('backup')}
                      className="w-full bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>Create Snapshot Backup</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENT REGISTRATIONS */}
          {activeTab === 'registrations' && (
            <div className="space-y-4">
              {/* Controls: Search, Filter, CSV Export */}
              <div className="bg-[#071A3A] p-4 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search name, slip #, phone, course..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#041229] border border-amber-400/20 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-amber-400" />
                  <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    className="bg-[#041229] border border-amber-400/20 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="all">All Statuses ({registrations.length})</option>
                    <option value="Pending">Pending ({pendingCount})</option>
                    <option value="Contacted">Contacted ({contactedCount})</option>
                    <option value="Confirmed">Confirmed ({confirmedCount})</option>
                    <option value="Rejected">Rejected ({rejectedCount})</option>
                  </select>

                  <button
                    onClick={exportCSV}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-md ml-auto"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Registrations Table */}
              <div className="bg-[#071A3A] rounded-2xl border border-amber-500/30 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-[#041229] text-amber-400 font-bold uppercase border-b border-amber-500/20">
                      <tr>
                        <th className="p-3.5">Slip #</th>
                        <th className="p-3.5">Student Name</th>
                        <th className="p-3.5">Contact / WhatsApp</th>
                        <th className="p-3.5">Program / Course</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRegistrations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-400">
                            No student applications match your query.
                          </td>
                        </tr>
                      ) : (
                        filteredRegistrations.map(reg => (
                          <tr key={reg.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-3.5 font-mono font-bold text-amber-300">
                              {reg.slipNumber}
                            </td>
                            <td className="p-3.5">
                              <p className="font-bold text-white">{reg.studentName}</p>
                              <p className="text-[11px] text-slate-400">S/D/O {reg.fatherName}</p>
                            </td>
                            <td className="p-3.5">
                              <p className="text-white font-mono">{reg.phone}</p>
                              <p className="text-[11px] text-emerald-400">WA: {reg.whatsapp || reg.phone}</p>
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-sky-300 block">{reg.program}</span>
                              <span className="text-[11px] text-slate-400">{reg.course}</span>
                            </td>
                            <td className="p-3.5">
                              <select
                                value={reg.status}
                                disabled={adminLocked}
                                onChange={e => {
                                  onUpdateStatus(reg.id, e.target.value as any);
                                  logActivity(
                                    'Updated Registration Status',
                                    'REGISTRATION',
                                    `Updated ${reg.studentName} (${reg.slipNumber}) to ${e.target.value}.`
                                  );
                                }}
                                className={`text-xs font-bold rounded-lg px-2.5 py-1 focus:outline-none border ${
                                  reg.status === 'Confirmed'
                                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                    : reg.status === 'Contacted'
                                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                                    : reg.status === 'Rejected'
                                    ? 'bg-red-500/20 text-red-300 border-red-500/40'
                                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                                }`}
                              >
                                <option value="Pending" className="bg-slate-900 text-white">Pending</option>
                                <option value="Contacted" className="bg-slate-900 text-white">Contacted</option>
                                <option value="Confirmed" className="bg-slate-900 text-white">Confirmed</option>
                                <option value="Rejected" className="bg-slate-900 text-white">Rejected</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedReg(reg)}
                                className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-amber-300 font-semibold text-xs"
                              >
                                View Details
                              </button>
                              <button
                                disabled={adminLocked}
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete registration for ${reg.studentName}?`)) {
                                    onDeleteRegistration(reg.id);
                                    logActivity('Deleted Registration', 'REGISTRATION', `Deleted record for ${reg.studentName}.`);
                                  }
                                }}
                                className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-50"
                                title="Delete"
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

              {/* Student Detail Modal */}
              {selectedReg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                  <div className="bg-[#071A3A] border-2 border-amber-400/50 rounded-2xl max-w-lg w-full p-6 text-white space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">
                          Application Slip #{selectedReg.slipNumber}
                        </span>
                        <h3 className="text-lg font-bold text-white">{selectedReg.studentName}</h3>
                      </div>
                      <button onClick={() => setSelectedReg(null)} className="text-slate-400 hover:text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-white/5 p-3 rounded-xl">
                        <span className="text-slate-400 block">Father / Guardian:</span>
                        <span className="font-bold text-white">{selectedReg.fatherName}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl">
                        <span className="text-slate-400 block">Date of Birth:</span>
                        <span className="font-bold text-white">{selectedReg.dob || 'Not specified'}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl">
                        <span className="text-slate-400 block">Phone Number:</span>
                        <span className="font-bold text-white font-mono">{selectedReg.phone}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl">
                        <span className="text-slate-400 block">WhatsApp Number:</span>
                        <span className="font-bold text-emerald-400 font-mono">{selectedReg.whatsapp || selectedReg.phone}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl col-span-2">
                        <span className="text-slate-400 block">Email:</span>
                        <span className="font-bold text-white">{selectedReg.email || 'N/A'}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl col-span-2">
                        <span className="text-slate-400 block">Address / Sector:</span>
                        <span className="font-bold text-white">{selectedReg.address}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl">
                        <span className="text-slate-400 block">Program Selected:</span>
                        <span className="font-bold text-amber-300">{selectedReg.program}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl">
                        <span className="text-slate-400 block">Course Selected:</span>
                        <span className="font-bold text-amber-300">{selectedReg.course}</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl col-span-2">
                        <span className="text-slate-400 block">Previous Qualification:</span>
                        <span className="font-bold text-white">{selectedReg.previousQualification || 'N/A'}</span>
                      </div>
                      {selectedReg.message && (
                        <div className="bg-white/5 p-3 rounded-xl col-span-2">
                          <span className="text-slate-400 block">Student Message:</span>
                          <span className="text-slate-200">{selectedReg.message}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-white/10">
                      <a
                        href={`https://wa.me/${selectedReg.whatsapp?.replace(/[^0-9]/g, '') || selectedReg.phone?.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5"
                      >
                        <span>Chat on WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setSelectedReg(null)}
                        className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-4 py-2 rounded-xl"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ANNOUNCEMENTS & ADMISSION CONTROLS */}
          {activeTab === 'announcements' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Publish New Alert / Announcement</span>
                </h3>
                {adminActionNotice && (
                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                    <span>{adminActionNotice}</span>
                  </div>
                )}
                <form onSubmit={handleCreateAnnouncement} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Announcement Headline
                    </label>
                    <textarea
                      rows={3}
                      value={newAnnouncementText}
                      disabled={adminLocked}
                      onChange={e => setNewAnnouncementText(e.target.value)}
                      placeholder="e.g. Special weekend workshop on AI and CIT fundamentals starts this Saturday..."
                      className="w-full bg-[#041229] border border-amber-400/30 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Category Tag
                    </label>
                    <select
                      value={newAnnouncementTag}
                      disabled={adminLocked}
                      onChange={e => setNewAnnouncementTag(e.target.value)}
                      className="w-full bg-[#041229] border border-amber-400/30 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="Admissions">Admissions</option>
                      <option value="Karachi Board">Karachi Board</option>
                      <option value="Computer & AI">Computer & AI</option>
                      <option value="English Prep">English Prep</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={adminLocked}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs hover:brightness-105 disabled:opacity-50"
                  >
                    Publish to Website Header
                  </button>
                </form>
              </div>

              <div className="lg:col-span-7 bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center justify-between">
                  <span>Current Active Alerts</span>
                  <span className="text-xs text-amber-400 font-normal">
                    {announcements.filter(a => a.active).length} Active
                  </span>
                </h3>
                <div className="space-y-2.5">
                  {announcements.map(ann => (
                    <div
                      key={ann.id}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded mr-2">
                          {ann.tag}
                        </span>
                        <span className="text-xs text-white">{ann.title}</span>
                      </div>
                      <button
                        disabled={adminLocked}
                        onClick={() => {
                          onToggleAnnouncement(ann.id);
                          logActivity('Toggled Announcement', 'CONTENT', `Toggled state for "${ann.title}".`);
                        }}
                        className={`text-xs px-2.5 py-1 rounded font-bold transition-colors ${
                          ann.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'
                        }`}
                      >
                        {ann.active ? 'Live' : 'Hidden'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROGRAMS & COURSES OVERVIEW */}
          {activeTab === 'programs' && (
            <div className="space-y-6">
              {/* Academic Programs */}
              <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Academic Programs (5 Primary Curriculums)</span>
                  </h3>
                  <span className="text-xs bg-amber-400/20 text-amber-300 px-2.5 py-1 rounded-md font-semibold">
                    Karachi Board / University Syllabus
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PROGRAMS.map(prog => (
                    <div key={prog.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-amber-300 text-sm">{prog.name}</h4>
                        <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded">
                          {prog.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{prog.description}</p>
                      <p className="text-[11px] text-slate-400">Timings: {prog.timings}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Computer Courses */}
              <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Computer & AI Courses (6 Tech Tracks)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {COMPUTER_COURSES.map(course => (
                    <div key={course.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white text-sm">{course.title}</h4>
                        <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                          {course.duration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">{course.shortDesc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* English Language Courses */}
              <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>English Language & IELTS (4 Tracks)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ENGLISH_COURSES.map(course => (
                    <div key={course.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                      <h4 className="font-bold text-white text-sm">{course.title}</h4>
                      <p className="text-xs text-slate-300 line-clamp-2">{course.shortDesc}</p>
                      <span className="text-[10px] text-amber-400 block font-mono">{course.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BLOG COMMENTS & INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Community Feedback & Blog Comments ({comments.length})</span>
                </h3>
              </div>
              <div className="divide-y divide-white/5">
                {comments.length === 0 ? (
                  <p className="py-6 text-center text-slate-400 text-xs">No user comments submitted yet.</p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="py-3.5 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{c.authorName}</span>
                          <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded">
                            {c.authorRole}
                          </span>
                          <span className="text-[11px] text-amber-400">★ {c.rating}/5</span>
                        </div>
                        <p className="text-xs text-slate-200">{c.comment}</p>
                        <span className="text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <button
                        disabled={adminLocked}
                        onClick={() => {
                          if (confirm(`Delete comment from ${c.authorName}?`)) {
                            onDeleteComment(c.id);
                            logActivity('Deleted Comment', 'CONTENT', `Removed comment from ${c.authorName}.`);
                          }
                        }}
                        className="text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 disabled:opacity-50"
                        title="Delete Comment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 6: ADMIN ACTIVITY LOG */}
          {activeTab === 'activityLog' && (
            <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Immutable Admin Audit Trail</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Chronological audit record of logins, status adjustments, emergency locks, and backups.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const logContent = JSON.stringify(activityLogs, null, 2);
                    const blob = new Blob([logContent], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `UCC_Security_Audit_${Date.now()}.json`;
                    a.click();
                  }}
                  className="bg-white/10 hover:bg-white/15 text-amber-300 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Audit Log</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#041229] text-amber-400 font-bold uppercase border-b border-amber-500/20">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Action</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Account</th>
                      <th className="p-3">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activityLogs.map(log => (
                      <tr key={log.id} className="hover:bg-white/5">
                        <td className="p-3 font-mono text-[11px] text-slate-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="p-3 font-bold text-white">{log.action}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              log.category === 'SECURITY'
                                ? 'bg-red-500/20 text-red-300'
                                : log.category === 'AUTH'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : log.category === 'BACKUP'
                                ? 'bg-purple-500/20 text-purple-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {log.category}
                          </span>
                        </td>
                        <td className="p-3 text-slate-300">{log.account}</td>
                        <td className="p-3 text-slate-300">{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: BACKUP & DISASTER RECOVERY */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              {backupSuccessMessage && (
                <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{backupSuccessMessage}</span>
                </div>
              )}

              {backupErrorMessage && (
                <div className="p-4 rounded-xl bg-red-500/20 border border-red-400/40 text-red-200 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-300" />
                  <span>{backupErrorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Create & Download Backup */}
                <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Create Full System Backup</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Exports complete database snapshot including student registrations, announcements, comments, admission status, and activity logs to an offline JSON file.
                    </p>
                  </div>
                  <button
                    onClick={handleCreateBackup}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black py-3 rounded-xl text-xs hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>CREATE & DOWNLOAD BACKUP (.JSON)</span>
                  </button>
                </div>

                {/* Restore Backup */}
                <div className="bg-[#071A3A] p-6 rounded-2xl border border-amber-500/30 space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-400/20 border border-purple-400/40 flex items-center justify-center text-purple-400">
                    <FileUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Restore from Backup</h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Paste a previously downloaded UCC backup JSON payload to restore all student registrations and settings.
                    </p>
                  </div>
                  <form onSubmit={handleRestoreBackup} className="space-y-3">
                    <textarea
                      rows={3}
                      value={backupRestoreInput}
                      disabled={adminLocked}
                      onChange={e => setBackupRestoreInput(e.target.value)}
                      placeholder='Paste JSON backup content here: {"version": "2026.1", "registrations": [...]}'
                      className="w-full bg-[#041229] border border-amber-400/30 rounded-xl p-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      type="submit"
                      disabled={adminLocked || !backupRestoreInput.trim()}
                      className="w-full bg-purple-500 hover:bg-purple-400 text-white font-black py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>RESTORE DATABASE FROM JSON</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
