import type { SearchResponse, RepositoryDetail, SearchParams } from "@/types/github"

const GITHUB_API_BASE = "https://api.github.com"

class GitHubAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message)
    this.name = "GitHubAPIError"
  }
}

async function fetchFromGitHub(endpoint: string): Promise<any> {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "GitHub-Repository-Explorer",
    },
  })

  if (!response.ok) {
    if (response.status === 403) {
      throw new GitHubAPIError("API rate limit exceeded. Please try again later.", 403)
    }
    if (response.status === 404) {
      throw new GitHubAPIError("Repository not found.", 404)
    }
    throw new GitHubAPIError(`GitHub API error: ${response.statusText}`, response.status)
  }

  return response.json()
}

export async function searchRepositories(params: SearchParams): Promise<SearchResponse> {
  const searchParams = new URLSearchParams()

  searchParams.append("q", params.q)
  if (params.sort && params.sort !== "best-match") {
    searchParams.append("sort", params.sort)
  }
  if (params.order) {
    searchParams.append("order", params.order)
  }
  searchParams.append("per_page", params.per_page.toString())
  searchParams.append("page", params.page.toString())

  const endpoint = `/search/repositories?${searchParams.toString()}`
  return fetchFromGitHub(endpoint)
}

export async function getRepository(owner: string, repo: string): Promise<RepositoryDetail> {
  const endpoint = `/repos/${owner}/${repo}`
  return fetchFromGitHub(endpoint)
}

export async function getRepositoryReadme(owner: string, repo: string): Promise<string> {
  try {
    const endpoint = `/repos/${owner}/${repo}/readme`
    const response = await fetchFromGitHub(endpoint)

    // The GitHub API returns the README content as base64 encoded
    if (response.content && response.encoding === "base64") {
      return atob(response.content)
    }

    return response.content || ""
  } catch (error) {
    if (error instanceof GitHubAPIError && error.status === 404) {
      return ""
    }
    throw error
  }
}
