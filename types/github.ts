export interface Repository {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    avatar_url: string
    html_url: string
  }
  html_url: string
  description: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  private: boolean
}

export interface RepositoryDetail extends Repository {
  default_branch: string
  open_issues_count: number
}

export interface SearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}

export interface SearchParams {
  q: string
  sort?: "stars" | "forks" | "help-wanted-issues" | "updated" | "best-match"
  order?: "asc" | "desc"
  per_page: number
  page: number
}
