/** ProductCard — product tile used on the homepage and the catalogue. Links to the detail page. */
import type { Product } from '../../types';
import { useBranch } from '../../context/BranchContext';
import { formatPrice } from '../../utils/format';
import { priceFor } from '../../utils/pricing';
import { Button } from '../ui/Button';
import { ImageFrame } from '../ui/ImageFrame';

export function ProductCard({ product, imageHeight }: { product: Product; imageHeight?: 'sm' | 'md' }) {
  const { branch } = useBranch();
  return (
    <article className="card product-card">
      <ImageFrame
        src={product.images[0]} alt={`${product.name}, ${product.subtitle}`} label={`${product.name} photograph`}
        className={`product-card__image product-card__image--${imageHeight ?? 'md'}`}
      />
      <div className="product-card__info">
        <h3 className="h-5">{product.name}</h3>
        <p className="text-muted text-sm">{product.subtitle}</p>
        <p className="text-muted text-sm">{product.inStock ? 'In stock' : 'Available on request'}</p>
        <p className="product-card__price">{formatPrice(priceFor(product, branch.id))}</p>
      </div>
      <Button to={`/parts/${product.slug}`} variant="outline" block aria-label={`View part: ${product.name}, ${product.subtitle}`}>
        View part
      </Button>
    </article>
  );
}
