'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingData = [
  {
    title: 'Basic',
    price: '$49',
    description: 'For small projects and startups.',
    features: ['UI/UX Design', '10 Pages', '3 Revisions', 'Basic Support'],
    popular: false,
  },
  {
    title: 'Standard',
    price: '$99',
    description: 'For growing businesses.',
    features: ['UI/UX Design & Development', '20 Pages', '5 Revisions', 'Priority Support', 'Source Files'],
    popular: true,
  },
  {
    title: 'Premium',
    price: '$199',
    description: 'For large-scale projects.',
    features: ['Full Design & Dev', 'Unlimited Pages', 'Unlimited Revisions', '24/7 Support', 'Full Ownership'],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Pricing Plans</h2>
          <p className="text-muted-foreground mt-2">Choose the plan that fits your needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingData.map((plan, index) => (
            <Card key={index} className={`animate-fade-in-up ${plan.popular ? 'border-primary border-2' : ''}`} style={{ animationDelay: `${index * 200}ms` }}>
              <CardHeader className="text-center">
                {plan.popular && <div className="text-primary font-semibold mb-2">Most Popular</div>}
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <p className="text-4xl font-bold">{plan.price}<span className="text-lg font-normal text-muted-foreground">/project</span></p>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Choose Plan</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
