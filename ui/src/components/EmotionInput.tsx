"use client"

import type React from "react"

export function EmotionInput({
  text,
  setText,
  onPredict,
  loading,
}: {
  text: string
  setText: (text: string) => void
  onPredict: () => void
  loading: boolean
}) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      onPredict()
    }
  }

  return (
    <div className="glass-card p-6 space-y-4 animate-fade-in-up animation-delay-200">
      <div className="relative">
        <textarea
          placeholder="Express yourself... What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-32 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
          disabled={loading}
        />
        <div className="absolute bottom-3 right-3 text-white/40 text-sm">{text.length}/500</div>
      </div>

      <button
        onClick={onPredict}
        disabled={loading || !text.trim()}
        className="group relative w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

        <div className="relative flex items-center justify-center space-x-2">
          {loading ? (
            <>
              {/* Loader icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 animate-spin"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <span>Analyzing emotions...</span>
            </>
          ) : (
            <>
              {/* Send icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              <span>Predict Emotion</span>
            </>
          )}
        </div>
      </button>
    </div>
  )
}
