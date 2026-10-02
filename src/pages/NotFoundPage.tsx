/** NotFoundPage — friendly dead-end that still points at the main journeys. */
import { Button } from '../components/ui/Button';
import { PageIntro } from '../components/ui/PageIntro';

export default function NotFoundPage() {
  return (
    <>
      <PageIntro eyebrow="Page not found" title="We couldn’t find that page.">
        The link may be out of date. Here’s where most customers want to go.
      </PageIntro>
      <div className="container section--tight confirmation__actions">
        <Button to="/book">Book a Service</Button>
        <Button to="/parts" variant="outline">Shop Auto Parts</Button>
        <Button to="/contact" variant="outline">Contact Us</Button>
      </div>
    </>
  );
}
