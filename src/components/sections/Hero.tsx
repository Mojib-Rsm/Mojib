'use client';

import Image from 'next/image';

const BrushStroke = () => (
  <svg
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto text-primary -z-10"
    viewBox="0 0 573 343"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.33388 205.945C2.33388 205.945 106.334 100.445 194.334 76.9451C282.334 53.4451 406.834 -3.55493 503.834 2.94507C600.834 9.44507 553.834 167.445 517.834 220.445C481.834 273.445 422.334 330.445 351.334 337.945C280.334 345.445 130.334 322.945 52.8339 276.445C-24.6661 229.945 2.33388 205.945 2.33388 205.945Z"
      fill="currentColor"
    />
  </svg>
);

const DesignerBadge = () => (
  <div className="absolute bottom-8 right-8 flex items-center gap-4 bg-background p-4 rounded-lg shadow-md">
    <div className="relative w-16 h-16">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 animate-spin-slow"
        style={{ animationDuration: '20s' }}
      >
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
          ></path>
        </defs>
        <text>
          <textPath href="#circlePath" startOffset="0%" className="text-[10px] tracking-widest uppercase fill-current">
            IDF Certified Professional UI/UX Designer •&nbsp;
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-2 border-2 border-dashed rounded-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      </div>
    </div>
    <div className="text-left">
      <p className="font-semibold">IDF CERTIFIED</p>
      <p className="text-sm text-muted-foreground">PROFESSIONAL</p>
      <p className="text-sm text-muted-foreground">UI/UX DESIGNER</p>
    </div>
  </div>
);


export function Hero() {
  return (
    <section className="container max-w-screen-xl mx-auto py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        
        <div className="flex flex-col gap-6 items-start text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Hey There, <br /> I'm Binjan
          </h1>
          <a href="mailto:banjan10@gmail.com" className="text-orange-600 font-medium hover:underline">
            banjan10@gmail.com
          </a>
          <div className="mt-8">
            <p className="text-5xl font-bold">10</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Years <br/>Experience</p>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[600px]">
          <div className="absolute right-0 top-0 text-right max-w-xs">
            <p className="text-lg text-foreground">
              I design beautifully simple things, And I love what I do.
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[300px] h-[450px] md:w-[350px] md:h-[525px]">
              <BrushStroke />
              <Image
                src="https://placehold.co/400x600.png"
                alt="Portrait of Binjan, a UI/UX designer"
                width={400}
                height={600}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="man red beanie"
              />
            </div>
          </div>
          
          <DesignerBadge />

        </div>
      </div>
    </section>
  );
}
