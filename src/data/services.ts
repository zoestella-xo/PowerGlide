/**
 * SERVICES — edit this array to add, remove or reword services.
 * The Services page, homepage overview, booking dropdown and search/filter all
 * read from here. Drop matching photos into /public/images/services/.
 */
import {
  ArrowUpDown, ClipboardCheck, Cog, Disc3, Droplets, Gauge, ListChecks, Settings, Snowflake, Wrench, Zap,
} from 'lucide-react';
import type { Service } from '../types';

const TIMING = 'Timing confirmed after assessment';
const img = (file: string) => `/images/services/${file}`;

export const SERVICES: Service[] = [
  {
    slug: 'engine-diagnostics', name: 'Engine Diagnostics', category: 'Repair', icon: Gauge,
    summary: 'Warning lights, scan diagnostics and fault identification.',
    keyInfo: 'Bring details of symptoms and when they occur.',
    timingNote: TIMING, cta: 'Book Service', image: img('engine-diagnostics.jpg'),
  },
  {
    slug: 'engine-repair', name: 'Engine Repair', category: 'Repair', icon: Wrench,
    summary: 'Investigate leaks, rough running, overheating and loss of power.',
    keyInfo: 'Repair scope agreed after diagnostic assessment.',
    timingNote: TIMING, cta: 'Request Quote', image: img('engine-repair.jpg'),
  },
  {
    slug: 'oil-servicing', name: 'Oil & Servicing', category: 'Maintenance', icon: Droplets,
    summary: 'Oil and filter replacement with routine vehicle health checks.',
    keyInfo: 'Oil specification reviewed for your vehicle.',
    timingNote: TIMING, cta: 'Book Service', image: img('oil-servicing.jpg'),
  },
  {
    slug: 'brakes', name: 'Brakes', category: 'Repair', icon: Disc3,
    summary: 'Check pads, discs and braking concerns for safer everyday driving.',
    keyInfo: 'Describe any noise, vibration or reduced braking.',
    timingNote: TIMING, cta: 'Book Service', image: img('brakes.jpg'),
  },
  {
    slug: 'suspension', name: 'Suspension', category: 'Repair', icon: ArrowUpDown,
    summary: 'Inspect steering, shocks and suspension for a steadier ride.',
    keyInfo: 'Tell us about knocks, uneven wear or pulling.',
    timingNote: TIMING, cta: 'Book Service', image: img('suspension.jpg'),
  },
  {
    slug: 'electrical', name: 'Electrical', category: 'Electrical', icon: Zap,
    summary: 'Battery, charging, wiring and electrical-system checks.',
    keyInfo: 'Starting and intermittent faults assessed.',
    timingNote: TIMING, cta: 'Book Service', image: img('electrical.jpg'),
  },
  {
    slug: 'air-conditioning', name: 'Air Conditioning', category: 'Electrical', icon: Snowflake,
    summary: 'Cooling checks, leak investigation and climate-system repair.',
    keyInfo: 'System assessment before any gas top-up.',
    timingNote: TIMING, cta: 'Book Service', image: img('air-conditioning.jpg'),
  },
  {
    slug: 'transmission', name: 'Transmission', category: 'Repair', icon: Settings,
    summary: 'Fluid checks, fault assessment and automatic transmission refurbishment.',
    keyInfo: 'Share shifting symptoms and service history.',
    timingNote: TIMING, cta: 'Book Service', image: img('transmission.jpg'),
  },
  {
    slug: 'general-maintenance', name: 'General Maintenance', category: 'Maintenance', icon: ListChecks,
    summary: 'Fluid levels, belts, filters and routine vehicle checks.',
    keyInfo: 'Maintenance recommendations explained clearly.',
    timingNote: TIMING, cta: 'Book Service', image: img('general-maintenance.jpg'),
  },
  {
    slug: 'engine-replacement', name: 'Engine Replacement', category: 'Repair', icon: Cog,
    summary: 'Major engine work, replacement planning and installation.',
    keyInfo: 'Compatibility and work scope reviewed first.',
    timingNote: TIMING, cta: 'Request Quote', image: img('engine-replacement.jpg'),
  },
  {
    slug: 'vehicle-inspection', name: 'Vehicle Inspection', category: 'Maintenance', icon: ClipboardCheck,
    summary: 'A vehicle check with findings and recommended next steps.',
    keyInfo: 'Tell us the reason for the inspection.',
    timingNote: TIMING, cta: 'Book Service', image: img('vehicle-inspection.jpg'),
  },
];

export const SERVICE_CATEGORIES = ['All services', 'Maintenance', 'Repair', 'Electrical'] as const;

/**
 * The six grouped rows on the homepage "What can we help with?" block.
 * `slug` is the service the "Explore service" link opens in the booking flow.
 */
export const HOME_SERVICE_SUMMARIES = [
  { title: 'Engine diagnostics', text: 'Warning lights, scan diagnostics and fault identification.', slug: 'engine-diagnostics' },
  { title: 'Engine repair', text: 'Investigate running problems, leaks and loss of power.', slug: 'engine-repair' },
  { title: 'Oil & servicing', text: 'Oil, filters and routine checks for everyday driving.', slug: 'oil-servicing' },
  { title: 'Brakes & suspension', text: 'Inspect braking, steering and ride-quality concerns.', slug: 'brakes' },
  { title: 'Electrical & AC', text: 'Starting, charging, wiring and cooling-system checks.', slug: 'electrical' },
  { title: 'Transmission & inspection', text: 'Fluid checks, vehicle assessment and major-work planning.', slug: 'transmission' },
] as const;

export const getService = (slug: string | null | undefined): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);
