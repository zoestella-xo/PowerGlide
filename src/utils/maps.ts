/**
 * Google Maps helpers.
 *
 * Why this exists: Google refuses to load normal map links (google.com/maps/…,
 * maps.app.goo.gl/…) inside an <iframe>. Only two things embed:
 *   1. the "Embed a map" URL  (https://www.google.com/maps/embed?pb=…)
 *   2. a search URL with &output=embed  (built here from a plain address)
 */

/**
 * Returns a URL that is safe to put in <iframe src>, or '' if none can be made.
 * Accepts, in order of preference:
 *   • the full <iframe …> snippet pasted from Google (we pull out its src)
 *   • the bare embed URL
 * Falls back to building an embed from `query` (an address or place name).
 */
export function resolveMapEmbed(embedInput: string, query: string): string {
  const input = embedInput.trim();
  if (input) {
    const fromIframe = input.match(/src\s*=\s*["']([^"']+)["']/i);
    const url = (fromIframe ? fromIframe[1] : input).replace(/&amp;/g, '&').trim();
    if (/^https:\/\/www\.google\.com\/maps\/embed/i.test(url) || /[?&]output=embed/i.test(url)) return url;
  }
  const q = query.trim();
  return q ? `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed` : '';
}

/** Link for the "Open in Google Maps" button (any normal Google Maps link works here). */
export function resolveMapLink(link: string, query: string): string {
  if (link.trim()) return link.trim();
  const q = query.trim();
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : '';
}
