

'use client';

import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarInset, SidebarFooter } from "@/components/ui/sidebar";
import { AreaChart, Briefcase, FileText, HelpCircle, History, Home, ImageIcon, LogOut, MailQuestion, MessageSquare, Newspaper, Settings, Users, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <Home /> },
    { href: "/admin/analytics", label: "Analytics", icon: <AreaChart /> },
    { href: "/admin/services", label: "Services", icon: <Zap />},
    { href: "/admin/projects", label: "Projects", icon: <Briefcase /> },
    { href: "/admin/blog", label: "Blog", icon: <Newspaper /> },
    { href: "/admin/testimonials", label: "Testimonials", icon: <Users />},
    { href: "/admin/messages", label: "Messages", icon: <MessageSquare /> },
    { href: "/admin/content", label: "Content", icon: <FileText /> },
    { href: "/admin/media", label: "Media", icon: <ImageIcon /> },
    { href: "/admin/requests", label: "Requests", icon: <MailQuestion /> },
    { href: "/admin/history", label: "History", icon: <History /> },
]

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-background text-foreground"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  // Fallback if middleware fails, though middleware should handle this.
  if (!user) {
    if (typeof window !== 'undefined') {
        router.replace('/login');
    }
    return <div className="flex items-center justify-center min-h-screen bg-background text-foreground">Redirecting to login...</div>;
  }
  
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error("Logout failed:", error)
    }
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
             {navLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton href={link.href} isActive={pathname === link.href} tooltip={link.label}>
                        {link.icon}
                        <span className="group-data-[collapsible=icon]:hidden">{link.label}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
             ))}
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
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout" href="#">
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


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // AuthProvider is now in the root layout, so we just render the content
  return <AdminLayoutContent>{children}</AdminLayoutContent>
}
    
