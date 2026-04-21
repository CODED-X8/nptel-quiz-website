import { useState, useMemo, useEffect } from 'react'
import { HomeMenu } from './components/HomeMenu'
import { QuizInterface } from './components/QuizInterface'
import { ThreeBackground } from './components/ThreeBackground'
import { ParticleBackground } from './components/ParticleBackground'
import { SubjectSelection } from './components/SubjectSelection'
import { ThemeToggle } from './components/ThemeToggle'
import { TreePine, Globe } from 'lucide-react'
import { Analytics } from "@vercel/analytics/react"

// Import questions datasets
import forestQuestions from './assets/forest.json'
import educationQuestions from './assets/education.json'

function App() {
  const [theme, setTheme] = useState('dark');
  const [subject, setSubject] = useState(null); // 'forest' | 'education' | null
  const [session, setSession] = useState(null); // null, { mode: 'week', week: 0 }, { mode: 'mix' }

  // Data mapping object based on active subject
  const subjectMetadata = {
    forest: {
      data: forestQuestions,
      title: "Forests and their Management",
      icon: TreePine
    },
    education: {
      data: educationQuestions,
      title: "Education for Sustainable Development",
      icon: Globe
    }
  };

  const handleStart = (config) => {
    setSession(config);
  };

  const handleGoHome = () => {
    setSession(null);
  };

  const handleSubjectSelect = (selected) => {
    setSubject(selected);
    setSession(null);
  };

  const handleBackToSubject = () => {
    setSubject(null);
    setSession(null);
  };

  // Compute active questions based on session and subject
  const activeQuestions = useMemo(() => {
    if (!session || !subject) return [];

    let dataset = subjectMetadata[subject].data;
    let filtered = [];

    if (session.mode === 'week') {
      filtered = dataset.filter(q => q.week === session.week);
    } else if (session.mode === 'mock') {
      filtered = dataset.filter(q => String(q.week) !== '0' && q.week !== 0);
    } else if (session.mode === 'mix') {
      filtered = [...dataset];
    }

    // Deep copy, clean and shuffle options for each question
    filtered = filtered.map(q => {
      const originalCorrectString = q.options[q.correctAnswerIndex];
      // Regex to remove 'A) ', 'B.', 'c)', etc. from start of string
      const cleanRegex = /^[A-Za-z][\.\)]\s*/;

      const cleanedCorrectString = originalCorrectString.replace(cleanRegex, '');
      let newOptions = q.options.map(opt => opt.replace(cleanRegex, ''));

      // Fisher-Yates Shuffle for options
      for (let i = newOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newOptions[i], newOptions[j]] = [newOptions[j], newOptions[i]];
      }

      const newCorrectIndex = newOptions.indexOf(cleanedCorrectString);

      return {
        ...q,
        options: newOptions,
        correctAnswerIndex: newCorrectIndex
      };
    });

    // Fisher-Yates Shuffle for all modes (questions)
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    if (session.mode === 'mock') {
      filtered = filtered.slice(0, 50);
    }

    return filtered;
  }, [session, subject]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative flex-col">
      {typeof process !== 'undefined' && process.env?.VERCEL && <Analytics />}
      {session?.mode !== 'mock' && <ThemeToggle theme={theme} setTheme={setTheme} />}

      {/* 3D and Particle Backgrounds */}
      <ThreeBackground theme={theme} />
      {/* Dynamic gradient overlay that responds to theme */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-500"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)'
            : 'radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 100%)'
        }}
      ></div>
      <ParticleBackground theme={theme} />

      <main className="z-10 w-full relative">
        {!subject ? (
          <SubjectSelection onSelect={handleSubjectSelect} />
        ) : !session ? (
          <HomeMenu
            onStart={handleStart}
            questionsData={subjectMetadata[subject].data}
            courseTitle={subjectMetadata[subject].title}
            Icon={subjectMetadata[subject].icon}
            onBack={handleBackToSubject}
          />
        ) : (
          <QuizInterface
            questions={activeQuestions}
            onGoHome={handleGoHome}
            mode={session?.mode}
          />
        )}
      </main>
    </div>
  )
}

export default App
