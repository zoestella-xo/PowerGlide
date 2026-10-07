/**
 * Shared domain types.
 * Services and products are plain data (see /src/data) so the client can add or
 * edit entries without touching any component code.
 */
import type { LucideIcon } from 'lucide-react';

/** Service categories shown as filter chips on the Services page. */
export type ServiceCategory = 'Maintenance' | 'Repair' | 'Electrical';

/** Whether a service is booked directly or needs a quote first. */
export type ServiceCta = 'Book Service' | 'Request Quote';

export interface Service {
  /** URL-safe unique id — also used as `?service=` on the booking page. */
  slug: string;
  name: string;
  category: ServiceCategory;
  /** One-line description shown under the name. */
  summary: string;
  /** "Key information" line (what to bring / what happens). */
  keyInfo: string;
  /** Small print under the key info. */
  timingNote: string;
  cta: ServiceCta;
  icon: LucideIcon;
  /** Path under /public. Falls back to a placeholder when the file is missing. */
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  /** Must match an entry in PRODUCT_CATEGORIES. */
  category: string;
  /** Short sub-line, e.g. "Toyota Corolla · Front axle". */
  subtitle: string;
  /** Shown in the breadcrumb eyebrow, e.g. "Braking / Front axle". */
  eyebrow: string;
  /**
   * Default price in GH₵ (whole cedis). Used for any branch that has no entry in
   * `branchPrices`, so adding a new branch never breaks the catalogue.
   */
  price: number;
  /** Optional per-branch price overrides, keyed by Branch.id. */
  branchPrices?: Record<string, number>;
  inStock: boolean;
  description: string;
  /** Fitment guidance banner on the product page. */
  fitmentTitle: string;
  fitmentNote: string;
  specs: Array<{ label: string; value: string }>;
  /** First entry is the main image; the rest are thumbnails. */
  images: string[];
}

export interface CartLine {
  slug: string;
  quantity: number;
}

export interface Testimonial {
  quote: string;
}

export type FulfilmentChoice = 'delivery' | 'pickup';
export type HandoverChoice = 'drive-in' | 'pickup';

/** Variants of the confirmation screen. */
export type ConfirmationKind = 'service' | 'order' | 'enquiry';

/** A PowerGlide workshop/shop location. Prices (and later stock) can vary per branch. */
export interface Branch {
  /** URL-safe unique id (also the key used in Product.branchPrices). */
  id: string;
  /** Short display name, e.g. "Ashaley Botwe". */
  name: string;
  address: string;
  /** Text Google Maps can search for — used to build the map when no embed URL is set. */
  mapQuery: string;
  /** Optional: Google "Embed a map" iframe snippet or URL (takes priority over mapQuery). */
  mapEmbedUrl: string;
  /** Optional: normal Google Maps share link, used for the "Open in Google Maps" button. */
  mapLink: string;
}
