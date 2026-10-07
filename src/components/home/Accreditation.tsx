/**
 * Accreditation — trust strip for the ATRA membership and specialist status
 * (wording taken from the client's flyer; edit it in data/site.ts → accreditation).
 * Used on the homepage and the About page.
 */
import { BadgeCheck } from 'lucide-react';
import { SITE } from '../../data/site';

export function Accreditation() {
  const a = SITE.accreditation;
  return (
    <section className="band band--white accreditation-band" aria-label="Accreditation">
      <div className="container accreditation">
        <span className="accreditation__icon"><BadgeCheck size={28} aria-hidden="true" /></span>
        <div className="stack stack--sm">
          <p className="eyebrow">{a.badge}</p>
          <h2 className="h-4">{a.title}</h2>
          <p className="text-muted">{a.text}</p>
        </div>
      </div>
    </section>
  );
}
