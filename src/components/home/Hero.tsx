/**
 * Hero — answers "who is PowerGlide, what do they do, what can I do next?"
 * Desktop: copy + 2 CTAs on the left, workshop photo on the right.
 * Mobile : adds three tappable "route" cards (service / parts / contact) so the
 *          customer with a problem always has an obvious next tap.
 * Bottom strip lists the four disciplines.
 */
import { ArrowUpRight, CalendarCheck, MessageCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ImageFrame } from '../ui/ImageFrame';

const ROUTES = [
  { to: '/book', icon: CalendarCheck, title: 'Book a service', text: 'Diagnostics, repairs and maintenance' },
  { to: '/parts', icon: Package, title: 'Shop auto parts', text: 'Browse parts and send an order request' },
  { to: '/contact', icon: MessageCircle, title: 'Contact us', text: 'Call, WhatsApp or send an enquiry' },
];

const DISCIPLINES = ['Diagnostics', 'Repairs', 'Maintenance', 'Auto parts'];

export function Hero() {
  return (
    <section className="band band--deep hero on-dark" aria-labelledby="hero-title">
      <div className="container hero__composition">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--gold hero__eyebrow">Premier Auto Service Center</p>
          <h1 id="hero-title" className="h-display">
            <span>Expert service.</span> <span>The right parts.</span> <span>A clearer way forward.</span>
          </h1>
          <p className="text-on-dark hero__lead">
            PowerGlide brings vehicle servicing, repairs, diagnostics and automotive parts into one straightforward experience.
          </p>
          <div className="hero__actions">
            <Button to="/book">Book a Service</Button>
            <Button to="/parts" variant="dark">Shop Auto Parts</Button>
          </div>
          <p className="text-on-dark hero__help">
            Not sure where to start?{' '}
            <Link to="/contact" className="hero__help-link">Contact Us <ArrowUpRight size={16} aria-hidden="true" /></Link>
          </p>

          {/* Mobile-only route cards */}
          <ul className="hero__routes">
            {ROUTES.map(({ to, icon: Icon, title, text }) => (
              <li key={to}>
                <Link to={to} className="route-card">
                  <span className="route-card__icon"><Icon size={20} aria-hidden="true" /></span>
                  <span className="route-card__text"><strong>{title}</strong><span>{text}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <figure className="hero__visual">
          {/* ▸ IMAGE: workshop photograph (608×480 on desktop) */}
          <ImageFrame src="/images/hero/workshop.jpg" alt="Technicians working on a vehicle in the PowerGlide workshop"
            label="Hero — workshop photograph" className="hero__photo image-frame--dark" eager />
          <figcaption className="hero__caption">
            <span>THE WORKSHOP / SERVICE &amp; REPAIR</span><span className="hero__caption-brand">POWERGLIDE</span>
          </figcaption>
        </figure>
      </div>

      <div className="hero__strip">
        <ul className="container hero__disciplines">{DISCIPLINES.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
    </section>
  );
}
