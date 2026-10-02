/**
 * ServicesPage — searchable, filterable directory of every service.
 * Journey 1 (Vehicle repair): Homepage → Services → [Book Service] → Request form → Confirmation.
 */
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { ServiceCard } from '../components/cards/ServiceCard';
import { Button } from '../components/ui/Button';
import { PageIntro } from '../components/ui/PageIntro';
import { SERVICES, SERVICE_CATEGORIES } from '../data/services';

export default function ServicesPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof SERVICE_CATEGORIES)[number]>('All services');

  // Filter by chip, then by free-text match on name / summary / key info.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SERVICES.filter((s) => {
      const inCategory = category === 'All services' || s.category === category;
      const matches = !q || [s.name, s.summary, s.keyInfo].some((t) => t.toLowerCase().includes(q));
      return inCategory && matches;
    });
  }, [query, category]);

  return (
    <>
      <PageIntro eyebrow="Service directory" title="Auto services that keep you moving">
        Find the right service, understand what it covers, then request it. Not sure what’s wrong? Describe the
        symptoms and we’ll guide you.
      </PageIntro>

      <section className="container services-controls" aria-label="Search and filter services">
        <div className="services-controls__row">
          <div className="search services-controls__search">
            <Search className="search__icon" size={20} aria-hidden="true" />
            <input type="search" className="field__control" placeholder="Search services" value={query}
              onChange={(e) => setQuery(e.target.value)} aria-label="Search services" />
          </div>
          <div className="chips" role="group" aria-label="Service categories">
            {SERVICE_CATEGORIES.map((c) => (
              <button key={c} type="button" className="chip" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
        </div>
        <p className="text-muted text-sm" aria-live="polite">
          {visible.length} service type{visible.length === 1 ? '' : 's'} · Timing and pricing confirmed after assessment.
        </p>
      </section>

      <section className="container section--tight" aria-label="Services">
        {visible.length > 0 ? (
          <div className="grid grid--3 services-grid">{visible.map((s) => <ServiceCard key={s.slug} service={s} />)}</div>
        ) : (
          <div className="empty-state">
            <p className="h-5">No services match “{query}”.</p>
            <p className="text-muted">Try a different word, or tell us what you’re noticing and we’ll point you to the right service.</p>
            <Button to="/contact" variant="outline">Contact PowerGlide</Button>
          </div>
        )}
      </section>

      <section className="band band--dark on-dark" aria-labelledby="help-title">
        <div className="container section--tight cta-band" style={{ paddingBlock: 40 }}>
          <div className="stack stack--md cta-band__copy">
            <p className="eyebrow eyebrow--gold">Talk to a human</p>
            <h2 id="help-title" className="h-2">Not sure what your vehicle needs?</h2>
            <p className="text-on-dark">Tell us what you notice. We’ll help you choose a service or identify the right part.</p>
          </div>
          <Button to="/contact">Contact PowerGlide</Button>
        </div>
      </section>

      <section className="container section--tight prep">
        <h2 className="h-3-xl">A few details help us prepare.</h2>
        <p className="text-muted">
          Share the vehicle make, model and year, any warning lights, the symptoms and recent work. We’ll review your
          request and confirm availability before an appointment is agreed.
        </p>
      </section>
    </>
  );
}
