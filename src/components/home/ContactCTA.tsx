/** ContactCTA — low-pressure "have a question first?" prompt. */
import { Button } from '../ui/Button';

export function ContactCTA() {
  return (
    <section className="container section" aria-labelledby="contact-cta-title">
      <div className="stack stack--md contact-cta">
        <p className="eyebrow">Here to help</p>
        <h2 id="contact-cta-title" className="h-3-xl">A question before you start?</h2>
        <p className="text-muted">Ask about a repair, a part or your service request.</p>
        <div><Button to="/contact" variant="outline">Contact Us</Button></div>
      </div>
    </section>
  );
}
