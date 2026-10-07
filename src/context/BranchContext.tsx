/**
 * BranchContext — which PowerGlide branch the customer is shopping/booking at.
 *
 * One shared choice for the whole site: pick "Adabraka" on the Parts page and the
 * product prices, the cart total and the booking form all follow it. The choice
 * is remembered in localStorage so it survives a refresh.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { BRANCHES, DEFAULT_BRANCH_ID, getBranch } from '../data/branches';
import type { Branch } from '../types';

const STORAGE_KEY = 'powerglide.branch.v1';

interface BranchContextValue {
  /** The currently selected branch. */
  branch: Branch;
  /** All branches, for building selectors. */
  branches: Branch[];
  setBranchId: (id: string) => void;
}

const BranchContext = createContext<BranchContextValue | null>(null);

/** Reads the saved branch id, ignoring anything that no longer exists. */
function load(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && getBranch(saved)) return saved;
  } catch {
    /* storage blocked (private mode) — fall through to the default */
  }
  return DEFAULT_BRANCH_ID;
}

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branchId, setId] = useState<string>(load);

  const setBranchId = useCallback((id: string) => {
    if (!getBranch(id)) return;
    setId(id);
    try { localStorage.setItem(STORAGE_KEY, id); } catch { /* ignore */ }
  }, []);

  const value = useMemo<BranchContextValue>(
    () => ({ branch: getBranch(branchId) ?? BRANCHES[0], branches: BRANCHES, setBranchId }),
    [branchId, setBranchId],
  );

  return <BranchContext.Provider value={value}>{children}</BranchContext.Provider>;
}

/** Access the selected branch from any component inside <BranchProvider>. */
export function useBranch(): BranchContextValue {
  const ctx = useContext(BranchContext);
  if (!ctx) throw new Error('useBranch must be used inside <BranchProvider>');
  return ctx;
}
