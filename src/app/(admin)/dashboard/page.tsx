'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, Admin!</CardTitle>
            <CardDescription>Here's an overview of your site.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You can manage your site settings, users, and content from this dashboard.</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Site Analytics</CardTitle>
             <CardDescription>A quick look at your traffic.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>1,234 Visitors</p>
             <p>5,678 Page Views</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
             <CardDescription>Latest updates on your platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>New user registered: John Doe</p>
             <p>New blog post published.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
