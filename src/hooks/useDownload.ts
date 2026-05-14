import { useState } from 'react';
import { downloadSelectedImages } from '../utils/download';
import type { Pet } from '../types/pet';

/**
 * Hook for handling bulk image downloads with loading state
 */
export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (pets: Pet[]) => {
    if (pets.length === 0) return;
    setIsDownloading(true);
    try {
      await downloadSelectedImages(pets);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { isDownloading, handleDownload };
};
