import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Home, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function QuizInterface({ questions, onGoHome }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  
  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;

  const score = answers.reduce((acc, ans, idx) => {
    return (ans !== null && ans === questions[idx].correctAnswerIndex) ? acc + 1 : acc;
  }, 0);

  const selectedAnswer = isFinished ? null : answers[currentIndex];

  const handleSelect = (index) => {
    if (selectedAnswer !== null) return; // Lock if already answered
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentIndex(i => i + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setAnswers(Array(questions.length).fill(null));
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[60vh] max-w-2xl mx-auto w-full relative z-10">
        <div className="glass-panel p-10 rounded-2xl w-full text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-cyan/5 pointer-events-none" />
          <Sparkles className="w-16 h-16 text-neon-cyan mx-auto mb-6 relative" />
          <h2 className="text-3xl font-bold mb-2 relative">Revision Complete!</h2>
          <p className="text-slate-400 mb-8 relative">You finished all {questions.length} questions.</p>
          
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-cyan mb-8 relative drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            {score} / {questions.length}
          </div>
          <div className="mb-8 relative">
            <span className="text-xl font-medium tracking-wide">Score: {percentage}%</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <button 
              onClick={restartQuiz}
              className="px-6 py-3 rounded-xl border border-border-color bg-card-bg hover:bg-white/5 transition-all text-white font-medium flex items-center justify-center gap-2 btn-space"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
            <button 
              onClick={onGoHome}
              className="px-6 py-3 rounded-xl bg-neon-blue hover:bg-indigo-500 transition-all text-white font-medium shadow-[0_0_15px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2 relative z-10"
            >
              <Home className="w-5 h-5" /> Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-800/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-neon-blue to-neon-cyan transition-all duration-500 ease-out shadow-[0_0_10px_#06b6d4]"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 flex flex-col min-h-[80vh] pt-10 sm:pt-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8 glass-panel px-4 sm:px-6 py-3 sm:py-4 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none" />
          <button 
            onClick={onGoHome}
            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 relative z-10 w-full sm:w-auto justify-center sm:justify-start"
          >
            <Home className="w-5 h-5" /> <span>Home</span>
          </button>
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 relative z-10">
            <div className="text-xs sm:text-sm font-medium tracking-widest uppercase text-neon-cyan/80">
              Question {currentIndex + 1} <span className="text-slate-500">of {questions.length}</span>
            </div>
            <div className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-neon-blue/20 border border-neon-blue/40 font-bold text-neon-blue shadow-[0_0_10px_rgba(99,102,241,0.2)] text-sm sm:text-base">
              Score: {score}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-panel p-4 sm:p-10 rounded-2xl mb-6 sm:mb-8 flex-grow relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {currentQuestion.week !== undefined && (
            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-white/5 rounded-md text-[10px] sm:text-xs font-semibold text-neon-cyan/80 mb-3 sm:mb-4 tracking-wider border border-white/10 uppercase">
              WEEK {currentQuestion.week}
            </span>
          )}
          <h2 className="text-xl sm:text-3xl font-medium leading-relaxed mb-6 sm:mb-8 relative z-10 drop-shadow-md">
            {currentQuestion.questionText}
          </h2>

          <div className="flex flex-col gap-2.5 sm:gap-3 relative z-10">
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
                      "text-left p-3 sm:p-4 rounded-xl border border-slate-700/50 bg-slate-800/50 btn-option backdrop-blur-sm transition-all shadow-sm",
                      "text-base sm:text-lg",
                      showCorrect && "btn-correct shadow-[0_0_15px_rgba(34,197,94,0.3)]",
                      showWrong && "btn-wrong shadow-[0_0_15px_rgba(239,68,68,0.3)]",
                      selectedAnswer !== null && !isSelected && !showCorrect && "opacity-50" // Dim unselected options
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
        <div className="flex justify-between items-center min-h-[50px] sm:min-h-[60px] pb-4 sm:pb-0">
          <div>
            {currentIndex > 0 && (
              <button 
                onClick={handleBack}
                className="px-4 py-2 sm:px-6 sm:py-3 bg-card-bg text-slate-300 border border-slate-700 hover:border-slate-500 rounded-xl font-medium flex items-center gap-2 transition-all animate-in fade-in slide-in-from-left-4 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
              </button>
            )}
          </div>
          <div>
            {selectedAnswer !== null && (
              <button 
                onClick={handleNext}
                className="px-6 py-2 sm:px-8 sm:py-3 bg-white text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-in fade-in slide-in-from-right-4 hover:scale-105 text-sm sm:text-base"
              >
                {currentIndex === questions.length - 1 ? 'Finish' : 'Next'} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
