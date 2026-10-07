const REASONS = [
  { n: '01', title: 'Explain before we act', text: 'We make the findings and recommended work understandable.' },
  { n: '02', title: 'Fitment comes first', text: 'Vehicle details are reviewed before a part is prepared.' },
  { n: '03', title: 'Keep you informed', text: 'Availability, costs and the next step are discussed with you.' },
];

export function WhyPowerGlide() {
  return (
    <section className="container section why" aria-labelledby="why-title">
      <div className="stack stack--md why__heading">
        <p className="eyebrow">Why PowerGlide</p>
        <h2 id="why-title" className="h-2">Good work starts with a clear plan.</h2>
      </div>
      <ol className="why__list">
        {REASONS.map((r) => (
          <li key={r.n} className="stack stack--md">
            <span className="why__n">{r.n}</span>
            <h3 className="h-5">{r.title}</h3>
            <p className="text-muted">{r.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
