/**
 * ProductDetailsPage — Journey 2, step 2: Product → Add to cart.
 * Gallery (thumbnail switcher), price/stock, fitment notice, quantity, actions,
 * tabbed information and related parts.
 */
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ProductCard } from '../components/cards/ProductCard';
import { Button } from '../components/ui/Button';
import { ImageFrame } from '../components/ui/ImageFrame';
import { Notice } from '../components/ui/Notice';
import { QuantityStepper } from '../components/ui/QuantityStepper';
import { useCart } from '../context/CartContext';
import { PRODUCTS, getProduct } from '../data/products';
import { formatPrice } from '../utils/format';

const TABS = ['Description', 'Specifications', 'Delivery & fitment'] as const;
type Tab = (typeof TABS)[number];

export default function ProductDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug);
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState<Tab>('Description');
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/parts" replace />;

  const related = [
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...PRODUCTS.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 3);

  const handleAdd = () => { add(product.slug, quantity); setAdded(true); };

  return (
    <div className="container section--tight stack stack--xl">
      <nav aria-label="Breadcrumb" className="text-muted text-sm">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li><li><Link to="/parts">Auto Parts</Link></li>
          <li>{product.category}</li><li aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="product">
        <div className="stack stack--lg">
          {/* ▸ IMAGE: main product photo (656×470) */}
          <ImageFrame src={product.images[activeImage]} alt={`${product.name}, ${product.subtitle}`}
            label="Product photograph" className="product__main" eager />
          <ul className="product__thumbs">
            {product.images.map((src, i) => (
              <li key={src}>
                <button type="button" className={`thumb${i === activeImage ? ' thumb--active' : ''}`}
                  aria-label={`Show image ${i + 1} of ${product.images.length}`} aria-pressed={i === activeImage}
                  onClick={() => setActiveImage(i)}>
                  <ImageFrame src={src} alt="" label={`View ${i + 1}`} className="thumb__img" />
                </button>
              </li>
            ))}
          </ul>
          <p className="text-muted text-sm">Product photography · sample product representation</p>
        </div>

        <div className="stack stack--lg product__info">
          <p className="eyebrow">{product.eyebrow}</p>
          <h1 className="h-1-lg">{product.name}</h1>
          <p className="text-muted">{product.subtitle}</p>
          <div className="stack stack--sm">
            <p className="product__price">{formatPrice(product.price)}</p>
            <p className="text-muted text-sm">{product.inStock ? 'In stock' : 'Available on request'}</p>
          </div>
          <hr className="divider" />
          <p className="text-muted">{product.description}</p>
          <Notice title={product.fitmentTitle}>{product.fitmentNote}</Notice>

          <div className="stack stack--sm">
            <p className="text-sm"><strong>Quantity</strong></p>
            <QuantityStepper value={quantity} onChange={setQuantity} label={`Quantity of ${product.name}`} />
          </div>

          <div className="product__actions">
            <Button onClick={handleAdd}>Add to Cart</Button>
            <Button to={`/contact?part=${encodeURIComponent(`${product.name} (${product.subtitle})`)}`} variant="outline">Enquire about part</Button>
          </div>

          {/* Inline confirmation — announced to screen readers, links straight to the cart. */}
          <p className="product__added" role="status">
            {added && (<><Check size={18} aria-hidden="true" /> Added to cart. <Link to="/cart">View cart &amp; send request</Link></>)}
          </p>

          <p className="text-muted text-sm">
            No online payment. Add to cart, then submit an order request. Availability, fitment and any delivery charges are confirmed before payment.
          </p>
        </div>
      </div>

      {/* Tabbed information */}
      <section aria-label="Product information" className="info-panel">
        <div role="tablist" aria-label="Product information" className="tabs">
          {TABS.map((t) => (
            <button key={t} role="tab" type="button" id={`tab-${t}`} aria-selected={tab === t} aria-controls="tab-panel"
              className="tabs__tab" onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div role="tabpanel" id="tab-panel" aria-labelledby={`tab-${tab}`} className="tabs__panel">
          {tab === 'Description' && <p className="text-muted">{product.description}</p>}
          {tab === 'Specifications' && (
            <dl className="summary-list">
              {product.specs.map((s) => (
                <div key={s.label} className="summary-list__row"><dt className="text-muted">{s.label}</dt><dd>{s.value}</dd></div>
              ))}
            </dl>
          )}
          {tab === 'Delivery & fitment' && (
            <p className="text-muted">
              Delivery or workshop pickup is arranged after your order request is reviewed. Any delivery charge is
              confirmed with you before payment. {product.fitmentNote}
            </p>
          )}
        </div>
      </section>

      <section className="stack stack--xl" aria-labelledby="related-title">
        <h2 id="related-title" className="h-2">Related parts</h2>
        <div className="grid grid--3">{related.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      </section>
    </div>
  );
}
