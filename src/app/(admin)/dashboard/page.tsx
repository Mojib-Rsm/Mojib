
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, FileText, LineChart, MessageCircle, MoreHorizontal, Plus, Search, ThumbsUp, Timer } from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, Line, CartesianGrid } from 'recharts';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const stats = [
    { title: 'Finished', value: '18', change: '+8 tasks', icon: <ThumbsUp className="w-5 h-5 text-primary" /> },
    { title: 'Tracked', value: '31h', change: '-6 hours', icon: <Timer className="w-5 h-5 text-primary" /> },
    { title: 'Efficiency', value: '93%', change: '+12%', icon: <AreaChart className="w-5 h-5 text-primary" /> },
]

const performanceData = [
  { name: '01', ThisMonth: 4000, LastMonth: 2400 },
  { name: '02', ThisMonth: 3000, LastMonth: 1398 },
  { name: '03', ThisMonth: 2000, LastMonth: 9800 },
  { name: '04', ThisMonth: 2780, LastMonth: 3908 },
  { name: '05', ThisMonth: 1890, LastMonth: 4800 },
  { name: '06', ThisMonth: 2390, LastMonth: 3800 },
  { name: '07', ThisMonth: 3490, LastMonth: 4300 },
];

const currentTasks = [
    { title: "Product Review for UI8 Market", status: "In progress", color: "orange-500", time: "4h" },
    { title: "UX Research for Product", status: "On hold", color: "yellow-500", time: "8h" },
    { title: "App design and development", status: "Done", color: "green-500", time: "32h" },
]

const activityFeed = [
    {
        name: "Floyd Miles",
        action: "Commented on Stark Project",
        time: "10:15 AM",
        avatar: "https://placehold.co/40x40.png",
        message: "Hi! Next week we'll start a new project. I'll tell you all the details later"
    },
    {
        name: "Guy Hawkins",
        action: "Added a file to 7Heros Project",
        time: "10:15 AM",
        avatar: "https://placehold.co/40x40.png",
        attachment: { name: "Homepage.fig", size: "13.4 Mb" }
    },
     {
        name: "Kristin Watson",
        action: "Commented on 7Heros Project",
        time: "10:15 AM",
        avatar: "https://placehold.co/40x40.png",
        message: "Sure, I'll be waiting for your message."
    }
]


export default function DashboardPage() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Hello, Admin</h1>
                    <p className="text-muted-foreground">Track team progress here. You almost reached a goal!</p>
                </div>
            </div>

             <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                           <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                           {stat.icon}
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">{stat.change}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} />
                          <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value/1000}k`}/>
                          <Tooltip 
                            contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)'
                            }}
                          />
                          <Line type="monotone" dataKey="ThisMonth" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="LastMonth" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Current Tasks</CardTitle>
                </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                        {currentTasks.map((task, index) => (
                           <div key={index} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                               <div className="flex items-center gap-4">
                                   <div className="p-2 bg-muted rounded-full">
                                       <FileText className="w-5 h-5 text-muted-foreground"/>
                                   </div>
                                   <p>{task.title}</p>
                               </div>
                               <div className="flex items-center gap-4">
                                   <Badge variant="outline" className={`border-${task.color} text-${task.color}`}>
                                       <span className={`inline-block w-2 h-2 rounded-full bg-${task.color} mr-2`}></span>
                                       {task.status}
                                   </Badge>
                                   <span className="text-sm text-muted-foreground">{task.time}</span>
                                   <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                               </div>
                           </div>
                        ))}
                   </div>
                </CardContent>
            </Card>

        </div>
        <div className="space-y-6">
            <Card>
                <CardContent className="p-4 flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 border mb-4">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">Admin User</h3>
                    <p className="text-sm text-muted-foreground">@adminuser</p>
                    <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="icon"><MessageCircle className="w-4 h-4"/></Button>
                         <Button variant="outline" size="icon"><Plus className="w-4 h-4"/></Button>
                        <Button variant="outline" size="icon"><MoreHorizontal className="w-4 h-4"/></Button>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <Input placeholder="Search..." className="pl-10" />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="space-y-6">
                        {activityFeed.map((item, index) => (
                           <div key={index} className="flex gap-3">
                               <Avatar className="h-10 w-10 border">
                                    <AvatarImage src={item.avatar} alt={item.name} />
                                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="flex justify-between items-baseline">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.time}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.action}</p>
                                    {item.message && <p className="text-sm p-2 bg-muted rounded-md mt-1">{item.message}</p>}
                                    {item.attachment && (
                                         <div className="mt-1 flex justify-between items-center p-2 border rounded-md">
                                            <div>
                                                <p className="font-medium">{item.attachment.name}</p>
                                                <p className="text-xs text-muted-foreground">{item.attachment.size}</p>
                                            </div>
                                            <Button variant="ghost" size="icon"><Plus /></Button>
                                         </div>
                                    )}
                                </div>
                           </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    