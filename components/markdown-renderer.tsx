"use client"

import { useEffect, useState } from "react"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [htmlContent, setHtmlContent] = useState<string>("")

  useEffect(() => {
    // Simple markdown to HTML conversion
    // In a production app, you might want to use a proper markdown parser
    const convertMarkdownToHtml = (markdown: string) => {
      let html = markdown
        // Headers
        .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
        // Italic
        .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
        // Code blocks
        .replace(
          /```([\s\S]*?)```/gim,
          '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>',
        )
        // Inline code
        .replace(/`([^`]*)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>')
        // Links
        .replace(
          /\[([^\]]*)\]$$([^$$]*)\)/gim,
          '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>',
        )
        // Line breaks
        .replace(/\n\n/gim, '</p><p class="mb-4">')
        // Lists
        .replace(/^\* (.*$)/gim, '<li class="ml-4">• $1</li>')
        .replace(/^- (.*$)/gim, '<li class="ml-4">• $1</li>')

      // Wrap in paragraphs
      html = '<p class="mb-4">' + html + "</p>"

      // Clean up empty paragraphs
      html = html.replace(/<p class="mb-4"><\/p>/gim, "")

      return html
    }

    setHtmlContent(convertMarkdownToHtml(content))
  }, [content])

  return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
}
