

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';


function LoginComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // If done loading and user is logged in, redirect.
    if (!loading && user) {
      const redirectUrl = searchParams.get('redirect') || '/admin/dashboard';
      router.replace(redirectUrl);
    }
  }, [user, loading, router, searchParams]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);
    try {
      await login(email, password);
      // The useEffect hook will handle redirection on successful login
    } catch (err: any) {
       console.error("Login failed:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/operation-not-allowed') {
        setError('Invalid email or password. Please try again or check Firebase settings.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  // While checking auth state, show a loader.
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-muted admin-theme">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }

  // If not loading and user is logged in, redirect (handled by useEffect, but this prevents flashing the form).
  if (user) {
     return (
        <div className="flex items-center justify-center min-h-screen bg-muted admin-theme">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    )
  }


  // If not loading and no user, show the login form.
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted admin-theme">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the admin panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoggingIn}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoggingIn}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// AuthProvider is now in the root layout, so we don't need to wrap it here.
export default function LoginPage() {
    return <LoginComponent />;
}
    
