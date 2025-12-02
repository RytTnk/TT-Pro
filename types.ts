export enum AppView {
  DASHBOARD = 'DASHBOARD',
  FITNESS = 'FITNESS',
  AERO = 'AERO',
  STRATEGY = 'STRATEGY',
  DOCS = 'DOCS'
}

export interface TrainingMenu {
  id: string;
  title: string;
  type: 'FTP' | 'VO2Max' | 'Endurance' | 'Recovery';
  durationMin: number;
  tss: number;
  description: string;
}

export interface WeightRecord {
  date: string;
  weight: number; // kg
}

export interface RaceProfile {
  id: string;
  name: string;
  distanceKm: number;
  elevationGainM: number;
  type: 'Flat' | 'Hilly' | 'Mountain' | 'TT';
  description: string;
}

export interface AeroAnalysisResult {
  timestamp: number;
  hipAngle?: number;
  virtualCdA?: number;
}
