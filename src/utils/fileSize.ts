// Default estimated size for tiny format images (in bytes)
const DEFAULT_TINY_SIZE = 50 * 1024; // 50KB

// Cache for file sizes to avoid repeated requests
const fileSizeCache = new Map<string, number>();

/**
 * Fetches the file size of an image using a HEAD request.
 * Falls back to a default size if the request fails due to CORS or other issues.
 * @param url The image URL
 * @returns Promise<number> The file size in bytes
 */
export const fetchFileSize = async (url: string): Promise<number> => {
  // Check cache first
  if (fileSizeCache.has(url)) {
    return fileSizeCache.get(url)!;
  }

  try {
    const response = await fetch(url, { method: 'HEAD' });
    
    if (response.ok) {
      const contentLength = response.headers.get('content-length');
      if (contentLength) {
        const size = parseInt(contentLength, 10);
        fileSizeCache.set(url, size);
        return size;
      }
    }
  } catch (error) {
    // CORS or network error, fall back to default
    console.warn(`Failed to fetch file size for ${url}:`, error);
  }

  // Fallback to default size
  fileSizeCache.set(url, DEFAULT_TINY_SIZE);
  return DEFAULT_TINY_SIZE;
};

/**
 * Fetches file sizes for multiple images in parallel
 * @param urls Array of image URLs
 * @returns Promise<number[]> Array of file sizes in bytes
 */
export const fetchFileSizes = async (urls: string[]): Promise<number[]> => {
  const promises = urls.map(url => fetchFileSize(url));
  return Promise.all(promises);
};

/**
 * Formats bytes into a human-readable string
 * @param bytes Number of bytes
 * @returns Formatted string (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
};
