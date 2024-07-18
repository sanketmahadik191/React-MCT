// src/Quiz.js
import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar.jsx';

const questions = [
  { question: 'What is the capital of France?', options: ['Paris', 'London', 'Rome', 'Berlin'], answer: 'Paris' },
  { question: 'Which continent is Egypt in?', options: ['Asia', 'Africa', 'Europe', 'Australia'], answer: 'Africa' },
  { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], answer: 'Nile' },
  { question: 'Which is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
  { question: 'Which country has the largest population?', options: ['India', 'USA', 'China', 'Russia'], answer: 'China' },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (timeLeft > 0 && !showAnswer) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !showAnswer) {
      handleAnswerOptionClick(false);
    }
  }, [timeLeft, showAnswer]);

  const handleAnswerOptionClick = (isCorrect, option) => {
    setSelectedOption(option);
    setShowAnswer(true);
    if (isCorrect) {
      setScore(score + 1);
    }
    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimeLeft(10);
    } else {
      setShowScore(true);
    }
  };

  const handleRetest = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
    setTimeLeft(10);
    setShowAnswer(false);
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      {showScore ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <div className="text-3xl font-bold mb-4">You scored {score} out of {questions.length}</div>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" onClick={handleRetest}>Retest</button>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <div className="mb-4">
            <div className="text-xl font-bold">Score: {score}</div>
            <div className="text-xl font-bold mb-2">{questions[currentQuestion].question}</div>
            <ProgressBar timeLeft={timeLeft} />
            <div className="mt-2 text-gray-600">Time left: {timeLeft} seconds</div>
          </div>
          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <div key={index} className="w-full">
                <button
                  className={`w-full px-4 py-2 rounded focus:outline-none ${selectedOption === option ? (option === questions[currentQuestion].answer ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                  onClick={() => handleAnswerOptionClick(option === questions[currentQuestion].answer, option)}
                  disabled={showAnswer}
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
          {showAnswer && (
            <div className="mt-4 text-green-700">
              Correct Answer: {questions[currentQuestion].answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
