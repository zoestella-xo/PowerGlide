/** SectionHeading — eyebrow label + H2 with an optional action button on the right. */
import type { ReactNode } from 'react';

interface Props {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  /** Use on dark backgrounds (gold eyebrow, white title). */
  onDark?: boolean;
  id?: string;
}

export function SectionHeading({ eyebrow, title, action, onDark, id }: Props) {
  return (
    <div className="section-heading">
      <div className="stack stack--md">
        <p className={`eyebrow${onDark ? ' eyebrow--gold' : ''}`}>{eyebrow}</p>
        <h2 id={id} className="h-2">{title}</h2>
      </div>
      {action}
    </div>
  );
}
