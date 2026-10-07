/** AboutTeaser — the short "Behind the service" story with a link to the full About page. */
import { Button } from '../ui/Button';
import { ImageFrame } from '../ui/ImageFrame';

export function AboutTeaser() {
  return (
    <section className="container section about-teaser" aria-labelledby="about-teaser-title">
      {/* ▸ IMAGE: workshop tools photograph (600×440) */}
      <ImageFrame src="/images/about/workshop-tools.jpg" alt="Tools laid out on a workshop bench"
        label="About — workshop photograph" className="about-teaser__photo" />
      <div className="stack stack--lg">
        <p className="eyebrow">Behind the service</p>
        <h2 id="about-teaser-title" className="h-2">Built around real automotive problems.</h2>
        <p className="text-muted">
          A car that won’t start. A warning light that won’t go away. The wrong replacement part. PowerGlide connects
          the service and parts conversations so you can make a practical, informed decision.
        </p>
        <div><Button to="/about" variant="outline">About PowerGlide</Button></div>
      </div>
    </section>
  );
}
