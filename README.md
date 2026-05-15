# PawShots - Eulerity Take-Home Challenge

A modern, responsive pet image gallery built as a take-home challenge for Eulerity. This project demonstrates advanced React development skills with a focus on user experience, state management, and visual design.

## Project Overview

PawShots is a sophisticated web application that presents pet images in an interactive and visually compelling way. The application meets all core requirements while adding creative enhancements that demonstrate front-end development expertise.

## Live Demo

Check out the deployed application: [https://pawshots.netlify.app](https://pawshots.netlify.app)

## Implemented Requirements

### Core Features

- **Image Gallery Display**: Fetches pet data from `/pets` endpoint using fetch API and presents images with associated metadata (title, description, creation date)
- **Bulk Selection & Download**:
  - Select multiple images with visual feedback
  - Display selection count and estimated total file size
  - Select All and Clear Selection functionality
  - Download individual images or selected batches as ZIP files
- **Advanced Sorting**: Sort by Name (A-Z, Z-A) and Date (Newest First, Oldest First)
- **Search Functionality**: Real-time search bar filtering images by title or description with debounced input
- **Styled-Components**: Comprehensive UI built with styled-components and a custom design system
- **React Router**: Dynamic routing with detail views (`/pet/:id`), About page, and additional pages
- **Custom Data Hook**: `usePetData` hook with explicit handling of loading, error, and empty states
- **State Management**:
  - Context API for global state (SelectionContext, FavoritesContext)
  - Selection state persists across route navigation
- **Infinite Scroll**: Intersection Observer-based pagination for seamless browsing
- **Responsive Design**: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)

### Additional Creative Features

- **Visual Collections**: AI-powered color analysis using `quantize-colors` library to group pets by color categories
- **Favorites System**: Mark pets as favorites with localStorage persistence and dedicated favorites page
- **Recent Searches**: Search history with localStorage persistence and quick access
- **Share Functionality**: Web Share API integration for sharing search results
- **Premium UI/UX**: Sophisticated companion brand identity with Material Design-inspired components
- **Color Signature Caching**: Performance optimization for color analysis results
- **Pet Detail Pages**: Rich detail views with similar pet recommendations based on color similarity

## Technology Stack

### Frontend

- **React 19** - Latest React with improved performance and developer experience
- **TypeScript** - Type safety and enhanced development experience
- **Styled-Components** - CSS-in-JS solution with comprehensive design system
- **React Router 7** - Client-side routing with dynamic routes
- **Vite** - Lightning-fast build tool and dev server

### Libraries

- **JSZip** - Create ZIP files for batch downloads
- **quantize-colors** - AI-powered image color analysis and palette extraction
- **Material Symbols** - Modern icon system

### State Management

- **Context API** - Global state for selections and favorites
- **Custom Hooks** - Reusable logic for data fetching, downloads, and state management
- **LocalStorage** - Persistent storage for user preferences and cached data

## Project Structure

```
src/
├── components/
│   ├── Layout/
│   │   └── Navigation.tsx
│   ├── Button.tsx
│   ├── CustomDropdown.tsx
│   ├── EmptyState.tsx
│   ├── ErrorBoundary.tsx
│   ├── FavoriteButton.tsx
│   ├── GalleryGrid.tsx
│   ├── LoadingSkeleton.tsx
│   ├── PetCard.tsx
│   ├── SearchResults.tsx
│   └── SelectionControls.tsx
├── contexts/
│   ├── FavoritesContext.tsx
│   └── SelectionContext.tsx
├── hooks/
│   ├── useDownload.ts
│   ├── usePetData.ts
│   └── useSelection.ts
├── pages/
│   ├── About.tsx
│   ├── Favorites.tsx
│   ├── Home.tsx
│   ├── NotFound.tsx
│   ├── PetDetail.tsx
│   └── VisualCollections.tsx
├── utils/
│   ├── filterAndSort.ts
│   ├── imageAnalysis.ts
│   ├── localStorage.ts
│   └── share.ts
├── App.tsx
├── main.tsx
└── theme.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Key Implementation Details

### Custom Hook - usePetData

Handles all data fetching with explicit state management:

- `loading` - Shows loading skeleton during fetch
- `error` - Displays error message on fetch failure
- `pets` - Array of pet objects with color analysis
- `colorAnalysisLoading` - Separate loading state for color processing

### State Persistence

- Selection state uses Context API and persists across navigation
- Favorites stored in localStorage for session continuity
- Recent searches cached for quick access
- Color signatures cached to avoid redundant processing

### Color Analysis

The `quantize-colors` library extracts:

- Dominant color from each image
- Color palette for visual grouping
- Quantized colors for similarity matching

Pets are grouped into 13 color categories: Red, Orange, Yellow, Green, Cyan, Blue, Purple, Pink, Warm, Cool, Bright, Dark, and Neutral.

### Responsive Grid

Uses CSS Grid with media queries:

- Mobile (< 768px): 1 column
- Tablet (768px - 1023px): 2 columns
- Desktop (≥ 1024px): 4 columns

## API Endpoint

The application expects a `/pets` endpoint returning:

```json
[
  {
    "id": "string",
    "url": "string",
    "title": "string",
    "description": "string",
    "created_date": "string"
  }
]
```

## Browser Support

- Modern browsers with ES6+ support
- Web Share API (for share functionality - gracefully degrades on unsupported browsers)
- Intersection Observer API (for infinite scroll)

## Design Philosophy

This project embraces a sophisticated companion brand identity with:

- Clean lines and minimal aesthetic
- Premium feel with thoughtful micro-interactions
- Material Design-inspired components
- Accessibility-first approach
- Performance optimizations (caching, lazy loading, debouncing)
- Visual hierarchy and clear information architecture
