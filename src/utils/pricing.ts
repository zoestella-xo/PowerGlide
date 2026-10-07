import type { Product } from '../types';

/** The price a customer pays at a given branch (falls back to the product's default price). */
export function priceFor(product: Product, branchId: string): number {
  return product.branchPrices?.[branchId] ?? product.price;
}
