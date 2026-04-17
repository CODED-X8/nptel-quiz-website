import { useState, useMemo } from 'react'
import { HomeMenu } from './components/HomeMenu'
import { QuizInterface } from './components/QuizInterface'
import { ThreeBackground } from './components/ThreeBackground'
import { ParticleBackground } from './components/ParticleBackground'
import allQuestions from './assets/questions.json'
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [session, setSession] = useState(null); // null, { mode: 'week', week: 0 }, { mode: 'mix' }

  const handleStart = (config) => {
    setSession(config);
  };

  const handleGoHome = () => {
    setSession(null);
  };

  // Compute active questions based on session
  const activeQuestions = useMemo(() => {
    if (!session) return [];

    let filtered = [];
    if (session.mode === 'week') {
      filtered = allQuestions.filter(q => q.week === session.week);
    } else if (session.mode === 'mix') {
      filtered = [...allQuestions];
    }

    // Fisher-Yates Shuffle for all modes
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    return filtered;
  }, [session]);

  return (
    <div className="min-h-screen text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <Analytics />
      {/* 3D and Particle Backgrounds */}
      <ThreeBackground />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none"></div>
      <ParticleBackground />

      <main className="z-10 w-full relative">
        {!session ? (
          <HomeMenu onStart={handleStart} />
        ) : (
          <QuizInterface questions={activeQuestions} onGoHome={handleGoHome} />
        )}
      </main>
    </div>
  )
}

export default App
