'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bell, DollarSign, Heart, Users } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const chartData = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
];

const recentActivities = [
    {
        user: { name: 'John Doe', image: 'https://placehold.co/40x40.png' },
        action: 'commented on your post',
        time: '5 min ago',
    },
    {
        user: { name: 'Jane Smith', image: 'https://placehold.co/40x40.png' },
        action: 'followed you',
        time: '1 hour ago',
    },
    {
        user: { name: 'Alex Johnson', image: 'https://placehold.co/40x40.png' },
        action: 'liked your photo',
        time: '3 hours ago',
    },
     {
        user: { name: 'Emily White', image: 'https://placehold.co/40x40.png' },
        action: 'registered as a new user',
        time: '1 day ago',
    },
]

const topProducts = [
    { name: 'Dribbble', sold: 523, price: 315, revenue: 52120, rating: 4.11 },
    { name: 'Figma', sold: 230, price: 233, revenue: 25440, rating: 3.35 },
    { name: 'Snapchat', sold: 205, price: 159, revenue: 14012, rating: 3.01 },
    { name: 'Ripple', sold: 158, price: 120, revenue: 9711, rating: 2.15 },
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Likes</CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
             <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Followers</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Income & Expense</CardTitle>
            <CardDescription>A summary of your income and expense.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                       contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: 'hsl(var(--border))'
                        }}
                    />
                    <Area type="monotone" dataKey="income" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="expense" stroke="hsl(var(--secondary))" fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
         <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates on your platform.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={activity.user.image} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">{activity.user.name}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Sold Amount</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead>Rating</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topProducts.map((product, index) => (
                        <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.sold}</TableCell>
                            <TableCell>${product.price}</TableCell>
                            <TableCell>${product.revenue.toLocaleString()}</TableCell>
                            <TableCell>⭐ {product.rating}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>
    </div>
  );
}
