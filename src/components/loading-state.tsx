"use client"

import { Card, CardContent } from "@/components/ui/card"

interface LoadingStateProps {
  isSearching: boolean
  searchMode: string
}

const getModeConfig = (modeId: string) => {
  const searchModes = [
    {
      id: "quick",
      name: "⚡ Quick",
    },
    {
      id: "balanced",
      name: "🧠 Balanced",
    },
    {
      id: "deep",
      name: "📚 Deep",
    },
    {
      id: "creative",
      name: "✨ Creative",
    },
  ]
  return searchModes.find((m) => m.id === modeId) || searchModes[1]
}

export function LoadingState({ isSearching, searchMode }: LoadingStateProps) {
  return (
    <Card className="mt-8 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="animate-spin w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full"></div>
            <div className="absolute inset-0 animate-ping w-8 h-8 border-4 border-purple-300 rounded-full opacity-20"></div>
          </div>
          <div>
            <div className="font-bold text-purple-600">
              {isSearching ? '🔍 Searching the web...' : `🔮 Working my magic with ${getModeConfig(searchMode).name} mode...`}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {isSearching ? 'Finding the best sources for you!' : 'Brewing up something amazing just for you! ✨'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 