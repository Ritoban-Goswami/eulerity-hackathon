# Loom Recording Outline - Eulerity Hackathon Project

**Target Duration:** 5 minutes
**Purpose:** Walk through code and explain key decisions

---

## Introduction (30 seconds)

**Opening:**
"Hi, I'm Ritoban Goswami. Today I'll walk you through my Eulerity hackathon project - PawShots, a modern pet image gallery built with React and TypeScript."

**High-level overview:**
- Responsive pet image gallery with advanced features
- All core requirements implemented plus bonus features
- Focus on performance, UX, and code quality

---

## Project Structure & Architecture (45 seconds)

**Show folder structure:**
```
src/
├── components/     # Reusable UI components
├── contexts/       # Global state management
├── hooks/          # Custom React hooks
├── pages/          # Route components
├── theme/          # Design system
├── types/          # TypeScript types
└── utils/          # Utility functions
```

**Key architectural decisions:**
- **Custom hooks pattern** - Separated data fetching (usePetData) from UI logic
- **Context API** - SelectionContext and FavoritesContext for global state
- **Centralized theme system** - Consistent design tokens across components
- **Utility-first approach** - Reusable functions for filtering, sorting, analysis

---

## Core Features Walkthrough (1 minute)

**1. Data Fetching (usePetData.ts)**
- Custom hook with loading, error, and empty states
- Fetches from `/pets` endpoint
- Adds IDs and optimized image URLs
- Background color analysis with batch processing

**2. Selection System (SelectionContext.tsx)**
- useReducer for complex state management
- localStorage persistence with debounced writes
- File size estimation using HEAD requests
- Select all/clear functionality

**3. Gallery Grid (GalleryGrid.tsx)**
- Responsive breakpoints: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
- React.memo for performance optimization
- Loading skeleton and error states

---

## Key Technical Decisions (1 minute)

**1. Performance Optimizations**
- `useMemo` for filtered/sorted data
- `useCallback` for event handlers
- Debounced search input (300ms)
- Image URL optimization (different sizes for gallery vs detail)
- Lazy color analysis in batches

**2. State Management**
- Context API for global state (selection, favorites)
- localStorage persistence for user preferences
- Separate contexts to keep concerns isolated

**3. Styling Approach**
- styled-components for dynamic styling
- Material Design 3 inspired color system
- Comprehensive typography scale
- Elevation system for depth

**4. Routing**
- react-router-dom with dynamic routes
- `/pet/:id` for detail pages
- Additional pages: About, Favorites, VisualCollections
- ScrollToTop for better navigation UX

---

## Bonus Features (45 seconds)

**1. AI-Powered Color Analysis**
- quantize-colors library for palette extraction
- 6 color categories for visual collections
- Cached signatures in localStorage
- Background processing to avoid blocking UI

**2. Infinite Scroll**
- Intersection Observer API
- 12 items per page
- Loading spinner animation
- Smoother UX than pagination

**3. Advanced Search**
- Real-time filtering by title/description
- Recent searches with localStorage
- Debounced input for performance

**4. Download System**
- Individual image download
- Batch download as ZIP using JSZip
- File size estimation
- Progress tracking

**5. Favorites System**
- Separate Context for favorites
- Persistent storage
- Heart animation

---

## Design System (30 seconds)

**Show theme/index.ts:**
- Color palette (primary, secondary, surface, error)
- Typography scale (display, headline, body, label)
- Spacing system (xs, sm, md, lg, xl)
- Breakpoints (mobile, tablet, desktop)
- Border radius, elevation, transitions

**Design philosophy:**
- Modern, premium aesthetic
- Material Design 3 inspiration
- Sophisticated companion brand identity
- Focus on accessibility and contrast

---

## Conclusion (30 seconds)

**Summary of achievements:**
- ✅ All core requirements met
- ✅ Responsive design (1/2/4 columns)
- ✅ Custom hooks for data management
- ✅ Global state with persistence
- ✅ Dynamic routing with detail pages
- ✅ Infinite scroll implementation
- ✅ Advanced search and sorting
- ✅ Premium UI with design system
- ✅ Bonus: Color analysis, favorites, share

**Technical highlights:**
- Performance optimized with React hooks
- Clean architecture with separation of concerns
- Comprehensive error handling
- Accessible and responsive design
- ~2000+ lines of production-ready code

**Closing:**
"Thank you for reviewing my project. I'm excited about the opportunity to join the Eulerity team and contribute to building amazing products."

---

## Recording Tips

**Screen setup:**
- Split screen: Code editor on left, browser preview on right
- Start with live demo showing key features
- Switch to code for technical explanations
- Use cursor to highlight specific code sections

**Pacing:**
- Speak clearly and at moderate pace
- Don't rush through code explanations
- Focus on "why" decisions were made, not just "what"
- Keep technical explanations concise

**Key points to emphasize:**
- Performance considerations
- User experience improvements
- Code organization and maintainability
- Problem-solving approach
- Attention to detail

**Files to highlight:**
- App.tsx - Routing structure
- usePetData.ts - Custom hook pattern
- SelectionContext.tsx - State management
- GalleryGrid.tsx - Responsive design
- theme/index.ts - Design system
- Home.tsx - Feature integration
