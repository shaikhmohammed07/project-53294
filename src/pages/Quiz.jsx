import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, RotateCcw } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import quizData from '../data/quiz.json';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const savedScore = localStorage.getItem('quizHighScore');
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    
    setIsAnswered(true);
    if (selectedOption === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('quizHighScore', score.toString());
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <PageTransition className="pt-24 pb-32 bg-slate-50 dark:bg-primary-dark min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {!showResults ? (
          <>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-dark dark:text-white">Knowledge Quiz</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Question {currentQuestion + 1} of {quizData.length}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-slate-500 dark:text-slate-400">Current Score</span>
                <div className="text-2xl font-bold text-accent">{score}</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded-full mb-12 overflow-hidden">
              <motion.div 
                className="h-full bg-accent"
                initial={{ width: `${((currentQuestion) / quizData.length) * 100}%` }}
                animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel rounded-2xl p-6 md:p-10 shadow-xl"
              >
                <h2 className="text-xl md:text-2xl font-bold text-primary-dark dark:text-white mb-8">
                  {quizData[currentQuestion].question}
                </h2>

                <div className="space-y-4 mb-8">
                  {quizData[currentQuestion].options.map((option, index) => {
                    const isCorrect = isAnswered && index === quizData[currentQuestion].correctAnswer;
                    const isWrong = isAnswered && selectedOption === index && index !== quizData[currentQuestion].correctAnswer;
                    
                    let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 ";
                    
                    if (isAnswered) {
                      if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                      } else if (isWrong) {
                        buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 opacity-70";
                      } else {
                        buttonClass += "border-slate-200 dark:border-white/10 opacity-50 text-slate-600 dark:text-slate-400";
                      }
                    } else {
                      if (selectedOption === index) {
                        buttonClass += "border-accent bg-accent/5 text-primary-dark dark:text-white";
                      } else {
                        buttonClass += "border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:border-accent/50 hover:bg-slate-50 dark:hover:bg-white/5";
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleOptionSelect(index)}
                        disabled={isAnswered}
                        className={buttonClass}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-lg">{option}</span>
                          {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                          {isAnswered && isWrong && <XCircle className="w-6 h-6 text-red-500" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8"
                    >
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">Explanation</h4>
                      <p className="text-blue-700 dark:text-blue-400 text-sm">{quizData[currentQuestion].explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end">
                  {!isAnswered ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={selectedOption === null}
                      className={`btn-primary px-8 ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="btn-primary px-8 flex items-center gap-2"
                    >
                      {currentQuestion < quizData.length - 1 ? 'Next Question' : 'See Results'}
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel rounded-3xl p-10 md:p-16 text-center max-w-2xl mx-auto shadow-2xl"
          >
            <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-accent" />
            </div>
            <h2 className="text-4xl font-bold text-primary-dark dark:text-white mb-2">Quiz Completed!</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">You answered {score} out of {quizData.length} questions correctly.</p>
            
            <div className="flex justify-center gap-8 mb-12">
              <div className="bg-white dark:bg-primary-light border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-32">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-semibold">Score</div>
                <div className="text-4xl font-bold text-primary-dark dark:text-white">{score}</div>
              </div>
              <div className="bg-white dark:bg-primary-light border border-slate-200 dark:border-white/10 rounded-2xl p-6 w-32">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider font-semibold">Best</div>
                <div className="text-4xl font-bold text-accent">{Math.max(score, highScore)}</div>
              </div>
            </div>

            <button onClick={restartQuiz} className="btn-primary flex items-center gap-2 mx-auto">
              <RotateCcw size={20} /> Play Again
            </button>
          </motion.div>
        )}

      </div>
    </PageTransition>
  );
};

export default Quiz;
