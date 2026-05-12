// Design System Constants for Pet Gallery
// Based on DESIGN.md specifications - High-Tech Sanctuary aesthetic

// Colors
export const colors = {
  // Primary (Blue)
  primary: "#0052d2",
  onPrimary: "#ffffff",
  primaryContainer: "#206afb",
  onPrimaryContainer: "#fefcff",
  primaryFixed: "#dbe1ff",
  primaryFixedDim: "#b3c5ff",
  onPrimaryFixed: "#001849",
  onPrimaryFixedVariant: "#003fa5",
  inversePrimary: "#b3c5ff",
  surfaceTint: "#0054d7",

  // Secondary (Purple)
  secondary: "#5f44c6",
  onSecondary: "#ffffff",
  secondaryContainer: "#785fe1",
  onSecondaryContainer: "#fffbff",
  secondaryFixed: "#e6deff",
  secondaryFixedDim: "#cabeff",
  onSecondaryFixed: "#1c0062",
  onSecondaryFixedVariant: "#492ab0",

  // Tertiary (Green)
  tertiary: "#006a44",
  onTertiary: "#ffffff",
  tertiaryContainer: "#008557",
  onTertiaryContainer: "#f6fff6",
  tertiaryFixed: "#54feb3",
  tertiaryFixedDim: "#28e199",
  onTertiaryFixed: "#002112",
  onTertiaryFixedVariant: "#005234",

  // Error
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",

  // Surface
  surface: "#faf8ff",
  onSurface: "#081a3c",
  surfaceVariant: "#d9e2ff",
  onSurfaceVariant: "#424655",
  surfaceDim: "#cdd9ff",
  surfaceBright: "#faf8ff",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f2f3ff",
  surfaceContainer: "#e9edff",
  surfaceContainerHigh: "#e1e8ff",
  surfaceContainerHighest: "#d9e2ff",
  surfaceContainerHover: "#e1e8ff",
  background: "#faf8ff",
  onBackground: "#081a3c",
  outline: "#737687",
  outlineVariant: "#c2c6d8",

  // Inverse
  inverseSurface: "#203052",
  inverseOnSurface: "#edf0ff",
} as const;

// Typography
export const typography = {
  display: {
    fontSize: "48px",
    fontWeight: "800",
    lineHeight: "1.17",
    letterSpacing: "-0.02em",
    fontFamily: "Manrope, sans-serif",
  },
  headline: {
    large: {
      fontSize: "32px",
      fontWeight: "700",
      lineHeight: "1.25",
      letterSpacing: "-0.01em",
      fontFamily: "Manrope, sans-serif",
    },
    largeMobile: {
      fontSize: "28px",
      fontWeight: "700",
      lineHeight: "1.29",
      fontFamily: "Manrope, sans-serif",
    },
    medium: {
      fontSize: "24px",
      fontWeight: "600",
      lineHeight: "1.33",
      fontFamily: "Manrope, sans-serif",
    },
  },
  body: {
    large: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.56",
      fontFamily: "Manrope, sans-serif",
    },
    medium: {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
      fontFamily: "Manrope, sans-serif",
    },
    small: {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.43",
      fontFamily: "Manrope, sans-serif",
    },
  },
  label: {
    medium: {
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1.43",
      letterSpacing: "0.05em",
      fontFamily: "Manrope, sans-serif",
    },
    small: {
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "1.33",
      fontFamily: "Manrope, sans-serif",
    },
  },
} as const;

// Spacing
export const spacing = {
  xs: "4px",
  base: "8px",
  sm: "12px",
  md: "24px",
  lg: "48px",
  xl: "80px",
  gutter: "24px",
  marginMobile: "16px",
  marginDesktop: "40px",
  sectionGap: "80px",
  containerMax: "1280px",
} as const;

// Border Radius
export const borderRadius = {
  sm: "0.25rem", // 4px
  DEFAULT: "0.5rem", // 8px
  md: "0.75rem", // 12px
  lg: "1rem", // 16px
  xl: "1.5rem", // 24px
  full: "9999px",
} as const;

// Elevation (Glassmorphism & Tonal Layering)
export const elevation = {
  level0: "none",
  level1:
    "0 4px 24px -4px rgba(8, 26, 60, 0.04), 0 2px 8px -2px rgba(8, 26, 60, 0.02)", // Cards/Sections: subtle border + faint shadow
  level2: "0 20px 48px -12px rgba(8, 26, 60, 0.12)", // Hover states
  level3: "0 32px 64px -12px rgba(8, 26, 60, 0.5)", // Modals/overlays
} as const;

// Gradients
export const gradients = {
  primary: "linear-gradient(135deg, #0052d2 0%, #206afb 100%)",
  secondary: "linear-gradient(135deg, #5f44c6 0%, #785fe1 100%)",
} as const;

// Glassmorphism
export const glass = {
  panel: "rgba(255, 255, 255, 0.8)",
  selection: "rgba(32, 48, 82, 0.9)",
  blur: "12px",
  blurHeavy: "16px",
} as const;

// Patterns
export const patterns = {
  dotGrid: "radial-gradient(#cdd9ff 1px, transparent 1px)",
} as const;

// Breakpoints
export const breakpoints = {
  mobile: "768px",
  tablet: "1024px",
  desktop: "1280px",
} as const;

// Z-Index
export const zIndex = {
  base: 0,
  overlay: 50,
  sticky: 60,
  modal: 70,
} as const;

// Transitions
export const transitions = {
  default: "all 0.2s ease-in-out",
  hover: "all 0.3s ease-in-out",
  imageZoom: "transform 0.5s ease-in-out",
  fadeIn: "opacity 0.3s ease-in-out",
  slideUp: "transform 0.3s ease-in-out",
} as const;

// Aspect Ratios
export const aspectRatios = {
  petCard: "3/4",
  square: "1/1",
} as const;
