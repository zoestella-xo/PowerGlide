/**
 * ServiceCard — one service on the Services page: photo, name, description,
 * key info, timing note and a CTA that opens the booking flow with this
 * service pre-selected (?service=slug).
 */
import type { Service } from '../../types';
import { Button } from '../ui/Button';
import { ImageFrame } from '../ui/ImageFrame';

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="card service-card">
      <ImageFrame
        src={service.image} alt={`${service.name} at the PowerGlide workshop`}
        label={`${service.name} photograph`} icon={<Icon size={36} strokeWidth={1.5} aria-hidden="true" />}
        className="service-card__image"
      />
      <div className="stack stack--md service-card__body">
        <h3 className="h-4">{service.name}</h3>
        <p className="text-muted">{service.summary}</p>
        <p className="text-muted text-sm">{service.keyInfo}</p>
        <p className="text-muted text-xs">{service.timingNote}</p>
      </div>
      <Button to={`/book?service=${service.slug}`} block>{service.cta}</Button>
    </article>
  );
}
