/** BookingCTA — conversion band: one clear invitation to start a service request. */
import { Button } from '../ui/Button';

export function BookingCTA() {
  return (
    <section className="band band--dark on-dark" aria-labelledby="cta-title">
      <div className="container section cta-band">
        <div className="stack stack--md cta-band__copy">
          <p className="eyebrow eyebrow--gold">Let’s take the next step</p>
          <h2 id="cta-title" className="h-1-lg">Tell us what your car needs.</h2>
          <p className="text-on-dark">Start a service request. We’ll review the details and contact you to confirm availability.</p>
        </div>
        <Button to="/book">Book a Service</Button>
      </div>
    </section>
  );
}
