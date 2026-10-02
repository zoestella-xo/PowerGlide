/** HowItWorks — the three-step service process on a dark band. Reused on the About page. */
const STEPS = [
  { n: '01', title: 'Choose a service', text: 'Find what your vehicle needs, or describe the problem if you’re unsure.' },
  { n: '02', title: 'Tell us about your car', text: 'Share vehicle details, symptoms and your preferred date and time.' },
  { n: '03', title: 'We confirm the next step', text: 'We’ll contact you to confirm availability before an appointment is agreed.' },
];

export function HowItWorks() {
  return (
    <section className="band band--dark on-dark" aria-labelledby="how-title">
      <div className="container section stack stack--xl">
        <p className="eyebrow eyebrow--gold">Your next step</p>
        <h2 id="how-title" className="h-2">From a concern to a service plan.</h2>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.n} className="stack stack--md">
              <span className="steps__n">{s.n}</span>
              <h3 className="h-4">{s.title}</h3>
              <p className="text-on-dark">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
