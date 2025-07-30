"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  AlertCircle,
  Star,
  Eye,
  GitFork,
  Calendar,
  Code,
  Globe,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { getRepository, getRepositoryReadme } from "@/lib/github-api"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { RepositoryDetail } from "@/types/github"

export default function RepositoryDetailPage() {
  const params = useParams()
  const owner = params.owner as string
  const name = params.name as string

  const [repository, setRepository] = useState<RepositoryDetail | null>(null)
  const [readme, setReadme] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepositoryData = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch repository details and README in parallel
        const [repoData, readmeData] = await Promise.allSettled([
          getRepository(owner, name),
          getRepositoryReadme(owner, name),
        ])

        if (repoData.status === "fulfilled") {
          setRepository(repoData.value)
        } else {
          throw new Error("Failed to fetch repository details")
        }

        if (readmeData.status === "fulfilled") {
          setReadme(readmeData.value)
        }
        // README failure is not critical, so we don't throw an error
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    if (owner && name) {
      fetchRepositoryData()
    }
  }, [owner, name])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Search
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative inline-block mb-6">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-500 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-lg text-muted-foreground">Loading repository details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !repository) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Search
                </Button>
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-6 py-4 rounded-xl backdrop-blur-sm">
              <p className="font-medium">Error:</p>
              <p>{error || "Repository not found"}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2 hover:bg-primary/10">
                <ArrowLeft className="w-4 h-4" />
                Back to Search
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Repository Header */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5" />
              <CardHeader className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <Link
                        href={repository.owner.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <Users className="w-5 h-5" />
                        {repository.owner.login}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                      <span className="text-muted-foreground text-xl">/</span>
                      <Link
                        href={repository.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl font-bold hover:text-primary transition-colors flex items-center gap-2 group"
                      >
                        <Code className="w-5 h-5" />
                        {repository.name}
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </div>
                    {repository.description && (
                      <p className="text-muted-foreground text-lg leading-relaxed">{repository.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {repository.private && (
                      <Badge variant="outline" className="border-amber-500/50 text-amber-600 dark:text-amber-400">
                        Private
                      </Badge>
                    )}
                    {repository.stargazers_count > 1000 && (
                      <Badge className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30">
                        Popular
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <Star className="w-6 h-6 text-yellow-500" />
                    <div>
                      <div className="text-lg font-bold">{repository.stargazers_count.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Stars</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Eye className="w-6 h-6 text-blue-500" />
                    <div>
                      <div className="text-lg font-bold">{repository.watchers_count.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Watchers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <GitFork className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="text-lg font-bold">{repository.forks_count.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Forks</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    <div>
                      <div className="text-lg font-bold">{repository.open_issues_count.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Issues</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-primary" />
                    <span className="font-medium">Default branch:</span>
                    <Badge variant="outline">{repository.default_branch}</Badge>
                  </div>
                  {repository.language && (
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-primary" />
                      <span className="font-medium">Language:</span>
                      <Badge variant="outline">{repository.language}</Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="font-medium">Updated:</span>
                    <span>{new Date(repository.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* README */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  README.md
                </CardTitle>
              </CardHeader>
              <CardContent>
                {readme ? (
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <MarkdownRenderer content={readme} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                      <Globe className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">No README.md file found in this repository.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
