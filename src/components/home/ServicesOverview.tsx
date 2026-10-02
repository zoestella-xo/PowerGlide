/** ServicesOverview — "What can we help with?" Spotlight card + six grouped service links. */
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOME_SERVICE_SUMMARIES } from '../../data/services';
import { Button } from '../ui/Button';
import { ImageFrame } from '../ui/ImageFrame';
import { SectionHeading } from '../ui/SectionHeading';

export function ServicesOverview() {
  return (
    <section className="container section stack stack--xl" aria-labelledby="services-title">
      <SectionHeading id="services-title" eyebrow="Vehicle care" title="What can we help with?"
        action={<Button to="/services" variant="outline">All services</Button>} />

      <div className="services-overview">
        <div className="stack stack--lg services-overview__spotlight">
          {/* ▸ IMAGE: diagnostics spotlight (420×368) */}
          <ImageFrame src="/images/services/engine-diagnostics.jpg" alt="Technician running a diagnostic scan"
            label="Diagnostics — workshop photograph" className="services-overview__photo" />
          <p className="text-muted text-sm">Start with the symptoms. We’ll help identify the cause.</p>
          <Button to="/book?service=engine-diagnostics" block>Book a Service</Button>
        </div>

        <ul className="services-overview__list">
          {HOME_SERVICE_SUMMARIES.map((s) => (
            <li key={s.slug}>
              <Link to={`/book?service=${s.slug}`} className="service-summary">
                <h3 className="h-5">{s.title}</h3>
                <p className="text-muted">{s.text}</p>
                <span className="service-summary__link">Explore service <ArrowUpRight size={16} aria-hidden="true" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
