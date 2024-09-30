import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Trang chính
import QuizList from './components/QuizList'; // Danh sách quiz
import QuizDetails from './components/QuizDetails'; // Chi tiết quiz
import QuizCreate from './components/QuizCreate'; // Tạo quiz mới

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/:quizId" element={<QuizDetails />} />
        <Route path="/quizzes/create" element={<QuizCreate />} />
      </Routes>
    </Router>
  );
};

export default App;
