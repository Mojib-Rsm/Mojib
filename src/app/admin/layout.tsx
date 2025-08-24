

'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { AreaChart, Briefcase, FileText, HelpCircle, History, Home, Image as ImageIcon, LogOut, MailQuestion, MessageSquare, Newspaper, Settings, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <div className="p-2 rounded-md bg-primary text-primary-foreground">
                    <Zap className="h-5 w-5"/>
                </div>
                <h2 className="text-xl font-bold group-data-[collapsible=icon]:hidden">Admin</h2>
            </div>
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
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
               <SidebarMenuButton href="/admin/analytics" isActive={pathname.startsWith('/admin/analytics')} tooltip="Analytics">
                <AreaChart />
                 <span className="group-data-[collapsible=icon]:hidden">Analytics</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/content" isActive={pathname.startsWith('/admin/content')} tooltip="Content">
                <FileText />
                 <span className="group-data-[collapsible=icon]:hidden">Content</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/blog" isActive={pathname.startsWith('/admin/blog')} tooltip="Blog">
                <Newspaper />
                 <span className="group-data-[collapsible=icon]:hidden">Blog</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/projects" isActive={pathname.startsWith('/admin/projects')} tooltip="Projects">
                <Briefcase />
                 <span className="group-data-[collapsible=icon]:hidden">Projects</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/media" isActive={pathname.startsWith('/admin/media')} tooltip="Media">
                <ImageIcon />
                 <span className="group-data-[collapsible=icon]:hidden">Media</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton href="/admin/requests" isActive={pathname.startsWith('/admin/requests')} tooltip="Requests">
                <MailQuestion />
                 <span className="group-data-[collapsible=icon]:hidden">Requests</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
               <SidebarMenuButton href="/admin/messages" isActive={pathname.startsWith('/admin/messages')} tooltip="Messages">
                <MessageSquare />
                 <span className="group-data-[collapsible=icon]:hidden">Messages</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
               <SidebarMenuButton href="/admin/history" isActive={pathname.startsWith('/admin/history')} tooltip="History">
                <History />
                 <span className="group-data-[collapsible=icon]:hidden">History</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="bg-muted rounded-lg p-4 text-center group-data-[collapsible=icon]:hidden">
                <h4 className="font-semibold text-sm mb-1">Upgrade to Pro</h4>
                <p className="text-xs text-muted-foreground mb-3">Get 1 month free and unlock more features.</p>
                <Button size="sm" className="w-full">Upgrade</Button>
            </div>
             <SidebarMenu>
                <SidebarMenuItem>
                <SidebarMenuButton href="/admin/settings" isActive={pathname.startsWith('/admin/settings')} tooltip="Settings">
                    <Settings />
                    <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                <SidebarMenuButton href="#" tooltip="Help & Information">
                    <HelpCircle />
                    <span className="group-data-[collapsible=icon]:hidden">Help & Information</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
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
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-6 bg-background min-h-screen">
            <div className="md:hidden flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-md bg-primary text-primary-foreground">
                        <Zap className="h-5 w-5"/>
                    </div>
                    <h2 className="text-xl font-bold">Admin</h2>
                </div>
                <SidebarTrigger />
            </div>
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
