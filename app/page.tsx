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
  const router = useRouter();
  const searchParams = useSearchParams();

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract search parameters from URL
  const query = searchParams.get("q") || "";
  const sort = searchParams.get("sort") || "best-match";
  const order = searchParams.get("order") || "desc";
  const perPage = Number.parseInt(searchParams.get("per_page") || "10");
  const page = Number.parseInt(searchParams.get("page") || "1");

  const searchOptions: SearchParams = {
    q: query,
    sort: sort as any,
    order: order as any,
    per_page: perPage,
    page,
  };

  // Update URL when search parameters change
  const updateSearchParams = (newParams: Partial<SearchParams>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString());
      }
    });

    // Reset to page 1 when changing search criteria
    if (
      newParams.q !== undefined ||
      newParams.sort !== undefined ||
      newParams.per_page !== undefined
    ) {
      params.set("page", "1");
    }

    router.push(`/?${params.toString()}`);
  };

  // Perform search when parameters change
  useEffect(() => {
    if (!query.trim()) {
      setRepositories([]);
      setTotalCount(0);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await searchRepositories(searchOptions);
        setRepositories(result.items);
        setTotalCount(result.total_count);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while searching"
        );
        setRepositories([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [query, sort, order, perPage, page]);

  const totalPages = Math.min(Math.ceil(totalCount / perPage), 100);

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

          <SearchForm
            query={query}
            sort={sort}
            order={order}
            perPage={perPage}
            onSearch={updateSearchParams}
          />

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

          {!loading && repositories.length > 0 && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">
                      Found {repositories.length} amazing repositories
                    </p>
                    {totalPages >= 100 && (
                      <p className="text-xs text-muted-foreground">
                        Showing first 100 pages of results
                      </p>
                    )}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span>Live from GitHub</span>
                </div>
              </div>

              <RepositoryList repositories={repositories} />

              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={(newPage) =>
                      updateSearchParams({ page: newPage })
                    }
                  />
                </div>
              )}
            </>
          )}

          {!loading && query && repositories.length === 0 && !error && (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <Github className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No repositories found
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any repositories matching "{query}". Try
                adjusting your search terms or filters.
              </p>
            </div>
          )}

          {!query && (
            <div className="text-center py-16">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center relative">
                <Github className="w-16 h-16 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Ready to explore?</h3>
              <p className="text-muted-foreground max-w-md mx-auto text-lg">
                Enter a search term above to discover amazing open-source
                projects from the GitHub community
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
