# GitHub Repository Explorer

A modern single-page application for exploring GitHub repositories using the GitHub API v3. Built with Next.js, React, and TypeScript.

Demo Url : https://github-explorer-theta-smoky.vercel.app/


## Getting Started

## Prerequisites
- Node.js 18+ 
- npm, yarn

## Installation

1. Clone the repository:

git clone https://github.com/alexblaze/github-explorer.git

cd github-explorer


1. Install dependencies:
   
2. npm install
# or
yarn install

1. Start the development server:

npm run dev
# or
yarn dev


1. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

npm run build
npm start


## Features

## Search Page
- Repository Search: Enter search terms to find repositories
- Sorting Options: Sort results by best match, stars, forks, help-wanted issues, or recently updated
- Results Per Page: Choose between 10, 25, or 50 results per page
- Comprehensive Results: View repository name, author, stars, watchers, forks, description, and last update date
- Pagination: Navigate through search results with intuitive pagination controls
- URL State Management: All search parameters are reflected in the URL for easy sharing and bookmarking

## Repository Detail Page
- Owner Information: Full owner name with direct link to GitHub profile
- Repository Details: Repository name with link to GitHub repository
- Statistics: Number of open issues, default branch, stars, watchers, and forks
- README Display: Formatted README.md content with markdown rendering
- Responsive Design: Optimized for desktop and mobile devices

## Technical Implementation

## Architecture
- Framework: Next.js 14+ with App Router
- Language: TypeScript for type safety
- Styling: Tailwind CSS
- State Management: URL-based state management with Next.js routing
- API Integration: Custom GitHub API v3 client (no external libraries like Octokit)

## Code Quality
- TypeScript: Full type safety with custom interfaces for GitHub API responses
- Component Architecture: Reusable, modular components
- Error Handling: Comprehensive error handling for API failures and edge cases
- Performance: Optimized with proper loading states and efficient re-renders
- Accessibility: ARIA labels, semantic HTML, and keyboard navigation support

## Key Components
- SearchForm: Handles search input, sorting, and pagination controls
- RepositoryList: Displays search results in a clean, organized layout
- RepositoryCard: Individual repository item with all relevant information
- Pagination: Smart pagination with ellipsis for large page counts
- MarkdownRenderer: Custom markdown to HTML converter for README display

## API Usage

This application uses the GitHub API v3 without authentication, which provides:
- The rate limit allows you to make up to 10 requests per minute.
- Access to public repositories only
- No access to private repositories or user-specific data

## Endpoints Used
- GET /search/repositories - Search for repositories
- GET /repos/{owner}/{repo} - Get repository details
- GET /repos/{owner}/{repo}/readme - Get repository README