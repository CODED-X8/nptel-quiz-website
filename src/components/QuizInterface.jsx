import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Home, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function QuizInterface({ questions, onGoHome, mode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const [mockIsFinished, setMockIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180 * 60);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (mode !== 'mock') return;

    const handleBlur = () => {
      if (!mockIsFinished) {
        setTabSwitchCount(c => c + 1);
        alert("Warning: Please do not switch tabs during a Mock Test!");
      }
    };

    window.addEventListener('blur', handleBlur);

    const requestFs = async () => {
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (e) {
        console.log("Could not enter fullscreen:", e);
      }
    };

    if (!mockIsFinished) {
      requestFs();
    }

    return () => window.removeEventListener('blur', handleBlur);
  }, [mode, mockIsFinished]);

  useEffect(() => {
    if (mode !== 'mock' || mockIsFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setMockIsFinished(true);
          try {
            if (document.fullscreenElement && document.exitFullscreen) {
              document.exitFullscreen().catch(() => { });
            }
          } catch (e) { }
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, mockIsFinished]);

  const handleMockSubmit = async () => {
    setMockIsFinished(true);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCleanExit = async () => {
    if (mode === 'mock') {
      if (!isFinished && !mockIsFinished) {
        const confirmExit = window.confirm("Are you sure you want to exit the mock test? Your progress will be lost.");
        if (!confirmExit) return;
      }
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          await document.exitFullscreen();
        }
      } catch (e) { }
    }
    onGoHome();
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isFinished = mode === 'mock' ? mockIsFinished : currentIndex >= questions.length;
  const currentQuestion = questions[currentIndex];

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
    if (mode === 'mock') {
      setMockIsFinished(false);
      setShowReport(false);
      setTimeLeft(180 * 60);
      setTabSwitchCount(0);
    }
  };

  if (isFinished) {
    let finalScoreDisplay = `${score} / ${questions.length}`;
    let marksPercentage = Math.round((score / questions.length) * 100);
    let mockTestGrade = null;

    if (mode === 'mock') {
      const marks = score * 2;
      const maxMarks = questions.length * 2;
      finalScoreDisplay = `${marks} / ${maxMarks} Marks`;
      marksPercentage = Math.round((marks / maxMarks) * 100);

      if (marksPercentage > 85.47) {
        mockTestGrade = "S";
      } else if (marksPercentage > 72.13) {
        mockTestGrade = "A";
      }
    }

    if (mode === 'mock') {
      if (showReport) {
        return (
          <div className="fixed inset-0 z-[100] bg-white overflow-y-auto text-black font-sans">
            <div className="sticky top-0 bg-white border-b px-4 py-4 flex justify-between items-center z-[110] shadow-sm">
              <h2 className="text-xl font-bold">Detailed Report</h2>
              <button
                onClick={() => setShowReport(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded font-bold text-black border border-gray-300"
              >
                Back to Score
              </button>
            </div>
            <div className="max-w-4xl mx-auto p-4 sm:p-8 pb-32">
              {questions.map((q, qIndex) => {
                const userAns = answers[qIndex];
                const isUserCorrect = userAns === q.correctAnswerIndex;
                const scoreForQ = isUserCorrect ? 1 : 0;

                return (
                  <div key={qIndex} className="mb-8 p-4 border border-gray-200 bg-gray-50">
                    <div className="flex gap-2 mb-2">
                      <span className="font-bold">{qIndex + 1}.</span>
                      <h3 className="font-medium text-black">{q.questionText}</h3>
                    </div>
                    <div className="mb-4 pl-6 text-sm font-bold text-gray-700">
                      Score: {scoreForQ}
                    </div>
                    <div className="flex flex-col gap-2 pl-6">
                      {q.options.map((opt, oIndex) => {
                        const isSelected = userAns === oIndex;
                        const isActuallyCorrect = q.correctAnswerIndex === oIndex;

                        let dotClass = "w-3 h-3 rounded-full border border-gray-400";
                        let labelClass = "text-black";

                        if (isActuallyCorrect) {
                          dotClass = "w-3 h-3 rounded-full bg-green-500 border border-green-700";
                          labelClass = "text-green-700 font-bold";
                        } else if (isSelected && !isActuallyCorrect) {
                          dotClass = "w-3 h-3 rounded-full bg-red-500 border border-red-700";
                          labelClass = "text-red-700";
                        }

                        return (
                          <div key={oIndex} className="flex items-center gap-3">
                            <div className={dotClass} />
                            <span className={labelClass}>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 pl-6 text-sm text-green-700 font-bold">
                      Correct Answer: {q.options[q.correctAnswerIndex]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto text-black font-sans flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full border border-gray-300 p-8 text-center bg-gray-50">
            <h2 className="text-3xl font-bold mb-6 text-black">Exam Complete</h2>
            <div className="text-4xl font-black mb-6 text-black tracking-widest whitespace-nowrap">
              {finalScoreDisplay}
            </div>
            <div className="mb-4 text-xl font-bold text-gray-800">
              Score: {marksPercentage}%
            </div>
            {tabSwitchCount > 0 && (
              <div className="text-sm font-bold text-red-600 mb-4 px-2 py-1 border border-red-200 bg-red-50 inline-block">
                Warnings / Switches: {tabSwitchCount}
              </div>
            )}
            {mockTestGrade && (
              <div className="mb-6 mt-4">
                <div className="text-2xl font-bold text-black border border-black inline-block px-6 py-2">
                  Grade: {mockTestGrade}*
                </div>
                <p className="text-xs text-gray-600 mt-3">*Only if scored full in assignment marks</p>
              </div>
            )}
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={() => setShowReport(true)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-center border border-blue-800"
              >
                View Report
              </button>
              <button
                onClick={restartQuiz}
                className="w-full py-3 bg-white hover:bg-gray-100 text-black font-bold text-center border border-gray-400"
              >
                Try Again
              </button>
              <button
                onClick={handleCleanExit}
                className="w-full py-3 bg-black hover:bg-gray-800 text-white font-bold text-center"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[60vh] max-w-2xl mx-auto w-full relative z-10">
        <div className="glass-panel p-10 rounded-2xl w-full text-center animate-in fade-in zoom-in duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-blue)]/10 to-[var(--neon-cyan)]/5 pointer-events-none" />
          <Sparkles className="w-16 h-16 text-[var(--neon-cyan)] mx-auto mb-6 relative" />
          <h2 className="text-3xl font-bold mb-2 relative text-[var(--text-main)]">
            Revision Complete!
          </h2>
          <p className="text-[var(--text-muted)] mb-8 relative">You finished all {questions.length} questions.</p>

          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] mb-8 relative drop-shadow-[0_0_15px_var(--neon-cyan)]">
            {finalScoreDisplay}
          </div>
          <div className="mb-4 relative flex flex-col gap-2">
            <span className="text-xl font-medium tracking-wide text-[var(--text-main)]">Score: {marksPercentage}%</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative mt-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--border-color)] transition-all text-[var(--text-main)] font-medium flex items-center justify-center gap-2 btn-space"
            >
              <RotateCcw className="w-5 h-5" /> Try Again
            </button>
            <button
              onClick={handleCleanExit}
              className="px-6 py-3 rounded-xl bg-[var(--neon-blue)] hover:opacity-90 transition-all text-white font-medium shadow-[0_0_15px_var(--neon-blue)] flex items-center justify-center gap-2 relative z-10"
            >
              <Home className="w-5 h-5" /> Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'mock') {
    return (
      <div className="fixed inset-0 z-[100] bg-white overflow-y-auto text-black font-sans">
        <div className="sticky top-0 bg-white border-b px-4 py-3 flex flex-col sm:flex-row justify-between items-center z-[110]">
          <div className="flex items-center gap-4">
            <button onClick={handleCleanExit} className="p-2 hover:bg-gray-100 rounded text-gray-700" title="Exit Exam">
              <Home className="w-5 h-5" />
            </button>
            <div className="text-xl font-bold font-mono">
              Time Left: {formatTime(timeLeft)}
            </div>
          </div>
          <div className="text-sm font-bold text-red-600 px-3 py-1 mt-2 sm:mt-0">
            Tab Switches: {tabSwitchCount}
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 sm:p-8 pb-32">
          <h1 className="text-2xl font-bold text-center mb-8">Mock Examination</h1>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-6 p-4 border-b border-gray-200">
              <div className="flex gap-2 mb-4">
                <span className="font-bold">{qIndex + 1}.</span>
                <h3 className="font-medium text-black">
                  {q.questionText}
                </h3>
              </div>
              <div className="flex flex-col gap-2 pl-6">
                {q.options.map((opt, oIndex) => {
                  const isSelected = answers[qIndex] === oIndex;
                  return (
                    <label
                      key={oIndex}
                      className="flex items-start gap-2 cursor-pointer"
                    >
                      <input type="radio"
                        name={`q-${qIndex}`}
                        checked={isSelected}
                        onChange={() => {
                          const newA = [...answers];
                          newA[qIndex] = oIndex;
                          setAnswers(newA);
                        }}
                        className="mt-1"
                      />
                      <span className="text-black">{opt}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-8">
            <button
              onClick={handleMockSubmit}
              className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 w-full sm:w-auto"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-[var(--border-color)] z-50">
        <div
          className="h-full bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] transition-all duration-500 ease-out shadow-[0_0_10px_var(--neon-cyan)]"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      <div className="w-full max-w-3xl mx-auto p-2 sm:p-4 flex flex-col min-h-[80vh] pt-10 sm:pt-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-6 sm:mb-8 glass-panel px-4 sm:px-6 py-3 sm:py-4 rounded-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none" />
          <button
            onClick={onGoHome}
            className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-2 relative z-10 w-full sm:w-auto justify-center sm:justify-start"
          >
            <Home className="w-5 h-5" /> <span>Home</span>
          </button>
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 relative z-10">
            <div className="text-xs sm:text-sm font-medium tracking-widest uppercase text-[var(--neon-cyan)]">
              Question {currentIndex + 1} <span className="text-[var(--text-muted)]">of {questions.length}</span>
            </div>
            <div className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[var(--neon-blue)]/20 border border-[var(--neon-blue)]/40 font-bold text-[var(--neon-blue)] shadow-[0_0_10px_rgba(99,102,241,0.2)] text-sm sm:text-base">
              Score: {score}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-panel p-4 sm:p-10 rounded-2xl mb-6 sm:mb-8 flex-grow relative shadow-[0_0_30px_rgba(0,0,0,0.1)]">
          {currentQuestion.week !== undefined && (
            <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-[var(--background)] rounded-md text-[10px] sm:text-xs font-semibold text-[var(--neon-cyan)] mb-3 sm:mb-4 tracking-wider border border-[var(--border-color)] uppercase">
              WEEK {currentQuestion.week}
            </span>
          )}
          <h2 className="text-xl sm:text-3xl font-medium leading-relaxed mb-6 sm:mb-8 relative z-10 drop-shadow-sm text-[var(--text-main)]">
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
                      "text-left p-3 sm:p-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] btn-option backdrop-blur-sm transition-all shadow-sm text-[var(--text-main)]",
                      "text-base sm:text-lg",
                      showCorrect && "btn-correct",
                      showWrong && "btn-wrong",
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
                className="px-4 py-2 sm:px-6 sm:py-3 bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-color)] hover:border-[var(--neon-blue)] rounded-xl font-medium flex items-center gap-2 transition-all animate-in fade-in slide-in-from-left-4 text-sm sm:text-base hover:shadow-[0_0_15px_var(--neon-blue)]"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" /> Back
              </button>
            )}
          </div>
          <div>
            {selectedAnswer !== null && (
              <button
                onClick={handleNext}
                className="px-6 py-2 sm:px-8 sm:py-3 bg-[var(--text-main)] text-[var(--background)] rounded-xl font-bold flex items-center gap-2 hover:opacity-80 transition-all shadow-[0_0_20px_var(--text-main)] animate-in fade-in slide-in-from-right-4 hover:scale-105 text-sm sm:text-base border border-transparent"
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
