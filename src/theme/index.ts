// Design System Constants for Pet Gallery
// Based on DESIGN.md specifications

// Colors
export const colors = {
  // Primary (Teal)
  primary: "#006066",
  onPrimary: "#ffffff",
  primaryContainer: "#147a81",
  onPrimaryContainer: "#ccfbff",
  primaryFixed: "#9bf0f8",
  primaryFixedDim: "#7fd4db",
  onPrimaryFixed: "#002022",
  onPrimaryFixedVariant: "#004f54",
  inversePrimary: "#7fd4db",
  surfaceTint: "#00696f",

  // Secondary (Coral)
  secondary: "#a43b2c",
  onSecondary: "#ffffff",
  secondaryContainer: "#fd7d68",
  onSecondaryContainer: "#71160b",
  secondaryFixed: "#ffdad4",
  secondaryFixedDim: "#ffb4a7",
  onSecondaryFixed: "#400200",
  onSecondaryFixedVariant: "#842417",

  // Tertiary (Slate)
  tertiary: "#49576b",
  onTertiary: "#ffffff",
  tertiaryContainer: "#616f84",
  onTertiaryContainer: "#ecf2ff",
  tertiaryFixed: "#d5e3fc",
  tertiaryFixedDim: "#b9c7df",
  onTertiaryFixed: "#0d1c2e",
  onTertiaryFixedVariant: "#3a485b",

  // Error
  error: "#ba1a1a",
  onError: "#ffffff",
  errorContainer: "#ffdad6",
  onErrorContainer: "#93000a",

  // Surface
  surface: "#f7fafa",
  onSurface: "#181c1d",
  surfaceVariant: "#e0e3e3",
  onSurfaceVariant: "#3e494a",
  surfaceDim: "#d7dbdb",
  surfaceBright: "#f7fafa",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f1f4f4",
  surfaceContainer: "#ebeeee",
  surfaceContainerHigh: "#e5e9e9",
  surfaceContainerHighest: "#e0e3e3",
  surfaceContainerHover: "#e5e9e9",
  background: "#f7fafa",
  onBackground: "#181c1d",
  outline: "#6e797a",
  outlineVariant: "#bdc9c9",

  // Inverse
  inverseSurface: "#2d3131",
  inverseOnSurface: "#eef1f1",
} as const;

// Typography
export const typography = {
  display: {
    fontSize: "48px",
    fontWeight: "700",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
    fontFamily: "Plus Jakarta Sans, sans-serif",
  },
  headline: {
    large: {
      fontSize: "32px",
      fontWeight: "600",
      lineHeight: "1.2",
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    largeMobile: {
      fontSize: "28px",
      fontWeight: "600",
      lineHeight: "1.2",
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
    medium: {
      fontSize: "24px",
      fontWeight: "600",
      lineHeight: "1.3",
      fontFamily: "Plus Jakarta Sans, sans-serif",
    },
  },
  body: {
    large: {
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.6",
      fontFamily: "Inter, sans-serif",
    },
    medium: {
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
      fontFamily: "Inter, sans-serif",
    },
    small: {
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.4",
      fontFamily: "Inter, sans-serif",
    },
  },
  label: {
    medium: {
      fontSize: "14px",
      fontWeight: "500",
      lineHeight: "1.4",
      letterSpacing: "0.01em",
      fontFamily: "Inter, sans-serif",
    },
    small: {
      fontSize: "12px",
      fontWeight: "600",
      lineHeight: "1.4",
      fontFamily: "Inter, sans-serif",
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

// Elevation (Shadows)
export const elevation = {
  level0: "none",
  level1: "0px 2px 8px rgba(71, 85, 105, 0.05)", // Standard cards and input fields
  level2: "0px 10px 20px rgba(71, 85, 105, 0.1)", // Hover states and dropdown menus
  level3: "0px 20px 40px rgba(71, 85, 105, 0.15)", // Modals and floating action buttons
} as const;

// Gradients
export const gradients = {
  tealGradient: "linear-gradient(135deg, #006066 0%, #147a81 100%)",
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
  petCard: "4/5",
  square: "1/1",
} as const;
