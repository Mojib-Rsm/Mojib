'use client';

import { useLanguage } from '@/contexts/LanguageProvider';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'CEO, Tech Solutions',
    quote: "Mojib's attention to detail and creative vision transformed our project. The final product exceeded all our expectations. A true professional and a pleasure to work with.",
    image: 'https://placehold.co/100x100.png',
    aiHint: 'woman portrait'
  },
  {
    name: 'John Smith',
    title: 'Founder, Creative Co.',
    quote: "The web application Mojib developed is not only visually stunning but also incredibly fast and intuitive. Our user engagement has skyrocketed since the launch.",
    image: 'https://placehold.co/100x100.png',
    aiHint: 'man portrait'
  },
  {
    name: 'Emily White',
    title: 'Marketing Director, Innovate Inc.',
    quote: "Working with Mojib was a seamless experience. He understood our needs perfectly and delivered a top-notch design that has received amazing feedback.",
    image: 'https://placehold.co/100x100.png',
    aiHint: 'woman face'
  },
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{t('testimonialsTitle')}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm grateful to have collaborated with so many amazing clients. Here's what they have to say.
          </p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="glass-card">
                    <CardContent className="flex flex-col items-center text-center p-8 md:p-12">
                      <Avatar className="w-20 h-20 mb-4 border-4 border-primary">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-lg italic text-foreground/80">"{testimonial.quote}"</p>
                      <div className="mt-4 font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
