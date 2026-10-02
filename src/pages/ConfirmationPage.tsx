/**
 * ConfirmationPage — one screen, three variants (service / order / enquiry).
 * Receives { reference, details } through router state from the form that
 * submitted. Visiting the URL directly still renders a sensible page.
 *
 * NOTE: the Figma file contains these three confirmation frames (mobile only);
 * their body copy was not read in detail, so the wording here is written to
 * match the tone of the rest of the design — see README "Assumptions".
 */
import { CheckCircle2 } from 'lucide-react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SITE } from '../data/site';
import type { ConfirmationKind } from '../types';

interface Detail { label: string; value: string }
interface LocationState { reference?: string; details?: Detail[] }

const CONTENT: Record<ConfirmationKind, {
  eyebrow: string; title: string; lead: string; next: string[]; primary: { label: string; to: string };
}> = {
  service: {
    eyebrow: 'Service request received', title: 'Thanks — your request is with the team.',
    lead: 'Your preferred slot is a request only. Nothing is booked until we confirm it with you.',
    next: ['We review your vehicle details and the work requested.', 'We check the workshop schedule for your preferred slot.', 'We contact you to confirm availability and the next step.'],
    primary: { label: 'Browse auto parts', to: '/parts' },
  },
  order: {
    eyebrow: 'Parts order request received', title: 'Order request sent.',
    lead: 'No payment has been taken. We’ll confirm stock, fitment and the final amount with you first.',
    next: ['We check availability of each item.', 'We verify fitment for your vehicle.', 'We contact you about delivery or pickup and the final amount.'],
    primary: { label: 'Book a service', to: '/book' },
  },
  enquiry: {
    eyebrow: 'Enquiry received', title: 'Thanks — we’ve got your message.',
    lead: 'A member of the team will get back to you using the details you provided.',
    next: ['We read your message and gather what we need.', 'We reply by phone, WhatsApp or email.'],
    primary: { label: 'Book a service', to: '/book' },
  },
};

export default function ConfirmationPage() {
  const { kind } = useParams<{ kind: string }>();
  const state = (useLocation().state ?? {}) as LocationState;

  if (!kind || !(kind in CONTENT)) return <Navigate to="/" replace />;
  const c = CONTENT[kind as ConfirmationKind];

  return (
    <div className="container section confirmation">
      <div className="stack stack--lg confirmation__head">
        <span className="confirmation__tick"><CheckCircle2 size={28} aria-hidden="true" /></span>
        <p className="eyebrow">{c.eyebrow}</p>
        <h1 className="h-1" tabIndex={-1} ref={(el) => { el?.focus(); }}>{c.title}</h1>
        <p className="text-muted">{c.lead}</p>
        {state.reference && <p className="confirmation__ref">Reference: <strong>{state.reference}</strong></p>}
      </div>

      <div className="confirmation__grid">
        {state.details && state.details.length > 0 && (
          <section className="form-card" aria-labelledby="summary-title">
            <h2 id="summary-title" className="h-4">Your request</h2>
            <dl className="summary-list">
              {state.details.map((d) => (
                <div key={d.label} className="summary-list__row"><dt className="text-muted">{d.label}</dt><dd>{d.value}</dd></div>
              ))}
            </dl>
          </section>
        )}

        <section className="recap" aria-labelledby="next-title">
          <p className="eyebrow eyebrow--gold">What happens next</p>
          <h2 id="next-title" className="h-4">Our next steps</h2>
          <ol className="recap__steps">{c.next.map((n, i) => <li key={n}><span>{i + 1}</span>{n}</li>)}</ol>
          <hr className="recap__rule" />
          <p className="text-on-dark text-sm">Need to change something? Call {SITE.phone} and quote your reference.</p>
        </section>
      </div>

      <div className="confirmation__actions">
        <Button to={c.primary.to}>{c.primary.label}</Button>
        <Button to="/" variant="outline">Back to home</Button>
      </div>
    </div>
  );
}
