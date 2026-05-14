import type { Pet } from "../types/pet";
import JSZip from "jszip";

export const downloadImage = async (
  url: string,
  filename: string,
): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to download image:", error);
    throw error;
  }
};

/**
 * Downloads a single pet image with auto-generated filename
 */
export const downloadPetImage = async (pet: Pet): Promise<void> => {
  const filename = `${pet.title.replace(/[^a-z0-9]/gi, "_")}.jpg`;
  await downloadImage(pet.originalUrl || pet.url, filename);
};

export const downloadSelectedImages = async (pets: Pet[]): Promise<void> => {
  // If only one image, download directly without zip
  if (pets.length === 1) {
    const pet = pets[0];
    const filename = `${pet.title.replace(/[^a-z0-9]/gi, "_")}.jpg`;
    await downloadImage(pet.url, filename);
    return;
  }

  const zip = new JSZip();

  try {
    // Fetch all images and add them to the zip
    const promises = pets.map(async (pet, index) => {
      const response = await fetch(pet.url);
      const blob = await response.blob();
      const filename = `${pet.title.replace(/[^a-z0-9]/gi, "_")}_${index}.jpg`;
      zip.file(filename, blob);
    });

    await Promise.all(promises);

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = window.URL.createObjectURL(zipBlob);

    // Download the zip file
    const link = document.createElement("a");
    link.href = zipUrl;
    link.download = "pet_images.zip";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(zipUrl);
  } catch (error) {
    console.error("Failed to create zip file:", error);
    throw error;
  }
};
