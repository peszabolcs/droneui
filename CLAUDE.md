# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite and HMR
- `npm run build` - Build for production (runs TypeScript compilation then Vite build)
- `npm run lint` - Run ESLint on the codebase
- `npm run preview` - Preview production build locally

## Architecture

This is a React + TypeScript + Vite Progressive Web App (PWA) for FlightCore Dynamic Solutions, an autonomous drone aircraft inspection platform.

### Key Structure
- **Entry Point**: `src/main.tsx` - React app root with StrictMode
- **Main Component**: `src/App.tsx` - Handles login/dashboard state management
- **Components**: `src/components/` - All UI components for the application
- **Build Tool**: Vite with React plugin and PWA support
- **Styling**: CSS modules with glassmorphism effects and dark theme

### Core Components
- `LoginScreen` - Admin authentication interface
- `Dashboard` - Main application layout with sidebar navigation
- `DroneDashboard` - Live drone status monitoring
- `EmergencyOverride` - Manual drone controls with joystick interface
- `InspectionHistory` - Historical inspection data with list/gallery views
- `AircraftSelector` - Aircraft type selection with inspection routing
- `GeofencingConfig` - Interactive safety zone configuration with SVG diagrams
- `NotificationFeed` - Real-time alerts and system notifications

### PWA Configuration
- Configured with vite-plugin-pwa for offline support
- Optimized for tablet landscape and desktop viewing
- Service worker with Workbox for caching strategies
- Web app manifest configured for installation

### Design System
- **Colors**: Neon blue (#00bfff), purple (#8a2be2) gradients on dark backgrounds
- **Theme**: Futuristic SpaceX-style command center aesthetic
- **Typography**: Inter font family for modern sans-serif appearance
- **Effects**: Glassmorphism panels, subtle glow animations, smooth transitions
- **Responsive**: Grid-based layout optimized for tablet and desktop (not phone)

### Mock Data
All components use realistic mock data for demonstration purposes. No backend integration is implemented - this is a frontend-only application showcasing the complete UI/UX for the FlightCore Dynamic Solutions platform.

### TypeScript Configuration
- Uses project references with `tsconfig.app.json` and `tsconfig.node.json`
- Configured for React 19 with strict type checking
- All components are fully typed with proper interfaces

### ESLint Configuration
- Modern flat config format using `typescript-eslint`
- Includes React Hooks rules and React Refresh for Vite
- Configured for TypeScript files (`**/*.{ts,tsx}`)
- Ignores `dist` directory

### Development Notes
- Application starts with login screen (any credentials work)
- Multiple drone switching via sidebar dropdown
- All interactive elements have hover/focus states
- Responsive design breakpoints at 768px and 1024px
- PWA ready for installation on supported devices