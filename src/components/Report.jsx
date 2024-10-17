import React from 'react';

const Report = ({ scoreData, startAgain }) => {
  const score = scoreData?.score ?? 0;
  const correctAnswers = scoreData?.correctAnswers ?? 0;
  const incorrectAnswers = scoreData?.incorrectAnswers ?? 0;
  const totalQuestions = correctAnswers + incorrectAnswers;
  const correctPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  return (
    <div className="flex items-center justify-center h-screen bg-[#FF885B]">
      <div className="relative w-[340px] h-[700px] bg-black rounded-3xl shadow-lg flex items-center justify-center">
        <div className="absolute inset-3 bg-gradient-to-b bg-[#FFE5CF] rounded-2xl flex flex-col items-center justify-center text-white p-8">
          <h2 className="text-3xl font-bold mb-4 text-[#33372C] text-center">Your Result</h2>
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#33372C]">{Math.round(correctPercentage)}%</span>
            </div>
            <svg className="w-full h-full">
              <circle cx="50%" cy="50%" r="60" strokeWidth="10" stroke="#e0e0e0" fill="none" />
              <circle
                cx="50%"
                cy="50%"
                r="60"
                strokeWidth="10"
                stroke="darkorange"
                strokeDasharray={`${correctPercentage} ${100 - correctPercentage}`}
                strokeDashoffset="25"
                fill="none"
                className="transition-all duration-300"
              />
            </svg>
          </div>

          <div className="mt-8 w-full max-w-xs">
            <div className="flex items-center p-3 bg-green-600 rounded-lg mb-2">
              <span className="text-green-950 font-bold ">{correctAnswers}</span> <span className='pl-4 opacity-90'>Correct</span>
            </div>
            <div className="flex items-center p-3 bg-red-600 rounded-lg">
              <span className="text-red-950 font-bold">{incorrectAnswers}</span> <span className='pl-4 opacity-90'>Incorrect</span>
            </div>
          </div>

          <button 
            onClick={startAgain} 
            className="mt-8 bg-white text-[#557C56] py-2 px-4 rounded shadow-lg hover:bg-gray-200  transition duration-200"
          >
            Start Again
          </button>
        </div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-xl"></div>
      </div>
    </div>
  );
};

export default Report;
