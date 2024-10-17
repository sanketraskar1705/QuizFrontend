import axios from 'axios';

// Full API URL (your MockAPI URL)
const API_URL = 'https://670f9ef73e7151861658b168.mockapi.io/api'; // Replace with your MockAPI URL

// Function to fetch quizzes
export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes`); // Fetch all quizzes
  return response.data;
};

// Function to start the quiz
export const startQuiz = async () => {
  const quizzes = await getQuizzes(); // Fetch quizzes
  return quizzes[0]; // Return the first quiz for now
};

// Function to submit an answer
export const submitAnswer = async (quizId, questionId, selectedChoices, timeTaken) => {
  // Mock submission logic as MockAPI does not have a specific endpoint for this
  // You can log or handle the answer submission as needed
  return {
    message: 'Answer submitted successfully',
    quizId,
    questionId,
    selectedChoices,
    timeTaken,
  };
};

// Function to finish the quiz
export const finishQuiz = async (quizId) => {
  // Mock finishing logic (you can implement score calculation here)
  return {
    message: 'Quiz finished',
    score: 80, // Replace with your scoring logic
  };
};
