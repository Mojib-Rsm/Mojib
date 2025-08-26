
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Code, Megaphone, Palette, PlusCircle, Search, Trash2, Wand2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { getServices, addService, updateService, deleteService, Service } from '@/services/services';
import { useToast } from '@/hooks/use-toast';

const iconComponents: {[key: string]: React.ElementType} = {
    Wand2, Bot, Megaphone, Search, Code, Palette
}

const initialServices = [
  {
    icon: 'Wand2',
    title: 'WordPress Development',
    description: 'Creating custom WordPress themes and plugins. I build responsive, fast, and user-friendly websites tailored to your specific needs.',
  },
  {
    icon: 'Bot',
    title: 'AI Integration',
    description: 'Integrating AI-powered features like chatbots and content generators into your website to enhance user engagement and automate tasks.',
  },
  {
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'Helping your business grow online through strategies like SEO, social media marketing, and content creation to increase your visibility and reach.',
  },
    {
    icon: 'Search',
    title: 'SEO Optimization',
    description: 'Improving your website’s ranking on search engines like Google to attract more organic traffic and potential customers.',
  },
  {
    icon: 'Palette',
    title: 'UI/UX & Graphics Design',
    description: 'Designing intuitive user interfaces and stunning graphics that provide a great user experience and make your brand stand out.',
  },
   {
    id: 6,
    icon: 'Code',
    title: 'Basic Web Coding',
    description: 'I have a foundational understanding of coding and can assist with basic customizations using HTML, CSS, and JavaScript for your web projects.',
  },
];

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null);
  const { toast } = useToast();

  const fetchAndSeedServices = async () => {
    setIsLoading(true);
    try {
      let fetchedServices = await getServices();
      if (fetchedServices.length === 0) {
        // Seed data if collection is empty
        const seedPromises = initialServices.map(service => addService(service as Omit<Service, 'id' | 'createdAt'>));
        await Promise.all(seedPromises);
        fetchedServices = await getServices();
        toast({
          title: "Demo services seeded!",
          description: "Initial services have been added to Firestore.",
        });
      }
      setServices(fetchedServices);
    } catch (error) {
      console.error("Error fetching or seeding services: ", error);
      toast({
        title: "Error",
        description: "Could not fetch services. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSeedServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const fetchedServices = await getServices();
      setServices(fetchedServices);
    } catch (error) {
       console.error("Error fetching services: ", error);
        toast({
          title: "Error",
          description: "Could not fetch services. Please try again.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }

  const openAddDialog = () => {
    setCurrentService({ title: '', description: '', icon: 'Wand2'});
    setIsDialogOpen(true);
  }

  const openEditDialog = (service: Service) => {
      setCurrentService(service);
      setIsDialogOpen(true);
  }
  
  const handleSaveService = async () => {
      if (!currentService) return;
      setIsSaving(true);
      try {
        if (currentService.id) {
            const { id, ...data } = currentService;
            await updateService(id, data as Omit<Service, 'id' | 'createdAt'>);
            toast({ title: "Success", description: "Service updated successfully." });
        } else {
            const { id, ...data } = currentService;
            await addService(data as Omit<Service, 'id' | 'createdAt'>);
            toast({ title: "Success", description: "Service added successfully." });
        }
        await fetchServices();
        setIsDialogOpen(false);
        setCurrentService(null);
      } catch (error) {
         console.error("Error saving service: ", error);
         toast({
            title: "Error",
            description: "Could not save service. Please try again.",
            variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
  }

  const handleRemoveService = async (id: string) => {
      try {
        await deleteService(id);
        toast({ title: "Success", description: "Service deleted successfully." });
        await fetchServices();
      } catch (error) {
        console.error("Error deleting service: ", error);
        toast({
            title: "Error",
            description: "Could not delete service. Please try again.",
            variant: "destructive",
        });
      }
  }
  
  const handleServiceChange = (field: keyof Omit<Service, 'id'| 'createdAt'>, value: string) => {
      if(currentService) {
        setCurrentService({...currentService, [field]: value});
      }
  }
  
  const renderIcon = (iconName: string) => {
      const Icon = iconComponents[iconName];
      return Icon ? <Icon className="w-8 h-8 text-primary" /> : null;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Services Management</h1>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Add, edit, or remove the services you offer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading ? (
             <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : (
            <div className="space-y-4">
              {services.map((service) => (
                <Card key={service.id} className="flex items-center justify-between p-4 bg-muted/50">
                  <div className="flex items-center gap-4">
                    {renderIcon(service.icon)}
                    <div>
                        <h3 className="font-semibold">{service.title}</h3>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(service)}>Edit</Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Remove service">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this service.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleRemoveService(service.id)}>Delete</AlertDialogAction>
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
                    <DialogTitle>{currentService?.id ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="service-title">Service Title</Label>
                        <Input id="service-title" value={currentService?.title ?? ''} onChange={(e) => handleServiceChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-description">Description</Label>
                        <Textarea id="service-description" value={currentService?.description ?? ''} onChange={(e) => handleServiceChange('description', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-icon">Icon Name</Label>
                        <Input id="service-icon" value={currentService?.icon ?? ''} onChange={(e) => handleServiceChange('icon', e.target.value)} />
                        <p className="text-xs text-muted-foreground">
                            Use a valid Lucide icon name (e.g., Wand2, Bot, Megaphone).
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSaving}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveService} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
