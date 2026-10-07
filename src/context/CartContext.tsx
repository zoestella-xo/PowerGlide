/**
 * CartContext — the mini-store's cart.
 * - Holds only { slug, quantity } so product data always comes from /data.
 * - Persisted to localStorage so a refresh doesn't empty the cart.
 * - No payment: the cart ends in an "order request" form (see CartPage).
 */
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode,
} from 'react';
import { PRODUCTS } from '../data/products';
import { priceFor } from '../utils/pricing';
import { useBranch } from './BranchContext';
import type { CartLine, Product } from '../types';

const STORAGE_KEY = 'powerglide.cart.v1';
export const MAX_QTY = 20;

/** A cart line joined with its product, ready to render. */
export interface ResolvedLine { product: Product; quantity: number; unitPrice: number; lineTotal: number }

interface CartContextValue {
  lines: ResolvedLine[];
  /** Total number of units (drives the "Cart (n)" badge). */
  count: number;
  subtotal: number;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Reads persisted lines, ignoring corrupt data or products that no longer exist. */
function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        typeof l?.slug === 'string' && Number.isInteger(l?.quantity) && PRODUCTS.some((p) => p.slug === l.slug),
    );
  } catch {
    return []; // private mode / blocked storage — start with an empty cart
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(load);
  // Prices depend on the selected branch, so the cart re-prices when the branch changes.
  const { branch } = useBranch();

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch { /* ignore */ }
  }, [items]);

  const clamp = (n: number) => Math.min(MAX_QTY, Math.max(1, n));

  const add = useCallback((slug: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) return prev.map((l) => (l.slug === slug ? { ...l, quantity: clamp(l.quantity + quantity) } : l));
      return [...prev, { slug, quantity: clamp(quantity) }];
    });
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) => prev.map((l) => (l.slug === slug ? { ...l, quantity: clamp(quantity) } : l)));
  }, []);

  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines: ResolvedLine[] = items.flatMap((l) => {
      const product = PRODUCTS.find((p) => p.slug === l.slug);
      if (!product) return [];
      const unitPrice = priceFor(product, branch.id);
      return [{ product, quantity: l.quantity, unitPrice, lineTotal: unitPrice * l.quantity }];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
      add, setQuantity, remove, clear,
    };
  }, [items, branch.id, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Access the cart from any component inside <CartProvider>. */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
