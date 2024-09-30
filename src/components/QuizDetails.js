import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import { useParams, useNavigate } from 'react-router-dom';

const QuizDetails = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [feedback, setFeedback] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        console.error("Quiz ID is undefined");
        return;
      }
  
      try {
        const quizData = await quizService.getQuizById(quizId);
        setQuiz(quizData);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);
  

  const handleAnswerSelection = (questionIndex, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleCheckAnswers = (questionIndex) => {
    const question = quiz.questions[questionIndex];
    const selectedAnswer = selectedAnswers[questionIndex];

    if (selectedAnswer === undefined) {
      setFeedback('Please select an answer before checking.');
      return;
    }

    if (selectedAnswer === question.correctAnswerIndex) {
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! Correct answer: ${question.options[question.correctAnswerIndex]}`);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setFeedback('');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
      setFeedback('');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestionIndex];

  return (
    <div>
      <h2>{quiz.title}</h2>
      <h3>{question.text}</h3>
      {question.options.map((option, optionIndex) => (
        <div key={optionIndex}>
          <input
            type="radio"
            name={`question${currentQuestionIndex}`}
            checked={selectedAnswers[currentQuestionIndex] === optionIndex}
            onChange={() => handleAnswerSelection(currentQuestionIndex, optionIndex)}
          />
          {option}
        </div>
      ))}
      <button onClick={() => handleCheckAnswers(currentQuestionIndex)}>Check Answer</button>
      <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
      <button onClick={handleNextQuestion} disabled={currentQuestionIndex === quiz.questions.length - 1}>Next</button>
      {feedback && <div>{feedback}</div>}
      <button onClick={handleBackToHome}>Back to Home</button>
    </div>
  );
};

export default QuizDetails;
