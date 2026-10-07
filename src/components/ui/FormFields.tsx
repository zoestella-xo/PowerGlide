/**
 * Form controls — TextField, SelectField, TextAreaField.
 * Each renders: <label> + control + optional hint + inline error, and wires
 * aria-invalid / aria-describedby so screen readers announce validation.
 * Visual states (hover, focus, error, disabled) live in components.css.
 */
import { useId, type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

interface BaseProps { label: string; error?: string; hint?: string; optional?: boolean }

/** Shared wrapper: label, control slot, hint/error text. */
function Field({
  id, label, error, hint, optional, required, children,
}: BaseProps & { id: string; required?: boolean; children: ReactNode }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
        {optional && <span className="field__optional"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="field__hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field__error" id={`${id}-error`} role="alert">{error}</p>}
    </div>
  );
}

const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextField({
  label, error, hint, optional, required, className = '', ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional} required={required}>
      <input
        id={id} className={`field__control ${className}`.trim()} required={required}
        aria-invalid={Boolean(error)} aria-describedby={describedBy(id, error, hint)} {...rest}
      />
    </Field>
  );
}

export function SelectField({
  label, error, hint, optional, required, placeholder, options, className = '', ...rest
}: BaseProps & { options: readonly string[]; placeholder?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional} required={required}>
      <div className="field__select">
        <select
          id={id} className={`field__control ${className}`.trim()} required={required}
          aria-invalid={Boolean(error)} aria-describedby={describedBy(id, error, hint)} {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="field__chevron" size={18} aria-hidden="true" />
      </div>
    </Field>
  );
}

export function TextAreaField({
  label, error, hint, optional, required, className = '', ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Field id={id} label={label} error={error} hint={hint} optional={optional} required={required}>
      <textarea
        id={id} rows={4} className={`field__control field__control--area ${className}`.trim()} required={required}
        aria-invalid={Boolean(error)} aria-describedby={describedBy(id, error, hint)} {...rest}
      />
    </Field>
  );
}
