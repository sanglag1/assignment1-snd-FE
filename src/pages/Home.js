import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Quiz Management System</h1>
      <p>Welcome to the Quiz Management System. Create, manage, and take quizzes!</p>
      <div className="button-container">
        <Link to="/quizzes" className="home-button">View Quizzes</Link>
        <Link to="/quizzes/create" className="home-button">Create Quiz</Link>
      </div>
    </div>
  );
};

export default Home;
