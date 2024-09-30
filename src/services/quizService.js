import axios from 'axios';

const API_URL = 'http://localhost:3000/api/quizzes';

const quizService = {
  getAllQuizzes: async () => {
    const response = await axios.get(API_URL);
    return response.data; // Kiểm tra dữ liệu trả về có chứa `id` không
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
};

export default quizService;
