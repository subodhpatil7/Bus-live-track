import { Route, Bus, Coordinate } from '@/types';

// Utility to generate a path between two points with some jitter/curve
function generatePath(start: Coordinate, end: Coordinate, steps: number): Coordinate[] {
  const path: Coordinate[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Add a slight arc to make it look like a road, not just a straight line
    const latOffset = Math.sin(t * Math.PI) * 0.01; 
    path.push({
      lat: start.lat + (end.lat - start.lat) * t + latOffset,
      lng: start.lng + (end.lng - start.lng) * t,
    });
  }
  return path;
}

export const ROUTES: Record<string, Route> = {
  'r1': {
    id: 'r1',
    name: 'HQ to Delhi',
    source: 'HQ',
    destination: 'Delhi',
    path: generatePath({ lat: 28.5272, lng: 77.0688 }, { lat: 28.6139, lng: 77.2090 }, 50),
    stops: [
      { name: 'HQ Zone Route', coord: { lat: 28.5272, lng: 77.0688 } },
      { name: 'Sector 4', coord: { lat: 28.5700, lng: 77.1300 } },
      { name: 'Delhi', coord: { lat: 28.6139, lng: 77.2090 } },
    ],
    color: '#ffb142', // bento-accent
  },
  'r2': {
    id: 'r2',
    name: 'BLR to MAA',
    source: 'Bangalore',
    destination: 'Chennai',
    path: generatePath({ lat: 12.9716, lng: 77.5946 }, { lat: 13.0827, lng: 80.2707 }, 40),
    stops: [
      { name: 'Bangalore', coord: { lat: 12.9716, lng: 77.5946 } },
      { name: 'Vellore', coord: { lat: 12.9165, lng: 79.1325 } },
      { name: 'Chennai', coord: { lat: 13.0827, lng: 80.2707 } }
    ],
    color: '#3fb950', // bento-success
  },
  'r3': {
    id: 'r3',
    name: 'PNE to BOM',
    source: 'Pune',
    destination: 'Mumbai',
    path: generatePath({ lat: 18.5204, lng: 73.8567 }, { lat: 19.0760, lng: 72.8777 }, 30),
    stops: [
      { name: 'Pune', coord: { lat: 18.5204, lng: 73.8567 } },
      { name: 'Lonavala', coord: { lat: 18.7481, lng: 73.4071 } },
      { name: 'Mumbai', coord: { lat: 19.0760, lng: 72.8777 } }
    ],
    color: '#ff5252', // bento-danger
  }
};

export const INITIAL_BUSES: Record<string, Bus> = {
  'bus-001': {
    id: 'bus-001',
    device_id: 'dev-abc-123',
    route_id: 'r1',
    numberPlate: 'MH 01 AB 1234',
    status: 'active',
    speed: 45,
    location: ROUTES['r1'].path[0],
    progress: 0.1,
    lastUpdate: Date.now(),
  },
  'bus-002': {
    id: 'bus-002',
    device_id: 'dev-def-456',
    route_id: 'r1',
    numberPlate: 'MH 01 XY 9876',
    status: 'active',
    speed: 35,
    location: ROUTES['r1'].path[25],
    progress: 0.5,
    lastUpdate: Date.now(),
  },
  'bus-003': {
    id: 'bus-003',
    device_id: 'dev-ghi-789',
    route_id: 'r2',
    numberPlate: 'MH 02 CD 5555',
    status: 'active',
    speed: 50,
    location: ROUTES['r2'].path[0],
    progress: 0.05,
    lastUpdate: Date.now(),
  },
  'bus-004': {
    id: 'bus-004',
    device_id: 'dev-jkl-012',
    route_id: 'r3',
    numberPlate: 'MH 04 EF 7777',
    status: 'active',
    speed: 40,
    location: ROUTES['r3'].path[10],
    progress: 0.33,
    lastUpdate: Date.now(),
  },
  'bus-005': {
    id: 'bus-005',
    device_id: 'dev-mno-345',
    route_id: 'r3',
    numberPlate: 'MH 47 GH 1010',
    status: 'maintenance',
    speed: 0,
    location: ROUTES['r3'].stops[0].coord,
    progress: 0,
    lastUpdate: Date.now(),
  }
};
