
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

function AdminRedirect() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait until the authentication state is determined
    if (!loading) {
      if (user) {
        // If user is authenticated, redirect to the dashboard
        router.replace('/admin/dashboard');
      } else {
        // If not authenticated, redirect to the login page
        router.replace('/login');
      }
    }
  }, [router, user, loading]);

  // Show a loader while authentication is in progress
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}


export default function AdminPage() {
    // AuthProvider is already in the root layout, so we don't need it here.
    return <AdminRedirect />
}
