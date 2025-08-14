import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Works } from '@/components/sections/Works';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Experience />
      <Works />
    </div>
  );
}
