import { TESTIMONIALS } from '../../data/testimonials';

export function Testimonials() {
  return (
    <section className="container section stack stack--xl" aria-labelledby="testimonials-title">
      <div className="stack stack--md">
        <p className="eyebrow">TESTIMONIALS</p>
        <h2 id="testimonials-title" className="h-2">What clear service can feel like.</h2>
        
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
