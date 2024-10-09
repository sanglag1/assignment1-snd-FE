import axios from 'axios';

const API_URL = 'https://assignment1-snd.onrender.com/quizzes';

const quizService = {
  getAllQuizzes: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  getQuizById: async (id) => {
    if (!id) throw new Error('Quiz ID is missing');
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },
  createQuiz: async (quizData) => {
    const response = await axios.post(API_URL, quizData);
    return response.data;
  },
  updateQuiz: async (id, quizData) => {
    const response = await axios.put(`${API_URL}/${id}`, quizData);
    return response.data;
  },
  deleteQuiz: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
  updateQuestion: async (quizId, questionId, questionData) => {
    const response = await axios.put(`${API_URL}/${quizId}/questions/${questionId}`, questionData);
    return response.data;
  },
  deleteQuestion: async (quizId, questionId) => {
    await axios.delete(`${API_URL}/${quizId}/questions/${questionId}`);
  },
};

export default quizService;
