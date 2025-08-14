'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenTool, Code, Search, Megaphone, Bot, Languages } from "lucide-react";

const servicesData = [
  {
    icon: <Code className="w-10 h-10 mb-4 text-primary" />,
    title: 'Web Development',
    description: 'Custom WordPress, Laravel, and Frontend solutions tailored to your needs. I build responsive, fast, and secure websites from the ground up to help your business grow and succeed online.',
    description_bn: 'আপনার প্রয়োজন অনুযায়ী কাস্টম ওয়ার্ডপ্রেস, লারাভেল এবং ফ্রন্টএন্ড সমাধান। আমি আপনার ব্যবসাকে অনলাইনে বৃদ্ধি এবং সফল করতে দ্রুত, সুরক্ষিত এবং প্রতিক্রিয়াশীল ওয়েবসাইট তৈরি করি।',
  },
  {
    icon: <Search className="w-10 h-10 mb-4 text-primary" />,
    title: 'SEO Optimization',
    description: 'Comprehensive on-page and off-page SEO strategies to improve your search engine ranking. I help you connect with your target audience by making your site more visible and accessible.',
    description_bn: 'আপনার সার্চ ইঞ্জিন র‌্যাঙ্কিং উন্নত করার জন্য অন-পেজ এবং অফ-পেজ এসইও কৌশল। আমি আপনার সাইটকে আরও দৃশ্যমান এবং অ্যাক্সেসযোগ্য করে আপনার লক্ষ্য দর্শকদের সাথে সংযোগ স্থাপনে সহায়তা করি।',
  },
  {
    icon: <PenTool className="w-10 h-10 mb-4 text-primary" />,
    title: 'UI/UX Design',
    description: 'Clean, modern, and user-friendly interface design that provides an exceptional user experience. My goal is to create intuitive and attractive designs that are easy to navigate and use.',
    description_bn: 'পরিষ্কার, আধুনিক এবং ব্যবহারকারী-বান্ধব ইন্টারফেস ডিজাইন যা একটি ব্যতিক্রমী ব্যবহারকারীর অভিজ্ঞতা প্রদান করে। আমার লক্ষ্য হল এমন স্বজ্ঞাত এবং আকর্ষণীয় ডিজাইন তৈরি করা যা নেভিগেট এবং ব্যবহার করা সহজ।',
  },
  {
    icon: <Megaphone className="w-10 h-10 mb-4 text-primary" />,
    title: 'Digital Marketing',
    description: 'Effective social media management and campaign strategies to boost your online presence. I develop tailored marketing plans to help you reach your business goals and connect with customers.',
    description_bn: 'আপনার অনলাইন উপস্থিতি বাড়ানোর জন্য কার্যকর সোশ্যাল মিডিয়া পরিচালনা এবং প্রচারাভিযান কৌশল। আমি আপনাকে আপনার ব্যবসার লক্ষ্যে পৌঁছাতে এবং গ্রাহকদের সাথে সংযোগ স্থাপনে সহায়তা করার জন্য উপযুক্ত বিপণন পরিকল্পনা তৈরি করি।',
  },
  {
    icon: <Bot className="w-10 h-10 mb-4 text-primary" />,
    title: 'Content Writing',
    description: 'Optimized and engaging content for your website and blog that captures your brand’s voice. I write to attract and retain your audience, providing value while improving your SEO.',
    description_bn: 'আপনার ওয়েবসাইট এবং ব্লগের জন্য অপ্টিমাইজড এবং আকর্ষণীয় সামগ্রী যা আপনার ব্র্যান্ডের ভয়েসকে ধারণ করে। আমি আপনার দর্শকদের আকর্ষণ এবং ধরে রাখার জন্য লিখি, আপনার এসইও উন্নত করার সময় মূল্যবান তথ্য প্রদান করি।',
  },
  {
    icon: <Languages className="w-10 h-10 mb-4 text-primary" />,
    title: 'Translation',
    description: 'High-quality translation services to help you reach a global audience. I ensure your message is accurately and effectively communicated in different languages, maintaining its original intent.',
    description_bn: 'আপনাকে বিশ্বব্যাপী দর্শকদের কাছে পৌঁছাতে সহায়তা করার জন্য উচ্চ-মানের অনুবাদ পরিষেবা। আমি নিশ্চিত করি যে আপনার বার্তাটি বিভিন্ন ভাষায় নির্ভুল এবং কার্যকরভাবে জানানো হয়েছে, এর মূল উদ্দেশ্য বজায় রেখে।',
  },
];

export function Services() {
  return (
    <section id="services" className="bg-muted/40 py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Services I Offer</h2>
          <p className="text-muted-foreground mt-2">Providing the best solutions for your digital needs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
              <CardHeader>
                <div className="flex justify-center">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  <p className="text-sm text-muted-foreground font-bengali">{service.description_bn}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
