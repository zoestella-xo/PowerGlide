/** Tiny validators shared by every form. Return an error string or ''. */

export const required = (value: string, label: string): string =>
  value.trim() ? '' : `${label} is required.`;

/** Accepts local (020…) and international (+233…) numbers; 9–15 digits. */
export const phone = (value: string): string => {
  if (!value.trim()) return 'Phone number is required.';
  const digits = value.replace(/\D/g, '');
  return digits.length >= 9 && digits.length <= 15 ? '' : 'Enter a valid phone number.';
};

/** Optional email: empty is fine, anything else must look like an email. */
export const optionalEmail = (value: string): string =>
  !value.trim() || /^\S+@\S+\.\S+$/.test(value.trim()) ? '' : 'Enter a valid email address.';
