import Testimonials from '@/components/testimonials';
import CaseStudies from '@/components/caseStudies';
import BodySection from '@/components/bodySection';
import FeaturesContent from '@/components/featureContent';

export default function Home() {
  return (
    <div className="container mx-auto">
      <BodySection/>
      <FeaturesContent/>
      <CaseStudies/>
      <Testimonials/>
    </div>
  );
}