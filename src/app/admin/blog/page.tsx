

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import Image from 'next/image';

const initialPosts = [
  {
    id: 1,
    image: 'https://placehold.co/600x400.png',
    category: 'UI/UX',
    title: 'The 10 Best UI/UX Design Books to Read in 2024',
    date: 'July 19, 2024',
    content: 'This is the full content for the blog post about UI/UX books...'
  },
  {
    id: 2,
    image: 'https://placehold.co/600x400.png',
    category: 'Productivity',
    title: 'How to Stay Creative and Productive as a Designer',
    date: 'July 15, 2024',
    content: 'This is the full content for the blog post about productivity...'
  },
];

type Post = {
    id: number;
    image: string;
    category: string;
    title: string;
    date: string;
    content: string;
}

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const openAddDialog = () => {
    setCurrentPost({
        id: Date.now(),
        title: '',
        category: '',
        image: '',
        content: '',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
    setIsDialogOpen(true);
  }

  const openEditDialog = (post: Post) => {
      setCurrentPost(post);
      setIsDialogOpen(true);
  }
  
  const handleSavePost = () => {
      if (!currentPost) return;

      if (posts.some(p => p.id === currentPost.id)) {
          setPosts(posts.map(p => p.id === currentPost.id ? currentPost : p));
      } else {
          setPosts([{...currentPost, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}, ...posts]);
      }
      setIsDialogOpen(false);
      setCurrentPost(null);
  }

  const handleRemovePost = (id: number) => {
      setPosts(posts.filter(post => post.id !== id));
  }
  
  const handlePostChange = (field: keyof Omit<Post, 'id' | 'date'>, value: string) => {
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
            {posts.map((post) => (
              <Card key={post.id} className="flex items-start gap-4 p-4 bg-muted/50">
                <Image src={post.image || "https://placehold.co/150x100.png"} alt={post.title} width={150} height={100} className="rounded-md object-cover"/>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm text-primary font-semibold">{post.category}</p>
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-xs text-muted-foreground">{post.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>Edit</Button>
                           <Button variant="ghost" size="icon" onClick={() => handleRemovePost(post.id)} aria-label="Remove post">
                               <Trash2 className="h-4 w-4 text-destructive" />
                           </Button>
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
                    <DialogTitle>{posts.some(p => p.id === currentPost?.id) ? 'Edit Post' : 'Add New Post'}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label htmlFor="post-title">Post Title</Label>
                        <Input id="post-title" value={currentPost?.title} onChange={(e) => handlePostChange('title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-category">Category</Label>
                        <Input id="post-category" value={currentPost?.category} onChange={(e) => handlePostChange('category', e.target.value)} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="post-image">Image URL</Label>
                        <Input id="post-image" value={currentPost?.image} onChange={(e) => handlePostChange('image', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="post-content">Content</Label>
                        <Textarea id="post-content" rows={10} value={currentPost?.content} onChange={(e) => handlePostChange('content', e.target.value)} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSavePost}>Save Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}
