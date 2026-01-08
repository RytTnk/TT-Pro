<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# 🚴 TT-Pro: Time Trial Pro

**AI-Powered Cycling Performance Analysis Platform**

[![React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff?logo=vite)](https://vitejs.dev)
[![Google Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285f4?logo=google)](https://ai.google.dev)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**TT-Pro** is a comprehensive cycling time trial analysis platform that combines fitness tracking, aerodynamic analysis, and AI-powered race strategy planning. Built with modern web technologies and powered by Google Gemini AI, TT-Pro helps cyclists optimize their performance through data-driven insights.

### Key Capabilities

- 💪 **Fitness Tracking**: Monitor FTP, weight progression, and training load (TSS)
- ✈️ **Aero Analysis**: Computer vision-based position analysis and CdA calculation
- 🤖 **AI Strategy**: Race planning and gear recommendations powered by Google Gemini
- 📊 **Data Visualization**: Interactive charts and real-time feedback

### Who Is This For?

- **Competitive Cyclists**: Optimize time trial performance
- **Triathletes**: Improve bike split times
- **Coaches**: Provide data-driven training guidance
- **Power Users**: Deep dive into aerodynamics and pacing

---

## ✨ Features

### 🏋️ Fitness Module

- **FTP Monitoring**: Track Functional Threshold Power over time
- **Weight Progression**: Visualize weight changes with interactive charts
- **Training Library**: Pre-built workouts categorized by type (FTP, VO2Max, Endurance)
- **TSS Calculation**: Plan training load with Training Stress Score metrics

### ✈️ Aero Lab

- **Video Upload & Playback**: Analyze position from side-view videos
- **AI Pose Detection**: Track hip angle and body position (simulated in MVP)
- **Virtual CdA Calculator**: Estimate aerodynamic drag from field data
- **Position Optimization**: Compare different setups and configurations

### 🎯 Race Strategy

- **Race Profile Library**: Pre-loaded with various race types (Mountain, TT, Hilly)
- **AI-Powered Advice**: Gemini-generated pacing, gear, and nutrition strategies
- **Race-Specific Workouts**: AI creates training plans tailored to your target event
- **Interactive Planning**: Select races and get instant recommendations

### 📚 Documentation

- **Architecture Diagrams**: Mermaid-based system design documentation
- **Database Schema**: AI-readable structured data definitions
- **API Design**: RESTful API specifications for future backend
- **Operations Manual**: Comprehensive user guide

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher (v22.14.0+ recommended)
- **npm**: v9.0.0 or higher
- **Google Gemini API Key**: [Get yours here](https://ai.google.dev/aistudio)

### Installation

```bash
# Clone the repository
git clone https://github.com/RytTnk/TT-Pro.git
cd TT-Pro

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your GEMINI_API_KEY

# Start development server
npm run dev
```

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

---

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

| Document | Description |
|----------|-------------|
| **[Architecture Guide](docs/architecture.md)** | System design, component hierarchy, data flow diagrams |
| **[Database Schema](docs/database-schema.md)** | AI-readable schema definitions with JSON Schema format |
| **[API Design](docs/api-design.md)** | RESTful API specifications for future backend |
| **[Setup Guide](docs/setup-guide.md)** | Detailed environment setup and configuration |
| **[Operations Manual](docs/operations-manual.md)** | Complete user guide with workflows and best practices |

### Quick Links

- **System Architecture**: See [Architecture Diagrams](docs/architecture.md#system-architecture)
- **Database Design**: View [Entity Relationships](docs/database-schema.md#relationships)
- **API Reference**: Browse [Endpoints](docs/api-design.md#authentication)
- **User Guide**: Read [Workflows](docs/operations-manual.md#workflows--best-practices)

---

## 🛠 Technology Stack

### Frontend

- **React 19.2.0**: Latest React with concurrent features
- **TypeScript 5.8.2**: Type-safe development
- **Vite 6.2.0**: Lightning-fast build tool with HMR

### UI & Visualization

- **Recharts 3.5.1**: Responsive charts for data visualization
- **Lucide React 0.555.0**: Beautiful, consistent icon library
- **Custom CSS**: Tailwind-inspired utility styles

### AI & Integration

- **@google/genai 1.30.0**: Google Gemini AI SDK
- **Gemini 2.5 Flash**: State-of-the-art language model for strategy generation

### Development Tools

- **Node.js 22+**: Modern JavaScript runtime
- **npm**: Package management
- **ESLint**: Code quality
- **Prettier**: Code formatting (optional)

---

## 📁 Project Structure

```
TT-Pro/
├── docs/                          # 📚 Comprehensive documentation
│   ├── architecture.md            # System architecture & diagrams
│   ├── database-schema.md         # Database schema definitions
│   ├── api-design.md              # API specifications
│   ├── setup-guide.md             # Environment setup instructions
│   └── operations-manual.md       # User guide & workflows
│
├── components/                    # ⚛️ React components
│   ├── Layout.tsx                 # Main layout & navigation
│   ├── FitnessView.tsx            # Fitness tracking module
│   ├── AeroView.tsx               # Aero analysis module
│   ├── StrategyView.tsx           # Race strategy module
│   └── DocumentationView.tsx      # Documentation viewer
│
├── services/                      # 🔧 Business logic
│   └── geminiService.ts           # AI service integration
│
├── App.tsx                        # 🏠 Root component
├── index.tsx                      # 🚪 Application entry point
├── types.ts                       # 📝 TypeScript definitions
├── constants.ts                   # 🔢 App constants & mock data
├── vite.config.ts                 # ⚙️ Build configuration
├── tsconfig.json                  # 🔧 TypeScript configuration
├── package.json                   # 📦 Dependencies
└── README.md                      # 📖 This file
```

---

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check without building
npx tsc --noEmit
```

### Development Workflow

1. **Make Changes**: Edit `.tsx` or `.ts` files
2. **Auto Reload**: Browser updates automatically via HMR
3. **Check Types**: TypeScript catches errors in real-time
4. **Test Features**: Manually verify functionality
5. **Build**: Run `npm run build` for production

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required: Google Gemini API Key
GEMINI_API_KEY=your_actual_api_key_here

# Optional: Development settings
VITE_APP_NAME=TT-Pro
VITE_DEV_MODE=true
```

**⚠️ Important**: Never commit `.env.local` to version control!

---

## 🏗 Architecture Highlights

### System Architecture

```
┌─────────────────┐
│  React SPA      │
│  (Vite Build)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼──┐  ┌──▼───┐
│Fitness│  │ Aero │
│Module │  │Module│
└───┬──┘  └──┬───┘
    │         │
    └────┬────┘
         │
    ┌────▼──────┐
    │ Strategy  │
    │  Module   │
    └─────┬─────┘
          │
    ┌─────▼──────┐
    │  Gemini AI │
    └────────────┘
```

### Data Flow

1. **User Interaction** → Component State Update
2. **Component** → Service Layer (Gemini API call)
3. **Service** → External API (Google Gemini)
4. **Response** → Component State Update
5. **State Change** → UI Re-render

See [Architecture Documentation](docs/architecture.md) for detailed diagrams.

---

## 🎨 Key Features Demo

### Fitness Tracking

```typescript
// View your training metrics
{
  ftp: 265,              // Watts
  weight: 67.5,          // kg
  powerToWeight: 3.92,   // W/kg
  weeklyTSS: 450
}
```

### Aero Analysis

```typescript
// Calculate CdA from field data
calculateCdA({
  power: 300,           // W
  speed: 40,            // km/h
  crr: 0.004,           // Rolling resistance
  airDensity: 1.225     // kg/m³
});
// Result: 0.242 m²
```

### AI Strategy

```typescript
// Generate race strategy
getRaceStrategyAdvice({
  race: "Mt. Fuji Hillclimb",
  userFtp: 280,
  userWeight: 68
});
// Returns: Pacing plan, gear recommendations, nutrition strategy
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
2. **Create Feature Branch**: `git checkout -b feature/AmazingFeature`
3. **Commit Changes**: `git commit -m 'Add AmazingFeature'`
4. **Push to Branch**: `git push origin feature/AmazingFeature`
5. **Open Pull Request**

### Development Guidelines

- Write TypeScript with strict type checking
- Follow existing code structure and patterns
- Add comments for complex logic
- Update documentation for new features
- Test thoroughly before submitting PR

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Module not found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Gemini API errors:**
- Verify API key in `.env.local`
- Check API quota at [Google AI Studio](https://ai.google.dev/aistudio)
- Restart dev server after changing `.env.local`

See [Setup Guide](docs/setup-guide.md#troubleshooting) for more solutions.

---

## 📊 Roadmap

### Phase 1 (Current - MVP)
- ✅ Client-side React application
- ✅ Gemini AI integration
- ✅ Mock data for prototyping
- ✅ Core features (Fitness, Aero, Strategy)

### Phase 2 (Q2 2026)
- ⏳ Backend API (Node.js/Express)
- ⏳ Database integration (PostgreSQL)
- ⏳ User authentication
- ⏳ Data persistence

### Phase 3 (Q4 2026)
- ⏳ Real computer vision (MediaPipe)
- ⏳ Advanced analytics
- ⏳ Mobile application
- ⏳ Social features

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Google Gemini**: AI-powered strategy generation
- **Recharts**: Beautiful data visualization
- **Lucide**: Icon library
- **React Team**: Amazing framework
- **Vite Team**: Lightning-fast build tool

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/RytTnk/TT-Pro/issues)
- **Documentation**: [/docs directory](docs/)
- **AI Studio**: [View Original App](https://ai.studio/apps/drive/1izSgn7q7DX_pXz4vbUeGsPzeDi9z7JQW)

---

<div align="center">

**Built with ❤️ for cyclists by cyclists**

[⬆ Back to Top](#-tt-pro-time-trial-pro)

</div>
