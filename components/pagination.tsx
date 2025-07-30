"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [pageInput, setPageInput] = useState("")

  // Limit total pages to maximum of 100
  const maxPages = Math.min(totalPages, 100)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(maxPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < maxPages - 1) {
      rangeWithDots.push("...", maxPages)
    } else if (maxPages > 1) {
      rangeWithDots.push(maxPages)
    }

    return rangeWithDots
  }

  const handlePageInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const pageNumber = Number.parseInt(pageInput.trim())

    // Sanitize input: must be a valid number between 1 and maxPages
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= maxPages) {
      onPageChange(pageNumber)
      setPageInput("")
    } else {
      // Clear invalid input
      setPageInput("")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numeric input
    if (value === "" || /^\d+$/.test(value)) {
      setPageInput(value)
    }
  }

  const visiblePages = getVisiblePages()

  if (maxPages <= 1) {
    return null
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-6 p-6 bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-2xl border">
      {/* Navigation buttons and page numbers */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-10 px-4 bg-background/50 hover:bg-primary/10 border-2 hover:border-primary/50 transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <div className="px-3 py-2 text-muted-foreground flex items-center">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className={`min-w-[44px] h-10 transition-all duration-200 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg scale-105"
                      : "bg-background/50 hover:bg-primary/10 border-2 hover:border-primary/50"
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= maxPages}
          className="h-10 px-4 bg-background/50 hover:bg-primary/10 border-2 hover:border-primary/50 transition-all duration-200"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Direct page input */}
      <div className="flex items-center gap-3 px-4 py-2 bg-background/30 rounded-xl border">
        <Label htmlFor="page-input" className="text-sm font-medium whitespace-nowrap">
          Jump to:
        </Label>
        <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2">
          <Input
            id="page-input"
            type="text"
            value={pageInput}
            onChange={handleInputChange}
            placeholder={`1-${maxPages}`}
            className="w-20 h-8 text-center text-sm border-2 focus:border-primary/50 bg-background/50"
            maxLength={3}
          />
          <Button
            type="submit"
            size="sm"
            className="h-8 px-3 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-xs"
          >
            Go
          </Button>
        </form>
      </div>

      {/* Page info */}
      <div className="text-sm text-muted-foreground text-center lg:text-left">
        <div className="font-medium">
          Page {currentPage} of {maxPages}
        </div>
        {totalPages > 100 && <div className="text-xs opacity-75">(showing first 100 pages)</div>}
      </div>
    </div>
  )
}
