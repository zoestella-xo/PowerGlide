import { Accreditation } from '../components/home/Accreditation';
import { AboutTeaser } from '../components/home/AboutTeaser';
import { BookingCTA } from '../components/home/BookingCTA';
import { ContactCTA } from '../components/home/ContactCTA';
import { FeaturedParts } from '../components/home/FeaturedParts';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { Testimonials } from '../components/home/Testimonials';
import { ValueProposition } from '../components/home/ValueProposition';
import { WhyPowerGlide } from '../components/home/WhyPowerGlide';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProposition />
      <Accreditation />
      <ServicesOverview />
      <FeaturedParts />
      <WhyPowerGlide />
      <HowItWorks />
      <AboutTeaser />
      <Testimonials />
      <BookingCTA />
      <ContactCTA />
    </>
  );
}
