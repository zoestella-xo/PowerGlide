/**
 * Vehicle data driving the dependent Make → Model selects on the booking,
 * catalogue and order forms. The first ten makes are the brands PowerGlide
 * lists on its flyer; models are a sample set — extend freely.
 */
export const VEHICLE_MODELS: Record<string, string[]> = {
  Hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Accent', 'Sonata', 'Creta'],
  Kia: ['Rio', 'Sportage', 'Sorento', 'Picanto', 'Cerato', 'Optima'],
  GMC: ['Terrain', 'Acadia', 'Sierra', 'Yukon'],
  Audi: ['A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Yaris', 'Hilux', 'Land Cruiser', 'Highlander'],
  Infiniti: ['Q50', 'QX50', 'QX60', 'QX80'],
  Ford: ['Focus', 'Fusion', 'Escape', 'Edge', 'Explorer', 'Ranger'],
  BMW: ['3 Series', '5 Series', 'X3', 'X5'],
  Nissan: ['Altima', 'Sentra', 'Qashqai', 'Rogue', 'Navara', 'Pathfinder'],
  'Land Rover': ['Range Rover', 'Range Rover Sport', 'Discovery', 'Defender', 'Evoque'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE'],
  Other: ['Other / not listed'],
};

export const VEHICLE_MAKES = Object.keys(VEHICLE_MODELS);

/** Last 30 model years, newest first. */
export const VEHICLE_YEARS: string[] = Array.from({ length: 30 }, (_, i) =>
  String(new Date().getFullYear() + 1 - i),
);

/** Hourly slots for the "Preferred time" select. */
export const TIME_SLOTS = [
  '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm',
];

/** The ten makes PowerGlide lists on its flyer (shown on the About page). */
export const SERVICED_MAKES = VEHICLE_MAKES.slice(0, 10);
