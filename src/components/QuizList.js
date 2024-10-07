import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/QuizList.css';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

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
      setQuizzes(quizzes.filter(quiz => quiz._id !== id));
    }
  };

  return (
    <div className="quiz-list-container">
      <h2 className="quiz-list-title">Quizzes</h2>
      
      <Link to="/quizzes/create" className="create-btn">Create New Quiz</Link>
      
      <ul className="quiz-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item">
            <div className="quiz-info">
              <Link to={`/quizzes/${quiz._id}`} className="quiz-title">{quiz.title}</Link>
              <p className="quiz-description">{quiz.description}</p>
            </div>
            <div className="quiz-actions">
              <button onClick={() => navigate(`/quizzes/${quiz._id}/edit`)} className="edit-btn">Edit</button>
              <button onClick={() => handleDeleteQuiz(quiz._id)} className="delete-btn">Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <button className="back-home-btn" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default QuizList;
