'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Bus, MapPin, LayoutDashboard } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bento-bg font-sans">
      {/* Top Nav */}
      <header className="flex justify-between items-center py-4 px-5 z-10">
        <div className="flex items-center gap-2 text-xl font-bold text-bento-accent tracking-wide uppercase">
          <span>⚡</span> URJA LIVE TRACK
        </div>
        
        <div className="hidden md:flex gap-6 font-mono text-[0.8rem] text-bento-muted">
          <div className="flex items-center gap-2 text-bento-text">
            <div className="w-2 h-2 rounded-full bg-bento-success shadow-[0_0_8px_var(--color-bento-success)]"></div>
            System Live
          </div>
          <div className="flex items-center gap-1.5">Uptime: 99.98%</div>
          <div className="flex items-center gap-1.5">Update: 5s</div>
          <div className="flex items-center gap-1.5">Active Users: 12.4K</div>
        </div>
        
        <nav className="flex gap-2">
          <Link href="/user" className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium text-bento-muted hover:text-bento-text hover:bg-bento-card border border-transparent hover:border-bento-border transition-colors">
            <MapPin className="w-4 h-4" />
            Track Bus
          </Link>
          <Link href="/admin" className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium text-bento-muted hover:text-bento-text hover:bg-bento-card border border-transparent hover:border-bento-border transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Fleet Admin
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-5 pt-0">
        {children}
      </main>
    </div>
  );
}
