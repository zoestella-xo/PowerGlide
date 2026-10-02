/** Testimonials — sample quotes (clearly labelled as not verified, per the design). */
import { TESTIMONIALS } from '../../data/testimonials';

export function Testimonials() {
  return (
    <section className="container section stack stack--xl" aria-labelledby="testimonials-title">
      <div className="stack stack--md">
        <p className="eyebrow">The customer conversation</p>
        <h2 id="testimonials-title" className="h-2">What clear service can feel like.</h2>
        <p className="text-muted text-sm">Sample testimonial content — not verified customer reviews.</p>
      </div>
      <div className="grid grid--3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.quote} className="card testimonial">
            <blockquote className="testimonial__quote">{t.quote}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
