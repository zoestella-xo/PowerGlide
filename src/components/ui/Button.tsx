/**
 * Button — the one place button styling lives.
 *
 * Variants map to the Figma button component:
 *   primary → gold (the single most valuable action on a screen)
 *   dark    → ink fill (secondary action on dark backgrounds)
 *   outline → white with border (alternatives / low emphasis)
 *
 * Renders a router <Link> when `to` is set, an <a> when `href` is set,
 * otherwise a real <button>. States: hover, active (pressed), focus-visible,
 * disabled — all in components.css.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'dark' | 'outline';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Stretch to the full width of the container. */
  block?: boolean;
  /** Optional lucide icon rendered before the label. */
  icon?: ReactNode;
  className?: string;
  /** Internal navigation. */
  to?: string;
  /** External / tel: / mailto: / wa.me link. */
  href?: string;
  /** Opens `href` in a new tab (adds rel="noopener noreferrer"). */
  newTab?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

export function Button({
  children, variant = 'primary', block, icon, className = '', to, href, newTab, type = 'button', disabled, onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = `btn btn--${variant}${block ? ' btn--block' : ''} ${className}`.trim();
  const content = (<>{icon}<span>{children}</span></>);

  if (to) return <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>{content}</Link>;
  if (href) {
    return (
      <a
        href={href} className={classes} onClick={onClick} aria-label={ariaLabel}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
