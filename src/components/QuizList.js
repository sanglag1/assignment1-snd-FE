// QuizList.js
import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import { Link } from 'react-router-dom';
import '../styles/QuizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const data = await quizService.getAllQuizzes();
      setQuizzes(data);
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      await quizService.deleteQuiz(id);
      setQuizzes(quizzes.filter(quiz => quiz.id !== id)); 
    }
  };

  return (
    <div className="quiz-list">
      <h2>Quizzes</h2>
      <Link to="/quizzes/create">Create Quiz</Link>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id}>
          <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
          <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
