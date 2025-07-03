"use client"

import { useState } from "react"
import { useChat } from '@ai-sdk/react'
import { SearchInterface } from "@/components/search-interface"
import { LoadingState } from "@/components/loading-state"
import { TabbedResults } from "@/components/tabbed-results"
import { EmptyState } from "@/components/empty-state"
import { FloatingElements } from "@/components/floating-elements"

interface WebSearchResult {
  title: string
  url: string
  snippet: string
  source: string
}

export default function FunPerplexityClone() {
  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading } = useChat({
    api: '/api/chat-with-search'
  })
  const [searchMode, setSearchMode] = useState("balanced")
  const [aiModel, setAiModel] = useState("gpt-4")
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; emoji: string; x: number; y: number }>>([])
  const [searchResults, setSearchResults] = useState<WebSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentSearchQuery, setCurrentSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("answer")

  const performSearch = async (query: string): Promise<WebSearchResult[]> => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Search failed:', error);
      return [];
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSearching(true);
    setCurrentSearchQuery(input);
    createFloatingEmoji();
    
    try {
      // Perform search first
      const searchData = await performSearch(input);
      setSearchResults(searchData);

      // Create celebration emojis
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingEmoji(), i * 200);
      }

      // Call the original handleSubmit
      originalHandleSubmit(e);
    } finally {
      setIsSearching(false);
    }
  }

  const funEmojis = ["🎉", "✨", "🚀", "💫", "🌟", "🎊", "🔥", "💡", "🎈", "🌈"]

  const createFloatingEmoji = () => {
    const emoji = funEmojis[Math.floor(Math.random() * funEmojis.length)]
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
    }
    setFloatingEmojis((prev) => [...prev, newEmoji])

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id))
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 relative overflow-hidden">
      <FloatingElements floatingEmojis={floatingEmojis} />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Search Interface */}
        <SearchInterface
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          aiModel={aiModel}
          setAiModel={setAiModel}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          isSearching={isSearching}
        />

        {/* Loading State */}
        {(isLoading || isSearching) && (
          <LoadingState isSearching={isSearching} searchMode={searchMode} />
        )}

        {/* Main Tabbed Interface */}
        {messages.length > 0 && (
          <div className="mt-8">
            <TabbedResults
              messages={messages}
              searchResults={searchResults}
              currentSearchQuery={currentSearchQuery}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
        )}

        {/* Empty State */}
        {messages.length === 0 && !isLoading && !isSearching && (
          <EmptyState />
        )}
      </div>
    </div>
  )
}
