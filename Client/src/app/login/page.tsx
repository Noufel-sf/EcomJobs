'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ButtonLoading } from '@/components/ui/ButtonLoading';
import { useLoginMutation } from '@/Redux/Services/AuthApi';
import { useAppDispatch } from '@/Redux/hooks';
import { setCredentials } from '@/Redux/Slices/AuthSlice';
import { Lock, Mail, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  className?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ className, ...props }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: result.user }));
      toast.success('Login Successful 🎉');
      router.push('/');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-background lg:py-12 via-background to-muted/30">
      <h1 className="sr-only">Login to Your Account - Saleh Marketplace</h1>
      
      <div
        className={cn('flex flex-col gap-6 w-full max-w-md', className)}
        {...props}
      >
        {/* Logo/Brand Section */}
        <div className="text-center space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="w-8 h-8 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Sign in to access your account and continue shopping
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl p-px bg-transparent shadow-2xl">

          {/* Card content */}
          <div className="relative z-10  text-black dark:text-white rounded-xl  p-6 h-full">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-3 pb-6">
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/20 blur-3xl rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <CardTitle className="text-2xl font-bold text-center">
                  Login to your account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials below to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <form onSubmit={handleLogin} aria-label="Login form">
                  <div className="flex flex-col gap-6">
                    {/* Email Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="email" className="text-sm font-medium">
                        <Mail className="w-4 h-4 inline mr-2" aria-hidden="true" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="h-11"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        aria-required="true"
                        aria-label="Email address"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Password Field */}
                    <div className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-sm font-medium">
                          <Lock className="w-4 h-4 inline mr-2" aria-hidden="true" />
                          Password
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="text-xs text-primary hover:underline underline-offset-4 transition-colors"
                          tabIndex={0}
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          className="h-11 pr-10"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                          required
                          autoComplete="current-password"
                          aria-required="true"
                          aria-label="Password"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          tabIndex={0}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-5 h-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-3 pt-2">
                      {isLoading ? (
                        <ButtonLoading />
                      ) : (
                        <Button 
                          type="submit" 
                          className="w-full h-11 font-semibold"
                          variant="default"
                          size="lg"
                          aria-label="Login to your account"
                        >
                          Sign In
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Sign up link */}
                  <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Don&apos;t have an account? </span>
                    <Link
                      href="/register"
                      className="font-medium text-primary hover:underline underline-offset-4 transition-colors"
                    >
                      Sign up
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          <span>Secure login with encrypted connection</span>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
