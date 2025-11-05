"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Home, Settings, Search, FileQuestion, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <Card
          className={`max-w-4xl w-full shadow-2xl border-0 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <CardHeader className="text-center pb-8 pt-12">
            {/* Animated 404 Icon */}
            <div className="relative mx-auto mb-8 w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl rotate-6 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-tl from-purple-500 to-pink-600 rounded-3xl -rotate-6 animate-pulse delay-300" />
              <div className="relative bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center h-full shadow-xl">
                <FileQuestion className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            {/* Title with gradient */}
            <CardTitle className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              404
            </CardTitle>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
              Page Not Found
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </h2>

            <CardDescription className="text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Oops! The landing page you&apos;re looking for seems to have wandered off. It might
              have been deleted, moved, or never existed in the first place.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-10 pb-12">
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <Button
                size="lg"
                className="h-20 flex-col gap-2 bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                asChild
              >
                <Link href="/">
                  <Home className="h-7 w-7 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Go Home</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-20 flex-col gap-2 border-2 hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 shadow-md hover:shadow-lg transition-all duration-300 group"
                asChild
              >
                <Link href="/admin">
                  <Settings className="h-7 w-7 group-hover:rotate-90 transition-transform duration-500" />
                  <span className="font-semibold">Admin Panel</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-20 flex-col gap-2 border-2 hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950 shadow-md hover:shadow-lg transition-all duration-300 group"
                asChild
              >
                <Link href="/saas-platform">
                  <Search className="h-7 w-7 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">Browse Pages</span>
                </Link>
              </Button>
            </div>

            {/* Available Pages Section */}
            <div className="text-center pt-6 border-t-2 border-dashed border-gray-300 dark:border-gray-700 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">
                  Try These Amazing Pages
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  href="/saas-platform"
                  className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  SaaS Platform
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/ai-startup"
                  className="group px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  AI Startup
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/ecommerce-store"
                  className="group px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-purple-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  E-commerce Store
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Helpful tip */}
            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground italic">
                💡 Tip: Double-check the URL or use the search function to find what you need
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
