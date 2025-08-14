'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const pricingData = [
  {
    title: 'Basic Website',
    price: '৳15,000',
    description: 'one-time',
    features: ['5 Pages', 'Responsive Design', 'Contact Form', 'Basic SEO', '1 Month Support'],
    popular: false,
  },
  {
    title: 'Standard Business',
    price: '৳35,000',
    description: 'one-time',
    features: ['10 Pages', 'Custom Design', 'CMS Integration', 'Advanced SEO', '3 Months Support'],
    popular: true,
  },
  {
    title: 'E-commerce',
    price: '৳70,000',
    description: 'one-time',
    features: ['Unlimited Products', 'Payment Gateway', 'Admin Panel', 'Premium SEO', '6 Months Support'],
    popular: false,
  },
];

export function Pricing() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section 
      id="pricing" 
      className="py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container max-w-screen-xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-4xl font-bold">My Packages</h2>
          <p className="text-muted-foreground mt-2">Choose a package that suits your needs or contact me for a custom quote.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingData.map((plan, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className={`flex flex-col ${plan.popular ? 'border-primary border-2 rounded-lg' : ''}`}
            >
              <Card className="flex flex-col h-full glass-card">
                <CardHeader className="text-center">
                  {plan.popular && <div className="text-primary font-semibold mb-2">Popular</div>}
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <p className="text-4xl font-bold">{plan.price}</p>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
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
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>Order Now</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
