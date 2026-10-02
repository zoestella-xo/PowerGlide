/** QuantityStepper — "− 1 +" control used on product page and in the cart. */
import { Minus, Plus } from 'lucide-react';
import { MAX_QTY } from '../../context/CartContext';

interface Props { value: number; onChange: (next: number) => void; label: string }

export function QuantityStepper({ value, onChange, label }: Props) {
  return (
    <div className="stepper" role="group" aria-label={label}>
      <button type="button" className="stepper__btn" aria-label="Decrease quantity"
        disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <Minus size={18} aria-hidden="true" />
      </button>
      <output className="stepper__value" aria-live="polite">{value}</output>
      <button type="button" className="stepper__btn" aria-label="Increase quantity"
        disabled={value >= MAX_QTY} onClick={() => onChange(value + 1)}>
        <Plus size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
