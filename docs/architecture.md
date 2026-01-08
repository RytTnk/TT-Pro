# TT-Pro Architecture Design Document

## Document Information

- **Project**: TT-Pro (Time Trial Pro)
- **Version**: 1.0.0
- **Last Updated**: 2026-01-08
- **Status**: Active Development

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Architecture Patterns](#architecture-patterns)
3. [System Architecture](#system-architecture)
4. [Component Architecture](#component-architecture)
5. [Data Flow](#data-flow)
6. [Technology Stack](#technology-stack)
7. [Deployment Architecture](#deployment-architecture)
8. [Security Architecture](#security-architecture)
9. [Scalability & Performance](#scalability--performance)
10. [Future Architecture Evolution](#future-architecture-evolution)

---

## System Overview

TT-Pro is a comprehensive cycling time trial analysis platform that combines:
- **Fitness Tracking**: Training load management and FTP monitoring
- **Aero Analysis**: Computer vision-based position analysis
- **Race Strategy**: AI-powered race planning using Google Gemini

### Design Philosophy

- **Progressive Enhancement**: Start with client-side MVP, evolve to full-stack
- **AI-First**: Leverage AI for insights and recommendations
- **Real-time Feedback**: Immediate visual feedback on training and aero data
- **Modular Design**: Independent modules that can be developed/deployed separately

---

## Architecture Patterns

### Current Pattern: Modular Monolith (Client-Side)

The application currently follows a **Modular Monolith** pattern entirely on the client side, designed for easy transition to microservices.

**Characteristics**:
- Self-contained feature modules (Fitness, Aero, Strategy)
- Shared UI components and utilities
- Direct API integration with Google Gemini
- Local state management per module

### Future Pattern: Backend-for-Frontend (BFF)

Future architecture will introduce a BFF layer:
- Node.js/Express backend
- API Gateway pattern
- Separate microservices for compute-intensive tasks

---

## System Architecture

### High-Level Architecture Diagram

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Web Browser]
        PWA[Progressive Web App]
    end
    
    subgraph "Frontend Application"
        React[React SPA<br/>Vite Build]
        Router[View Router]
        
        subgraph "Feature Modules"
            Fitness[Fitness Module]
            Aero[Aero Module]
            Strategy[Strategy Module]
            Docs[Documentation Module]
        end
        
        subgraph "Shared Layer"
            Components[UI Components]
            Services[Service Layer]
            Types[Type Definitions]
            Constants[Constants & Config]
        end
    end
    
    subgraph "External Services"
        Gemini[Google Gemini API]
        Storage[Cloud Storage<br/>Future]
        Analytics[Analytics<br/>Future]
    end
    
    Browser --> React
    PWA --> React
    React --> Router
    Router --> Fitness
    Router --> Aero
    Router --> Strategy
    Router --> Docs
    
    Fitness --> Components
    Aero --> Components
    Strategy --> Components
    Docs --> Components
    
    Fitness --> Services
    Aero --> Services
    Strategy --> Services
    
    Services --> Types
    Services --> Constants
    
    Strategy --> Gemini
    
    style React fill:#61dafb
    style Gemini fill:#4285f4
    style Fitness fill:#10b981
    style Aero fill:#3b82f6
    style Strategy fill:#8b5cf6
```

### Current Architecture (Phase 1 - MVP)

```mermaid
C4Context
    title System Context Diagram - TT-Pro MVP

    Person(user, "Cyclist/Athlete", "Uses TT-Pro for training and race analysis")
    
    System(ttpro, "TT-Pro Application", "React SPA for cycling analysis")
    
    System_Ext(gemini, "Google Gemini API", "AI-powered strategy generation")
    System_Ext(browser, "Web Browser", "Hosts and runs the application")
    
    Rel(user, ttpro, "Uses", "HTTPS")
    Rel(ttpro, gemini, "Requests AI analysis", "REST API")
    Rel(ttpro, browser, "Runs in", "")
```

---

## Component Architecture

### Component Hierarchy

```mermaid
graph TD
    App[App.tsx<br/>Root Component]
    
    App --> Layout[Layout<br/>Navigation & Shell]
    
    Layout --> FitnessView[FitnessView<br/>Training Management]
    Layout --> AeroView[AeroView<br/>Aero Analysis]
    Layout --> StrategyView[StrategyView<br/>Race Strategy]
    Layout --> DocsView[DocumentationView<br/>Technical Docs]
    
    FitnessView --> Charts[Recharts Components<br/>Weight/TSS Charts]
    FitnessView --> TrainingList[Training Menu List]
    
    AeroView --> VideoPlayer[Video Upload & Playback]
    AeroView --> CanvasOverlay[Canvas Analysis Overlay]
    AeroView --> CdACalculator[CdA Calculator Form]
    
    StrategyView --> RaceSelector[Race Profile Selector]
    StrategyView --> AIOutput[AI Strategy Display]
    StrategyView --> GeminiService[Gemini Service Integration]
    
    style App fill:#f59e0b
    style FitnessView fill:#10b981
    style AeroView fill:#3b82f6
    style StrategyView fill:#8b5cf6
    style DocsView fill:#6366f1
```

### Module Structure

```
TT-Pro/
├── App.tsx                 # Root component & routing
├── index.tsx               # Application entry point
├── components/             # Feature modules
│   ├── Layout.tsx          # Main layout & navigation
│   ├── FitnessView.tsx     # Fitness tracking module
│   ├── AeroView.tsx        # Aero analysis module
│   ├── StrategyView.tsx    # Strategy planning module
│   └── DocumentationView.tsx # Documentation viewer
├── services/               # Business logic layer
│   └── geminiService.ts    # AI service integration
├── types.ts                # TypeScript type definitions
├── constants.ts            # App constants & mock data
├── vite.config.ts          # Build configuration
└── docs/                   # Technical documentation
    ├── database-schema.md
    ├── api-design.md
    ├── architecture.md
    └── ...
```

---

## Data Flow

### Training Data Flow

```mermaid
sequenceDiagram
    participant User
    participant FitnessView
    participant Constants
    participant State
    
    User->>FitnessView: View Training Menu
    FitnessView->>Constants: Load MOCK_TRAINING_MENUS
    Constants-->>FitnessView: Return menu data
    FitnessView->>State: Set local state
    FitnessView-->>User: Display training options
    
    User->>FitnessView: Select workout
    FitnessView->>State: Update selected menu
    FitnessView-->>User: Show workout details
    
    Note over User,State: Future: Add backend API layer here
```

### Aero Analysis Flow

```mermaid
sequenceDiagram
    participant User
    participant AeroView
    participant VideoRef
    participant Canvas
    participant AnalysisLoop
    
    User->>AeroView: Upload video file
    AeroView->>VideoRef: Create object URL
    VideoRef-->>AeroView: Video ready
    
    User->>AeroView: Enable AI Overlay
    AeroView->>AnalysisLoop: Start analysis loop
    
    loop Every Frame
        AnalysisLoop->>VideoRef: Capture current frame
        AnalysisLoop->>Canvas: Draw frame
        AnalysisLoop->>AnalysisLoop: Detect markers (simulated)
        AnalysisLoop->>Canvas: Draw overlay graphics
        Canvas-->>User: Display annotated frame
    end
    
    User->>AeroView: Stop video
    AeroView->>AnalysisLoop: Cancel animation frame
    
    Note over User,AnalysisLoop: Real implementation would use MediaPipe/TensorFlow
```

### AI Strategy Generation Flow

```mermaid
sequenceDiagram
    participant User
    participant StrategyView
    participant GeminiService
    participant GeminiAPI
    participant AIOutput
    
    User->>StrategyView: Select race profile
    User->>StrategyView: Click "AI Gear & Strategy"
    
    StrategyView->>StrategyView: Set loading state
    StrategyView->>GeminiService: getRaceStrategyAdvice(race, ftp, weight)
    
    GeminiService->>GeminiService: Build prompt with context
    GeminiService->>GeminiAPI: POST /generateContent
    
    alt Success
        GeminiAPI-->>GeminiService: Return AI response
        GeminiService-->>StrategyView: Return formatted advice
        StrategyView->>AIOutput: Render markdown content
        AIOutput-->>User: Display strategy
    else Error
        GeminiAPI-->>GeminiService: Error response
        GeminiService-->>StrategyView: Return error message
        StrategyView-->>User: Display error
    end
```

### State Management Flow

```mermaid
graph LR
    subgraph "Component State"
        LocalState[Local useState]
        DerivedState[Derived State]
    end
    
    subgraph "Global Constants"
        MockData[Mock Data<br/>constants.ts]
        AppConfig[App Configuration]
    end
    
    subgraph "External State"
        APIResponse[API Responses]
        FileUpload[User File Uploads]
    end
    
    LocalState --> DerivedState
    MockData --> LocalState
    APIResponse --> LocalState
    FileUpload --> LocalState
    
    DerivedState --> Render[Component Render]
    
    style LocalState fill:#60a5fa
    style MockData fill:#34d399
    style APIResponse fill:#f59e0b
```

---

## Technology Stack

### Frontend Stack

```mermaid
graph TD
    subgraph "Core Framework"
        React[React 19.2.0<br/>UI Library]
        TypeScript[TypeScript 5.8.2<br/>Type Safety]
        Vite[Vite 6.2.0<br/>Build Tool]
    end
    
    subgraph "UI Libraries"
        Lucide[lucide-react<br/>Icon Library]
        Recharts[Recharts 3.5.1<br/>Charts & Graphs]
    end
    
    subgraph "AI/ML"
        GenAI[@google/genai 1.30.0<br/>Gemini Integration]
        MediaPipe[MediaPipe<br/>Future: Pose Detection]
    end
    
    subgraph "Development Tools"
        Node[Node.js 22+<br/>Runtime]
        NPM[npm<br/>Package Manager]
    end
    
    React --> Lucide
    React --> Recharts
    React --> GenAI
    TypeScript --> React
    Vite --> React
    Node --> Vite
    NPM --> Node
    
    style React fill:#61dafb
    style TypeScript fill:#3178c6
    style Vite fill:#646cff
    style GenAI fill:#4285f4
```

### Technology Choices & Rationale

| Technology | Purpose | Rationale |
|------------|---------|-----------|
| **React 19** | UI Framework | Latest features, concurrent rendering, server components ready |
| **TypeScript** | Type Safety | Catch errors early, better IDE support, self-documenting code |
| **Vite** | Build Tool | Fast HMR, optimized production builds, modern ES modules |
| **Recharts** | Data Visualization | React-friendly, customizable, responsive charts |
| **Lucide React** | Icons | Lightweight, tree-shakeable, comprehensive icon set |
| **Google Gemini** | AI Engine | State-of-the-art LLM, multimodal capabilities, generous free tier |

---

## Deployment Architecture

### Current Deployment (Static Hosting)

```mermaid
graph TB
    subgraph "Development"
        Dev[Developer Machine]
        Git[Git Repository]
    end
    
    subgraph "CI/CD Pipeline"
        GHA[GitHub Actions]
        Build[Vite Build Process]
        Test[Linting & Tests]
    end
    
    subgraph "Production Hosting"
        CDN[CDN<br/>CloudFlare/Vercel]
        Static[Static Files<br/>HTML/JS/CSS]
    end
    
    subgraph "External Services"
        GeminiAPI[Google Gemini API]
    end
    
    Dev -->|Push| Git
    Git -->|Trigger| GHA
    GHA --> Test
    Test --> Build
    Build -->|Deploy| CDN
    CDN --> Static
    Static -.->|API Calls| GeminiAPI
    
    User[End Users] -->|HTTPS| CDN
    
    style CDN fill:#f59e0b
    style GeminiAPI fill:#4285f4
    style Static fill:#10b981
```

### Future Deployment (Full-Stack)

```mermaid
graph TB
    subgraph "Frontend Tier"
        CDN[CDN Distribution]
        StaticAssets[React SPA Assets]
    end
    
    subgraph "API Tier"
        LB[Load Balancer]
        API1[API Server 1]
        API2[API Server 2]
        API3[API Server N]
    end
    
    subgraph "Data Tier"
        DB[(Primary Database)]
        DBReplica[(Read Replicas)]
        Cache[Redis Cache]
    end
    
    subgraph "Processing Tier"
        VideoQueue[Video Processing Queue]
        Worker1[Worker Node 1]
        Worker2[Worker Node 2]
        Storage[Object Storage<br/>S3/GCS]
    end
    
    subgraph "External"
        Gemini[Gemini API]
        Analytics[Analytics Service]
    end
    
    Users[Users] --> CDN
    CDN --> StaticAssets
    StaticAssets --> LB
    LB --> API1
    LB --> API2
    LB --> API3
    
    API1 --> DB
    API2 --> DB
    API3 --> DB
    API1 --> Cache
    API2 --> Cache
    API3 --> Cache
    DB --> DBReplica
    
    API1 -.->|Enqueue| VideoQueue
    VideoQueue --> Worker1
    VideoQueue --> Worker2
    Worker1 --> Storage
    Worker2 --> Storage
    
    API1 -.-> Gemini
    API2 -.-> Gemini
    API3 -.-> Gemini
    
    API1 -.-> Analytics
    
    style CDN fill:#f59e0b
    style LB fill:#3b82f6
    style DB fill:#10b981
    style Worker1 fill:#8b5cf6
    style Storage fill:#ec4899
```

---

## Security Architecture

### Security Layers

```mermaid
graph TD
    subgraph "Application Security"
        Input[Input Validation]
        XSS[XSS Prevention]
        CORS[CORS Policy]
    end
    
    subgraph "API Security"
        Auth[JWT Authentication]
        RateLimit[Rate Limiting]
        APIKey[API Key Management]
    end
    
    subgraph "Data Security"
        Encrypt[Data Encryption]
        Privacy[Privacy Controls]
        GDPR[GDPR Compliance]
    end
    
    subgraph "Infrastructure Security"
        HTTPS[HTTPS/TLS]
        Firewall[WAF/Firewall]
        Monitoring[Security Monitoring]
    end
    
    Input --> XSS
    XSS --> CORS
    Auth --> RateLimit
    RateLimit --> APIKey
    Encrypt --> Privacy
    Privacy --> GDPR
    HTTPS --> Firewall
    Firewall --> Monitoring
    
    style Auth fill:#ef4444
    style Encrypt fill:#f59e0b
    style HTTPS fill:#10b981
```

### Security Measures

| Layer | Measure | Implementation |
|-------|---------|----------------|
| **Transport** | HTTPS/TLS | Mandatory TLS 1.3, HSTS headers |
| **Authentication** | JWT Tokens | RS256 signing, 24h expiration |
| **Authorization** | RBAC | Role-based access control per resource |
| **API Security** | Rate Limiting | 100 req/min per user, 10 req/s per IP |
| **Data Protection** | Encryption at Rest | AES-256 for sensitive data |
| **Privacy** | Data Minimization | Only collect necessary user data |
| **Secrets** | Environment Variables | API keys never in source code |
| **Input Validation** | Schema Validation | JSON Schema validation on all inputs |
| **XSS Prevention** | Content Security Policy | CSP headers, React auto-escaping |

---

## Scalability & Performance

### Performance Optimization Strategy

```mermaid
graph LR
    subgraph "Frontend Optimization"
        CodeSplit[Code Splitting]
        LazyLoad[Lazy Loading]
        Memoization[React Memoization]
        WebWorkers[Web Workers]
    end
    
    subgraph "Network Optimization"
        CDNCache[CDN Caching]
        Compression[Gzip/Brotli]
        HTTP2[HTTP/2]
    end
    
    subgraph "Data Optimization"
        Pagination[Pagination]
        Incremental[Incremental Loading]
        Caching[Client-Side Cache]
    end
    
    CodeSplit --> CDNCache
    LazyLoad --> Compression
    Memoization --> Caching
    WebWorkers --> Incremental
    
    style CodeSplit fill:#3b82f6
    style CDNCache fill:#10b981
    style Caching fill:#f59e0b
```

### Scalability Targets

| Metric | Current (MVP) | Target (Production) |
|--------|---------------|---------------------|
| **Concurrent Users** | 100 | 100,000 |
| **Page Load Time** | < 2s | < 1s |
| **API Response Time** | N/A | < 200ms (p95) |
| **Video Processing** | Client-side | < 5min per video |
| **Database Size** | Mock data | 1TB+ |
| **Availability** | Best effort | 99.9% |

### Horizontal Scaling Strategy

```mermaid
graph TD
    subgraph "Auto-Scaling Groups"
        ASG[Auto Scaling Group]
        API1[API Instance]
        API2[API Instance]
        API3[API Instance]
        
        ASG -.->|Spawn| API1
        ASG -.->|Spawn| API2
        ASG -.->|Spawn| API3
    end
    
    subgraph "Metrics & Triggers"
        CPU[CPU > 70%]
        Memory[Memory > 80%]
        Requests[Requests > 1000/min]
        
        CPU -->|Trigger| ASG
        Memory -->|Trigger| ASG
        Requests -->|Trigger| ASG
    end
    
    subgraph "Load Distribution"
        LB[Load Balancer]
        
        LB --> API1
        LB --> API2
        LB --> API3
    end
    
    style ASG fill:#3b82f6
    style LB fill:#10b981
```

---

## Future Architecture Evolution

### Phase 2: Backend Integration

```mermaid
graph TB
    Frontend[React SPA]
    BFF[Backend for Frontend<br/>Node.js/Express]
    
    AuthService[Auth Service]
    TrainingService[Training Service]
    AeroService[Aero Processing Service]
    StrategyService[Strategy Service]
    
    DB[(PostgreSQL)]
    Cache[(Redis)]
    Queue[Message Queue<br/>RabbitMQ/SQS]
    Storage[Object Storage]
    
    Frontend --> BFF
    BFF --> AuthService
    BFF --> TrainingService
    BFF --> AeroService
    BFF --> StrategyService
    
    TrainingService --> DB
    AeroService --> Queue
    StrategyService --> Gemini[Gemini API]
    
    Queue --> Worker[Video Workers]
    Worker --> Storage
    Worker --> DB
    
    TrainingService --> Cache
    
    style Frontend fill:#61dafb
    style BFF fill:#68a063
    style AeroService fill:#3b82f6
    style Worker fill:#8b5cf6
```

### Phase 3: Microservices Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Web[Web Client]
        Mobile[Mobile App]
    end
    
    subgraph "API Gateway"
        Gateway[API Gateway<br/>Kong/AWS API Gateway]
    end
    
    subgraph "Microservices"
        UserMS[User Service]
        TrainingMS[Training Service]
        AeroMS[Aero Service]
        StrategyMS[Strategy Service]
        NotificationMS[Notification Service]
    end
    
    subgraph "Data Layer"
        UserDB[(User DB)]
        TrainingDB[(Training DB)]
        AeroDB[(Aero DB)]
        EventStore[(Event Store)]
    end
    
    subgraph "Infrastructure"
        ServiceMesh[Service Mesh<br/>Istio]
        Monitoring[Observability<br/>Prometheus/Grafana]
    end
    
    Web --> Gateway
    Mobile --> Gateway
    
    Gateway --> ServiceMesh
    ServiceMesh --> UserMS
    ServiceMesh --> TrainingMS
    ServiceMesh --> AeroMS
    ServiceMesh --> StrategyMS
    ServiceMesh --> NotificationMS
    
    UserMS --> UserDB
    TrainingMS --> TrainingDB
    AeroMS --> AeroDB
    
    UserMS -.->|Events| EventStore
    TrainingMS -.->|Events| EventStore
    AeroMS -.->|Events| EventStore
    
    ServiceMesh --> Monitoring
    
    style Gateway fill:#f59e0b
    style ServiceMesh fill:#8b5cf6
    style Monitoring fill:#10b981
```

### Technology Roadmap

| Phase | Timeline | Key Technologies | Focus |
|-------|----------|------------------|-------|
| **Phase 1 (Current)** | Q4 2025 - Q1 2026 | React, Vite, Gemini | MVP, client-side prototype |
| **Phase 2** | Q2 2026 - Q3 2026 | Node.js, PostgreSQL, Redis | Backend API, data persistence |
| **Phase 3** | Q4 2026 - Q1 2027 | Kubernetes, gRPC, Event Sourcing | Microservices, scale |
| **Phase 4** | Q2 2027+ | ML Models, Real-time Processing | Advanced AI features |

---

## Design Decisions & Trade-offs

### Key Architectural Decisions

1. **Client-Side First Approach**
   - **Decision**: Build MVP entirely client-side
   - **Rationale**: Faster time to market, lower infrastructure cost
   - **Trade-off**: Limited by browser capabilities, no persistent data
   - **Mitigation**: Design for easy backend integration

2. **Direct Gemini API Integration**
   - **Decision**: Call Gemini API directly from browser
   - **Rationale**: Simplify MVP, reduce backend complexity
   - **Trade-off**: API key exposure risk, no usage control
   - **Mitigation**: Environment variables, move to backend in Phase 2

3. **Mock Data in Constants**
   - **Decision**: Store training menus and races in TypeScript constants
   - **Rationale**: No database needed for MVP
   - **Trade-off**: No user-specific data, no persistence
   - **Mitigation**: Easy migration path to database

4. **Simulated Video Analysis**
   - **Decision**: Simulate marker detection instead of real CV
   - **Rationale**: Demonstrate UX without heavy ML dependencies
   - **Trade-off**: Not production-ready analysis
   - **Mitigation**: Clear roadmap for MediaPipe integration

---

## Monitoring & Observability

### Observability Stack (Future)

```mermaid
graph LR
    subgraph "Application"
        App[TT-Pro Services]
    end
    
    subgraph "Telemetry"
        Logs[Logs<br/>ELK Stack]
        Metrics[Metrics<br/>Prometheus]
        Traces[Traces<br/>Jaeger]
    end
    
    subgraph "Visualization"
        Grafana[Grafana<br/>Dashboards]
        Alerts[Alert Manager]
    end
    
    App --> Logs
    App --> Metrics
    App --> Traces
    
    Logs --> Grafana
    Metrics --> Grafana
    Traces --> Grafana
    
    Metrics --> Alerts
    
    style App fill:#3b82f6
    style Grafana fill:#f59e0b
    style Alerts fill:#ef4444
```

---

## Disaster Recovery & Backup

### Backup Strategy (Future)

```mermaid
graph TD
    Production[Production Database]
    
    subgraph "Backup Tiers"
        Hot[Hot Standby<br/>Real-time Replication]
        Warm[Warm Backup<br/>Hourly Snapshots]
        Cold[Cold Storage<br/>Daily Backups]
    end
    
    Production -->|Streaming| Hot
    Production -->|Snapshot| Warm
    Warm -->|Archive| Cold
    
    Hot -.->|Failover< 30s| Recovery[Disaster Recovery]
    Warm -.->|Restore< 1h| Recovery
    Cold -.->|Restore< 24h| Recovery
    
    style Production fill:#3b82f6
    style Hot fill:#ef4444
    style Warm fill:#f59e0b
    style Cold fill:#6366f1
```

---

## Conclusion

TT-Pro's architecture is designed for:
- **Rapid prototyping** in Phase 1 (current)
- **Seamless evolution** to backend in Phase 2
- **Infinite scalability** with microservices in Phase 3
- **AI-first approach** throughout all phases

The modular design ensures each component can evolve independently while maintaining system coherence.

---

## References

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Google Gemini API](https://ai.google.dev)
- [Mermaid Diagram Syntax](https://mermaid.js.org)
- [C4 Model](https://c4model.com)

---

**Last Updated**: 2026-01-08  
**Document Owner**: Architecture Team  
**Review Cycle**: Quarterly
