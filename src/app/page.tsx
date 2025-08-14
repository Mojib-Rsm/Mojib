import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Projects } from '@/components/sections/Projects';
import { Testimonials } from '@/components/sections/Testimonials';
import { Achievements } from '@/components/sections/Achievements';
import { Faq } from '@/components/sections/Faq';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <Achievements />
      <Faq />
    </div>
  );
}
