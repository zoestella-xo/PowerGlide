/**
 * CartPage — Journey 2, final steps: Cart → Order request (no payment).
 * Left: editable cart lines + customer/vehicle/fulfilment form.
 * Right: dark subtotal summary, "what we'll check" list, help card.
 * Submitting clears the cart and routes to the order confirmation screen.
 */
import { useState, type FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SelectField, TextAreaField, TextField } from '../components/ui/FormFields';
import { ImageFrame } from '../components/ui/ImageFrame';
import { Notice } from '../components/ui/Notice';
import { PageIntro } from '../components/ui/PageIntro';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { RadioCards } from '../components/ui/RadioCards';
import { useCart } from '../context/CartContext';
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_YEARS } from '../data/vehicles';
import { useFormState } from '../hooks/useFormState';
import { useFormSubmit } from '../hooks/useFormSubmit';
import type { FulfilmentChoice } from '../types';
import { formatPrice, makeReference } from '../utils/format';
import { optionalEmail, phone, required } from '../utils/validation';

const FULFILMENT = [
  { value: 'delivery', label: 'Delivery', description: 'Availability and delivery charges confirmed with you.' },
  { value: 'pickup', label: 'Workshop pickup', description: 'Collection location and timing confirmed by the team.' },
] as const;

export default function CartPage() {
  const { lines, count, subtotal, setQuantity, remove, clear } = useCart();
  const navigate = useNavigate();
  const { submitting, error: submitError, submit } = useFormSubmit();
  const [fulfilment, setFulfilment] = useState<FulfilmentChoice>('delivery');
  const { values, errors, set, validate } = useFormState({
    name: '', phone: '', email: '', make: '', model: '', year: '', notes: '',
  });

  const requestedParts = lines.map((l) => `${l.product.name} (${l.product.subtitle}) × ${l.quantity}`).join('; ');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = validate({
      name: (v) => required(v, 'Name'), phone: (v) => phone(v), email: (v) => optionalEmail(v),
      make: (v) => required(v, 'Vehicle make'), model: (v) => required(v, 'Vehicle model'),
    });
    if (!ok) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const state = {
      reference: makeReference('PG-P'),
      details: [
        { label: 'Parts', value: requestedParts },
        { label: 'Subtotal (sample prices)', value: formatPrice(subtotal) },
        { label: 'Vehicle', value: `${values.make} ${values.model}${values.year ? ` · ${values.year}` : ''}` },
        { label: 'Fulfilment', value: FULFILMENT.find((f) => f.value === fulfilment)?.label ?? '' },
        { label: 'Contact', value: `${values.name} · ${values.phone}` },
      ],
    };
    void submit(
      'order-request',
      {
        reference: state.reference, parts: requestedParts, subtotal: String(subtotal), make: values.make,
        model: values.model, year: values.year, fulfilment, name: values.name, phone: values.phone,
        email: values.email, notes: values.notes,
      },
      () => { clear(); navigate('/confirmation/order', { state }); },
    );
  };

  // ---- Empty cart ---------------------------------------------------------
  if (lines.length === 0) {
    return (
      <>
        <PageIntro eyebrow="Cart & order request" title="Your cart is empty" />
        <div className="container section--tight">
          <div className="empty-state">
            <p className="h-5">Nothing here yet.</p>
            <p className="text-muted">Browse the catalogue, add the parts you need, then send an order request.</p>
            <Button to="/parts">Shop Auto Parts</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageIntro eyebrow="Cart & order request" title="Review your parts">
        Check your items, then tell us who and what it’s for.
      </PageIntro>

      <div className="container section--tight stack stack--xl">
        <Notice title="An order request, not an online checkout">
          No payment is taken here. The team reviews your requested parts and contacts you before the order is confirmed.
        </Notice>

        <div className="workspace">
          <div className="stack stack--xl">
            {/* Cart items */}
            <section className="form-card" aria-labelledby="cart-title">
              <div className="cart__heading">
                <h2 id="cart-title" className="h-3">Review your cart</h2>
                <p className="text-muted text-sm">{count} item{count === 1 ? '' : 's'}</p>
              </div>
              <ul>
                {lines.map(({ product, quantity, lineTotal }) => (
                  <li key={product.slug} className="cart-item">
                    <ImageFrame src={product.images[0]} alt={product.name} label="Part" className="cart-item__img" />
                    <div className="cart-item__info">
                      <h3 className="h-5"><Link to={`/parts/${product.slug}`}>{product.name}</Link></h3>
                      <p className="text-muted text-sm">{product.subtitle}</p>
                      <div className="cart-item__controls">
                        <QuantityStepper value={quantity} onChange={(n) => setQuantity(product.slug, n)} label={`Quantity of ${product.name}`} />
                        <button type="button" className="link-button" onClick={() => remove(product.slug)}
                          aria-label={`Remove ${product.name} from cart`}>
                          <Trash2 size={16} aria-hidden="true" /> Remove
                        </button>
                      </div>
                    </div>
                    <p className="cart-item__price">{formatPrice(lineTotal)}</p>
                  </li>
                ))}
              </ul>
              <div><Button to="/parts" variant="outline">Continue shopping</Button></div>
            </section>

            {/* Order request form */}
            <form className="form-card" onSubmit={handleSubmit} noValidate>
              <div className="stack stack--md">
                <p className="eyebrow">Order request details</p>
                <h2 className="h-3">Tell us who and what it’s for.</h2>
              </div>
              <div className="form-row">
                <TextField label="Name" required autoComplete="name" value={values.name} error={errors.name} onChange={(e) => set('name', e.target.value)} />
                <TextField label="Phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+233 20 000 0000"
                  value={values.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>
              <TextField label="Email" optional type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
              <div className="form-row">
                <SelectField label="Vehicle make" required placeholder="Select make" value={values.make} options={VEHICLE_MAKES} error={errors.make}
                  onChange={(e) => { set('make', e.target.value); set('model', ''); }} />
                <SelectField label="Vehicle model" required placeholder={values.make ? 'Select model' : 'Choose a make first'} value={values.model}
                  options={values.make ? VEHICLE_MODELS[values.make] : []} disabled={!values.make} error={errors.model}
                  onChange={(e) => set('model', e.target.value)} />
              </div>
              <SelectField label="Vehicle year (helps fitment)" optional placeholder="Select year" value={values.year} options={VEHICLE_YEARS}
                onChange={(e) => set('year', e.target.value)} />
              <TextAreaField label="Requested parts" readOnly value={requestedParts} rows={3} />
              <RadioCards<FulfilmentChoice> legend="Delivery / pickup preference" name="fulfilment" value={fulfilment}
                options={FULFILMENT} onChange={setFulfilment} />
              <TextAreaField label="Delivery area / additional notes" value={values.notes}
                placeholder="Share your delivery area and any fitment notes. Final delivery charges will be reviewed with you."
                onChange={(e) => set('notes', e.target.value)} />
              {submitError && <p className="field__error" role="alert">{submitError}</p>}
              <Button type="submit" block disabled={submitting}>{submitting ? 'Sending…' : 'Submit Order Request'}</Button>
              <p className="text-muted text-sm">
                Submitting sends a request only. We’ll contact you to confirm stock, fitment, collection or delivery
                arrangements and the final amount before payment.
              </p>
            </form>
          </div>

          <aside className="workspace__side" aria-label="Order summary">
            <section className="recap">
              <p className="eyebrow eyebrow--gold">Request summary</p>
              <ul className="stack stack--md">
                {lines.map(({ product, quantity }) => (
                  <li key={product.slug} className="text-on-dark">{product.name}{product.subtitle.includes('·') ? ` ${product.subtitle.split('·')[0].trim()}` : ''} × {quantity}</li>
                ))}
              </ul>
              <hr className="recap__rule" />
              <div className="recap__total"><span className="text-on-dark">Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p className="text-on-dark text-sm">Sample prices · delivery not included</p>
              <p className="text-on-dark text-sm">No payment taken online.</p>
            </section>

            <section className="help-card">
              <h3 className="h-4">What we’ll check</h3>
              <ul className="checklist">
                <li>Availability of each item</li><li>Vehicle fitment</li>
                <li>Delivery availability and charges</li><li>Final amount and next steps</li>
              </ul>
              <p className="text-muted text-sm">Compatibility shown on the site is a sample. Our team verifies the exact fit.</p>
            </section>

            <section className="stack stack--md">
              <h3 className="h-5">Need help with your order?</h3>
              <p className="text-muted">Use the contact page to ask about a part or request a fitment check.</p>
              <Button to="/contact" variant="outline" block>Contact Us</Button>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
