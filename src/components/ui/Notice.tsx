/** Notice — the cream "Request first. Confirmation follows." banner with a gold icon tile. */
import type { ReactNode } from 'react';
import { Info } from 'lucide-react';

export function Notice({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="notice" role="note">
      <span className="notice__icon"><Info size={20} aria-hidden="true" /></span>
      <div>
        <p className="notice__title">{title}</p>
        <p className="notice__text">{children}</p>
      </div>
    </aside>
  );
}
