import React, { useEffect, useState } from 'react';
import { startQuiz, submitAnswer, finishQuiz } from '../api/quizApp';
import Report from './Report'; 

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [quizId, setQuizId] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      const quizData = await startQuiz();
      setQuestions(quizData.questions);
      setQuizId(quizData.id);
    };
    fetchQuiz();
  }, []);

  const handleChoiceChange = (choice) => {
    setSelectedChoices((prev) =>
      prev.includes(choice) ? prev.filter((c) => c !== choice) : [...prev, choice]
    );
  };

  const handleSubmit = async () => {
    if (selectedChoices.length === 0) return;

    const timeTaken = Math.floor(Math.random() * 30);
    await submitAnswer(quizId, questions[currentQuestionIndex].id, selectedChoices, timeTaken);

    const isCorrect = questions[currentQuestionIndex].correctAnswers.includes(selectedChoices[0]);
    if (isCorrect) setScore((prev) => prev + 1);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedChoices([]);
    } else {
      await finishQuiz(quizId);
      setIsFinished(true);
    }
  };

  const startAgain = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedChoices([]);
    setQuizId(null);
    setScore(0);
    setIsFinished(false);

    const fetchQuiz = async () => {
      const quizData = await startQuiz();
      setQuestions(quizData.questions);
      setQuizId(quizData.id);
    };
    fetchQuiz();
  };

  if (isFinished) {
    return <Report scoreData={{ score, correctAnswers: score, incorrectAnswers: questions.length - score }} startAgain={startAgain} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#FF885B]">
      <div className="relative w-[340px] h-[700px] bg-black rounded-3xl shadow-lg flex items-center justify-center">
        <div className="absolute pb-20 inset-3 bg-gradient-to-b bg-[#FFE5CF] rounded-2xl flex flex-col items-center justify-center text-[#33372C] p-8">
          {questions.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <h2 className="text-2xl text-[#33372C]">Loading...</h2>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-10 justify-center bg-blue-500 text-white text-2xl font-bold w-16 h-16 rounded-full">
                {currentQuestionIndex + 1}
              </div>

              <h2 className="text-2xl mb-4 max-w-xs mx-auto">{questions[currentQuestionIndex].text}</h2>

              <div className="flex flex-col space-y-2 max-w-xs w-full">
                {questions[currentQuestionIndex].choices.map((choice) => (
                  <label key={choice} className="flex items-center space-x-2 bg-[#557C56] text-white p-2 rounded-lg">
                    <input
                      type="checkbox"
                      value={choice}
                      checked={selectedChoices.includes(choice)}
                      onChange={() => handleChoiceChange(choice)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>

              <button
                className="mt-8 bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-200"
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            </>
          )}
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default Quiz;
