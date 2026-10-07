/** Formats whole cedis as the design does: "GH₵ 1,250". */
export function formatPrice(amount: number): string {
  return `GH₵ ${amount.toLocaleString('en-GH')}`;
}

/** Short human reference for confirmation screens, e.g. "PG-4F7K2". */
export function makeReference(prefix = 'PG'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no look-alikes (0/O, 1/I)
  let out = '';
  for (let i = 0; i < 5; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return `${prefix}-${out}`;
}

/** Strips everything except digits — used to build wa.me and tel: links. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}
