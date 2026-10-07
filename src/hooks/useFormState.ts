/**
 * useFormState — minimal controlled-form helper shared by all four forms
 * (booking, order request, contact enquiry, catalogue fitment).
 *
 * - `values` / `set(name, value)` for controlled inputs
 * - `errors` populated by `validate(rules)` on submit; a field's error clears
 *   as soon as the user edits it
 */
import { useCallback, useState } from 'react';

export type Rules<T> = Partial<Record<keyof T, (value: string, all: T) => string>>;

export function useFormState<T extends Record<string, string>>(initial: T) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const set = useCallback(<K extends keyof T>(name: K, value: T[K]) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: '' } : e));
  }, []);

  /** Runs every rule; returns true when the form is valid. */
  const validate = useCallback(
    (rules: Rules<T>): boolean => {
      const next: Partial<Record<keyof T, string>> = {};
      (Object.keys(rules) as Array<keyof T>).forEach((key) => {
        const message = rules[key]?.(values[key], values) ?? '';
        if (message) next[key] = message;
      });
      setErrors(next);
      return Object.keys(next).length === 0;
    },
    [values],
  );

  return { values, errors, set, validate, setValues };
}
