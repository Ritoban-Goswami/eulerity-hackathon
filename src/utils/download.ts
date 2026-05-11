import type { Pet } from '../types/pet';

export const downloadImage = async (url: string, filename: string): Promise<void> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Failed to download image:', error);
    throw error;
  }
};

export const downloadSelectedImages = async (pets: Pet[]): Promise<void> => {
  const downloadPromises = pets.map(async (pet, index) => {
    const filename = `${pet.title.replace(/[^a-z0-9]/gi, '_')}_${index}.jpg`;
    await downloadImage(pet.url, filename);
  });

  try {
    await Promise.all(downloadPromises);
  } catch (error) {
    console.error('Some downloads failed:', error);
    throw error;
  }
};
