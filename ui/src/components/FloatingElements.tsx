export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-cyan-400/30 rounded-full animate-float animation-delay-0"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400/30 rotate-45 animate-float animation-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-pink-400/30 rounded-full animate-float animation-delay-2000"></div>
      <div className="absolute bottom-20 right-40 w-5 h-5 bg-blue-400/30 rotate-12 animate-float animation-delay-3000"></div>
      <div className="absolute top-60 left-1/2 w-2 h-2 bg-green-400/30 rounded-full animate-float animation-delay-4000"></div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-xl animate-pulse-slow animation-delay-2000"></div>
    </div>
  )
}
