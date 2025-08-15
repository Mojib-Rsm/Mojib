
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

const initialProjects = [
    {
        id: 1,
        image: "https://www.mojib.me/uploads/1754959172720-Screenshot-842.webp",
        title: "Oftern News Website",
        description: "A comprehensive news portal with a custom theme and plugins.",
        technologies: ["WordPress", "PHP", "MySQL"],
        link: "#",
        category: 'Web'
    },
    {
        id: 2,
        image: "https://www.mojib.me/uploads/1754959260179-images.jpeg",
        title: "Oftern Shop (E-commerce)",
        description: "A full-featured e-commerce platform with a modern tech stack.",
        technologies: ["React", "Firebase", "Node.js"],
        link: "#",
        category: 'Web'
    },
];

type Project = {
    id: number;
    image: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    category: string;
}

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [techInput, setTechInput] = useState('');

  const openAddDialog = () => {
    setCurrentProject({
        id: Date.now(), 
        title: '', 
        description: '', 
        image: '', 
        link: '', 
        technologies: [], 
        category: 'Web'
    });
    setTechInput('');
    setIsDialogOpen(true);
  }

  const openEditDialog = (project: Project) => {
      setCurrentProject(project);
      setTechInput('');
      setIsDialogOpen(true);
  }
  
  const handleSaveProject = () => {
      if (!currentProject) return;

      if (projects.some(p => p.id === currentProject.id)) {
          setProjects(projects.map(p => p.id === currentProject.id ? currentProject : p));
      } else {
          setProjects([...projects, currentProject]);
      }
      setIsDialogOpen(false);
      setCurrentProject(null);
  }

  const handleRemoveProject = (id: number) => {
      setProjects(projects.filter(project => project.id !== id));
  }
  
  const handleProjectChange = (field: keyof Omit<Project, 'id' | 'technologies'>, value: string) => {
      if(currentProject) {
        setCurrentProject({...currentProject, [field]: value});
      }
  }

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && techInput.trim() && currentProject) {
          e.preventDefault();
          if (!currentProject.technologies.includes(techInput.trim())) {
              setCurrentProject({
                  ...currentProject,
                  technologies: [...currentProject.technologies, techInput.trim()]
              });
          }
          setTechInput('');
      }
  }

  const removeTechnology = (techToRemove: string) => {
      if (currentProject) {
          setCurrentProject({
              ...currentProject,
              technologies: currentProject.technologies.filter(tech => tech !== techToRemove)
          });
      }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Portfolio Management</h1>
        <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Project
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
          <CardDescription>Manage all the projects showcased on your portfolio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <Image src={project.image || "https://placehold.co/600x400"} alt={project.title} width={600} height={400} className="w-full h-auto object-cover"/>
                  <div className="p-4">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                          {project.technologies.map(tech => <Badge key={tech} variant="secondary">{tech}</Badge>)}
                      </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 p-4 pt-0">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(project)}>Edit</Button>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveProject(project.id)} aria-label="Remove project">
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
        </CardContent>
      </Card>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{projects.some(p => p.id === currentProject?.id) ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="project-title">Project Title</Label>
                        <Input id="project-title" value={currentProject?.title} onChange={(e) => handleProjectChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-desc">Description</Label>
                        <Textarea id="project-desc" value={currentProject?.description} onChange={(e) => handleProjectChange('description', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="project-image">Image URL</Label>
                        <Input id="project-image" value={currentProject?.image} onChange={(e) => handleProjectChange('image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-link">Project Link</Label>
                        <Input id="project-link" value={currentProject?.link} onChange={(e) => handleProjectChange('link', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-category">Category</Label>
                        <Input id="project-category" value={currentProject?.category} onChange={(e) => handleProjectChange('category', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-tech">Technologies</Label>
                        <Input 
                          id="project-tech" 
                          value={techInput} 
                          onChange={(e) => setTechInput(e.target.value)}
                          onKeyDown={handleTechKeyDown}
                          placeholder="Type a technology and press Enter"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {currentProject?.technologies.map(tech => (
                                <Badge key={tech} variant="secondary">
                                    {tech}
                                    <button onClick={() => removeTechnology(tech)} className="ml-2 text-destructive hover:text-destructive/80">
                                        &times;
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveProject}>Save Project</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
