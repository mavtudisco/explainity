"use client"

interface FloatingElementsProps {
  floatingEmojis: Array<{ id: number; emoji: string; x: number; y: number }>
}

export function FloatingElements({ floatingEmojis }: FloatingElementsProps) {
  return (
    <>
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-10 w-18 h-18 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-20 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Floating Emojis */}
      {floatingEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="absolute text-2xl pointer-events-none animate-ping"
          style={{
            left: emoji.x,
            top: emoji.y,
            animation: "float-up 3s ease-out forwards",
          }}
        >
          {emoji.emoji}
        </div>
      ))}

      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
} 