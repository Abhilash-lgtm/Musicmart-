/**
 * YouTube Utility for Music-Mart
 * Handles extracting video IDs and generating responsive embed URLs
 * according to musical instrument types and categories.
 */

// High-quality official sound demo videos per category
export const CATEGORY_FALLBACK_VIDEOS = {
  guitars: 'Nff_DmsC_gE',    // Fender American Ultra Stratocaster Showcase
  keyboards: 'W0q0n9WwU3w',  // Nord Stage 4 Keyboard Performance
  drums: 'p4f_L0k9J2I',      // Roland V-Drums TD-27KV2 Kit Demo
  audio: 'p7W2tqO9nC0',      // Shure SM7B Studio Vocal Mic Showcase
  wind: 'K1pW-u6j8R4',       // Yamaha YAS-62 Saxophone Performance
  default: 'Nff_DmsC_gE',
};

/**
 * Extracts YouTube 11-character video ID from diverse URL formats or plain ID:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * - Raw 11-char ID: VIDEO_ID
 */
export const extractYoutubeId = (urlOrId) => {
  if (!urlOrId || typeof urlOrId !== 'string') return null;
  const trimmed = urlOrId.trim();

  // If already an 11-character YouTube video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex pattern matching standard watch?v=, youtu.be, embed, and shorts
  const regExp = /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regExp);
  return match ? match[1] : null;
};

/**
 * Returns a privacy-enhanced YouTube embed URL for iframe
 */
export const getYoutubeEmbedUrl = (urlOrId, category = 'guitars') => {
  const videoId = extractYoutubeId(urlOrId) || CATEGORY_FALLBACK_VIDEOS[category] || CATEGORY_FALLBACK_VIDEOS.default;
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1`;
};

/**
 * Returns direct YouTube watch URL for external viewing
 */
export const getYoutubeWatchUrl = (urlOrId, category = 'guitars') => {
  const videoId = extractYoutubeId(urlOrId) || CATEGORY_FALLBACK_VIDEOS[category] || CATEGORY_FALLBACK_VIDEOS.default;
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export default {
  CATEGORY_FALLBACK_VIDEOS,
  extractYoutubeId,
  getYoutubeEmbedUrl,
  getYoutubeWatchUrl,
};
