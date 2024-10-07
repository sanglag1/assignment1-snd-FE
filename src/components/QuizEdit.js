import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/QuizEdit.css';

const QuizEdit = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await quizService.getQuizById(quizId);
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        alert("An error occurred while fetching the quiz. Please try again.");
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleUpdateQuiz = async () => {
    try {
      await quizService.updateQuiz(quizId, quiz);
      alert(`Quiz "${quiz.title}" updated successfully!`);
      navigate(`/quizzes/${quizId}`);
    } catch (error) {
      console.error("Error updating quiz:", error);
      alert("An error occurred while updating the quiz. Please try again.");
    }
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optionIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[optionIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="quiz-edit">
      <h2>Edit Quiz</h2>
      <input 
        type="text" 
        value={quiz.title} 
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} 
        placeholder="Quiz Title"
      />
      <textarea 
        value={quiz.description} 
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} 
        placeholder="Quiz Description"
      />

      <h3>Questions:</h3>
      {quiz.questions.map((question, qIndex) => (
        <div key={qIndex}>
          <input 
            type="text" 
            value={question.text} 
            onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)} 
            placeholder="Question"
          />

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex}>
              <input 
                type="text" 
                value={option} 
                onChange={(e) => handleOptionChange(qIndex, optionIndex, e.target.value)} 
                placeholder={`Option ${optionIndex + 1}`}
              />
            </div>
          ))}

          <div>
            <strong>Correct Answer: </strong>
            <select
              value={question.correctAnswerIndex}
              onChange={(e) => handleQuestionChange(qIndex, 'correctAnswerIndex', parseInt(e.target.value))}
            >
              {question.options.map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  Option {optionIndex + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <button onClick={handleUpdateQuiz}>Update Quiz</button>
    </div>
  );
};

export default QuizEdit;
