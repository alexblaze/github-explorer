import Link from "next/link";
import { Star, Eye, GitFork, ExternalLink, Calendar, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Repository } from "@/types/github";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const updatedDate = new Date(repository.updated_at).toLocaleDateString();

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      JavaScript: "bg-yellow-500",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      Java: "bg-red-500",
      "C++": "bg-purple-500",
      C: "bg-gray-600",
      Go: "bg-cyan-500",
      Rust: "bg-orange-600",
      PHP: "bg-indigo-500",
      Ruby: "bg-red-600",
      Swift: "bg-orange-500",
      Kotlin: "bg-purple-600",
    };
    return colors[language || ""] || "bg-gray-500";
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm hover:scale-[1.02] relative overflow-hidden">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/repo/${repository.owner.login}/${repository.name}`}
                className="text-lg font-bold hover:text-primary transition-colors duration-200 group-hover:text-primary cursor-pointer"
              >
                {repository.full_name}
              </Link>
              <Link
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-full hover:bg-primary/10"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              {repository.stargazers_count > 1000 && (
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
            {repository.description && (
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 group-hover:text-foreground/80 transition-colors">
                {repository.description}
              </p>
            )}
          </div>
          {repository.private && (
            <Badge
              variant="outline"
              className="ml-2 border-amber-500/50 text-amber-600 dark:text-amber-400"
            >
              Private
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-400">
            <Star className="w-4 h-4" />
            <span className="font-medium">
              {repository.stargazers_count.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <Eye className="w-4 h-4" />
            <span className="font-medium">
              {repository.watchers_count.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
            <GitFork className="w-4 h-4" />
            <span className="font-medium">
              {repository.forks_count.toLocaleString()}
            </span>
          </div>
          {repository.language && (
            <div className="flex items-center gap-1.5">
              <div
                className={`w-3 h-3 rounded-full ${getLanguageColor(
                  repository.language
                )}`}
              ></div>
              <span className="font-medium text-foreground/80">
                {repository.language}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-muted-foreground ml-auto">
            <Calendar className="w-4 h-4" />
            <span className="text-xs">{updatedDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
