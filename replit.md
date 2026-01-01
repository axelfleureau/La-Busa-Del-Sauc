# La Busa del Sauc

## Overview
A Next.js 15 web application with React 19, Tailwind CSS 4, and Framer Motion for animations.

## Project Architecture
- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS 4, Radix UI components
- **Animations**: Framer Motion
- **Language**: TypeScript

## Directory Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - React components including UI primitives
- `lib/` - Utility functions
- `public/` - Static assets
- `styles/` - Global CSS styles

## Development
- **Dev Server**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Start**: `npm start`

## Configuration
- The dev server binds to `0.0.0.0:5000` for Replit compatibility
- `allowedDevOrigins: ['*']` is set in next.config.mjs for proxy support
