import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import SeasonalMarquee from '@/components/sections/SeasonalMarquee';
import ProductFeature from '@/components/sections/ProductFeature';
import ProcessCards from '@/components/sections/ProcessCards';
import ProvenanceMap from '@/components/sections/ProvenanceMap';
import Archive from '@/components/sections/Archive';
import RitualMoments from '@/components/sections/RitualMoments';
import SubscriptionChooser from '@/components/sections/SubscriptionChooser';
import BakersNote from '@/components/sections/BakersNote';
import FooterLabel from '@/components/sections/FooterLabel';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SeasonalMarquee />
        <ProductFeature />
        <ProcessCards />
        <ProvenanceMap />
        <Archive />
        <RitualMoments />
        <SubscriptionChooser />
        <BakersNote />
      </main>
      <FooterLabel />
    </>
  );
}
