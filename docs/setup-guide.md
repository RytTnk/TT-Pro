# Environment Setup Guide

## Overview

This guide provides step-by-step instructions for setting up the TT-Pro development environment on various platforms.

**Estimated Setup Time**: 15-30 minutes

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Start](#quick-start)
3. [Detailed Setup](#detailed-setup)
4. [Configuration](#configuration)
5. [Development Workflow](#development-workflow)
6. [Troubleshooting](#troubleshooting)
7. [IDE Setup](#ide-setup)
8. [Testing Setup](#testing-setup)

---

## Prerequisites

### System Requirements

| Component | Requirement | Recommended |
|-----------|-------------|-------------|
| **Operating System** | Windows 10+, macOS 10.15+, Linux | Latest stable version |
| **Node.js** | v18.0.0 or higher | v22.14.0+ (LTS) |
| **npm** | v9.0.0 or higher | v10.0.0+ |
| **RAM** | 4GB minimum | 8GB+ |
| **Disk Space** | 500MB for project | 1GB+ free space |
| **Browser** | Chrome 90+, Firefox 88+, Safari 14+ | Chrome/Edge (latest) |

### Required Tools

1. **Node.js & npm**
   - Download from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version  # Should show v18.0.0+
     npm --version   # Should show v9.0.0+
     ```

2. **Git**
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version  # Should show git version 2.x+
     ```

3. **Code Editor** (Recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - WebStorm: https://www.jetbrains.com/webstorm/
   - Sublime Text: https://www.sublimetext.com/

### Optional Tools

- **Docker** (for future backend development)
- **Postman** or **Insomnia** (for API testing)
- **GitHub CLI** (`gh`) for easier repository management

---

## Quick Start

For experienced developers who want to get started immediately:

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

# Open browser to http://localhost:5173
```

---

## Detailed Setup

### Step 1: Clone the Repository

```bash
# Using HTTPS
git clone https://github.com/RytTnk/TT-Pro.git

# Or using SSH (if you have SSH keys configured)
git clone git@github.com:RytTnk/TT-Pro.git

# Navigate to project directory
cd TT-Pro
```

### Step 2: Install Dependencies

```bash
# Install all npm packages
npm install

# This will install:
# - react & react-dom
# - @google/genai
# - recharts
# - lucide-react
# - TypeScript & Vite
# - All dev dependencies
```

**Expected output:**
```
added 234 packages, and audited 235 packages in 15s

42 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Step 3: Set Up Environment Variables

TT-Pro requires a Google Gemini API key for AI-powered features.

#### Get a Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/aistudio)
2. Sign in with your Google account
3. Click "Get API Key"
4. Create a new API key or use an existing one
5. Copy the API key

#### Configure Environment File

```bash
# Create environment file (if it doesn't exist)
touch .env.local

# Edit the file
nano .env.local
# or
code .env.local
```

**Add the following content:**

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_actual_api_key_here

# Development Configuration
VITE_APP_NAME=TT-Pro
VITE_DEV_MODE=true
```

**⚠️ Important Security Notes:**
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- Do not share your API key publicly

### Step 4: Verify Installation

```bash
# Check if all dependencies are installed
npm list --depth=0

# You should see:
# TT-Pro@0.0.0
# ├── @google/genai@1.30.0
# ├── lucide-react@0.555.0
# ├── react@19.2.0
# ├── react-dom@19.2.0
# ├── recharts@3.5.1
# └── ... (dev dependencies)
```

### Step 5: Start Development Server

```bash
# Start Vite development server
npm run dev
```

**Expected output:**
```
  VITE v6.2.0  ready in 542 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### Step 6: Open in Browser

Open your browser and navigate to: http://localhost:5173

You should see the TT-Pro application with:
- Navigation bar with Fitness, Aero, Strategy, and Docs tabs
- Fitness view showing training data (default view)
- No console errors

---

## Configuration

### Build Configuration

**File: `vite.config.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true, // Auto-open browser
    host: true, // Expose to network
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'charts': ['recharts'],
        },
      },
    },
  },
});
```

### TypeScript Configuration

**File: `tsconfig.json`**

Default configuration is already optimized. Key settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## Development Workflow

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type check without building
npx tsc --noEmit

# Format code (if prettier is configured)
npm run format
```

### Development Server Features

- **Hot Module Replacement (HMR)**: Changes reflect instantly
- **Fast Refresh**: React components update without losing state
- **Error Overlay**: Build and runtime errors shown in browser
- **Port**: Default 5173 (configurable in vite.config.ts)

### Project Structure

```
TT-Pro/
├── docs/                   # Documentation files
│   ├── architecture.md
│   ├── api-design.md
│   ├── database-schema.md
│   └── setup-guide.md
├── components/             # React components
│   ├── Layout.tsx
│   ├── FitnessView.tsx
│   ├── AeroView.tsx
│   ├── StrategyView.tsx
│   └── DocumentationView.tsx
├── services/               # Business logic
│   └── geminiService.ts
├── App.tsx                 # Root component
├── index.tsx               # Entry point
├── types.ts                # TypeScript types
├── constants.ts            # Constants & mock data
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
├── .gitignore             # Git ignore rules
└── .env.local             # Environment variables (create this)
```

### Making Changes

1. **Edit Files**: Make changes to `.tsx` or `.ts` files
2. **Auto Reload**: Browser automatically updates
3. **Check Console**: Monitor browser console for errors
4. **Test Features**: Manually test affected functionality

---

## Troubleshooting

### Common Issues

#### Issue 1: Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Kill process using port 5173
# On macOS/Linux:
lsof -ti:5173 | xargs kill -9

# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npm run dev -- --port 3000
```

#### Issue 2: Module Not Found

**Error**: `Cannot find module 'react'` or similar

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm cache clean
npm cache clean --force
npm install
```

#### Issue 3: Gemini API Errors

**Error**: `API_KEY not found` or `Failed to generate advice`

**Solution**:
1. Verify `.env.local` exists and contains `GEMINI_API_KEY`
2. Check API key is valid in Google AI Studio
3. Ensure no extra spaces in `.env.local`
4. Restart development server after adding `.env.local`

```bash
# Restart server
# Stop with Ctrl+C, then:
npm run dev
```

#### Issue 4: TypeScript Errors

**Error**: Type errors during development

**Solution**:
```bash
# Run type check
npx tsc --noEmit

# Check for missing type definitions
npm install --save-dev @types/node
```

#### Issue 5: Build Failures

**Error**: Build fails with Vite errors

**Solution**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### Debug Mode

Enable verbose logging:

```bash
# Run with debug output
DEBUG=vite:* npm run dev

# Check for dependency issues
npm ls
```

---

## IDE Setup

### Visual Studio Code

#### Recommended Extensions

Install these extensions for the best development experience:

1. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
2. **Prettier - Code formatter** (esbenp.prettier-vscode)
3. **ESLint** (dbaeumer.vscode-eslint)
4. **TypeScript Error Translator** (mattpocock.ts-error-translator)
5. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
6. **Path Intellisense** (christian-kohler.path-intellisense)

#### Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "files.exclude": {
    "**/.git": true,
    "**/node_modules": true,
    "**/dist": true
  }
}
```

#### Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### WebStorm / IntelliJ IDEA

1. Open project folder
2. WebStorm auto-detects Node.js and npm
3. Right-click `package.json` → Show npm Scripts
4. Double-click `dev` to start development server

---

## Testing Setup

### Manual Testing Checklist

Before committing changes:

- [ ] Application starts without errors
- [ ] All views (Fitness, Aero, Strategy, Docs) load correctly
- [ ] Navigation between views works
- [ ] No console errors in browser DevTools
- [ ] Charts render correctly in Fitness view
- [ ] Video upload works in Aero view
- [ ] AI strategy generation works (requires API key)
- [ ] TypeScript compilation passes (`npx tsc --noEmit`)

### Browser Testing

Test in multiple browsers:
- Chrome/Edge (primary)
- Firefox
- Safari (if on macOS)

### Performance Testing

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Open browser to http://localhost:4173
# Check network tab for asset sizes and load times
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GEMINI_API_KEY` | Yes | None | Google Gemini API key for AI features |
| `VITE_APP_NAME` | No | TT-Pro | Application name |
| `VITE_DEV_MODE` | No | false | Enable development mode features |

**Note**: Vite exposes environment variables prefixed with `VITE_` to the client.

---

## Next Steps

After setup is complete:

1. **Explore the Code**: Start with `App.tsx` and understand component hierarchy
2. **Read Documentation**: Review `/docs` folder for architecture and design
3. **Make Changes**: Try modifying a component and see hot reload in action
4. **Review Constants**: Check `constants.ts` for mock data structure
5. **Understand Services**: Look at `services/geminiService.ts` for AI integration

---

## Getting Help

### Resources

- **Project Repository**: https://github.com/RytTnk/TT-Pro
- **React Documentation**: https://react.dev
- **Vite Documentation**: https://vitejs.dev
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Google Gemini API**: https://ai.google.dev

### Support Channels

- Open an issue on GitHub for bugs
- Check existing issues for known problems
- Review documentation in `/docs` folder

---

## Appendix

### Quick Reference Commands

```bash
# Installation
git clone https://github.com/RytTnk/TT-Pro.git
cd TT-Pro
npm install

# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Utilities
npx tsc --noEmit        # Type check
npm list --depth=0      # List dependencies
npm outdated            # Check for updates
npm update              # Update dependencies

# Cleanup
rm -rf node_modules     # Remove dependencies
rm -rf dist             # Remove build output
npm cache clean --force # Clear npm cache
```

### File Size Reference

| File/Folder | Size (approx) |
|-------------|---------------|
| `node_modules/` | ~200 MB |
| `dist/` (built) | ~500 KB |
| Source files | ~100 KB |
| Total project | ~200 MB |

---

**Last Updated**: 2026-01-08  
**Document Version**: 1.0.0  
**Maintainer**: Development Team
