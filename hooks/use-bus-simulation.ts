'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Bus, FleetSnapshot, Route, Coordinate } from '@/types';
import { ROUTES, INITIAL_BUSES } from '@/lib/mock-data';

// Helper to interpolate between two points
function interpolateCoordinate(c1: Coordinate, c2: Coordinate, t: number): Coordinate {
  return {
    lat: c1.lat + (c2.lat - c1.lat) * t,
    lng: c1.lng + (c2.lng - c1.lng) * t
  };
}

// Function to get exact location on path given progress 0..1
function getLocationOnPath(path: Coordinate[], progress: number): Coordinate {
  if (path.length === 0) return { lat: 0, lng: 0 };
  if (path.length === 1) return path[0];
  if (progress <= 0) return path[0];
  if (progress >= 1) return path[path.length - 1];

  const totalSegments = path.length - 1;
  const scaledProgress = progress * totalSegments;
  const index = Math.floor(scaledProgress);
  const segmentProgress = scaledProgress - index;

  return interpolateCoordinate(path[index], path[index + 1], segmentProgress);
}

export function useBusSimulation() {
  const [buses, setBuses] = useState<Record<string, Bus>>(INITIAL_BUSES);
  
  // Ref to hold current state for interval closure
  const busesRef = useRef(buses);
  
  useEffect(() => {
    busesRef.current = buses;
  }, [buses]);

  useEffect(() => {
    const tick = () => {
      const nextBuses: Record<string, Bus> = {};
      const now = Date.now();
      
      Object.entries(busesRef.current).forEach(([id, bus]) => {
        if (bus.status === 'active') {
          // Simulate movement
          // Let's say speed is km/h. To make it visible, we multiply by a factor.
          // In real life, length of path matters. Here we just add a small delta to progress.
          const progressDelta = (bus.speed / 10000); // Magic number for visual speed
          let newProgress = bus.progress + progressDelta;
          
          if (newProgress >= 1) {
            newProgress = 0; // Loop back for demo
          }
          
          const route = ROUTES[bus.route_id];
          const newLocation = getLocationOnPath(route.path, newProgress);
          
          // Randomly fluctuate speed a bit
          const newSpeed = Math.max(0, Math.min(80, bus.speed + (Math.random() * 4 - 2)));
          
          nextBuses[id] = {
            ...bus,
            progress: newProgress,
            location: newLocation,
            speed: newSpeed,
            lastUpdate: now
          };
        } else {
          nextBuses[id] = { ...bus };
        }
      });
      
      setBuses(nextBuses);
    };

    // Update every 1 second (1000ms) to simulate real-time
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return { buses, routes: ROUTES };
}
