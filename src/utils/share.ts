/**
 * Shares content using the Web Share API with clipboard fallback
 * @param options - Share options including title, text, and optional URL
 */
export const shareContent = async (options: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<void> => {
  const shareUrl = options.url || window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title: options.title || 'PawShots',
        text: options.text || '',
        url: shareUrl
      });
    } catch {
      // Error sharing - fallback to clipboard copy
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  } else {
    // Fallback - copy to clipboard
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  }
};
