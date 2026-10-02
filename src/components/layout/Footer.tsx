/** Footer — brand statement, explore links, contact details, copyright. Shared by every page. */
import { Link } from 'react-router-dom';
import { SITE } from '../../data/site';
import { Wordmark } from './Wordmark';

const EXPLORE = [
  { label: 'Services', to: '/services' },
  { label: 'Book a Service', to: '/book' },
  { label: 'Auto Parts', to: '/parts' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="band band--deep site-footer on-dark">
      <div className="container site-footer__inner">
        <div className="site-footer__content">
          <div className="stack stack--md site-footer__brand">
            <Wordmark onDark showTagline={false} />
            <p className="text-on-dark">{SITE.tagline}</p>
            <p className="text-on-dark text-sm">
              Service, repair, diagnostics and automotive parts. Clear next steps for your vehicle.
            </p>
          </div>

          <nav className="stack stack--md" aria-label="Footer">
            <p className="eyebrow eyebrow--gold">Explore</p>
            <ul className="stack stack--md footer-links">
              {EXPLORE.map((l) => <li key={l.to}><Link to={l.to}>{l.label}</Link></li>)}
            </ul>
          </nav>

          <div className="stack stack--sm">
            <p className="eyebrow eyebrow--gold">Need help?</p>
            <a className="text-on-dark text-sm footer-contact" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
            <a className="text-on-dark text-sm footer-contact" href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </div>

        <hr className="site-footer__rule" />
        <p className="text-on-dark text-xs">© {new Date().getFullYear()} PowerGlide. All rights reserved.</p>
      </div>
    </footer>
  );
}
