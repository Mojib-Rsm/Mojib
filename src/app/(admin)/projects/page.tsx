
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { getProjects, saveProjects, type Project } from '@/services/projects';

export default function PortfolioManagementPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null);
  const [techInput, setTechInput] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = () => {
      setIsLoading(true);
      try {
        const loadedProjects = getProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        toast({
          title: "Error",
          description: "Could not load projects.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, [toast]);

  const openAddDialog = () => {
    setCurrentProject({
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
  
  const handleSaveProject = async () => {
      if (!currentProject) return;
      setIsSaving(true);
      try {
        let updatedProjects;
        if (currentProject.id) {
            updatedProjects = projects.map(p => p.id === currentProject.id ? currentProject as Project : p);
            toast({ title: "Success", description: "Project updated successfully." });
        } else {
            const newProject: Project = {
                id: Date.now().toString(),
                title: currentProject.title || '',
                description: currentProject.description || '',
                image: currentProject.image || 'https://placehold.co/600x400.png',
                link: currentProject.link || '',
                technologies: currentProject.technologies || [],
                category: currentProject.category || 'Web',
            }
            updatedProjects = [newProject, ...projects];
            toast({ title: "Success", description: "Project added successfully." });
        }
        setProjects(updatedProjects);
        saveProjects(updatedProjects);
        setIsDialogOpen(false);
        setCurrentProject(null);
      } catch (error) {
        console.error("Error saving project: ", error);
        toast({
            title: "Error",
            description: "Could not save project. Please try again.",
            variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
  }

  const handleRemoveProject = async (id: string) => {
      try {
        const updatedProjects = projects.filter(p => p.id !== id);
        setProjects(updatedProjects);
        saveProjects(updatedProjects);
        toast({ title: "Success", description: "Project deleted successfully." });
      } catch (error) {
         console.error("Error deleting project: ", error);
         toast({
            title: "Error",
            description: "Could not delete project. Please try again.",
            variant: "destructive",
        });
      }
  }
  
  const handleProjectChange = (field: keyof Omit<Project, 'id' | 'technologies'>, value: string) => {
      if(currentProject) {
        setCurrentProject({...currentProject, [field]: value});
      }
  }

  const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && techInput.trim() && currentProject) {
          e.preventDefault();
          const currentTechs = currentProject.technologies || [];
          if (!currentTechs.includes(techInput.trim())) {
              setCurrentProject({
                  ...currentProject,
                  technologies: [...currentTechs, techInput.trim()]
              });
          }
          setTechInput('');
      }
  }

  const removeTechnology = (techToRemove: string) => {
      if (currentProject) {
          setCurrentProject({
              ...currentProject,
              technologies: (currentProject.technologies || []).filter(tech => tech !== techToRemove)
          });
      }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Management</h1>
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
            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
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
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Remove project">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this project.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleRemoveProject(project.id)}>Delete</AlertDialogAction>
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
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{currentProject?.id ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="project-title">Project Title</Label>
                        <Input id="project-title" value={currentProject?.title ?? ''} onChange={(e) => handleProjectChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-desc">Description</Label>
                        <Textarea id="project-desc" value={currentProject?.description ?? ''} onChange={(e) => handleProjectChange('description', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="project-image">Image URL</Label>
                        <Input id="project-image" value={currentProject?.image ?? ''} onChange={(e) => handleProjectChange('image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-link">Project Link</Label>
                        <Input id="project-link" value={currentProject?.link ?? ''} onChange={(e) => handleProjectChange('link', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-category">Category</Label>
                        <Input id="project-category" value={currentProject?.category ?? ''} onChange={(e) => handleProjectChange('category', e.target.value)} />
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
                            {currentProject?.technologies?.map(tech => (
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
                        <Button variant="outline" disabled={isSaving}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveProject} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Project
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}

