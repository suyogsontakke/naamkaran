export interface GuestData {
  name: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export interface NameSuggestion {
  id: string;
  name: string;
  meaning: string;
  votes: number;
  isPreSelected?: boolean;
  timestamp: number;
}
