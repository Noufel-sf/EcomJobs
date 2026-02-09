"use client";

import React, { useState, useActionState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/Redux/Services/AuthApi";
import { useAppDispatch } from "@/Redux/hooks";
import { setCredentials } from "@/Redux/Slices/AuthSlice";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  UserPlus,
  User,
  Loader2,
} from "lucide-react";

interface RegisterPageProps {
  className?: string;
}

interface RegisterState {
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  error: null,
  success: false,
};

const RegisterPage: React.FC<RegisterPageProps> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [register] = useRegisterMutation();

  const registerAction = async (
    prevState: RegisterState,
    formData: FormData,
  ): Promise<RegisterState> => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ user: result.user }));
      toast.success("Registration Successful 🎉");
      router.push("/");
      return { error: null, success: true };
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      const message =
        err?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
      return { error: message, success: false };
    }
  };

  const [formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <main className="min-h-screen flex flex-col lg:py-12 items-center justify-center px-4 bg-gradient-to-br from-background via-background to-muted/30">
      <h1 className="sr-only">Create Your Account - Saleh Marketplace</h1>

      <div
        className={cn("flex flex-col gap-6 w-full max-w-md", className)}
        {...props}
      >
        {/* Logo/Brand Section */}
        <div className="text-center space-y-2 mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <UserPlus className="w-8 h-8 text-primary" aria-hidden="true" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Join Us Today
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Create your account and start shopping with exclusive deals
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl p-px bg-transparent shadow-2xl">
          {/* Card content */}
          <div className="relative z-10 text-black dark:text-white rounded-xl p-6 h-full">
            <Card className="border-0 shadow-none">
              <CardHeader className="space-y-3 pb-6">
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/20 blur-3xl rounded-full opacity-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <CardTitle className="text-2xl font-bold text-center">
                  Create your account
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your details below to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="">
                <form action={formAction} aria-label="Registration form">
                  <div className="flex flex-col gap-6">
                    {/* Name Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="name" className="text-sm font-medium">
                        <User
                          className="w-4 h-4 inline mr-2"
                          aria-hidden="true"
                        />
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        className="h-11"
                        placeholder="John Doe"
                        required
                        autoComplete="name"
                        aria-required="true"
                        aria-label="Full name"
                        disabled={isPending}
                      />
                    </div>

                    {/* Email Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="email" className="text-sm font-medium">
                        <Mail
                          className="w-4 h-4 inline mr-2"
                          aria-hidden="true"
                        />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="h-11"
                        placeholder="name@example.com"
                        required
                        autoComplete="email"
                        aria-required="true"
                        aria-label="Email address"
                        disabled={isPending}
                      />
                    </div>

                    {/* Password Field */}
                    <div className="grid gap-3">
                      <Label htmlFor="password" className="text-sm font-medium">
                        <Lock
                          className="w-4 h-4 inline mr-2"
                          aria-hidden="true"
                        />
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="h-11 pr-10"
                          placeholder="Create a strong password"
                          required
                          autoComplete="new-password"
                          aria-required="true"
                          aria-label="Password"
                          disabled={isPending}
                          minLength={6}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          tabIndex={0}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" aria-hidden="true" />
                          ) : (
                            <Eye className="w-5 h-5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Password must be at least 6 characters long
                      </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-3 pt-2">
                      <Button
                        type="submit"
                        className="w-full h-11 font-semibold cursor-pointer"
                        variant="default"
                        size="lg"
                        disabled={isPending}
                        aria-label={
                          isPending
                            ? "Creating account..."
                            : "Create your account"
                        }
                      >
                        {isPending ? (
                          <>
                            <Loader2
                              className="w-4 h-4 mr-2 animate-spin"
                              aria-hidden="true"
                            />
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Login link */}
                  <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">
                      Already have an account?{" "}
                    </span>
                    <Link
                      href="/login"
                      className="font-medium text-primary hover:underline underline-offset-4 transition-colors cursor-pointer"
                    >
                      Sign in
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
          <span>Your data is secure with encrypted connection</span>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
