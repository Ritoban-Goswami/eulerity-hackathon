import { useState, useEffect } from "react";
import type { Pet } from "../types/pet";
import {
  analyzeImageColors,
  cacheColorSignature,
  getCachedColorSignature,
} from "../utils/imageAnalysis";

interface UsePetDataReturn {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  colorAnalysisLoading: boolean;
  refetch: () => void;
}

export const usePetData = (): UsePetDataReturn => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [colorAnalysisLoading, setColorAnalysisLoading] =
    useState<boolean>(false);

  const fetchPets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://eulerity-hackathon.appspot.com/pets",
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Pet[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format: expected array");
      }

      // Add IDs to pets since API doesn't provide them
      const petsWithIds = data.map((pet, index) => ({
        ...pet,
        id: pet.title.toLowerCase().replace(/\s+/g, "-") + "-" + index,
        // Use smaller image size for gallery (4/5 aspect ratio to match cards)
        url: pet.url.replace(
          "format=tiny",
          "auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
        ),
        // Store original high-quality URL for detail page (no fit constraint)
        originalUrl: pet.url.replace(
          "format=tiny",
          "auto=compress&cs=tinysrgb&w=1200",
        ),
      }));

      setPets(petsWithIds);
      setLoading(false); // Set loading to false immediately so UI renders

      // Analyze colors for each pet in batches after initial load (doesn't block UI)
      const analyzeColorsInBackground = async () => {
        setColorAnalysisLoading(true);

        const batchSize = 5;
        const batchDelay = 500; // 500ms between batches

        for (let i = 0; i < petsWithIds.length; i += batchSize) {
          const batch = petsWithIds.slice(i, i + batchSize);

          await Promise.all(
            batch.map(async (pet) => {
              // Check cache first
              const cached = getCachedColorSignature(pet.id);
              if (cached) {
                setPets((prev) =>
                  prev.map((p) =>
                    p.id === pet.id ? { ...p, colorSignature: cached } : p,
                  ),
                );
              } else {
                // Analyze and cache
                try {
                  const signature = await analyzeImageColors(pet.url);
                  cacheColorSignature(pet.id, signature);
                  setPets((prev) =>
                    prev.map((p) =>
                      p.id === pet.id ? { ...p, colorSignature: signature } : p,
                    ),
                  );
                } catch (error) {
                  console.error(
                    `Failed to analyze colors for ${pet.id}:`,
                    error,
                  );
                }
              }
            }),
          );

          // Add delay between batches (except for the last batch)
          if (i + batchSize < petsWithIds.length) {
            await new Promise((resolve) => setTimeout(resolve, batchDelay));
          }
        }

        setColorAnalysisLoading(false);
      };

      // Start color analysis in background without awaiting
      analyzeColorsInBackground();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch pets";
      setError(errorMessage);
      console.error("Error fetching pets:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const isEmpty = !loading && !error && pets.length === 0;

  return {
    pets,
    loading,
    error,
    isEmpty,
    colorAnalysisLoading,
    refetch: fetchPets,
  };
};
