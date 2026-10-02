/** PageIntro — eyebrow + H1 + lead paragraph at the top of inner pages. */
import type { ReactNode } from 'react';

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="container page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="h-1">{title}</h1>
      {children && <p className="page-intro__lead text-muted">{children}</p>}
    </header>
  );
}
