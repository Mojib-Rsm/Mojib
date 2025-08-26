
import { About } from '@/components/sections/About';
import { Blog } from '@/components/sections/Blog';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Faq } from '@/components/sections/Faq';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Pricing } from '@/components/sections/Pricing';
import { Services } from '@/components/sections/Services';
import { Skills } from '@/components/sections/Skills';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Services />
      <Experience />
      <Skills />
      <Portfolio />
      <Gallery />
      <Pricing />
      <Blog />
      <Faq />
      <Contact />
    </div>
  );
}
