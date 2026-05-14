import type { ColorSignature, Pet } from "../types/pet";
import {
  getDominantColor,
  getColorPalette,
  getQuantizedColors,
} from "quantize-colors";

/**
 * Analyzes an image URL to extract color signature using quantize-colors package
 * @param imageUrl - URL of the image to analyze
 * @returns Color signature with dominant color, palette, and quantized colors
 */
export const analyzeImageColors = async (
  imageUrl: string,
): Promise<ColorSignature> => {
  try {
    // Use the quantize-colors package to extract color information
    const [dominantColor, colorPalette, quantizedColors] = await Promise.all([
      getDominantColor(imageUrl),
      getColorPalette(imageUrl),
      getQuantizedColors(imageUrl),
    ]);

    console.log("Color analysis result:", {
      dominantColor,
      colorPalette,
      quantizedColors,
    });

    // Convert RGBColor[] to hex strings for quantizedColors
    const rgbToHex = (rgb: { r: number; g: number; b: number }): string => {
      const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0");
      return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
    };

    return {
      dominantColor: dominantColor,
      palette: colorPalette || [],
      quantizedColors: (quantizedColors || []).map(rgbToHex),
    };
  } catch (error) {
    console.error("Failed to analyze image colors:", error);
    // Return fallback values if analysis fails
    return {
      dominantColor: "#808080",
      palette: ["#808080"],
      quantizedColors: ["#808080"],
    };
  }
};

/**
 * Converts hex color to RGB for comparison
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 128, g: 128, b: 128 };
};

/**
 * Calculates Euclidean distance between two RGB colors
 */
const colorDistance = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2),
  );
};

/**
 * Calculates similarity score between two color signatures
 * Returns a value between 0 (identical) and 1 (completely different)
 */
export const calculateColorSimilarity = (
  signature1: ColorSignature,
  signature2: ColorSignature,
): number => {
  // Compare dominant colors (weighted 40%)
  const dominantDistance = colorDistance(
    signature1.dominantColor,
    signature2.dominantColor,
  );
  const dominantScore = Math.min(dominantDistance / 442, 1); // 442 is max distance (sqrt(255^2 * 3))

  // Compare palettes (weighted 60%)
  let paletteScore = 0;
  const maxPaletteComparisons = Math.min(
    signature1.palette.length,
    signature2.palette.length,
  );

  if (maxPaletteComparisons > 0) {
    let totalDistance = 0;
    for (let i = 0; i < maxPaletteComparisons; i++) {
      totalDistance += colorDistance(
        signature1.palette[i],
        signature2.palette[i],
      );
    }
    paletteScore = Math.min(totalDistance / (maxPaletteComparisons * 442), 1);
  }

  // Weighted average
  return dominantScore * 0.4 + paletteScore * 0.6;
};

/**
 * Finds similar pets based on color similarity
 * @param targetPet - The pet to find similar pets for
 * @param allPets - All pets to search through
 * @param limit - Maximum number of similar pets to return
 * @param threshold - Maximum similarity score (0-1, lower is more similar)
 * @returns Array of similar pets sorted by similarity
 */
export const findSimilarPets = (
  targetPet: Pet,
  allPets: Pet[],
  limit: number = 6,
  threshold: number = 0.3,
): Array<{ pet: Pet; similarity: number }> => {
  if (!targetPet.colorSignature) {
    return [];
  }

  const similarities = allPets
    .filter((pet) => pet.id !== targetPet.id && pet.colorSignature)
    .map((pet) => ({
      pet,
      similarity: calculateColorSimilarity(
        targetPet.colorSignature!,
        pet.colorSignature!,
      ),
    }))
    .filter(({ similarity }) => similarity <= threshold)
    .sort((a, b) => a.similarity - b.similarity)
    .slice(0, limit);

  return similarities;
};

/**
 * Caches color analysis results in localStorage
 */
export const cacheColorSignature = (
  petId: string,
  signature: ColorSignature,
): void => {
  try {
    const cache = JSON.parse(localStorage.getItem("colorSignatures") || "{}");
    cache[petId] = signature;
    localStorage.setItem("colorSignatures", JSON.stringify(cache));
  } catch (error) {
    console.error("Failed to cache color signature:", error);
  }
};

/**
 * Retrieves cached color signature from localStorage
 */
export const getCachedColorSignature = (
  petId: string,
): ColorSignature | null => {
  try {
    const cache = JSON.parse(localStorage.getItem("colorSignatures") || "{}");
    return cache[petId] || null;
  } catch (error) {
    console.error("Failed to retrieve cached color signature:", error);
    return null;
  }
};

/**
 * Determines color category based on dominant color
 */
export const getColorCategory = (dominantColor: string): string => {
  const rgb = hexToRgb(dominantColor);
  const { r, g, b } = rgb;

  // Calculate hue and saturation
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Low saturation = grayscale/neutral
  if (delta < 30) {
    if (max > 200) return "Bright";
    if (max < 80) return "Dark";
    return "Neutral";
  }

  // Determine hue
  let hue = 0;
  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
  }

  // Categorize by hue
  if (hue >= 330 || hue < 15) return "Red";
  if (hue >= 15 && hue < 45) return "Orange";
  if (hue >= 45 && hue < 70) return "Yellow";
  if (hue >= 70 && hue < 150) return "Green";
  if (hue >= 150 && hue < 200) return "Cyan";
  if (hue >= 200 && hue < 270) return "Blue";
  if (hue >= 270 && hue < 300) return "Purple";
  if (hue >= 300 && hue < 330) return "Pink";

  return "Neutral";
};

/**
 * Groups pets by color category
 */
export const groupPetsByColor = (pets: Pet[]): Record<string, Pet[]> => {
  const groups: Record<string, Pet[]> = {};

  pets.forEach((pet) => {
    if (pet.colorSignature) {
      const category = getColorCategory(pet.colorSignature.dominantColor);
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(pet);
    } else {
      // Pets without color signature go to Neutral collection
      if (!groups["Neutral"]) {
        groups["Neutral"] = [];
      }
      groups["Neutral"].push(pet);
    }
  });

  return groups;
};
