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
# TT-Pro: Technical Documentation

## Quick Links
📚 **Full Documentation**: /docs directory contains comprehensive guides
- [Architecture Guide](docs/architecture.md) - System design & diagrams
- [Database Schema](docs/database-schema.md) - AI-readable data structures
- [API Design](docs/api-design.md) - RESTful API specifications
- [Setup Guide](docs/setup-guide.md) - Environment configuration
- [Operations Manual](docs/operations-manual.md) - User workflows

---

## 1. System Architecture

TT-Pro adopts a **Modular Monolith** pattern (client-side) designed to transition to Microservices.

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

**Key Design Principles:**
- Progressive enhancement (MVP → Full-stack)
- AI-first approach with Gemini integration
- Modular components for independent evolution
- Real-time feedback and visualization

---

## 2. Database Schema

### Entity Relationship Diagram

\`\`\`mermaid
erDiagram
    USERS ||--o{ TRAINING_LOGS : creates
    USERS ||--o{ AERO_SESSIONS : performs
    USERS ||--o{ WEIGHT_HISTORY : records
    TRAINING_MENUS ||--o{ TRAINING_LOGS : templates
    RACE_PROFILES ||--o{ RACE_STRATEGIES : analyzes
    
    USERS {
        string uid PK
        string name
        number ftp
        number weightKg
    }
    
    TRAINING_LOGS {
        string id PK
        string userId FK
        date date
        number actualTss
    }
    
    AERO_SESSIONS {
        string id PK
        string userId FK
        number estimatedCdA
    }
\`\`\`

### JSON Schema Example

\`\`\`json
{
  "users": {
    "uid_001": {
      "name": "Rider One",
      "ftp": 280,
      "weightKg": 68.5,
      "heightCm": 178,
      "createdAt": "2023-01-15T08:30:00Z"
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
      "videoUrl": "https://storage.example.com/videos/as_552.mp4",
      "estimatedCdA": 0.235,
      "timestamp": 1698220000
    }
  ]
}
\`\`\`

📖 **See full schema**: [docs/database-schema.md](docs/database-schema.md)

---

## 3. Component Architecture

\`\`\`mermaid
graph TD
    App[App.tsx] --> Layout[Layout Component]
    Layout --> Fitness[FitnessView]
    Layout --> Aero[AeroView]
    Layout --> Strategy[StrategyView]
    Layout --> Docs[DocumentationView]
    
    Fitness --> Charts[Recharts]
    Aero --> Video[Video Player]
    Aero --> Canvas[Canvas Overlay]
    Strategy --> Gemini[Gemini Service]
\`\`\`

**Module Responsibilities:**
- **Fitness**: Training management, FTP tracking, weight charts
- **Aero**: Video analysis, CdA calculation, position optimization
- **Strategy**: AI-powered race planning and gear recommendations
- **Docs**: Technical documentation viewer

---

## 4. Video Analysis Algorithm

**Feature F-2-3: Marker Detection & Hip Angle Calculation**

### Algorithm Flow

1. **Input**: Frame buffer from HTML5 Video element
2. **Process**:
   - Iterate pixels with stride 4 (RGBA)
   - Detect markers using color thresholding
   - Calculate centroid (average X, Y of matched pixels)
   - Compute joint angles using trigonometry
3. **Output**: Hip angle plotted over time
4. **Metrics**:
   - Vertical oscillation (smoothness)
   - Horizontal tracking (position consistency)
   - Hip angle range (optimal: 40-50°)

### Implementation Notes

**Current (MVP)**: Simulated tracking using time-based animation
**Future**: MediaPipe Pose Estimation for real computer vision

\`\`\`javascript
// Simplified pseudo-code
const hipAngle = calculateAngle(hip, knee, ankle);
const oscillation = calculateVerticalMovement(hip.y, frameHistory);
const positionScore = evaluateAeroPosition(hipAngle, oscillation);
\`\`\`

---

## 5. Data Flow Diagrams

### AI Strategy Generation Flow

\`\`\`mermaid
sequenceDiagram
    User->>StrategyView: Select race & click Generate
    StrategyView->>GeminiService: getRaceStrategyAdvice()
    GeminiService->>Gemini API: POST /generateContent
    Gemini API-->>GeminiService: AI Response
    GeminiService-->>StrategyView: Formatted advice
    StrategyView-->>User: Display strategy
\`\`\`

### Aero Analysis Flow

\`\`\`mermaid
sequenceDiagram
    User->>AeroView: Upload video
    AeroView->>Browser: Create object URL
    User->>AeroView: Enable AI Overlay
    loop Every Frame
        AeroView->>Canvas: Draw frame + markers
        AeroView->>AeroView: Calculate hip angle
        Canvas-->>User: Display overlay
    end
\`\`\`

---

## 6. API Integration

### Gemini AI Integration

**Endpoint**: \`gemini-2.5-flash\`  
**Purpose**: Generate race strategies and training workouts

**Request Example**:
\`\`\`javascript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt
});
\`\`\`

**Output Format**: Markdown with structured sections
- Pacing Strategy
- Gear Recommendations
- Nutrition Plan
- Aero Focus Points

📖 **See full API design**: [docs/api-design.md](docs/api-design.md)

---

## 7. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 19.2.0 | UI components & state |
| **Language** | TypeScript 5.8.2 | Type safety |
| **Build** | Vite 6.2.0 | Fast dev server & builds |
| **Charts** | Recharts 3.5.1 | Data visualization |
| **Icons** | Lucide React 0.555.0 | UI icons |
| **AI** | Google Gemini 1.30.0 | Strategy generation |

---

## 8. Development Workflow

\`\`\`mermaid
graph LR
    A[Edit Code] --> B[Hot Reload]
    B --> C[Test in Browser]
    C --> D{Works?}
    D -->|Yes| E[Commit]
    D -->|No| A
    E --> F[Build]
    F --> G[Deploy]
\`\`\`

**Available Commands:**
- \`npm run dev\` - Start development server
- \`npm run build\` - Production build
- \`npm run preview\` - Preview production build

---

## 9. Performance Optimization

**Current Optimizations:**
- Code splitting via Vite
- Lazy component loading
- React memo for expensive renders
- Canvas-based video overlay (no DOM manipulation)

**Benchmarks (MVP)**:
- Page load: < 2s
- Video analysis: 60 FPS
- AI response: 5-15s (network dependent)

---

## 10. Security Considerations

**Current Measures:**
- API keys in environment variables
- No sensitive data in client code
- HTTPS only (production)
- React XSS protection

**Future Additions:**
- JWT authentication
- Rate limiting
- Input validation
- CORS policies

---

## 11. Deployment Strategy

**Phase 1 (Current)**: Static hosting (Vercel/Netlify)
**Phase 2**: Backend API + Database
**Phase 3**: Microservices architecture

\`\`\`mermaid
graph TB
    Dev[Development] -->|Push| Git[GitHub]
    Git -->|Trigger| CI[CI/CD]
    CI -->|Build| Dist[Static Assets]
    Dist -->|Deploy| CDN[CDN]
    User[Users] -->|Access| CDN
\`\`\`

---

## 12. Testing Strategy

**Manual Testing Checklist:**
- ✅ All views load without errors
- ✅ Navigation works correctly
- ✅ Charts render properly
- ✅ Video upload functions
- ✅ AI generation succeeds (with API key)
- ✅ TypeScript compilation passes

**Future Automated Tests:**
- Unit tests (Vitest)
- Component tests (React Testing Library)
- E2E tests (Playwright)

---

## 13. Roadmap

| Phase | Timeline | Focus |
|-------|----------|-------|
| **Phase 1** | Q4 2025 - Q1 2026 | MVP with client-side features |
| **Phase 2** | Q2 2026 - Q3 2026 | Backend API & database |
| **Phase 3** | Q4 2026 - Q1 2027 | Microservices & scale |
| **Phase 4** | Q2 2027+ | ML models & mobile apps |

---

## 14. Contributing Guidelines

1. Fork repository
2. Create feature branch
3. Write TypeScript with strict types
4. Add documentation for new features
5. Test thoroughly
6. Submit PR with description

---

## 15. Resources

**Internal Documentation:**
- [Architecture Guide](docs/architecture.md)
- [Database Schema](docs/database-schema.md)
- [API Design](docs/api-design.md)
- [Setup Guide](docs/setup-guide.md)
- [Operations Manual](docs/operations-manual.md)

**External Resources:**
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Google Gemini API](https://ai.google.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: 2026-01-08  
**Version**: 1.0.0  
**Maintainer**: Development Team
`;
