/**
 * Header — sticky site navigation.
 *  ≥1024px : wordmark · page links (gold underline on active) · Cart (n) · Book a Service
 *  <1024px : wordmark · menu button → full-width drawer with the same links
 *            plus one-tap Call / WhatsApp (the "my car has a problem" shortcut).
 * The drawer closes on route change, Escape, and link click.
 */
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, Phone, ShoppingCart, X } from 'lucide-react';
import { NAV_ITEMS, SITE } from '../../data/site';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Wordmark } from './Wordmark';

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { pathname } = useLocation();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the drawer; lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) => `nav-link${isActive ? ' nav-link--active' : ''}`;

  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Wordmark />

        {/* Desktop navigation */}
        <nav className="site-header__nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>{item.label}</NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button to="/cart" variant="outline" className="cart-link" icon={<ShoppingCart size={18} aria-hidden="true" />}
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}>
            Cart ({count})
          </Button>
          <Button to="/book" className="site-header__book">Book a Service</Button>
        </div>

        {/* Mobile menu toggle */}
        <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-drawer"
          aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div id="mobile-drawer" className={`drawer${open ? ' drawer--open' : ''}`} hidden={!open}>
        <nav className="container drawer__inner" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `drawer__link${isActive ? ' drawer__link--active' : ''}`}>
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/cart" className="drawer__link">Cart ({count})</NavLink>
          <div className="drawer__ctas">
            <Button to="/book" block>Book a Service</Button>
            <Button href={`tel:${SITE.phone.replace(/\s/g, '')}`} variant="outline" block icon={<Phone size={18} aria-hidden="true" />}>Call</Button>
            <Button href={`https://wa.me/${SITE.whatsapp}`} newTab variant="outline" block icon={<MessageCircle size={18} aria-hidden="true" />}>WhatsApp</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
