import { FEATURED_SLUGS, getProduct } from '../../data/products';
import type { Product } from '../../types';
import { ProductCard } from '../cards/ProductCard';
import { BranchPicker } from '../ui/BranchPicker';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function FeaturedParts() {
  const products = FEATURED_SLUGS.map(getProduct).filter((p): p is Product => Boolean(p));
  return (
    <section className="container section stack stack--xl" aria-labelledby="parts-title">
      <SectionHeading id="parts-title" eyebrow="Parts for the next job" title="Find the right replacement."
        action={<Button to="/parts" variant="outline">Shop Auto Parts</Button>} />
      <p className="text-muted text-sm">Prices, availability and vehicle fitment are confirmed by the team.</p>
      <div className="featured-branch"><BranchPicker label="Prices for branch" /></div>
      <div className="grid grid--3">
        {products.map((p) => <ProductCard key={p.slug} product={p} imageHeight="sm" />)}
      </div>
    </section>
  );
}
