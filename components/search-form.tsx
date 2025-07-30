"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SearchParams } from "@/types/github"

interface SearchFormProps {
  query: string
  sort: string
  order: string
  perPage: number
  onSearch: (params: Partial<SearchParams>) => void
}

export function SearchForm({ query, sort, order, perPage, onSearch }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState(query)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({ q: searchQuery.trim() })
  }

  const sortOptions = [
    { value: "best-match", label: "✨ Best Match", icon: "✨" },
    { value: "stars", label: "⭐ Stars", icon: "⭐" },
    { value: "forks", label: "🍴 Forks", icon: "🍴" },
    { value: "help-wanted-issues", label: "🆘 Help Wanted", icon: "🆘" },
    { value: "updated", label: "🔄 Recently Updated", icon: "🔄" },
  ]

  const orderOptions = [
    { value: "desc", label: "↓ Descending" },
    { value: "asc", label: "↑ Ascending" },
  ]

  const perPageOptions = [
    { value: "10", label: "10 per page" },
    { value: "25", label: "25 per page" },
    { value: "50", label: "50 per page" },
  ]

  return (
    <Card className="mb-8 border-0 shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          Search Repositories
          <Sparkles className="w-4 h-4 text-yellow-500 ml-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Label htmlFor="search" className="text-sm font-medium mb-2 block">
              What are you looking for?
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="search"
                type="text"
                placeholder="Search repositories... (e.g., react, machine learning, web framework)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base border-2 focus:border-primary/50 bg-background/50"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-4 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort" className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Sort by
              </Label>
              <Select value={sort} onValueChange={(value) => onSearch({ sort: value as any })}>
                <SelectTrigger className="h-11 border-2 focus:border-primary/50 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order" className="text-sm font-medium">
                Order
              </Label>
              <Select value={order} onValueChange={(value) => onSearch({ order: value as any })}>
                <SelectTrigger className="h-11 border-2 focus:border-primary/50 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {orderOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="perPage" className="text-sm font-medium">
                Results per page
              </Label>
              <Select
                value={perPage.toString()}
                onValueChange={(value) => onSearch({ per_page: Number.parseInt(value) })}
              >
                <SelectTrigger className="h-11 border-2 focus:border-primary/50 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {perPageOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
