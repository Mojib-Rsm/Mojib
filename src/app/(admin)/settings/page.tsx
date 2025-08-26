
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialSkills = [
    { id: 1, label: 'Experience', value: '3+ Years' },
    { id: 2, label: 'Projects', value: '50+ Completed' },
    { id: 3, label: 'Happy Clients', value: '40+' },
]

export default function SettingsPage() {
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState('/uploads/about-sec.jpeg');
  const [bio, setBio] = useState("I am a technology enthusiast with a strong passion for WordPress development, AI, and digital marketing. My goal is to create amazing online experiences that are not only visually appealing but also smart and effective. I enjoy solving problems and constantly learning new things to stay at the forefront of technology.");
  const [skills, setSkills] = useState(initialSkills);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
            setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSkillChange = (id: number, field: 'label' | 'value', value: string) => {
      setSkills(skills.map(skill => skill.id === id ? {...skill, [field]: value} : skill));
  }

  const removeSkill = (id: number) => {
      setSkills(skills.filter(skill => skill.id !== id));
  }
  
  const addSkill = () => {
      const newId = skills.length > 0 ? Math.max(...skills.map(s => s.id)) + 1 : 1;
      setSkills([...skills, {id: newId, label: 'New Highlight', value: 'Value'}]);
  }

  const handleSaveChanges = () => {
    const settingsData = {
      profileImage,
      bio,
      skills
    };
    // In a real app, you would send this to your backend/database
    console.log("Saving changes:", settingsData); 
    toast({
      title: "Settings Saved!",
      description: "Your changes have been successfully saved.",
    })
  }


  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>About Me Section</CardTitle>
          <CardDescription>Update your profile picture, bio, and highlighted skills.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profileImage} alt="Profile Picture" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Input id="picture" type="file" className="max-w-sm" onChange={handleImageChange} accept="image/*"/>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio / Journey</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={5}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="space-y-4">
            <Label>Skill Highlights</Label>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-4">
                  <Input 
                    value={skill.label} 
                    onChange={(e) => handleSkillChange(skill.id, 'label', e.target.value)}
                    className="flex-1"
                    placeholder="Label (e.g., Experience)"
                  />
                  <Input 
                    value={skill.value} 
                    onChange={(e) => handleSkillChange(skill.id, 'value', e.target.value)}
                    className="flex-1"
                    placeholder="Value (e.g., 3+ Years)"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeSkill(skill.id)} aria-label="Remove skill">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
             <Button variant="outline" size="sm" onClick={addSkill} className="mt-2">
                Add Highlight
            </Button>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
