/**
 * PARTS CATALOGUE — mock data (the Figma file states prices, stock and fitment
 * are NOT verified inventory). Replace with an API call later; every component
 * only depends on the `Product` type.
 * Drop photos into /public/images/products/.
 */
import type { Product } from '../types';

const p = (file: string) => `/images/products/${file}`;

/** Sidebar categories from the design. */
export const PRODUCT_CATEGORIES = [
  'Engines', 'Batteries', 'Brake pads', 'Filters', 'Spark plugs', 'Belts',
  'Suspension', 'Lights', 'Oils and lubricants', 'Other parts',
] as const;

const BRAKE_SPECS = [
  { label: 'Position', value: 'Front axle' },
  { label: 'Vehicle', value: 'Toyota Corolla 2017–2022' },
  { label: 'Condition', value: 'New' },
  { label: 'Pieces', value: 'Set of 4 pads' },
  { label: 'Fitment check', value: 'Required before fulfilment' },
  { label: 'Availability', value: 'Sample: in stock' },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'brake-pad-set-corolla-front', name: 'Brake Pad Set', category: 'Brake pads',
    subtitle: 'Toyota Corolla · Front axle', eyebrow: 'Braking / Front axle', price: 450, inStock: true,
    description:
      'Reliable replacement brake pads for everyday driving. Confirm compatibility before ordering. Our team reviews every request to check fitment and availability.',
    fitmentTitle: 'Fitment is reviewed before fulfilment',
    fitmentNote: 'Toyota Corolla 2017–2022, front axle. Confirm the correct specification with the team.',
    specs: BRAKE_SPECS,
    images: [p('brake-pads-1.jpg'), p('brake-pads-2.jpg'), p('brake-pads-3.jpg'), p('brake-pads-4.jpg')],
  },
  {
    slug: 'engine-oil-5w30-4l', name: 'Engine Oil 5W-30', category: 'Oils and lubricants',
    subtitle: '4L · Synthetic', eyebrow: 'Lubricants / Engine oil', price: 320, inStock: true,
    description: 'Fully synthetic 5W-30 engine oil for modern petrol engines. Check your owner’s manual or ask us to confirm the right grade.',
    fitmentTitle: 'Specification is reviewed before fulfilment',
    fitmentNote: 'Suitable for many petrol engines. Confirm the grade for your vehicle with the team.',
    specs: [
      { label: 'Grade', value: '5W-30' }, { label: 'Type', value: 'Fully synthetic' },
      { label: 'Volume', value: '4 litres' }, { label: 'Condition', value: 'New, sealed' },
      { label: 'Availability', value: 'Sample: in stock' },
    ],
    images: [p('engine-oil-4l-1.jpg'), p('engine-oil-4l-2.jpg'), p('engine-oil-4l-3.jpg'), p('engine-oil-4l-4.jpg')],
  },
  {
    slug: 'diagnostic-scanner-obd2', name: 'Diagnostic Scanner', category: 'Other parts',
    subtitle: 'OBD2 · Multi-brand', eyebrow: 'Tools / Diagnostics', price: 780, inStock: true,
    description: 'A multi-brand OBD2 scanner for reading and clearing fault codes. Ask the team which vehicles it supports.',
    fitmentTitle: 'Compatibility is reviewed before fulfilment',
    fitmentNote: 'Works with most OBD2-compliant vehicles. Confirm yours with the team.',
    specs: [
      { label: 'Protocol', value: 'OBD2 / EOBD' }, { label: 'Brands', value: 'Multi-brand' },
      { label: 'Functions', value: 'Read / clear codes' }, { label: 'Availability', value: 'Sample: in stock' },
    ],
    images: [p('scanner-1.jpg'), p('scanner-2.jpg'), p('scanner-3.jpg'), p('scanner-4.jpg')],
  },
  {
    slug: 'all-season-tyre-205-55-r16', name: 'All-Season Tyre', category: 'Other parts',
    subtitle: '205/55 R16', eyebrow: 'Wheels / Tyres', price: 1250, inStock: true,
    description: 'All-season passenger tyre in a popular size. Confirm the size on your current tyre sidewall or ask us to check.',
    fitmentTitle: 'Size is reviewed before fulfilment',
    fitmentNote: 'Size 205/55 R16. Confirm it matches your vehicle’s placard.',
    specs: [
      { label: 'Size', value: '205/55 R16' }, { label: 'Type', value: 'All-season' },
      { label: 'Condition', value: 'New' }, { label: 'Availability', value: 'Sample: in stock' },
    ],
    images: [p('tyre-1.jpg'), p('tyre-2.jpg'), p('tyre-3.jpg'), p('tyre-4.jpg')],
  },
  {
    slug: 'brake-pad-set-toyota-rear', name: 'Brake Pad Set', category: 'Brake pads',
    subtitle: 'Toyota · Rear axle', eyebrow: 'Braking / Rear axle', price: 420, inStock: true,
    description: 'Replacement rear brake pads for selected Toyota models. Our team confirms fitment before any order is prepared.',
    fitmentTitle: 'Fitment is reviewed before fulfilment',
    fitmentNote: 'Selected Toyota models, rear axle. Confirm the correct specification with the team.',
    specs: [
      { ...BRAKE_SPECS[0], value: 'Rear axle' }, { label: 'Vehicle', value: 'Selected Toyota models' },
      BRAKE_SPECS[2], BRAKE_SPECS[3], BRAKE_SPECS[4], BRAKE_SPECS[5],
    ],
    images: [p('brake-pads-rear-1.jpg'), p('brake-pads-rear-2.jpg'), p('brake-pads-rear-3.jpg'), p('brake-pads-rear-4.jpg')],
  },
  {
    slug: 'engine-oil-5w30-1l', name: 'Engine Oil 5W-30', category: 'Oils and lubricants',
    subtitle: '1L · Synthetic', eyebrow: 'Lubricants / Engine oil', price: 85, inStock: true,
    description: 'One-litre bottle of fully synthetic 5W-30 — ideal for top-ups between services.',
    fitmentTitle: 'Specification is reviewed before fulfilment',
    fitmentNote: 'Suitable for many petrol engines. Confirm the grade for your vehicle with the team.',
    specs: [
      { label: 'Grade', value: '5W-30' }, { label: 'Type', value: 'Fully synthetic' },
      { label: 'Volume', value: '1 litre' }, { label: 'Availability', value: 'Sample: in stock' },
    ],
    images: [p('engine-oil-1l-1.jpg'), p('engine-oil-1l-2.jpg'), p('engine-oil-1l-3.jpg'), p('engine-oil-1l-4.jpg')],
  },
];

/** The three parts spotlighted on the homepage. */
export const FEATURED_SLUGS = [
  'brake-pad-set-corolla-front', 'engine-oil-5w30-4l', 'diagnostic-scanner-obd2',
];

export const getProduct = (slug: string | undefined): Product | undefined =>
  PRODUCTS.find((x) => x.slug === slug);
