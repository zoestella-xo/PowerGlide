/**
 * BranchPicker — the one component every page uses to choose a branch.
 *   variant="select" → dropdown (Parts, Product, Cart: sits among other fields)
 *   variant="chips"  → tappable pills (Services: 3 short options, one tap on mobile)
 * Both read/write the shared BranchContext, so changing it anywhere updates
 * prices and forms everywhere.
 */
import { MapPin } from 'lucide-react';
import { useBranch } from '../../context/BranchContext';
import { SelectField } from './FormFields';

interface BranchPickerProps {
  variant?: 'select' | 'chips';
  label?: string;
  /** Helper text under a dropdown. Defaults to the selected branch's address. */
  hint?: string;
}

export function BranchPicker({ variant = 'select', label = 'Branch', hint }: BranchPickerProps) {
  const { branch, branches, setBranchId } = useBranch();

  if (variant === 'chips') {
    return (
      <div className="branch-picker">
        <p className="branch-picker__label">{label}</p>
        <div className="chips" role="group" aria-label={label}>
          {branches.map((b) => (
            <button key={b.id} type="button" className="chip" aria-pressed={b.id === branch.id} onClick={() => setBranchId(b.id)}>
              {b.name}
            </button>
          ))}
        </div>
        <p className="text-muted text-sm branch-picker__address">
          <MapPin size={14} aria-hidden="true" /> {branch.address}
        </p>
      </div>
    );
  }

  return (
    <SelectField
      label={label}
      value={branch.name}
      options={branches.map((b) => b.name)}
      hint={hint ?? branch.address}
      onChange={(e) => {
        const next = branches.find((b) => b.name === e.target.value);
        if (next) setBranchId(next.id);
      }}
    />
  );
}
