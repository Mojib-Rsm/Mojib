'use client';

import Image from 'next/image';

const galleryImages = [
  { src: "https://www.mojib.me/uploads/1752046515076-1725103684395.jpg", alt: "Bangladesh Jatiya Sangsad" },
  { src: "https://www.mojib.me/uploads/1752046533263-IMG-20240920-WA0045-EDIT.jpg", alt: "With delwar Friend" },
  { src: "https://www.mojib.me/uploads/1752046710975-FB_IMG_1728372217283.jpg", alt: "July Revolution (Bangladesh) 2024" },
  { src: "https://www.mojib.me/uploads/1752046723676-IMG20250619130703f.jpg", alt: "in college farewall day" },
  { src: "https://www.mojib.me/uploads/1752046739672-IMG20250619130510.jpg", alt: "in college farewall day" },
  { src: "https://www.mojib.me/uploads/1754960669253-485138794_668780005565511_8193880567669148641_n.jpg", alt: "working on a laptop" },
  { src: "https://www.mojib.me/uploads/1752046740793-aulbtu.jpg", alt: "Eid 2024" },
  { src: "https://www.mojib.me/uploads/1752046744345-Mojibur_Rahman_sm.png", alt: "my Passport size image" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">My Gallery</h2>
          <p className="text-muted-foreground mt-2">A collection of moments and creations that inspire me.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-auto object-cover aspect-square transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-center text-sm font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
