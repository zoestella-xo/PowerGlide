/**
 * useFormSubmit — wraps submitForm with "sending" and error state so every
 * form can disable its button while sending and show a friendly failure
 * message (with the phone number as a fallback) instead of failing silently.
 */
import { useCallback, useState } from 'react';
import { SITE } from '../data/site';
import { submitForm } from '../utils/submitForm';

export function useFormSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = useCallback(
    async (formName: string, data: Record<string, string>, onSuccess: () => void) => {
      setSubmitting(true);
      setError('');
      try {
        await submitForm(formName, data);
        onSuccess();
      } catch {
        setError(`Sorry, we couldn’t send that. Please try again, or call us on ${SITE.phone}.`);
      } finally {
        setSubmitting(false);
      }
    },
    [],
  );

  return { submitting, error, submit };
}
