import { TrainingMenu, RaceProfile, WeightRecord } from './types';

export const APP_NAME = "TT-Pro";

export const MOCK_TRAINING_MENUS: TrainingMenu[] = [
  { id: '1', title: '2x20min FTP Intervals', type: 'FTP', durationMin: 90, tss: 85, description: 'Classic threshold work. Warm up 20m, 2x20m at 100% FTP with 5m rest, Cool down.' },
  { id: '2', title: 'VO2Max Micro-bursts', type: 'VO2Max', durationMin: 60, tss: 75, description: '3 sets of 10x(30s ON / 15s OFF) at 120% FTP.' },
  { id: '3', title: 'LSD Base Miles', type: 'Endurance', durationMin: 180, tss: 150, description: 'Long slow distance at Zone 2 (65-75% FTP).' },
];

export const MOCK_RACES: RaceProfile[] = [
  { id: 'r1', name: 'Mt. Fuji Hillclimb', distanceKm: 24, elevationGainM: 1255, type: 'Mountain', description: 'Constant gradient averaging 5.2%. Aerodynamics matter less than W/kg.' },
  { id: 'r2', name: 'Tokyo Bay Time Trial', distanceKm: 40, elevationGainM: 50, type: 'TT', description: 'Dead flat, high wind exposure. Pure CdA vs Watts battle.' },
  { id: 'r3', name: 'Suzuka Enduro', distanceKm: 120, elevationGainM: 800, type: 'Hilly', description: 'Technical corners with punchy climbs.' },
];

export const MOCK_WEIGHT_HISTORY: WeightRecord[] = [
  { date: '2023-01-01', weight: 70.5 },
  { date: '2023-02-01', weight: 69.8 },
  { date: '2023-03-01', weight: 69.2 },
  { date: '2023-04-01', weight: 68.5 },
  { date: '2023-05-01', weight: 67.9 },
  { date: '2023-06-01', weight: 67.5 },
];

export const DOCUMENTATION_MARKDOWN = `
# TT-Pro Architecture & Design Documents

## 1. System Architecture
TT-Pro adopts a **Modular Monolith** pattern for the prototype, designed to transition to Microservices.

\`\`\`mermaid
graph TD
    User[User / Client] -->|HTTPS| Frontend[React SPA (Vite)]
    Frontend -->|Inter-Service| FitnessModule
    Frontend -->|Inter-Service| AeroModule
    Frontend -->|Inter-Service| StrategyModule
    Frontend -->|API Call| GeminiAPI[Google Gemini API]
    
    subgraph "Core Logic (Client-Side for Demo)"
        FitnessModule[Fitness: Charts/Planning]
        AeroModule[Aero: CV Analysis/CdA Calc]
        StrategyModule[Strategy: Race Sim]
    end
\`\`\`

## 2. Database Schema (JSON Representation)
Designed for NoSQL or Document-based storage (e.g., Firestore/MongoDB) or structured JSON in Postgres.

\`\`\`json
{
  "users": {
    "uid_001": {
      "name": "Rider One",
      "ftp": 280,
      "weightKg": 68.5,
      "heightCm": 178
    }
  },
  "training_logs": [
    {
      "id": "log_101",
      "userId": "uid_001",
      "date": "2023-10-25",
      "menuId": "menu_ftp_01",
      "actualTss": 82,
      "notes": "Felt strong"
    }
  ],
  "aero_sessions": [
    {
      "id": "as_552",
      "userId": "uid_001",
      "videoUrl": "s3://...",
      "estimatedCdA": 0.235,
      "timestamp": 1698220000
    }
  ]
}
\`\`\`

## 3. Video Analysis Algorithm (Low-Load CPU)
For Feature F-2-3 (Marker Detection), we use a simplified color-thresholding algorithm runnable in the browser main thread or worker.

1.  **Input:** Frame buffer from HTML5 Video element.
2.  **Process:** 
    *   Iterate pixels with stride 4 (RGBA).
    *   Compare (R,G,B) against Target (e.g., Red > 200 & G < 100 & B < 100).
    *   Compute Centroid (Average X, Y of matched pixels).
3.  **Output:** Coordinate (x,y) plotted over time.
4.  **Metric:** Vertical oscillation (smoothness) and horizontal tracking (position consistency).
`;
