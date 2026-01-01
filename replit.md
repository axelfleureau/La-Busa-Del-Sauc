# La Busa del Sauc

## Overview
A Next.js 15 web application with React 19, Tailwind CSS 4, and Framer Motion for animations. Restaurant website for "La Busa del Sauc".

## Project Architecture
- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS 4, Radix UI components
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Multi-language**: 7 languages (IT, EN, DE, BS, RU, CZ, AL)

## Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components including UI primitives
- `lib/` - Utility functions
- `public/` - Static assets (including menu.pdf)
- `styles/` - Global CSS styles

## Menu
- **Current Menu**: Menu Inverno 2026
- **PDF**: `/menu.pdf` in public folder
- **Menu Data**: Defined in `app/page.tsx` (menuItems object)
- **Translations**: Defined in `components/language-provider.tsx`

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start**: `npm start`

## Configuration
- The dev server binds to `0.0.0.0:5000` for Replit compatibility
- `allowedDevOrigins` is set in next.config.mjs for Replit proxy support

## Recent Changes
- 2026-01-01: Updated menu section with Winter 2026 menu data
- 2026-01-01: Updated menu PDF buttons to link to /menu.pdf
- 2026-01-01: Added menu.pdf file to public folder
