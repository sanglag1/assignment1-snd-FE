import React, { useEffect, useState } from 'react';
import quizService from '../services/quizService';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/QuizEdit.css';

const QuizEdit = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await quizService.getQuizById(quizId);
      setQuiz(data);
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

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="quiz-edit">
      <h2>Edit Quiz</h2>
      <input type="text" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} />
      <input type="text" value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} />

      <h3>Questions:</h3>
      {quiz.questions.map((question, index) => (
        <div key={index}>
          <input type="text" value={question.text} onChange={(e) => {
            const updatedQuestions = [...quiz.questions];
            updatedQuestions[index].text = e.target.value;
            setQuiz({ ...quiz, questions: updatedQuestions });
          }} />
        </div>
      ))}
      <button onClick={handleUpdateQuiz}>Update Quiz</button>
    </div>
  );
};

export default QuizEdit;
