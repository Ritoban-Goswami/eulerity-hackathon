import { useState, useEffect } from "react";
import type { Pet } from "../types/pet";

interface UsePetDataReturn {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  isEmpty: boolean;
  refetch: () => void;
}

export const usePetData = (): UsePetDataReturn => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        // Store original high-quality URL for detail page (4/3 aspect ratio)
        originalUrl: pet.url.replace(
          "format=tiny",
          "auto=compress&cs=tinysrgb&w=1200&h=900&fit=crop",
        ),
      }));

      setPets(petsWithIds);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch pets";
      setError(errorMessage);
      console.error("Error fetching pets:", err);
    } finally {
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
    refetch: fetchPets,
  };
};
