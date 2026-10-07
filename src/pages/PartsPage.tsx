import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/cards/ProductCard';
import { Button } from '../components/ui/Button';
import { SelectField, TextField } from '../components/ui/FormFields';
import { BranchPicker } from '../components/ui/BranchPicker';
import { PageIntro } from '../components/ui/PageIntro';
import { useBranch } from '../context/BranchContext';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_YEARS } from '../data/vehicles';
import type { Product } from '../types';
import { priceFor } from '../utils/pricing';

const SORTS = ['Recommended', 'Price: low to high', 'Price: high to low', 'Name: A–Z'] as const;
type Sort = (typeof SORTS)[number];

interface Applied { inStock: boolean; onRequest: boolean; min: string; max: string }
const NO_FILTERS: Applied = { inStock: false, onRequest: false, min: '', max: '' };

function fitsVehicle(p: Product, make: string, model: string): boolean {
  if (!make) return true;
  const partMake = VEHICLE_MAKES.find((m) => p.subtitle.includes(m));
  if (!partMake) return true;
  if (partMake !== make) return false;
  const partModel = VEHICLE_MODELS[make].find((m) => p.subtitle.includes(m));
  return !model || !partModel || partModel === model;
}

export default function PartsPage() {
  const { branch } = useBranch();
  const [query, setQuery] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState<string>('All parts');
  const [sort, setSort] = useState<Sort>('Recommended');
  const [draft, setDraft] = useState<Applied>(NO_FILTERS);   
  const [applied, setApplied] = useState<Applied>(NO_FILTERS); 
  const [filtersOpen, setFiltersOpen] = useState(false);     

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = Number(applied.min) || 0;
    const max = Number(applied.max) || Infinity;
    const availability = applied.inStock !== applied.onRequest ? (applied.inStock ? true : false) : null;

    const list = PRODUCTS.filter((p) =>
      (category === 'All parts' || p.category === category) &&
      (!q || `${p.name} ${p.subtitle} ${p.category}`.toLowerCase().includes(q)) &&
      fitsVehicle(p, make, model) &&
      priceFor(p, branch.id) >= min && priceFor(p, branch.id) <= max &&
      (availability === null || p.inStock === availability));

    const sorted = [...list];
    if (sort === 'Price: low to high') sorted.sort((a, b) => priceFor(a, branch.id) - priceFor(b, branch.id));
    if (sort === 'Price: high to low') sorted.sort((a, b) => priceFor(b, branch.id) - priceFor(a, branch.id));
    if (sort === 'Name: A–Z') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [query, make, model, category, sort, applied, branch.id]);

  const reset = () => {
    setQuery(''); setMake(''); setModel(''); setYear(''); setCategory('All parts');
    setSort('Recommended'); setDraft(NO_FILTERS); setApplied(NO_FILTERS);
  };

  return (
    <>
      <PageIntro eyebrow="Auto parts" title="Parts matched to your vehicle">
        Browse the catalogue, add what you need and send an order request. No payment online. We confirm fitment first.
      </PageIntro>

      {/* Fitment workspace */}
      <section className="container section--tight" aria-label="Search and vehicle fitment">
        <div className="fitment on-dark">
          <div className="fitment__branch">
            <p className="eyebrow eyebrow--gold">Choose your branch</p>
            <BranchPicker label="Branch" hint={`Prices shown are for the ${branch.name} branch and can differ between branches. ${branch.address}`} />
          </div>
          <p className="eyebrow eyebrow--gold">Then your vehicle</p>
          <div className="search">
            <Search className="search__icon" size={20} aria-hidden="true" />
            <input type="search" className="field__control" placeholder="Search part name or part number"
              value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search part name or part number" />
          </div>
          <div className="fitment__fields">
            <SelectField label="Make" placeholder="Select make" value={make} options={VEHICLE_MAKES}
              onChange={(e) => { setMake(e.target.value); setModel(''); }} />
            <SelectField label="Model" placeholder="Select model" value={model} options={make ? VEHICLE_MODELS[make] : []}
              disabled={!make} onChange={(e) => setModel(e.target.value)} />
            <SelectField label="Year" placeholder="Select year" value={year} options={VEHICLE_YEARS} onChange={(e) => setYear(e.target.value)} />
          </div>
          <p className="text-on-dark text-sm">Vehicle details help narrow the search. Compatibility still needs team confirmation.</p>
        </div>
      </section>

      {/* Catalogue */}
      <section className="container section--tight catalogue" aria-label="Catalogue">
        <aside className="catalogue__side">
          <h2 className="h-5">Categories</h2>
          <ul className="category-list">
            {['All parts', ...PRODUCT_CATEGORIES].map((c) => (
              <li key={c}>
                <button type="button" className="category" aria-pressed={category === c} onClick={() => setCategory(c)}>
                  <span>{c}</span><span aria-hidden="true">›</span>
                </button>
              </li>
            ))}
          </ul>

          <button type="button" className="catalogue__filter-toggle btn btn--outline btn--block" aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen((o) => !o)}>
            <SlidersHorizontal size={18} aria-hidden="true" /><span>Filters</span>
          </button>

          <div className={`filters${filtersOpen ? ' filters--open' : ''}`}>
            <hr className="divider" />
            <h2 className="h-5">Filters</h2>
            <label className="check"><input type="checkbox" checked={draft.inStock} onChange={(e) => setDraft({ ...draft, inStock: e.target.checked })} /> In stock</label>
            <label className="check"><input type="checkbox" checked={draft.onRequest} onChange={(e) => setDraft({ ...draft, onRequest: e.target.checked })} /> Available on request</label>
            <label className="check"><input type="checkbox" defaultChecked disabled /> New parts</label>
            <p className="text-muted text-sm">Price range</p>
            <div className="form-row form-row--tight">
              <TextField label="Min GH₵" type="number" min={0} inputMode="numeric" placeholder="0" value={draft.min} onChange={(e) => setDraft({ ...draft, min: e.target.value })} />
              <TextField label="Max GH₵" type="number" min={0} inputMode="numeric" placeholder="Any" value={draft.max} onChange={(e) => setDraft({ ...draft, max: e.target.value })} />
            </div>
            <Button variant="outline" block onClick={() => setApplied(draft)}>Apply filters</Button>
            <button type="button" className="link-button" onClick={reset}>Reset filters</button>
          </div>
        </aside>

        <div className="stack stack--lg catalogue__results">
          <div className="catalogue__controls">
            <p className="text-muted text-sm" aria-live="polite">Showing {results.length} catalogue item{results.length === 1 ? '' : 's'} · Prices for {branch.name}</p>
            <div className="catalogue__sort">
              <SelectField label="Sort by" value={sort} options={SORTS} onChange={(e) => setSort(e.target.value as Sort)} />
            </div>
          </div>
          <p className="text-muted text-sm">Prices, stock and fitment are not verified inventory.</p>

          {results.length > 0 ? (
            <div className="grid grid--3 catalogue__grid">{results.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
          ) : (
            <div className="empty-state">
              <p className="h-5">No parts match those filters.</p>
              <p className="text-muted">Can’t see your part? Tell us the vehicle and the part you need — we’ll check availability.</p>
              <div className="empty-state__actions">
                <Button variant="outline" onClick={reset}>Reset filters</Button>
                <Button to="/contact">Ask about a part</Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How ordering works (no payment) */}
      <section className="container section--tight" aria-labelledby="order-process-title">
        <h2 id="order-process-title" className="h-3-xl" style={{ marginBottom: 24 }}>How ordering works</h2>
        <ol className="grid grid--3 process-cards">
          {[
            ['1. Add to cart', 'Pick the parts you need and set quantities.'],
            ['2. Send an order request', 'Share your contact and vehicle details — no payment taken.'],
            ['3. We confirm', 'We check stock, fitment and delivery, then agree the final amount with you.'],
          ].map(([t, d]) => (
            <li key={t} className="help-card"><h3 className="h-5">{t}</h3><p className="text-muted">{d}</p></li>
          ))}
        </ol>
      </section>
    </>
  );
}
