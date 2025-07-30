"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Sparkles } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { RepositoryList } from "@/components/repository-list";
import { Pagination } from "@/components/pagination";
import { ThemeToggle } from "@/components/theme-toggle";
import { searchRepositories } from "@/lib/github-api";
import type { Repository, SearchParams } from "@/types/github";

export default function HomePage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Github className="h-8 w-8 text-primary" />
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  GitHub Explorer
                </h1>
                <p className="text-xs text-muted-foreground">
                  Discover amazing repositories
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Powered by GitHub API v3
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent">
              Explore the
              <br />
              <span className="relative">
                GitHub Universe
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Search through millions of repositories, discover trending
              projects, and find your next favorite open-source tool
            </p>
          </div>

          {error && (
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <p className="font-medium">Oops! Something went wrong</p>
              </div>
              <p className="mt-1 opacity-90">{error}</p>
            </div>
          )}

          {loading && (
            <div className="text-center py-16">
              <div className="relative inline-block">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
              </div>
              <p className="mt-6 text-lg text-muted-foreground">
                Searching the GitHub universe...
              </p>
              <div className="flex justify-center gap-1 mt-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce animation-delay-100"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce animation-delay-200"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
