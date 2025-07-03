"use client"

import { Search, Sparkles, Brain, Zap, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchInterfaceProps {
  searchMode: string
  setSearchMode: (mode: string) => void
  aiModel: string
  setAiModel: (model: string) => void
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  isSearching: boolean
}

const searchModes = [
  {
    id: "quick",
    name: "⚡ Quick",
    icon: Zap,
    description: "Lightning fast answers!",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
  },
  {
    id: "balanced",
    name: "🧠 Balanced",
    icon: Brain,
    description: "Perfect harmony of info",
    color: "from-blue-400 to-purple-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-purple-50",
  },
  {
    id: "deep",
    name: "📚 Deep",
    icon: BookOpen,
    description: "Dive into the details!",
    color: "from-green-400 to-teal-500",
    bgColor: "bg-gradient-to-br from-green-50 to-teal-50",
  },
  {
    id: "creative",
    name: "✨ Creative",
    icon: Sparkles,
    description: "Think outside the box!",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
  },
]

const aiModels = [
  { id: "gpt-4", name: "🤖 GPT-4", description: "The brain master!", color: "text-blue-600" },
  { id: "claude", name: "🎭 Claude", description: "The wise one!", color: "text-purple-600" },
  { id: "gemini", name: "💎 Gemini", description: "The speed demon!", color: "text-green-600" },
]

export function SearchInterface({
  searchMode,
  setSearchMode,
  aiModel,
  setAiModel,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  isSearching,
}: SearchInterfaceProps) {
  return (
    <div className="space-y-8">
      {/* Search Modes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {searchModes.map((mode) => {
          const Icon = mode.icon
          return (
            <Button
              key={mode.id}
              variant={searchMode === mode.id ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col items-center gap-3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                searchMode === mode.id
                  ? `bg-gradient-to-br ${mode.color} text-white shadow-lg border-0`
                  : `${mode.bgColor} hover:shadow-md border-2 border-dashed hover:border-solid`
              }`}
              onClick={() => setSearchMode(mode.id)}
            >
              <Icon className="w-6 h-6" />
              <div className="text-center">
                <div className="font-bold text-sm">{mode.name}</div>
                <div className="text-xs opacity-80 mt-1">{mode.description}</div>
              </div>
            </Button>
          )
        })}
      </div>

      {/* Search Bar */}
      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20"></div>
            <div className="relative flex gap-3 bg-white rounded-2xl p-2 shadow-xl">
              <Input
                placeholder="Ask me anything... I'm feeling magical today! ✨"
                value={input}
                onChange={handleInputChange}
                className="flex-1 border-0 text-lg h-12 bg-transparent focus-visible:ring-0 placeholder:text-gray-400"
              />
              <Button
                type="submit"
                disabled={isLoading || isSearching || !input.trim()}
                className="h-12 w-12 bg-gradient-to-br from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 shadow-lg transform hover:scale-105 transition-all"
                size="icon"
              >
                {isLoading || isSearching ? (
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* AI Model Selection */}
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="text-gray-600 font-medium">🤖 Choose your AI buddy:</span>
          <Select value={aiModel} onValueChange={setAiModel}>
            <SelectTrigger className="w-48 h-10 bg-white/80 border-2 border-dashed hover:border-solid transition-all">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aiModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${model.color}`}>{model.name}</span>
                    <span className="text-xs text-gray-500">{model.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
} 