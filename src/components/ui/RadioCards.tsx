/**
 * RadioCards — the two-up "Drive-in / Pickup request" and
 * "Delivery / Workshop pickup" choice cards.
 * Built on native radio inputs inside a <fieldset> for full keyboard +
 * screen-reader support; the selected card gets the gold tint from the design.
 */
interface Option<T extends string> { value: T; label: string; description: string }

interface RadioCardsProps<T extends string> {
  legend: string;
  name: string;
  value: T;
  options: ReadonlyArray<Option<T>>;
  onChange: (value: T) => void;
}

export function RadioCards<T extends string>({ legend, name, value, options, onChange }: RadioCardsProps<T>) {
  return (
    <fieldset className="radio-cards">
      <legend className="h-5 radio-cards__legend">{legend}</legend>
      <div className="radio-cards__grid">
        {options.map((o) => (
          <label key={o.value} className={`radio-card${value === o.value ? ' radio-card--selected' : ''}`}>
            <span className="radio-card__row">
              <input
                type="radio" name={name} value={o.value} checked={value === o.value}
                onChange={() => onChange(o.value)} className="radio-card__input"
              />
              <span className="radio-card__dot" aria-hidden="true" />
              <span className="radio-card__label">{o.label}</span>
            </span>
            <span className="radio-card__desc">{o.description}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
