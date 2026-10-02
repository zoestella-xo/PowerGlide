/**
 * Mock vehicle data driving the dependent Make → Model selects on the booking,
 * catalogue and order forms. Replace/extend freely.
 */
export const VEHICLE_MODELS: Record<string, string[]> = {
  Toyota: ['Corolla', 'Camry', 'RAV4', 'Yaris', 'Hilux', 'Land Cruiser'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Fit'],
  Nissan: ['Altima', 'Sentra', 'Qashqai', 'Navara'],
  Hyundai: ['Elantra', 'Tucson', 'Santa Fe', 'Accent'],
  Kia: ['Rio', 'Sportage', 'Sorento', 'Picanto'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE'],
  Ford: ['Focus', 'Escape', 'Ranger'],
  Other: ['Other / not listed'],
};

export const VEHICLE_MAKES = Object.keys(VEHICLE_MODELS);

/** Last 30 model years, newest first. */
export const VEHICLE_YEARS: string[] = Array.from({ length: 30 }, (_, i) =>
  String(new Date().getFullYear() + 1 - i),
);

/** Half-hour-ish slots for the "Preferred time" select. */
export const TIME_SLOTS = [
  '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm',
];
