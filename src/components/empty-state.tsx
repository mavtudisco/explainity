"use client"

import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-pulse">
          <Search className="w-12 h-12 text-white" />
        </div>
        <div className="absolute -top-2 -right-2 text-3xl animate-bounce">✨</div>
        <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce" style={{ animationDelay: "0.5s" }}>
          🚀
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Welcome to Explainity! 🎉
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        Ready to chat with AI? Ask me anything and I&apos;ll help you explore the universe of knowledge! 🎊
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-dashed border-yellow-200 hover:border-solid hover:shadow-lg transition-all">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-bold mb-2 text-orange-700">Multiple Search Modes</h3>
          <p className="text-sm text-orange-600">Quick zaps, balanced wisdom, deep dives, or creative sparks!</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 hover:border-solid hover:shadow-lg transition-all">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="font-bold mb-2 text-purple-700">AI Buddy Selection</h3>
          <p className="text-sm text-purple-600">Choose your favorite AI companion for the journey!</p>
        </Card>
      </div>
    </div>
  )
} 