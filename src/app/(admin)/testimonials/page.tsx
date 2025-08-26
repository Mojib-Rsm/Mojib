
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, Testimonial } from '@/services/testimonials';

const initialTestimonials = [
  {
    image: "https://placehold.co/100x100.png",
    name: "John Doe",
    position: "CEO, Tech Solutions",
    text: "Working with Mojib was a fantastic experience. He delivered a high-quality website that exceeded our expectations. Highly recommended!",
  },
  {
    image: "https://placehold.co/100x100.png",
    name: "Jane Smith",
    position: "Marketing Manager, Creative Co.",
    text: "His expertise in digital marketing helped us double our online presence in just three months. A true professional with great insights.",
  },
];

export default function TestimonialsManagementPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
        setIsLoading(true);
        try {
            let fetchedTestimonials = await getTestimonials();
            if (fetchedTestimonials.length === 0) {
                const seedPromises = initialTestimonials.map(t => addTestimonial(t as Omit<Testimonial, 'id' | 'createdAt'>));
                await Promise.all(seedPromises);
                fetchedTestimonials = await getTestimonials();
                toast({
                    title: "Demo testimonials seeded!",
                    description: "Initial testimonials have been added to Firestore.",
                });
            }
            setTestimonials(fetchedTestimonials);
        } catch (error) {
            console.error("Error fetching testimonials: ", error);
            toast({
                title: "Error",
                description: "Could not fetch testimonials. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }
    fetchTestimonials();
  }, [toast]);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const fetchedTestimonials = await getTestimonials();
      setTestimonials(fetchedTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials: ", error);
      toast({
        title: "Error",
        description: "Could not fetch testimonials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const openAddDialog = () => {
    setCurrentTestimonial({
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
  
  const handleSaveTestimonial = async () => {
      if (!currentTestimonial) return;
      setIsSaving(true);
      try {
        if (currentTestimonial.id) {
            const { id, ...data } = currentTestimonial;
            await updateTestimonial(id, data as Omit<Testimonial, 'id' | 'createdAt'>);
            toast({ title: "Success", description: "Testimonial updated successfully." });
        } else {
            const { id, ...data } = currentTestimonial;
            await addTestimonial(data as Omit<Testimonial, 'id' | 'createdAt'>);
            toast({ title: "Success", description: "Testimonial added successfully." });
        }
        await fetchTestimonials();
        setIsDialogOpen(false);
        setCurrentTestimonial(null);
      } catch(error) {
          console.error("Error saving testimonial: ", error);
          toast({
              title: "Error",
              description: "Could not save testimonial. Please try again.",
              variant: "destructive",
          });
      } finally {
        setIsSaving(false);
      }
  }

  const handleRemoveTestimonial = async (id: string) => {
    try {
        await deleteTestimonial(id);
        toast({ title: "Success", description: "Testimonial deleted successfully." });
        await fetchTestimonials();
    } catch (error) {
        console.error("Error deleting testimonial: ", error);
        toast({
            title: "Error",
            description: "Could not delete testimonial. Please try again.",
            variant: "destructive",
        });
    }
  }
  
  const handleTestimonialChange = (field: keyof Omit<Testimonial, 'id' | 'createdAt'>, value: string) => {
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
            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Remove testimonial">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this testimonial.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleRemoveTestimonial(testimonial.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        </div>
                    </Card>
                    ))}
                </div>
            )}
        </CardContent>
      </Card>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{currentTestimonial?.id ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="t-name">Client Name</Label>
                        <Input id="t-name" value={currentTestimonial?.name ?? ''} onChange={(e) => handleTestimonialChange('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t-position">Position / Company</Label>
                        <Input id="t-position" value={currentTestimonial?.position ?? ''} onChange={(e) => handleTestimonialChange('position', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="t-image">Image URL</Label>
                        <Input id="t-image" value={currentTestimonial?.image ?? ''} onChange={(e) => handleTestimonialChange('image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="t-text">Feedback Text</Label>
                        <Textarea id="t-text" value={currentTestimonial?.text ?? ''} onChange={(e) => handleTestimonialChange('text', e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSaving}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveTestimonial} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Testimonial
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
