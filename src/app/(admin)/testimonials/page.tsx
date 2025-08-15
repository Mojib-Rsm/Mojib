
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Star, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const initialTestimonials = [
  {
    id: 1,
    image: "https://placehold.co/100x100.png",
    name: "John Doe",
    position: "CEO, Tech Solutions",
    text: "Working with Mojib was a fantastic experience. He delivered a high-quality website that exceeded our expectations. Highly recommended!",
  },
  {
    id: 2,
    image: "https://placehold.co/100x100.png",
    name: "Jane Smith",
    position: "Marketing Manager, Creative Co.",
    text: "His expertise in digital marketing helped us double our online presence in just three months. A true professional with great insights.",
  },
];

type Testimonial = {
    id: number;
    image: string;
    name: string;
    position: string;
    text: string;
}

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);

  const openAddDialog = () => {
    setCurrentTestimonial({
        id: Date.now(), 
        name: '', 
        position: '', 
        image: '', 
        text: ''
    });
    setIsDialogOpen(true);
  }

  const openEditDialog = (testimonial: Testimonial) => {
      setCurrentTestimonial(testimonial);
      setIsDialogOpen(true);
  }
  
  const handleSaveTestimonial = () => {
      if (!currentTestimonial) return;

      if (testimonials.some(t => t.id === currentTestimonial.id)) {
          setTestimonials(testimonials.map(t => t.id === currentTestimonial.id ? currentTestimonial : t));
      } else {
          setTestimonials([...testimonials, currentTestimonial]);
      }
      setIsDialogOpen(false);
      setCurrentTestimonial(null);
  }

  const handleRemoveTestimonial = (id: number) => {
      setTestimonials(testimonials.filter(t => t.id !== id));
  }
  
  const handleTestimonialChange = (field: keyof Omit<Testimonial, 'id'>, value: string) => {
      if(currentTestimonial) {
        setCurrentTestimonial({...currentTestimonial, [field]: value});
      }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Testimonial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Feedback</CardTitle>
          <CardDescription>Manage the testimonials displayed on your website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="bg-muted/50">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <Avatar className="h-20 w-20 border mb-4">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <p className="text-sm text-foreground mt-4 italic">"{testimonial.text}"</p>
                    </CardContent>
                    <div className="flex items-center justify-center gap-2 p-4 border-t">
                       <Button variant="outline" size="sm" onClick={() => openEditDialog(testimonial)}>Edit</Button>
                       <Button variant="ghost" size="icon" onClick={() => handleRemoveTestimonial(testimonial.id)} aria-label="Remove testimonial">
                           <Trash2 className="h-4 w-4 text-destructive" />
                       </Button>
                    </div>
                  </Card>
                ))}
            </div>
        </CardContent>
      </Card>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{testimonials.some(p => p.id === currentTestimonial?.id) ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="t-name">Client Name</Label>
                        <Input id="t-name" value={currentTestimonial?.name} onChange={(e) => handleTestimonialChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t-position">Position / Company</Label>
                        <Input id="t-position" value={currentTestimonial?.position} onChange={(e) => handleTestimonialChange('position', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="t-image">Image URL</Label>
                        <Input id="t-image" value={currentTestimonial?.image} onChange={(e) => handleTestimonialChange('image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t-text">Feedback Text</Label>
                        <Textarea id="t-text" value={currentTestimonial?.text} onChange={(e) => handleTestimonialChange('text', e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveTestimonial}>Save Testimonial</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
