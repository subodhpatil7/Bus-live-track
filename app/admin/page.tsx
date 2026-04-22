'use client';

import React, { useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { LiveMap } from '@/components/LiveMap';
import { useBusSimulation } from '@/hooks/use-bus-simulation';
import { Bus as BusIcon, AlertTriangle, CheckCircle2, TrendingUp, Settings } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { buses, routes } = useBusSimulation();

  const allBuses = Object.values(buses);
  
  const stats = useMemo(() => {
    return {
      total: allBuses.length,
      active: allBuses.filter(b => b.status === 'active').length,
      maintenance: allBuses.filter(b => b.status === 'maintenance').length,
    };
  }, [allBuses]);

  return (
    <AppLayout>
      <div className="flex-1 w-full max-w-7xl mx-auto h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr_240px] md:grid-rows-[160px_1fr_140px] gap-4 h-full">

          {/* Column 1: Fleet List (Spans all rows) */}
          <div className="md:row-span-3 bg-bento-card border border-bento-border rounded-xl p-4 flex flex-col overflow-hidden">
            <div className="text-[0.75rem] uppercase tracking-wider text-bento-muted font-semibold mb-3 flex justify-between">
              Live Fleet Monitoring
              <span>{stats.total} Buses</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-0">
              {allBuses.map(bus => {
                const isActive = bus.status === 'active';
                const isDelayed = bus.speed < 10 && isActive;
                return (
                  <div key={bus.id} className="py-2.5 border-b border-bento-border last:border-none">
                    <span className="font-semibold text-sm text-bento-text block">{bus.numberPlate}</span>
                    <div className="text-[0.75rem] text-bento-muted flex justify-between mt-1 items-center">
                      <span>{routes[bus.route_id]?.name || 'Unknown'}</span>
                      {isActive ? (
                        <span className={`px-1.5 py-0.5 rounded text-[0.7rem] ${
                          isDelayed ? 'bg-bento-danger/15 text-bento-danger' : 'bg-bento-success/15 text-bento-success'
                        }`}>
                          {isDelayed ? 'STOPPED' : `${Math.round(bus.speed)} km/h`}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[0.7rem] bg-bento-border/50 text-bento-muted uppercase">
                          {bus.status}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Row 1 / Col 2: Active Operations */}
          <div className="bg-bento-card border border-bento-border rounded-xl p-4 flex flex-col justify-between">
            <div className="text-[0.75rem] uppercase tracking-wider text-bento-muted font-semibold flex justify-between">
              Active Operations
              <Settings className="w-4 h-4 text-bento-muted cursor-pointer hover:text-bento-text" />
            </div>
            <div className="text-4xl font-bold text-bento-text">
              {Math.round((stats.active / stats.total) * 100)}%
            </div>
            <div className="text-[0.75rem] text-bento-muted mt-auto">
              {stats.active} Buses on-road • {stats.maintenance} Maintenance
            </div>
          </div>

          {/* Row 1 / Col 3: Alerts */}
          <div className="bg-bento-card border border-bento-danger rounded-xl p-4 flex flex-col relative overflow-hidden">
            <div className="text-[0.75rem] uppercase tracking-wider text-bento-danger font-semibold mb-3">
              Critical Alerts
            </div>
            <div className="flex-1 overflow-y-auto space-y-2">
              <div className="text-[0.8rem] p-2 bg-bento-danger/5 border-l-2 border-bento-danger rounded text-bento-text">
                <strong>#URJA-402</strong> Overspeed: 94km/h<br />
                <span className="text-bento-muted text-xs">Sector 4 Expressway</span>
              </div>
              <div className="text-[0.8rem] p-2 bg-bento-danger/5 border-l-2 border-bento-danger rounded text-bento-text">
                <strong>#URJA-991</strong> Route Deviation<br />
                <span className="text-bento-muted text-xs">Old Highway exit</span>
              </div>
            </div>
          </div>

          {/* Row 2 / Col 2: Global Map (Spans 2 rows) */}
          <div className="md:row-span-2 bg-[#1b2129] border border-bento-border rounded-xl flex flex-col p-0 overflow-hidden relative">
            <LiveMap buses={allBuses} routes={routes} zoom={10} center={{ lat: 20.5937, lng: 78.9629 }} />
            
            <div className="absolute bottom-4 left-4 bg-bento-card/90 backdrop-blur border border-bento-border p-3 rounded-lg text-xs text-bento-text">
              <strong>Tracking: System Wide Overview</strong><br/>
              Total GPS Nodes: {stats.total}<br/>
              Last Heartbeat: 1s ago
            </div>
          </div>

          {/* Row 2 / Col 3: Precision Metrics */}
          <div className="bg-bento-card border border-bento-border rounded-xl p-4 flex flex-col justify-center">
            <div className="text-[0.75rem] uppercase tracking-wider text-bento-muted font-semibold mb-3">
              Precision Metrics
            </div>
            <div className="mt-2 text-[0.85rem] text-bento-text font-medium">
              <div className="flex justify-between items-center mb-1">
                <span>GPS Accuracy</span>
                <span>12m</span>
              </div>
              <div className="h-1 bg-bento-border w-full rounded-full overflow-hidden mb-4">
                <div className="h-full bg-bento-accent w-[92%]"></div>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span>Avg. Latency</span>
                <span>2.4s</span>
              </div>
              <div className="h-1 bg-bento-border w-full rounded-full overflow-hidden">
                <div className="h-full bg-bento-success w-[98%]"></div>
              </div>
            </div>
          </div>

          {/* Row 3 / Col 3: Daily Analytics */}
          <div className="bg-bento-card border border-bento-border rounded-xl p-4 flex flex-col justify-between">
            <div className="text-[0.75rem] uppercase tracking-wider text-bento-muted font-semibold mb-2">
              Daily Analytics
            </div>
            <div className="flex justify-between items-center text-[0.85rem] text-bento-muted">
              <span>Total Distance</span>
              <strong className="text-bento-text">12,402 km</strong>
            </div>
            <div className="flex justify-between items-center text-[0.85rem] text-bento-muted">
              <span>Trip Completion</span>
              <strong className="text-bento-text">96.4%</strong>
            </div>
            <div className="flex justify-between items-center text-[0.85rem] text-bento-muted">
              <span>Fuel Efficiency</span>
              <strong className="text-bento-text">4.2 km/L</strong>
            </div>
          </div>

          {/* Network Load (Optional if space allows - currently grid is 3 cols x 3 rows but bottom mid is map. Map spans row 2, cols 2-3? 
              Wait, Map is row 2-3, col 2. So Network load can go Row 3, Col 1? No, Fleet list spans Row 1-3.
              We'll leave Network load out or swap it. Let's make map just Row 2-3 col 2, and metrics/analytics row 2/3 col 3. This perfectly forms the Bento layout. */}

        </div>
      </div>
    </AppLayout>
  );
}
