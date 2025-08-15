'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset } from "@/components/ui/sidebar";
import { Briefcase, FileText, Home, LogOut, MessageSquare, Newspaper, Settings, Star } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd have a proper auth check here
    const loggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
    setIsLoading(false);
    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-background">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold group-data-[collapsible=icon]:hidden">Admin Panel</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin/dashboard" isActive={pathname === '/admin/dashboard'} tooltip="Dashboard">
                <Home />
                <span className="group-data-[collapsible=icon]:hidden">Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton href="/admin/messages" isActive={pathname.startsWith('/admin/messages')} tooltip="Messages">
                <MessageSquare />
                 <span className="group-data-[collapsible=icon]:hidden">Messages</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/services" isActive={pathname.startsWith('/admin/services')} tooltip="Services">
                <Briefcase />
                 <span className="group-data-[collapsible=icon]:hidden">Services</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/portfolio" isActive={pathname.startsWith('/admin/portfolio')} tooltip="Portfolio">
                <FileText />
                 <span className="group-data-[collapsible=icon]:hidden">Portfolio</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/testimonials" isActive={pathname.startsWith('/admin/testimonials')} tooltip="Testimonials">
                <Star />
                 <span className="group-data-[collapsible=icon]:hidden">Testimonials</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/blog" isActive={pathname.startsWith('/admin/blog')} tooltip="Blog">
                <Newspaper />
                 <span className="group-data-[collapsible=icon]:hidden">Blog</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/admin/settings" isActive={pathname.startsWith('/admin/settings')} tooltip="Settings">
                <Settings />
                 <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarHeader>
           <SidebarMenu>
             <SidebarMenuItem>
               <SidebarMenuButton onClick={() => {
                 localStorage.removeItem('isAdminLoggedIn');
                 router.push('/login');
               }} tooltip="Logout">
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-8 bg-muted min-h-screen">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
