"use client"

import { useState, useEffect } from "react"

interface EmotionResultProps {
  emotion: string | null
  confidence: number
  loading: boolean
  text: string
}

const emotionConfig = {
  joy: {
    color: "from-yellow-400 to-orange-500",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
    bg: "bg-yellow-500/20",
    description: "Happiness and positivity detected!",
  },
  sadness: {
    color: "from-blue-400 to-indigo-500",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
    bg: "bg-blue-500/20",
    description: "Melancholy and sorrow identified.",
  },
  anger: {
    color: "from-red-500 to-pink-600",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <path d="M7.5 8 10 9" />
        <path d="m14 9 2.5-1" />
        <path d="M9 10h0" />
        <path d="M15 10h0" />
      </svg>
    ),
    bg: "bg-red-500/20",
    description: "Strong negative emotions detected.",
  },
  love: {
    color: "from-pink-400 to-rose-500",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    bg: "bg-pink-500/20",
    description: "Affection and warmth found!",
  },
  fear: {
    color: "from-purple-500 to-violet-600",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent"
      >
        <path d="M13 3v18" />
        <path d="M5 3l14 18" />
      </svg>
    ),
    bg: "bg-purple-500/20",
    description: "Anxiety and concern detected.",
  },
  surprise: {
    color: "from-green-400 to-emerald-500",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
    bg: "bg-green-500/20",
    description: "Unexpected emotions identified!",
  },
  neutral: {
    color: "from-gray-400 to-slate-500",
    icon: (
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
        className="w-12 h-12 bg-gradient-to-r from-gray-400 to-slate-500 bg-clip-text text-transparent"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="8" x2="16" y1="15" y2="15" />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </svg>
    ),
    bg: "bg-gray-500/20",
    description: "Balanced emotional state.",
  },  
}

export function EmotionResult({ emotion, confidence, loading, text }: EmotionResultProps) {
  const [displayConfidence, setDisplayConfidence] = useState(0)

  useEffect(() => {
    if (emotion && confidence) {
      const timer = setTimeout(() => {
        let current = 0
        const increment = confidence / 50
        const interval = setInterval(() => {
          current += increment
          if (current >= confidence) {
            current = confidence
            clearInterval(interval)
          }
          setDisplayConfidence(current)
        }, 20)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [emotion, confidence])

  if (loading) {
    return (
      <div className="glass-card p-8 text-center animate-pulse-slow">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-400/30 rounded-full animate-spin">
              <div className="absolute top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-white/80 text-lg">Analyzing your text...</p>
            <div className="flex space-x-1 justify-center">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-100"></div>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-200"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!emotion) return null

  const config = emotionConfig[emotion.toLowerCase() as keyof typeof emotionConfig] || emotionConfig.neutral

  return (
    <div className="glass-card p-8 animate-fade-in-up animation-delay-300">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">Detected Emotion</h3>
          <p
            className={`text-4xl font-extrabold bg-gradient-to-r ${config.color} bg-clip-text text-transparent animate-gradient-x`}
          >
            {emotion.toUpperCase()}
          </p>
          <p className="text-white/70">{config.description}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm text-white/60">
            <span>Confidence Level</span>
            <span>{Math.round(displayConfidence * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${config.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${displayConfidence * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {text && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/80 text-sm italic">"{text}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
