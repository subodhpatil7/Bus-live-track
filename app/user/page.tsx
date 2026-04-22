'use client';

import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { LiveMap } from '@/components/LiveMap';
import { useBusSimulation } from '@/hooks/use-bus-simulation';
import { Search, Bus as BusIcon, MapPin, Navigation, Clock, Activity } from 'lucide-react';
import { Bus, Route } from '@/types';

export default function UserTrackingApp() {
  const { buses, routes } = useBusSimulation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  // Filter routes based on search
  const filteredRoutes = useMemo(() => {
    if (!searchQuery) return Object.values(routes);
    const q = searchQuery.toLowerCase();
    return Object.values(routes).filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.source.toLowerCase().includes(q) || 
      r.destination.toLowerCase().includes(q)
    );
  }, [routes, searchQuery]);

  // Buses for the selected route (or all if none selected)
  const displayBuses = useMemo(() => {
    const allBuses = Object.values(buses);
    if (selectedRouteId) {
      return allBuses.filter(b => b.route_id === selectedRouteId);
    }
    return allBuses;
  }, [buses, selectedRouteId]);

  const selectedBus = selectedBusId ? buses[selectedBusId] : null;

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col md:flex-row h-full gap-4 max-w-7xl mx-auto w-full pb-4">
        
        {/* Sidebar */}
        <div className="w-full md:w-[320px] bg-bento-card border border-bento-border rounded-xl flex flex-col shrink-0 overflow-hidden">
          <div className="p-4 border-b border-bento-border">
            <h2 className="text-[0.75rem] uppercase tracking-wider text-bento-muted font-semibold mb-3">Find your Route</h2>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search source or destination..." 
                className="w-full pl-10 pr-4 py-2.5 bg-bento-bg border border-bento-border rounded-lg text-sm text-bento-text placeholder-bento-muted focus:outline-none focus:border-bento-accent transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="w-4 h-4 text-bento-muted absolute left-3 top-[11px]" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {!selectedRouteId ? (
              <div className="space-y-1">
                {filteredRoutes.map(route => (
                  <button
                    key={route.id}
                    onClick={() => {
                      setSelectedRouteId(route.id);
                      setSelectedBusId(null);
                    }}
                    className="w-full text-left p-3 rounded-lg hover:bg-bento-border/30 border border-transparent hover:border-bento-border transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-bento-text text-sm">{route.name}</span>
                      <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: route.color, backgroundColor: route.color }}></div>
                    </div>
                    <div className="mt-2 text-[0.7rem] font-medium text-bento-accent bg-bento-accent/10 px-2 py-1 rounded inline-block">
                      {Object.values(buses).filter(b => b.route_id === route.id && b.status === 'active').length} Active Buses
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4 p-2">
                <button 
                  onClick={() => {
                    setSelectedRouteId(null);
                    setSelectedBusId(null);
                  }}
                  className="text-sm text-bento-muted hover:text-bento-accent font-medium flex items-center gap-1 transition-colors"
                >
                  ← Back to routes
                </button>
                
                <h3 className="text-[0.75rem] uppercase tracking-wider text-bento-muted font-semibold">Active Tracker: {routes[selectedRouteId].name}</h3>
                
                <div className="space-y-2">
                  {displayBuses.map(bus => (
                    <div 
                      key={bus.id}
                      onClick={() => setSelectedBusId(bus.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedBusId === bus.id 
                          ? 'border-bento-accent bg-bento-accent/5' 
                          : 'border-bento-border bg-bento-bg hover:border-bento-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <BusIcon className={`w-4 h-4 ${selectedBusId === bus.id ? 'text-bento-accent' : 'text-bento-muted'}`} />
                          <span className="font-bold text-sm text-bento-text">{bus.numberPlate}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          bus.status === 'active' ? 'bg-bento-success/15 text-bento-success' : 'bg-bento-border text-bento-muted'
                        }`}>
                          {bus.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-bento-muted">
                          <Activity className="w-3.5 h-3.5" />
                          <span>{Math.round(bus.speed)} km/h</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-bento-muted">
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{Math.round(bus.progress * 100)}% route</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {displayBuses.length === 0 && (
                    <div className="text-center py-8 text-bento-muted text-sm">
                      No buses currently active.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-bento-card border border-bento-border rounded-xl p-1 overflow-hidden">
          <LiveMap 
            buses={displayBuses}
            routes={routes}
            selectedBusId={selectedBusId || undefined}
            onBusClick={(bus) => {
              setSelectedRouteId(bus.route_id);
              setSelectedBusId(bus.id);
            }}
            center={selectedBus ? selectedBus.location : undefined}
          />

          {/* Floating ETA Card */}
          {selectedBus && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-bento-card border border-bento-border shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-xl p-4 w-11/12 max-w-sm z-20">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-bento-text">{selectedBus.numberPlate}</h4>
                  <p className="text-[10px] text-bento-muted uppercase tracking-wider">{routes[selectedBus.route_id]?.name}</p>
                </div>
                <div className="bg-bento-accent/10 border border-bento-accent/20 text-bento-accent px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-bento-accent animate-pulse"></div> LIVE
                </div>
              </div>
              
              <div className="space-y-2 mt-4 pt-4 border-t border-bento-border">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-bento-muted flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Next Stop</span>
                  <span className="font-medium text-bento-text">
                    {routes[selectedBus.route_id].stops[Math.min(
                      Math.floor(selectedBus.progress * routes[selectedBus.route_id].stops.length) + 1, 
                      routes[selectedBus.route_id].stops.length - 1
                    )].name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-bento-muted flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Est. Arrival</span>
                  <span className="font-medium text-bento-success tracking-wide">~ 12 mins</span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
