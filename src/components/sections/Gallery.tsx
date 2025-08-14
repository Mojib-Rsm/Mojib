'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const galleryImages = [
  { src: "/uploads/1752046515076-1725103684395.jpg", alt: "Bangladesh Jatiya Sangsad" },
  { src: "/uploads/1752046533263-IMG-20240920-WA0045-EDIT.jpg", alt: "With delwar Friend" },
  { src: "/uploads/1752046710975-FB_IMG_1728372217283.jpg", alt: "July Revolution (Bangladesh) 2024" },
  { src: "/uploads/1752046723676-IMG20250619130703f.jpg", alt: "in college farewall day" },
  { src: "/uploads/1754960582012-1752046739672-IMG20250619130510.jpg", alt: "in college farewall day" },
  { src: "/uploads/1754960669253-485138794_668780005565511_8193880567669148641_n.jpg", alt: "working on a laptop" },
  { src: "/uploads/1752046740793-aulbtu.jpg", alt: "Eid 2024" },
  { src: "/uploads/1752046744345-Mojibur_Rahman_sm.png", alt: "my Passport size image" },
];

export function Gallery() {
  const { translations } = useLanguage();
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section 
      id="gallery" 
      className="py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">{translations.galleryTitle}</h2>
          <p className="text-muted-foreground mt-2">{translations.gallerySubtitle}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index} 
              className="group relative overflow-hidden rounded-lg glass-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={400}
                height={400}
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-center text-sm font-semibold">{image.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
