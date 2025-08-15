'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Briefcase, Eye, FileText } from "lucide-react";
import Link from "next/link";

const stats = [
    { title: 'Total Visitors', value: '1,25,430', icon: <Eye className="w-6 h-6 text-primary" /> },
    { title: 'Form Submissions', value: '1,280', icon: <FileText className="w-6 h-6 text-primary" /> },
    { title: 'Project Views', value: '9,780', icon: <Briefcase className="w-6 h-6 text-primary" /> },
]

const quickLinks = [
    { label: 'Portfolio', href: '/#portfolio' },
    { label: 'Services', href: '/#services' },
    { label: 'Blog', href: '/#blog' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
         <div className="flex items-center gap-4">
            <Bell className="text-muted-foreground cursor-pointer" />
            <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" />
                <AvatarFallback>A</AvatarFallback>
            </Avatar>
        </div>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>A quick look at your site's performance.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index} className="bg-muted/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                           {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Navigate to important sections quickly.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
            {quickLinks.map((link, index) => (
                <Button key={index} asChild>
                    <Link href={link.href}>{link.label}</Link>
                </Button>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
