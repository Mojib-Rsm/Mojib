'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Get In Touch</h2>
          <p className="text-muted-foreground mt-2">
            Have a project in mind? I'd love to hear from you. Fill out the form or contact me directly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Input placeholder="Your Phone (Optional)" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Your Message" rows={5} />
                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Contact Information</h3>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <a href="mailto:mojibrsm@gmail.com" className="text-muted-foreground hover:text-primary">
                  mojibrsm@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <a href="tel:+8801601519007" className="text-muted-foreground hover:text-primary">
                  +8801601519007
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold">Location</h4>
                <p className="text-muted-foreground">Cox's Bazar, Bangladesh</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
