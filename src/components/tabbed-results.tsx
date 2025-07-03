"use client"

import { Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WebSearchResult {
  title: string
  url: string
  snippet: string
  source: string
}

interface MessagePart {
  type: 'text' | 'image' | 'tool' | 'reasoning' | 'tool-invocation' | 'source' | 'file' | 'step-start'
  text?: string
}

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system' | 'data'
  parts: MessagePart[]
}

interface TabbedResultsProps {
  messages: Message[]
  searchResults: WebSearchResult[]
  currentSearchQuery: string
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function TabbedResults({
  messages,
  searchResults,
  currentSearchQuery,
  activeTab,
  setActiveTab,
}: TabbedResultsProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-50">
            <TabsTrigger value="answer" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              💡 Answer
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              📚 Sources ({searchResults.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              💬 Chat History ({messages.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="answer" className="p-6">
            {/* Top 3 source previews */}
            {searchResults.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.slice(0, 3).map((source, sourceIndex) => (
                  <Card key={sourceIndex} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <Badge variant="outline" className="text-xs bg-gradient-to-br from-blue-400 to-purple-500 text-white">{source.source}</Badge>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2">{source.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-3 mb-2">{source.snippet}</p>
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium truncate block"
                      >
                        {source.url}
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {/* Show the latest AI response */}
            {messages.filter(m => m.role === 'assistant').length > 0 && (
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border mt-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  🤖 Latest AI Response
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {messages.filter(m => m.role === 'assistant').slice(-1)[0].parts.map((part: MessagePart, i: number) => {
                    switch (part.type) {
                      case 'text':
                        return <div key={`latest-${i}`} className="whitespace-pre-wrap">{part.text}</div>;
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sources" className="p-6">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                📚 All Sources for &quot;{currentSearchQuery}&quot;
              </h3>
              <div className="grid gap-3">
                {searchResults.map((source, sourceIndex) => (
                  <a
                    key={sourceIndex}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 rounded-xl bg-white hover:bg-gradient-to-r hover:from-white hover:to-blue-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100 cursor-pointer"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm font-bold text-white">{sourceIndex + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 truncate">{source.title}</div>
                      <div className="text-xs text-blue-600 truncate font-medium">{source.url}</div>
                      <div className="text-sm text-gray-600 mt-1 line-clamp-2">{source.snippet}</div>
                      <div className="text-xs text-gray-500 mt-1">Source: {source.source}</div>
                    </div>
                    <Heart className="w-4 h-4 text-pink-400 hover:text-pink-600 cursor-pointer transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="p-6">
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                💬 Full Chat History
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-400 to-purple-500' 
                        : 'bg-gradient-to-br from-emerald-400 to-teal-500'
                    }`}>
                      <span className="text-xs font-bold text-white">
                        {message.role === 'user' ? '👤' : '🤖'}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-gray-600 mb-1">
                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                      </div>
                      <div className="text-sm text-gray-800 whitespace-pre-wrap">
                        {message.parts.map((part: MessagePart, i: number) => {
                          switch (part.type) {
                            case 'text':
                              return <div key={`${message.id}-${i}`}>{part.text}</div>;
                            default:
                              return null;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 