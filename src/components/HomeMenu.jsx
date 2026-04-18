import { useMemo } from 'react';
import { LayoutGrid, Shuffle, ArrowLeft } from 'lucide-react';

export function HomeMenu({ onStart, questionsData, courseTitle, Icon, onBack }) {
  // Compute available weeks from our parsed JSON
  const availableWeeks = useMemo(() => {
    const weeks = new Set(questionsData.map(q => q.week));
    return Array.from(weeks).sort((a, b) => a - b);
  }, [questionsData]);

  const totalQuestions = questionsData.length;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-12 w-full flex flex-col items-center justify-center min-h-[80vh] relative">
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 sm:top-0 sm:left-0 flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-2 rounded-xl hover:bg-[var(--card-bg)]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Change Subject</span>
      </button>

      <div className="text-center mb-8 sm:mb-16 animate-in slide-in-from-bottom-8 duration-700 mt-12 sm:mt-0">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-3xl bg-[var(--neon-blue)]/10 border border-[var(--neon-blue)]/30 mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.2)]">
          <Icon className="w-8 h-8 sm:w-14 sm:h-14 text-emerald-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-main,#fff)] via-[var(--neon-blue)] to-[var(--neon-cyan)] drop-shadow-sm">
          {courseTitle} Practice
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-muted,#94a3b8)] font-medium max-w-xl mx-auto flex items-center justify-center gap-2">
          Prepare for success. {totalQuestions} questions available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 w-full">
        {/* Week Mode Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl animate-in slide-in-from-left-8 duration-500 delay-150">
          <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-4">
            <div className="p-2 bg-[var(--neon-cyan)]/20 rounded-lg">
              <LayoutGrid className="w-6 h-6 text-[var(--neon-cyan)]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">Week-Wise Mode</h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">Target specific modules</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {availableWeeks.map(week => (
              <button
                key={week}
                onClick={() => onStart({ mode: 'week', week })}
                className="py-2.5 sm:py-3 px-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[var(--neon-cyan)] transition-all text-xs sm:text-sm font-bold tracking-wider hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(34,211,238,0.2)] text-[var(--text-main)]"
              >
                WEEK {week}
              </button>
            ))}
          </div>
        </div>

        {/* Mix Mode Panel */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex flex-col items-center justify-center text-center animate-in slide-in-from-right-8 duration-500 delay-300">
          <div className="p-4 bg-[var(--neon-blue)]/20 rounded-full mb-4 sm:mb-6">
            <Shuffle className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--neon-blue)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--text-main)]">Mix All Questions</h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mb-6 sm:mb-8 max-w-xs">
            Test your comprehensive knowledge with a shuffled set of all available questions.
          </p>

          <button
            onClick={() => onStart({ mode: 'mix' })}
            className="w-full py-3 sm:py-4 rounded-xl text-white text-sm sm:text-base font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:-translate-y-1 btn-space"
            style={{ backgroundColor: 'var(--neon-blue)' }}
          >
            Start Mixed Session
          </button>
        </div>
      </div>
    </div>
  );
}
