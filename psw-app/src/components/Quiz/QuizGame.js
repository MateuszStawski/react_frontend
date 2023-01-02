import React, { useReducer, useMemo } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import SettingsForm from "./SettingsForm";
import Quiz from "./Quiz";

const quizReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };
    case "SET_SETTINGS":
      return {
        ...state,
        settings: action.settings,
      };
    case "SET_QUIZ":
      return {
        ...state,
        quiz: action.quiz,
      };
    case "DELETE_QUESTION":
      const newQuestions = [...state.questions];
      newQuestions.splice(action.index, 1);
      return {
        ...state,
        questions: newQuestions,
      };
    case "EDIT_QUESTION":
      const editedQuestions = [...state.questions];
      editedQuestions[action.index] = action.question;
      return {
        ...state,
        questions: editedQuestions,
      };
    default:
      return state;
  }
};

const QuizGame = () => {
  const [state, dispatch] = useReducer(quizReducer, {
    questions: [],
    settings: {},
    quiz: null,
  });

  const handleQuestionSubmit = (question) => {
    dispatch({
      type: "SET_QUESTIONS",
      questions: [...state.questions, question],
    });
  };

  const handleSettingsSubmit = (settings) => {
    dispatch({ type: "SET_SETTINGS", settings: settings });
  };

  const handleQuizStart = () => {
    dispatch({ type: "SET_QUIZ", quiz: state.questions });
  };

  const handleQuizEnd = (score) => {
    dispatch({ type: "SET_QUIZ", quiz: null });
    alert(`You scored ${score} points!`);
  };

  const handleQuestionDelete = (index) => {
    dispatch({ type: "DELETE_QUESTION", index: index });
  };

  const handleQuestionEdit = (index, question) => {
    dispatch({ type: "EDIT_QUESTION", index: index, question: question });
  };

  const quizContent = useMemo(() => {
    return state.quiz ? (
      <Quiz
        questions={state.quiz}
        settings={state.settings}
        onQuizEnd={handleQuizEnd}
      />
    ) : (
      <>
        <QuestionForm onQuestionSubmit={handleQuestionSubmit} />
        <QuestionList
          questions={state.questions}
          onQuestionDelete={handleQuestionDelete}
          onQuestionEdit={handleQuestionEdit}
        />
        <SettingsForm onSettingsSubmit={handleSettingsSubmit} />
        <button onClick={handleQuizStart}>Start Quiz</button>
      </>
    );
  }, [state.quiz, state.questions, state.settings]);

  return <div>{quizContent}</div>;
};

export default QuizGame;
