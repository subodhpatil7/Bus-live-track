import Link from 'next/link';
import { Bus, MapPin, Search, ShieldCheck, Activity } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bento-card to-bento-bg bg-bento-bg flex flex-col items-center justify-center p-4 font-sans text-bento-text">
      <div className="max-w-4xl w-full space-y-12 text-center">
        
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="bg-bento-accent/10 border border-bento-accent/20 p-4 rounded-2xl shadow-[0_0_40px_rgba(255,177,66,0.3)]">
              <Bus className="w-12 h-12 text-bento-accent" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-bento-text tracking-tight uppercase">
            Urja Live <span className="text-bento-accent">Track</span>
          </h1>
          <p className="text-lg text-bento-muted max-w-2xl mx-auto font-medium">
            The next-generation municipal fleet tracking solution. 
            Real-time GPS visibility for admins and a seamless tracking experience for passengers.
          </p>
        </div>

        {/* Feature Highlights Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 bg-bento-card rounded-xl border border-bento-border flex flex-col items-center hover:border-bento-accent/50 transition-colors">
            <div className="w-12 h-12 bg-bento-accent/10 text-bento-accent rounded flex items-center justify-center mb-4">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-bento-text text-sm uppercase tracking-wider mb-2">Real-time GPS</h3>
            <p className="text-[13px] text-bento-muted text-center">Sub-5-second latency for pinpoint vehicle tracking.</p>
          </div>
          <div className="p-6 bg-bento-card rounded-xl border border-bento-border flex flex-col items-center hover:border-bento-success/50 transition-colors">
            <div className="w-12 h-12 bg-bento-success/10 text-bento-success rounded flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-bento-text text-sm uppercase tracking-wider mb-2">Smart Routing</h3>
            <p className="text-[13px] text-bento-muted text-center">Visualized routes and accurate ETA estimations.</p>
          </div>
          <div className="p-6 bg-bento-card rounded-xl border border-bento-border flex flex-col items-center hover:border-bento-danger/50 transition-colors">
            <div className="w-12 h-12 bg-bento-danger/10 text-bento-danger rounded flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-bento-text text-sm uppercase tracking-wider mb-2">Fleet Analytics</h3>
            <p className="text-[13px] text-bento-muted text-center">Comprehensive dashboard for system administrators.</p>
          </div>
        </div>

        {/* Portals */}
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto w-full">
          <Link 
            href="/user" 
            className="group flex flex-col justify-between p-8 bg-bento-card border-2 border-bento-border rounded-xl hover:border-bento-accent transition-all min-h-[220px]"
          >
            <div>
              <Search className="w-8 h-8 text-bento-muted group-hover:text-bento-accent mb-4 transition-colors" />
              <h2 className="text-xl font-bold text-bento-text mb-2 uppercase tracking-wide">Passenger Portal</h2>
              <p className="text-bento-muted text-[13px] pr-4">Find your route and track your incoming bus on the live map.</p>
            </div>
            <div className="mt-6 text-[11px] uppercase tracking-wider font-bold text-bento-accent flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Access Tracker <span className="text-lg leading-none">→</span>
            </div>
          </Link>

          <Link 
            href="/admin" 
            className="group flex flex-col justify-between p-8 bg-bento-card border-2 border-bento-border rounded-xl hover:border-bento-success transition-all min-h-[220px]"
          >
            <div>
              <ShieldCheck className="w-8 h-8 text-bento-muted group-hover:text-bento-success mb-4 transition-colors" />
              <h2 className="text-xl font-bold text-bento-text mb-2 uppercase tracking-wide">Admin Dashboard</h2>
              <p className="text-bento-muted text-[13px] pr-4">Monitor the entire fleet, view health metrics, and manage devices.</p>
            </div>
            <div className="mt-6 text-[11px] uppercase tracking-wider font-bold text-bento-success flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              Access Admin <span className="text-lg leading-none">→</span>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
