import { useState, useMemo } from 'react';
import { Sparkles, ArrowRight, Home, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function QuizInterface({ questions, onGoHome }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const handleSelect = (index) => {
    if (selectedAnswer !== null) return; // Lock if already answered
    setSelectedAnswer(index);
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex(i => i + 1);
    setSelectedAnswer(null);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[60vh] max-w-2xl mx-auto w-full">
        <div className="glass-panel p-10 rounded-2xl w-full text-center animate-in fade-in zoom-in duration-500">
          <Sparkles className="w-16 h-16 text-neon-cyan mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">Revision Complete!</h2>
          <p className="text-slate-400 mb-8">You finished all {questions.length} questions.</p>
          
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan mb-8">
            {score} / {questions.length}
          </div>
          <div className="mb-8">
            <span className="text-xl font-medium tracking-wide">Score: {percentage}%</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={restartQuiz}
              className="px-6 py-3 rounded-xl border border-border-color bg-card-bg hover:bg-white/5 transition-all text-white font-medium flex items-center justify-center gap-2 btn-space"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
            <button 
              onClick={onGoHome}
              className="px-6 py-3 rounded-xl bg-neon-blue hover:bg-indigo-500 transition-all text-white font-medium shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" /> Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col min-h-[80vh]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 glass-panel px-6 py-4 rounded-2xl">
        <button 
          onClick={onGoHome}
          className="text-slate-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <Home className="w-5 h-5" /> <span className="hidden sm:inline">Home</span>
        </button>
        <div className="flex items-center gap-6">
          <div className="text-sm font-medium tracking-widest uppercase text-neon-cyan/80">
            Question {currentIndex + 1} <span className="text-slate-500">of {questions.length}</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-neon-blue/20 border border-neon-blue/40 font-bold text-neon-blue shadow-[0_0_10px_rgba(99,102,241,0.2)]">
            Score: {score}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-800/50 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan transition-all duration-500 ease-out"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="glass-panel p-6 sm:p-10 rounded-2xl mb-8 flex-grow">
        {currentQuestion.week !== undefined && (
          <span className="inline-block px-3 py-1 bg-white/5 rounded-md text-xs font-semibold text-slate-400 mb-4 tracking-wider">
            WEEK {currentQuestion.week}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl font-medium leading-relaxed mb-8">
          {currentQuestion.questionText}
        </h2>

        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrect = idx === currentQuestion.correctAnswerIndex;
            const showCorrect = selectedAnswer !== null && isCorrect;
            const showWrong = isSelected && !isCorrect;

            return (
              <button
                key={idx}
                disabled={selectedAnswer !== null}
                onClick={() => handleSelect(idx)}
                className={twMerge(
                  clsx(
                    "text-left p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 btn-option",
                    "text-lg",
                    showCorrect && "btn-correct",
                    showWrong && "btn-wrong"
                  )
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer controls */}
      <div className="flex justify-end min-h-[60px]">
        {selectedAnswer !== null && (
          <button 
            onClick={handleNext}
            className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-in fade-in slide-in-from-bottom-4"
          >
            Next <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
