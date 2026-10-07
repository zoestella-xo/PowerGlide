import { useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { SelectField, TextAreaField, TextField } from '../components/ui/FormFields';
import { ImageFrame } from '../components/ui/ImageFrame';
import { Notice } from '../components/ui/Notice';
import { PageIntro } from '../components/ui/PageIntro';
import { RadioCards } from '../components/ui/RadioCards';
import { useBranch } from '../context/BranchContext';
import { SERVICES, getService } from '../data/services';
import { TIME_SLOTS, VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_YEARS } from '../data/vehicles';
import { useFormState } from '../hooks/useFormState';
import { useFormSubmit } from '../hooks/useFormSubmit';
import type { HandoverChoice } from '../types';
import { makeReference } from '../utils/format';
import { optionalEmail, phone, required } from '../utils/validation';

const HANDOVER = [
  { value: 'drive-in', label: 'Drive-in', description: 'Bring the car once your appointment is confirmed.' },
  { value: 'pickup', label: 'Pickup request', description: 'Availability and any charges confirmed separately.' },
] as const;

const prettyDate = (iso: string) =>
  iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export default function BookingPage() {
  const navigate = useNavigate();
  const { submitting, error: submitError, submit } = useFormSubmit();
  const { branch, branches, setBranchId } = useBranch();
  const [params] = useSearchParams();
  const preselected = getService(params.get('service'));
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const { values, errors, set, validate } = useFormState({
    service: preselected?.name ?? '', make: '', model: '', year: '', date: '', time: '',
    name: '', phone: '', email: '', notes: '',
  });
  const [handover, setHandover] = useState<HandoverChoice>('drive-in');

  const models = values.make ? VEHICLE_MODELS[values.make] ?? [] : [];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = validate({
      service: (v) => required(v, 'Service'), make: (v) => required(v, 'Vehicle make'),
      model: (v) => required(v, 'Vehicle model'), year: (v) => required(v, 'Vehicle year'),
      date: (v) => (v && v < today ? 'Choose today or a future date.' : required(v, 'Preferred date')),
      time: (v) => required(v, 'Preferred time'), name: (v) => required(v, 'Customer name'),
      phone: (v) => phone(v), email: (v) => optionalEmail(v),
    });
    if (!ok) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    const reference = makeReference('PG-S');
    const details = [
      { label: 'Branch', value: branch.name },
      { label: 'Service', value: values.service },
      { label: 'Vehicle', value: `${values.make} ${values.model} · ${values.year}` },
      { label: 'Preferred slot', value: `${prettyDate(values.date)} · ${values.time}` },
      { label: 'Vehicle handover', value: HANDOVER.find((h) => h.value === handover)?.label ?? '' },
      { label: 'Contact', value: `${values.name} · ${values.phone}` },
    ];
    void submit(
      'service-request',
      {
        reference, location: branch.name, branchId: branch.id, serviceSlug: SERVICES.find((s) => s.name === values.service)?.slug ?? '', service: values.service, make: values.make, model: values.model, year: values.year,
        date: values.date, time: values.time, handover, name: values.name, phone: values.phone,
        email: values.email, notes: values.notes,
      },
      () => navigate('/confirmation/service', { state: { reference, details } }),
    );
  };

  const selectedService = SERVICES.find((s) => s.name === values.service);

  return (
    <>
      <PageIntro eyebrow="Service booking" title="Request a service">
        Tell us about your vehicle and when suits you. We’ll review the details and contact you to confirm.
      </PageIntro>

      <div className="container section--tight stack stack--xl">
        <Notice title="Request first. Confirmation follows.">
          Your preferred date and time are a request only. Please wait for the team to confirm availability.
        </Notice>

        <div className="workspace">
          <form className="form-card" onSubmit={handleSubmit} noValidate>
            <div className="stack stack--sm">
              <p className="eyebrow">Service request</p>
              <h2 className="h-3">A little detail goes a long way.</h2>
            </div>
            <RadioCards<string>
              legend="Choose your branch" name="branch" value={branch.id} columns={3}
              options={branches.map((b) => ({ value: b.id, label: b.name, description: b.address }))}
              onChange={setBranchId}
            />

            <hr className="divider" />


            <fieldset className="form-section">
              <legend className="h-5">Service &amp; vehicle</legend>
              <SelectField label="Service required" required placeholder="Select a service" value={values.service}
                options={SERVICES.map((s) => s.name)} error={errors.service} onChange={(e) => set('service', e.target.value)} />
              <div className="form-row">
                <SelectField label="Vehicle make" required placeholder="Select make" value={values.make} options={VEHICLE_MAKES}
                  error={errors.make} onChange={(e) => { set('make', e.target.value); set('model', ''); }} />
                <SelectField label="Vehicle model" required placeholder={values.make ? 'Select model' : 'Choose a make first'}
                  value={values.model} options={models} disabled={!values.make} error={errors.model}
                  onChange={(e) => set('model', e.target.value)} />
              </div>
              <SelectField label="Vehicle year" required placeholder="Select year" value={values.year} options={VEHICLE_YEARS}
                error={errors.year} onChange={(e) => set('year', e.target.value)} />
            </fieldset>

            <hr className="divider" />

            <fieldset className="form-section">
              <legend className="h-5">Your preferred slot</legend>
              <div className="form-row">
                <TextField label="Preferred date" required type="date" min={today} value={values.date} error={errors.date}
                  onChange={(e) => set('date', e.target.value)} />
                <SelectField label="Preferred time" required placeholder="Select time" value={values.time} options={TIME_SLOTS}
                  error={errors.time} onChange={(e) => set('time', e.target.value)} />
              </div>
              <p className="text-muted text-sm">We’ll check the workshop schedule and contact you before this slot is agreed.</p>
            </fieldset>

            <RadioCards<HandoverChoice> legend="Getting the vehicle to us" name="handover" value={handover}
              options={HANDOVER} onChange={setHandover} />

            <hr className="divider" />

            <fieldset className="form-section">
              <legend className="h-5">How can we reach you?</legend>
              <div className="form-row">
                <TextField label="Customer name" required autoComplete="name" value={values.name} error={errors.name}
                  onChange={(e) => set('name', e.target.value)} />
                <TextField label="Phone number" required type="tel" autoComplete="tel" inputMode="tel" placeholder="+233 20 000 0000"
                  value={values.phone} error={errors.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>
              <TextField label="Email" optional type="email" autoComplete="email" value={values.email} error={errors.email}
                onChange={(e) => set('email', e.target.value)} />
              <TextAreaField label="Additional information" value={values.notes}
                placeholder="e.g. Routine oil and filter service. Please check a slight noise when starting the engine."
                onChange={(e) => set('notes', e.target.value)} />
            </fieldset>

            <div className="stack stack--md">
              {submitError && <p className="field__error" role="alert">{submitError}</p>}
              <Button type="submit" block disabled={submitting}>{submitting ? 'Sending…' : 'Request Service'}</Button>
              <p className="text-muted text-sm">
                We’ll use these details to follow up on your request. No appointment is confirmed by submitting this form.
              </p>
            </div>
          </form>

          <aside className="workspace__side" aria-label="Request summary and help">
            {/* ▸ IMAGE: workshop photograph (380×270) */}
            <ImageFrame src={selectedService?.image ?? '/images/services/oil-servicing.jpg'} alt="PowerGlide technician at work"
              label="Booking — workshop photograph" className="workspace__photo" />
            <section className="recap" aria-live="polite">
              <p className="eyebrow eyebrow--gold">Your request</p>
              <h3 className="h-3">{values.service || 'Choose a service'}</h3>
              <p className="text-on-dark"><strong>{branch.name} branch</strong></p>
              <p className="text-on-dark">{values.make ? [values.make, values.model].filter(Boolean).join(' ') + (values.year ? ` · ${values.year}` : '') : 'Vehicle details to come'}</p>
              <p className="text-on-dark">
                {values.date ? `${prettyDate(values.date)}${values.time ? ` · ${values.time}` : ''}` : 'Preferred slot to come'}
                <br />Preferred slot, not confirmed
              </p>
              <hr className="recap__rule" />
              <p className="text-on-dark text-sm">We review the details, confirm availability and discuss the work with you before proceeding.</p>
            </section>
            <section className="help-card">
              <h3 className="h-5">Unsure which service?</h3>
              <p className="text-muted">Describe what you notice in the additional information field, or ask for help.</p>
              <Button to="/contact" variant="outline" block>Contact Us</Button>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
