"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const SignInContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const originalCallbackUrl = searchParams.get("callbackUrl") || "/";
  const callbackUrl =
    originalCallbackUrl === "/sign-in" || originalCallbackUrl === "/sign-up"
      ? "/"
      : originalCallbackUrl;
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { email, password } = form;

    const { error: signInError } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: callbackUrl,
        rememberMe: form.remember,
      },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          router.push(callbackUrl);
          router.refresh();
        },
        onError: (ctx) => setError(ctx.error.message),
      }
    );

    if (signInError) {
      setError(signInError.message ?? "Something went wrong.");
    }
    setIsLoading(false);
  };

  // const handleProviderClick = async (provider: string) => {
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     await authClient.signIn.social({
  //       provider,
  //       callbackURL: callbackUrl,
  //     });
  //   } catch {
  //     setError("Failed to sign in with " + provider);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="w-full max-w-md">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Sign in to your Explainity account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-300 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@healthcare.com"
                value={form.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-purple-400 hover:text-purple-300 underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={form.remember}
                onCheckedChange={(checked) =>
                  setForm((prev) => ({
                    ...prev,
                    remember: !!checked,
                  }))
                }
                className="border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <Label htmlFor="remember" className="text-sm text-gray-300">
                Remember me
              </Label>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gray-900 px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white cursor-pointer"
              onClick={() => handleProviderClick("google")}
              disabled={isLoading}
            >
              <Image
                src="/media-icons/google-icon.svg"
                alt={"linkedin sign in logo"}
                className="h-5 w-5"
                height={20}
                width={20}
              />
              Google
            </Button>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white cursor-pointer"
              onClick={() => handleProviderClick("linkedin")}
              disabled={isLoading}
            >
              <Image
                src="/media-icons/linkedin-icon.svg"
                alt={"linkedin sign in logo"}
                className="h-5 w-5"
                height={20}
                width={20}
              />
              LinkedIn
            </Button>
          </div> */}

          <div className="text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          Secure full access to the best AI platform!
        </p>
      </div>
    </div>
  );
};

// Loading fallback component
const SignInFallback = () => (
  <div className="w-full max-w-md">
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="space-y-1">
        <div className="h-8 bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-12 bg-gray-700 rounded animate-pulse"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-start justify-center md:px-4 md:pt-10">
      <Suspense fallback={<SignInFallback />}>
        <SignInContent />
      </Suspense>
    </div>
  );
}
