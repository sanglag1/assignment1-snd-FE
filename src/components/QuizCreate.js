import React, { useState } from 'react'; 
import quizService from '../services/quizService';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizCreate.css';

const QuizCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ text: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    if (newQuestion.text && newQuestion.options.length > 0 && newQuestion.options.some(option => option)) {
      setQuestions(prev => [...prev, newQuestion]);
      setNewQuestion({ text: '', options: ['', '', '', ''], correctAnswerIndex: 0 });
    } else {
      alert("Please fill in the question and at least one option.");
    }
  };

  const handleCreateQuiz = async () => {
    try {
      const quizData = { title, description, questions };

      if (!title || !description || questions.length === 0) {
        alert("Please fill in all fields and add at least one question.");
        return;
      }

      await quizService.createQuiz(quizData);
      alert(`Quiz "${title}" created successfully!`);
      navigate('/quizzes');
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("An error occurred while creating the quiz. Please try again.");
    }
  };

  const handleBackToView = () => {
    navigate('/quizzes');
  };

  return (
    <div className="quiz-create">
      <h2>Create Quiz</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

      <h3>Add Question</h3>
      <input type="text" value={newQuestion.text} onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })} placeholder="Question" />
      {newQuestion.options.map((option, index) => (
        <input key={index} type="text" value={option} onChange={(e) => {
          const options = [...newQuestion.options];
          options[index] = e.target.value;
          setNewQuestion({ ...newQuestion, options });
        }} placeholder={`Option ${index + 1}`} />
      ))}
      <button onClick={handleAddQuestion}>Add Question</button>

      <select value={newQuestion.correctAnswerIndex} onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswerIndex: Number(e.target.value) })}>
        {newQuestion.options.map((_, index) => (
          <option key={index} value={index}>Option {index + 1}</option>
        ))}
      </select>

      <button onClick={handleCreateQuiz}>Create Quiz</button>
      <button className="back-btn" onClick={handleBackToView}>Back to View</button>
    </div>
  );
};

export default QuizCreate;
