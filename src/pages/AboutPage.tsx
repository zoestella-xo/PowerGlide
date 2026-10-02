/**
 * AboutPage — who PowerGlide is, how they work, and why to trust them.
 * Copy reuses the voice and phrases from the Figma homepage ("listen, assess,
 * explain and agree"); it deliberately avoids generic corporate language.
 */
import { Button } from '../components/ui/Button';
import { ImageFrame } from '../components/ui/ImageFrame';
import { HowItWorks } from '../components/home/HowItWorks';
import { ContactCTA } from '../components/home/ContactCTA';

const APPROACH = [
  { n: '01', title: 'Listen', text: 'You tell us what you’ve noticed — the noise, the warning light, the part that didn’t fit.' },
  { n: '02', title: 'Assess', text: 'We inspect and diagnose before recommending any work.' },
  { n: '03', title: 'Explain', text: 'Findings and options are put in plain language, with the cost reviewed up front.' },
  { n: '04', title: 'Agree', text: 'Work starts once you’re comfortable with the plan — never before.' },
];

const SPECIALISMS = ['Diagnostics', 'Engine repair & replacement', 'Brakes & suspension', 'Electrical & AC', 'Servicing & inspection', 'Genuine and matched parts'];

export default function AboutPage() {
  return (
    <>
      <section className="band band--deep on-dark" aria-labelledby="about-title">
        <div className="container about-hero">
          <div className="stack stack--lg about-hero__copy">
            <p className="eyebrow eyebrow--gold">About PowerGlide</p>
            <h1 id="about-title" className="h-1">A workshop you can trust, and parts you can count on.</h1>
            <p className="text-on-dark">
              PowerGlide is an automotive service centre that brings repairs, servicing, diagnostics and vehicle parts
              together — so one conversation covers the whole job.
            </p>
            <div><Button to="/book">Book a Service</Button></div>
          </div>
          {/* ▸ IMAGE: workshop / team photograph */}
          <ImageFrame src="/images/about/team.jpg" alt="The PowerGlide workshop team" label="About — team or workshop photograph"
            className="about-hero__photo image-frame--dark" eager />
        </div>
      </section>

      <section className="container section about-split" aria-labelledby="approach-title">
        <div className="stack stack--md">
          <p className="eyebrow">Our approach</p>
          <h2 id="approach-title" className="h-2">Built around real automotive problems.</h2>
        </div>
        <div className="stack stack--lg">
          <p className="text-muted">
            A car that won’t start. A warning light that won’t go away. The wrong replacement part. These are the
            reasons people call us, so that’s what we build everything around.
          </p>
          <p className="text-muted">What we specialise in:</p>
          <ul className="tags">{SPECIALISMS.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>

      <section className="container section--tight stack stack--xl" aria-labelledby="principles-title">
        <h2 id="principles-title" className="h-2">Listen, assess, explain, agree.</h2>
        <ol className="grid grid--3 principles">
          {APPROACH.map((a) => (
            <li key={a.n} className="card">
              <span className="why__n">{a.n}</span><h3 className="h-5">{a.title}</h3><p className="text-muted">{a.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container section about-teaser" aria-labelledby="connection-title">
        {/* ▸ IMAGE: parts shelf / counter photograph */}
        <ImageFrame src="/images/about/parts-counter.jpg" alt="Auto parts on the PowerGlide parts counter" label="About — parts photograph" className="about-teaser__photo" />
        <div className="stack stack--lg">
          <p className="eyebrow">Service and parts, together</p>
          <h2 id="connection-title" className="h-2">One place for the repair and the part.</h2>
          <p className="text-muted">
            Because the workshop and the parts counter talk to each other, fitment is checked against your vehicle before
            a part is prepared — fewer wrong parts, fewer return trips.
          </p>
          <p className="text-muted">Our commitment: clear communication, honest assessments and quality work on every vehicle.</p>
          <div><Button to="/parts" variant="outline">Shop Auto Parts</Button></div>
        </div>
      </section>

      <HowItWorks />
      <ContactCTA />
    </>
  );
}
