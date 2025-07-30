import { RepositoryCard } from "./repository-card"
import type { Repository } from "@/types/github"

interface RepositoryListProps {
  repositories: Repository[]
}

export function RepositoryList({ repositories }: RepositoryListProps) {
  return (
    <div className="space-y-4 mb-8">
      {repositories.map((repository) => (
        <RepositoryCard key={repository.id} repository={repository} />
      ))}
    </div>
  )
}
