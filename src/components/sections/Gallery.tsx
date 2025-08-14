'use client';

import Image from 'next/image';

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "Gallery image 1", hint: "abstract design" },
  { src: "https://placehold.co/600x400.png", alt: "Gallery image 2", hint: "minimalist workspace" },
  { src: "https://placehold.co/600x400.png", alt: "Gallery image 3", hint: "branding mockup" },
  { src: "https://placehold.co/600x400.png", alt: "Gallery image 4", hint: "mobile app screen" },
  { src: "https://placehold.co/600x400.png", alt: "Gallery image 5", hint: "dashboard ui" },
  { src: "https://placehold.co/600x400.png", alt: "Gallery image 6", hint: "wireframe sketch" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Gallery</h2>
          <p className="text-muted-foreground mt-2">A glimpse into my creative process and projects.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <Image
                src={image.src}
                alt={image.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover transform transition-transform duration-500 ease-in-out hover:scale-105"
                data-ai-hint={image.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
