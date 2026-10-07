import { type FormEvent } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SelectField, TextAreaField, TextField } from '../components/ui/FormFields';
import { BranchPicker } from '../components/ui/BranchPicker';
import { PageIntro } from '../components/ui/PageIntro';
import { useBranch } from '../context/BranchContext';
import { SITE } from '../data/site';
import { useFormState } from '../hooks/useFormState';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { makeReference } from '../utils/format';
import { resolveMapEmbed, resolveMapLink } from '../utils/maps';
import { optionalEmail, phone, required } from '../utils/validation';

const TOPICS = ['A repair or service', 'A part or fitment check', 'My service request', 'My order request', 'Something else'];

export default function ContactPage() {
  const navigate = useNavigate();
  const { submitting, error: submitError, submit } = useFormSubmit();
  const { branch } = useBranch(); 
  const [params] = useSearchParams();
  const part = params.get('part'); 

  const { values, errors, set, validate } = useFormState({
    name: '', phone: '', email: '', topic: part ? TOPICS[1] : '',
    message: part ? `I’d like to ask about: ${part}.` : '',
  });

  const tel = `tel:${SITE.phone.replace(/\s/g, '')}`;
  const mapSrc = resolveMapEmbed(branch.mapEmbedUrl, branch.mapQuery);
  const mapHref = resolveMapLink(branch.mapLink, branch.mapQuery);
  const wa = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello PowerGlide, I need help with my vehicle.')}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = validate({
      name: (v) => required(v, 'Name'), phone: (v) => phone(v), email: (v) => optionalEmail(v),
      message: (v) => required(v, 'Message'),
    });
    if (!ok) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const reference = makeReference('PG-E');
    const details = [
      { label: 'Topic', value: values.topic || 'General' },
      { label: 'Message', value: values.message },
      { label: 'Contact', value: `${values.name} · ${values.phone}` },
    ];
    void submit(
      'enquiry',
      {
        reference, name: values.name, phone: values.phone, email: values.email,
        topic: values.topic, message: values.message,
      },
      () => navigate('/confirmation/enquiry', { state: { reference, details } }),
    );
  };

  return (
    <>
      <PageIntro eyebrow="Contact" title="Talk to PowerGlide">
        Call, message on WhatsApp or send an enquiry. We’ll respond as quickly as possible.
      </PageIntro>

      {/* Quick contact channels */}
      <section className="container section--tight stack stack--xl" aria-label="Quick contact">
        <div className="grid grid--3">
          <article className="card contact-route">
            <div className="contact-route__head"><Phone size={24} aria-hidden="true" /><h2 className="h-4">Call</h2></div>
            <ul className="phone-list">
              {SITE.phones.map((ph) => (
                <li key={ph.tel}><a href={`tel:${ph.tel}`}><span className="text-muted text-sm">{ph.label}</span><strong>{ph.display}</strong></a></li>
              ))}
            </ul>
            <Button href={tel} icon={<Phone size={18} aria-hidden="true" />} block>Call now</Button>
          </article>
          <article className="card contact-route contact-route--dark on-dark">
            <div className="contact-route__head"><MessageCircle size={24} aria-hidden="true" /><h2 className="h-4">WhatsApp</h2></div>
            <p className="text-lg"><strong>Chat with the team</strong></p>
            <Button href={wa} newTab icon={<MessageCircle size={18} aria-hidden="true" />} block>Open WhatsApp</Button>
          </article>
          <article className="card contact-route">
            <div className="contact-route__head"><Mail size={24} aria-hidden="true" /><h2 className="h-4">Email</h2></div>
            <p className="text-lg contact-route__email"><strong>{SITE.email}</strong></p>
            <Button href={`mailto:${SITE.email}`} variant="outline" icon={<Mail size={18} aria-hidden="true" />} block>Send an email</Button>
          </article>
        </div>
      </section>

      {/* Enquiry form + assistance */}
      <section className="container section--tight">
        <div className="workspace">
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            <div className="stack stack--md">
              <p className="eyebrow">Send an enquiry</p>
              <h2 className="h-3">How can we help?</h2>
            </div>
            <div className="form-row">
              <TextField label="Name" required autoComplete="name" value={values.name} error={errors.name} onChange={(e) => set('name', e.target.value)} />
              <TextField label="Phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+233 20 000 0000"
                value={values.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
            </div>
            <TextField label="Email" optional type="email" autoComplete="email" value={values.email} error={errors.email} onChange={(e) => set('email', e.target.value)} />
            <SelectField label="I’m asking about" optional placeholder="Choose a topic" value={values.topic} options={TOPICS} onChange={(e) => set('topic', e.target.value)} />
            <TextAreaField label="Message" required value={values.message} error={errors.message} rows={5}
              placeholder="Tell us the vehicle, what you’ve noticed, or the part you’re looking for."
              onChange={(e) => set('message', e.target.value)} />
            {submitError && <p className="field__error" role="alert">{submitError}</p>}
            <Button type="submit" block disabled={submitting}>{submitting ? 'Sending…' : 'Send Enquiry'}</Button>
          </form>

          <aside className="workspace__side">
            <section className="help-card">
              <h2 className="h-5"><Clock size={20} aria-hidden="true" className="inline-icon" /> Opening hours</h2>
              <dl className="summary-list">
                {SITE.hours.map((h) => (
                  <div key={h.days} className="summary-list__row"><dt className="text-muted">{h.days}</dt><dd>{h.time}</dd></div>
                ))}
              </dl>
            </section>
            <section className="recap">
              <p className="eyebrow eyebrow--gold">Car trouble right now?</p>
              <h2 className="h-4">Call us. It’s the fastest route.</h2>
              <Button href={tel} icon={<Phone size={18} aria-hidden="true" />} block>{SITE.phone}</Button>
            </section>
          </aside>
        </div>
      </section>

      {/* Location */}
      <section className="container section" aria-labelledby="location-title">
        <div className="stack stack--lg">
          <h2 id="location-title" className="h-3-xl"><MapPin size={24} aria-hidden="true" className="inline-icon" /> Find your nearest branch</h2>
          <BranchPicker variant="chips" label="Branch" />
          <div className="map">
            {mapSrc ? (
              <iframe title={`PowerGlide ${branch.name} branch map`} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <div className="map__placeholder">
                <MapPin size={32} aria-hidden="true" />
                <p><strong>Google Maps placeholder</strong></p>
                <p className="text-sm">Set <code>mapQuery</code> for this branch in <code>src/data/branches.ts</code> to show the map.</p>
              </div>
            )}
          </div>
          {mapHref && (
            <div><Button href={mapHref} newTab variant="outline" icon={<MapPin size={18} aria-hidden="true" />}>Open in Google Maps</Button></div>
          )}
        </div>
      </section>
    </>
  );
}
