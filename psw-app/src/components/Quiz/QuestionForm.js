import React, { useState } from "react";
import axios from 'axios';

const QuestionForm = ({ onQuestionSubmit }) => {
  var [questionType, setQuestionType] = useState();
  var [questionText, setQuestionText] = useState();
  var [questionAnswer, setQuestionAnswer] = useState();
  var [questionBoolean, setQuestionBoolean] = useState();

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    questionType = e.target.value
    console.log(questionType)
  };

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value)
    questionText = e.target.value
    console.log(questionText)
  };

  const handleQuestionAnswerChange = (e) => {
    setQuestionAnswer(e.target.value)
    questionAnswer = e.target.value
    console.log(questionAnswer)
  };

  const handleQuestionBooleanChange = (e) => {
    setQuestionBoolean(e.target.value)
    questionBoolean = e.target.value
    console.log(questionBoolean)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    var body = {
      questionType: 'questionType',
      questionText: 'questionText',
      questionAnswer: 'questionAnswer',
      questionBoolean: 'questionBoolean'
    };
  
    axios.post('https://api.example.com/', body)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    questionType = ""
    questionText = ""
    questionBoolean = ""
    questionAnswer = ""
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question Type:
        <select value={questionType} onChange={handleQuestionTypeChange}>
          <option value="">Select a type</option>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="truefalse">True/False</option>
          <option value="short">Short Answer</option>
          <option value="list">List Selection</option>
          <option value="fill">Fill in the Blank</option>
          <option value="sort">Sort</option>
          <option value="match">Match</option>
        </select>
      </label>
      {questionType && (
        <>
          <label>
            Question Text:
            <input
              type="text"
              name="text"
              value={questionText || ""}
              onChange={handleQuestionTextChange}
            />
          </label>
          {questionType === "single" ||
          questionType === "multiple" ||
          questionType === "list" ? (
            <label>
              Answers:
              <input
                type="text"
                name="answers"
                value={questionAnswer || ""}
                onChange={handleQuestionAnswerChange}
              />
            </label>
          ) : null}
          {questionType === "truefalse" ? (
            <label>
              Answer:
              <select
                name="answer"
                value={questionBoolean || ""}
                onChange={handleQuestionBooleanChange}
              >
                <option value="">Select an answer</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </label>
          ) : null}
          <input type="submit" value="Submit" />
        </>
      )}
    </form>
  );
};

export default QuestionForm;