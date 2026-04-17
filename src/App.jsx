import { useState, useMemo } from 'react'
import { HomeMenu } from './components/HomeMenu'
import { QuizInterface } from './components/QuizInterface'
import allQuestions from './assets/questions.json'

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
      // Fisher-Yates Shuffle
      for (let i = filtered.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
      }
    }
    return filtered;
  }, [session]);

  return (
    <div className="min-h-screen text-slate-100 flex items-center justify-center p-4">
      {/* Background radial overlay for depth */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)] z-0"></div>
      
      <main className="z-10 w-full">
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
