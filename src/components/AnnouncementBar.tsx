import { useState } from 'react';
import { Megaphone, X, ArrowRight } from 'lucide-react';
import { Announcement } from '../types';

interface AnnouncementBarProps {
  announcements: Announcement[];
  onRegisterClick: () => void;
}

export function AnnouncementBar({ announcements, onRegisterClick }: AnnouncementBarProps) {
  const [closed, setClosed] = useState(false);
  const activeAnnouncements = announcements.filter(a => a.active);

  if (closed || activeAnnouncements.length === 0) return null;

  const current = activeAnnouncements[0];

  return (
    <aside aria-label="Announcement" className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-slate-950 font-medium py-2 px-4 shadow-inner relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950 text-amber-300 font-bold uppercase tracking-wider text-[10px] shrink-0">
            <Megaphone className="w-3 h-3 text-amber-300 animate-pulse" />
            {current.tag}
          </span>
          <p className="truncate font-semibold tracking-tight text-slate-900">
            {current.title}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRegisterClick}
            className="hidden sm:inline-flex items-center gap-1 font-bold text-xs bg-slate-950 text-amber-300 hover:bg-slate-900 px-3 py-1 rounded-full transition-colors"
          >
            Apply Now <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={() => setClosed(true)}
            aria-label="Dismiss announcement"
            className="p-1 text-slate-900 hover:text-slate-950 hover:bg-black/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
