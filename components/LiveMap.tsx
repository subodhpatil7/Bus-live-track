'use client';

import React, { useMemo } from 'react';
import { Map, Marker, Overlay, ZoomControl } from 'pigeon-maps';
import { Bus, Route, Coordinate } from '@/types';
import { Bus as BusIcon, MapPin } from 'lucide-react';

interface LiveMapProps {
  buses: Bus[];
  routes: Record<string, Route>;
  center?: Coordinate;
  zoom?: number;
  selectedBusId?: string;
  onBusClick?: (bus: Bus) => void;
}

export function LiveMap({ 
  buses, 
  routes, 
  center = { lat: 19.0760, lng: 72.8777 }, // Default: Mumbai
  zoom = 12,
  selectedBusId,
  onBusClick
}: LiveMapProps) {
  
  // Custom marker component to show bus with route color
  const renderBusMarker = (bus: Bus) => {
    const route = routes[bus.route_id];
    const isSelected = bus.id === selectedBusId;
    
    return (
      <Overlay 
        key={bus.id} 
        anchor={[bus.location.lat, bus.location.lng]} 
        offset={[16, 32]}
      >
        <div 
          className={`relative group cursor-pointer transition-transform ${isSelected ? 'scale-125 z-10' : 'hover:scale-110 z-0'}`}
          onClick={() => onBusClick?.(bus)}
        >
          {/* Arrow / Pin shaping */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 transform origin-center" style={{ backgroundColor: route.color }}></div>
          
          <div 
            className="rounded-full p-1.5 shadow-md flex items-center justify-center relative"
            style={{ backgroundColor: route.color }}
          >
            <BusIcon className="w-5 h-5 text-white" />
          </div>
          
          {/* Info Tooltip (Hover) */}
          <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isSelected && 'opacity-100'}`}>
            <span className="font-bold">{bus.numberPlate}</span>
            <span className="block opacity-80">{route.name} • {Math.round(bus.speed)} km/h</span>
          </div>
        </div>
      </Overlay>
    );
  };

  const renderStopMarker = (stop: {name: string, coord: Coordinate}, color: string, index: number) => {
    return (
      <Overlay 
        key={`${stop.name}-${index}`} 
        anchor={[stop.coord.lat, stop.coord.lng]}
        offset={[8, 8]}
      >
        <div className="group relative">
          <div 
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: color }}
          ></div>
          <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 px-2 py-0.5 bg-white/90 backdrop-blur-sm shadow border border-gray-100 rounded text-xs font-medium text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {stop.name}
          </div>
        </div>
      </Overlay>
    );
  }

  // Draw routes as SVG polylines
  const renderRoutes = () => {
    return Object.values(routes).map(route => {
      // Very basic polyline overlay. Pigeon Maps doesn't have a built-in polyline that maps to lat/lng easily, 
      // but we can hack it or just show the stops for simplicity.
      // Actually, pigeon-maps allows custom layers but drawing SVGs correctly synced with map zoom is tricky without a dedicated library.
      // For this MVP, let's just show stops clearly.
      return route.stops.map((stop, i) => renderStopMarker(stop, route.color, i));
    });
  };

  return (
    <div className="w-full h-full bg-[#1b2129] relative rounded-xl overflow-hidden border-none shadow-none">
      {/* Decorative Grid Background for map fallback/padding */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_#21262d_1px,_transparent_1px)] bg-[size:30px_30px]" />
      
      <div className="relative z-10 w-full h-full map-dark-tiles">
        <Map 
          center={[center.lat, center.lng]} 
          zoom={zoom}
          dprs={[1, 2]} // Support high-DPI screens
          attributionPrefix={false}
        >
          <ZoomControl />
          
          {/* Render Route Stops */}
          {renderRoutes()}
          
          {/* Render Buses */}
          {buses.map(renderBusMarker)}
        </Map>
      </div>
    </div>
  );
}
