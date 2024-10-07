import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizList from './components/QuizList';
import QuizCreate from './components/QuizCreate';
import QuizEdit from './components/QuizEdit';
import QuizDetail from './components/QuizDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quizzes/create" element={<QuizCreate />} />
        <Route path="/quizzes/edit/:quizId" element={<QuizEdit />} />
        <Route path="/quizzes/:quizId" element={<QuizDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
