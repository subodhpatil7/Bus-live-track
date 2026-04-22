export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Route {
  id: string;
  name: string;
  source: string;
  destination: string;
  path: Coordinate[]; // Ordered list of coordinates making up the route
  stops: { name: string; coord: Coordinate }[];
  color: string;
}

export interface Bus {
  id: string;
  device_id: string;
  route_id: string;
  numberPlate: string;
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  speed: number; // km/h
  location: Coordinate;
  progress: number; // 0 to 1 along the path length
  lastUpdate: number;
}

export interface FleetSnapshot {
  buses: Record<string, Bus>;
  timestamp: number;
  activeCount: number;
}
