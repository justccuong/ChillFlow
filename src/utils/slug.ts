/**
 * Unified URL Slug Utility with full Vietnamese diacritics transliteration.
 * Used consistently across Localhost Hash routing, export filenames, and publishing.
 */
export function slugify(text: string): string {
  if (!text) return 'event';

  return (
    text
      .toLowerCase()
      .normalize('NFD')
      // Remove combining diacritical marks
      .replace(/[\u0300-\u036f]/g, '')
      // Replace Vietnamese đ/Đ
      .replace(/[đĐ]/g, 'd')
      // Replace non-alphanumeric characters with hyphen
      .replace(/[^a-z0-9]+/g, '-')
      // Trim leading and trailing hyphens
      .replace(/^-+|-+$/g, '') || 'event'
  );
}
