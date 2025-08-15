'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Code, Megaphone, Palette, Search, Trash2, Wand2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';

const initialServices = [
  {
    id: 1,
    icon: 'Wand2',
    title: 'WordPress Development',
    description: 'Creating custom WordPress themes and plugins. I build responsive, fast, and user-friendly websites tailored to your specific needs.',
  },
  {
    id: 2,
    icon: 'Bot',
    title: 'AI Integration',
    description: 'Integrating AI-powered features like chatbots and content generators into your website to enhance user engagement and automate tasks.',
  },
  {
    id: 3,
    icon: 'Megaphone',
    title: 'Digital Marketing',
    description: 'Helping your business grow online through strategies like SEO, social media marketing, and content creation to increase your visibility and reach.',
  },
    {
    id: 4,
    icon: 'Search',
    title: 'SEO Optimization',
    description: 'Improving your website’s ranking on search engines like Google to attract more organic traffic and potential customers.',
  },
  {
    id: 5,
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

const iconComponents: {[key: string]: React.ElementType} = {
    Wand2, Bot, Megaphone, Search, Code, Palette
}

type Service = {
    id: number;
    icon: string;
    title: string;
    description: string;
}


export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const openAddDialog = () => {
    setCurrentService({id: Date.now(), title: '', description: '', icon: 'Wand2'});
    setIsDialogOpen(true);
  }

  const openEditDialog = (service: Service) => {
      setCurrentService(service);
      setIsDialogOpen(true);
  }
  
  const handleSaveService = () => {
      if (!currentService) return;

      if (services.some(s => s.id === currentService.id)) {
          setServices(services.map(s => s.id === currentService.id ? currentService : s));
      } else {
          setServices([...services, currentService]);
      }
      setIsDialogOpen(false);
      setCurrentService(null);
  }

  const handleRemoveService = (id: number) => {
      setServices(services.filter(service => service.id !== id));
  }
  
  const handleServiceChange = (field: keyof Omit<Service, 'id'>, value: string) => {
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
        <Button onClick={openAddDialog}>Add New Service</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Services</CardTitle>
          <CardDescription>Add, edit, or remove the services you offer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)} aria-label="Remove service">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="flex justify-end pt-4">
                <Button>Save All Changes</Button>
            </div>
        </CardContent>
      </Card>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{currentService?.id && services.some(s => s.id === currentService.id) ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="service-title">Service Title</Label>
                        <Input id="service-title" value={currentService?.title} onChange={(e) => handleServiceChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-description">Description</Label>
                        <Textarea id="service-description" value={currentService?.description} onChange={(e) => handleServiceChange('description', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="service-icon">Icon Name</Label>
                        <Input id="service-icon" value={currentService?.icon} onChange={(e) => handleServiceChange('icon', e.target.value)} />
                        <p className="text-xs text-muted-foreground">
                            Use a valid Lucide icon name (e.g., Wand2, Bot, Megaphone).
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveService}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
