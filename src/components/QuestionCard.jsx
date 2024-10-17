import React from 'react';

const QuestionCard = ({ question, onSubmit }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-lg font-bold">{question.text}</h2>
      <div className="mt-2">
        {question.choices.map(choice => (
          <label key={choice} className="block mb-2">
            <input type="checkbox" className="mr-2" />
            {choice}
          </label>
        ))}
      </div>
      <button onClick={onSubmit} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200">
        Next Question
      </button>
    </div>
  );
};

export default QuestionCard;
