import { useMemo } from 'react';
import { Rocket, Sparkles, LayoutGrid, Shuffle } from 'lucide-react';
import questionsData from '../assets/questions.json';

export function HomeMenu({ onStart }) {
  // Compute available weeks from our parsed JSON
  const availableWeeks = useMemo(() => {
    const weeks = new Set(questionsData.map(q => q.week));
    return Array.from(weeks).sort((a, b) => a - b);
  }, []);

  const totalQuestions = questionsData.length;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-12 w-full flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-8 sm:mb-16 animate-in slide-in-from-bottom-8 duration-700">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-neon-blue/10 border border-neon-blue/30 mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <Rocket className="w-8 h-8 sm:w-14 sm:h-14 text-neon-blue" />
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
          Forest Management NPTEL Practice
        </h1>
        <p className="text-base sm:text-xl text-slate-400 font-medium max-w-xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-neon-cyan" />
          Prepare for success. {totalQuestions} questions available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 w-full">
        {/* Week Mode Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl animate-in slide-in-from-left-8 duration-500 delay-150">
          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="p-2 bg-neon-cyan/20 rounded-lg">
              <LayoutGrid className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Week-Wise Mode</h2>
              <p className="text-xs sm:text-sm text-slate-400">Target specific modules</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {availableWeeks.map(week => (
              <button
                key={week}
                onClick={() => onStart({ mode: 'week', week })}
                className="py-2.5 sm:py-3 px-2 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-700 hover:border-slate-500 transition-all text-xs sm:text-sm font-bold tracking-wider hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
              >
                WEEK {week}
              </button>
            ))}
          </div>
        </div>

        {/* Mix Mode Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center text-center animate-in slide-in-from-right-8 duration-500 delay-300">
          <div className="p-4 bg-neon-blue/20 rounded-full mb-4 sm:mb-6">
            <Shuffle className="w-8 h-8 sm:w-10 sm:h-10 text-neon-blue" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Mix All Questions</h2>
          <p className="text-sm sm:text-base text-slate-400 mb-6 sm:mb-8 max-w-xs">
            Test your comprehensive knowledge with a shuffled set of all available questions.
          </p>

          <button
            onClick={() => onStart({ mode: 'mix' })}
            className="w-full py-3 sm:py-4 rounded-xl bg-neon-blue hover:bg-indigo-500 text-white text-sm sm:text-base font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1 btn-space"
          >
            Start Mixed Session
          </button>
        </div>
      </div>
    </div>
  );
}
