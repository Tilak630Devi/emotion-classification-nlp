"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";
import { EmotionInput } from "./components/EmotionInput";
import { EmotionResult } from "./components/EmotionResult";
import { ParticleBackground } from "./components/ParticleBackground";
import { FloatingElements } from "./components/FloatingElements";

export default function App() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState<number>(0);

  // Set the page title based on emotion
useEffect(() => {
  document.title = "Emotion Classifier | Your AI Tool"; // Set default on load
}, []);

useEffect(() => {
  if (emotion) {
    document.title = `Detected: ${emotion} | Emotion Classifier`;
  }
}, [emotion]);


  const predictEmotion = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setEmotion(null);

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      const simulatedConfidence = Math.random() * 0.3 + 0.7; // 70–100%

      setTimeout(() => {
        setEmotion(data.emotion);
        setConfidence(data.confidence || simulatedConfidence);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Prediction error:", err);
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen relative overflow-hidden transition-all duration-500 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
        <ParticleBackground />
        <FloatingElements />

        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />

          <main className="flex-1 flex flex-col items-center justify-center p-4 space-y-8">
            <div className="text-center space-y-4 animate-fade-in-up">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Emotion Classifier
              </h1>

              <br />

              <p className="text-xl text-white/80 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover the emotions hidden in your text using our NLP model.
              </p>
              <p className="text-xl text-white/80 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Just type your text below and let the AI analyze it for you!
              </p>
            </div>

            <div className="w-full max-w-2xl space-y-8">
              <EmotionInput
                text={text}
                setText={setText}
                onPredict={predictEmotion}
                loading={loading}
              />

              <EmotionResult
                emotion={emotion}
                confidence={confidence}
                loading={loading}
                text={text}
              />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
