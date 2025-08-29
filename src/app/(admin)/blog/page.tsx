
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { getBlogPosts, saveBlogPosts, type BlogPost } from '@/services/blog';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadPosts = () => {
      setIsLoading(true);
      try {
        const loadedPosts = getBlogPosts();
        setPosts(loadedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        toast({
          title: "Error",
          description: "Could not load posts.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [toast]);

  const openAddDialog = () => {
    setCurrentPost({
        title: '',
        category: '',
        image: '',
        content: '',
    });
    setIsDialogOpen(true);
  }

  const openEditDialog = (post: BlogPost) => {
      setCurrentPost(post);
      setIsDialogOpen(true);
  }
  
  const handleSavePost = async () => {
      if (!currentPost) return;
      setIsSaving(true);
      try {
        let updatedPosts;
        if (currentPost.id) {
            updatedPosts = posts.map(p => p.id === currentPost.id ? currentPost as BlogPost : p);
            toast({ title: "Success", description: "Post updated successfully." });
        } else {
            const newPost: BlogPost = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                title: currentPost.title || '',
                category: currentPost.category || '',
                image: currentPost.image || 'https://placehold.co/600x400.png',
                content: currentPost.content || '',
            }
            updatedPosts = [newPost, ...posts];
            toast({ title: "Success", description: "Post added successfully." });
        }
        setPosts(updatedPosts);
        saveBlogPosts(updatedPosts);
        setIsDialogOpen(false);
        setCurrentPost(null);
      } catch (error) {
        console.error("Error saving post: ", error);
        toast({
            title: "Error",
            description: "Could not save post. Please try again.",
            variant: "destructive",
        });
      } finally {
          setIsSaving(false);
      }
  }

  const handleRemovePost = async (id: string) => {
    try {
        const updatedPosts = posts.filter(p => p.id !== id);
        setPosts(updatedPosts);
        saveBlogPosts(updatedPosts);
        toast({ title: "Success", description: "Post deleted successfully." });
    } catch (error) {
        console.error("Error deleting post: ", error);
        toast({
            title: "Error",
            description: "Could not delete post. Please try again.",
            variant: "destructive",
        });
    }
  }
  
  const handlePostChange = (field: keyof Omit<BlogPost, 'id' | 'date'>, value: string) => {
      if(currentPost) {
        setCurrentPost({...currentPost, [field]: value});
      }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={openAddDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Blog Posts</CardTitle>
          <CardDescription>Create, edit, and manage your articles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {isLoading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : posts.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No posts found. Add a new post to get started.</p>
            ) : posts.map((post) => (
              <Card key={post.id} className="flex items-start gap-4 p-4 bg-muted/50">
                <Image src={post.image || "https://placehold.co/150x100.png"} alt={post.title} width={150} height={100} className="rounded-md object-cover"/>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-primary font-semibold">{post.category}</p>
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>Edit</Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                               <Button variant="ghost" size="icon" aria-label="Remove post">
                                   <Trash2 className="h-4 w-4 text-destructive" />
                               </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this post.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleRemovePost(post.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
              </Card>
            ))}
        </CardContent>
      </Card>

       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>{currentPost?.id ? 'Edit Post' : 'Add New Post'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="post-title">Post Title</Label>
                        <Input id="post-title" value={currentPost?.title ?? ''} onChange={(e) => handlePostChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-category">Category</Label>
                        <Input id="post-category" value={currentPost?.category ?? ''} onChange={(e) => handlePostChange('category', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="post-image">Image URL</Label>
                        <Input id="post-image" value={currentPost?.image ?? ''} onChange={(e) => handlePostChange('image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-content">Content</Label>
                        <Textarea id="post-content" rows={10} value={currentPost?.content ?? ''} onChange={(e) => handlePostChange('content', e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isSaving}>Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSavePost} disabled={isSaving}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Post
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
