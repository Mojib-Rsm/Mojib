'use client';

const experienceData = [
  {
    company: 'Self-Employed, Brisbane',
    dates: 'Sep 2014 - Aug 2016',
    role: 'Visual Designer',
    description: 'A visual designer designs for a variety of platforms, which may include Internet and intranet sites, games, movies, kiosks and wearables. In short, they create the concepts.',
    color: 'bg-teal-500',
  },
  {
    company: 'New Man Services',
    dates: 'Jan 2017 - Mar 2018',
    role: 'UI/UX Designer',
    description: 'User interface design or user interface engineering is the design of user interfaces for machines and software, such as computers, home appliances, mobile devices.',
    color: 'bg-red-500',
  },
  {
    company: 'Global Solution',
    dates: 'Feb 2019 - Mar 2020',
    role: 'Sr. Product Designer',
    description: 'Find Product Photography Canada. Large Selection. Always Sale. Cheap Prices. Full Offer. Save Online. Compare Online. Simple Search. The Best Price. Compare Simply.',
    color: 'bg-yellow-500',
  },
];

const ExperienceItem = ({ item, isLast }) => (
    <div className="flex items-start">
      <div className="w-1/3 text-right pr-8">
        <h3 className="font-bold">{item.company}</h3>
        <p className="text-sm text-muted-foreground">{item.dates}</p>
      </div>
      <div className="relative w-12 flex-shrink-0 flex justify-center">
        <div className={`w-4 h-4 rounded-full ${item.color} z-10`}></div>
        {!isLast && <div className="absolute top-4 left-1/2 w-0.5 h-full bg-border -translate-x-1/2"></div>}
      </div>
      <div className="w-2/3 pl-8 pb-12">
        <h3 className="font-bold text-xl">{item.role}</h3>
        <p className="text-muted-foreground mt-2">{item.description}</p>
      </div>
    </div>
);


export function Experience() {
  return (
    <section id="experience" className="bg-orange-50/50 py-20">
      <div className="container max-w-screen-lg mx-auto">
        <div className="relative">
          {experienceData.map((item, index) => (
            <ExperienceItem key={index} item={item} isLast={index === experienceData.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
