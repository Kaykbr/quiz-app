import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Question from './Question';
import { nanoid } from 'nanoid';

function App() {
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (started) {
      async function getQuestion(num, cat, diff, type) {
        const res = await fetch(`https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=${type}`);
        const data = await res.json();
        let q = [];
        data.results.forEach(question => {
          q.push({
            id: nanoid(),
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer]),
            question: question.question,
            correct: question.correct_answer,
            selected: null,
            checked: false,
          });
        });
        setQuestions(q);
      }

      getQuestion(5, 18, 'easy', 'multiple'); // You can set default values or get from the state if needed
    }
  }, [started]);

  function handleCheck() {
    let selected = true;
    questions.forEach((question) => {
      if (question.selected === null) {
        selected = false;
        return;
      }
    });
    if (!selected) {
      return;
    }
    setQuestions((questions) =>
      questions.map((question) => {
        return { ...question, checked: true };
      })
    );
    setChecked(true);
    let correct = 0;
    questions.forEach((question) => {
      if (question.correct === question.selected) {
        correct += 1;
      }
    });
    setCorrect(correct);
  }

  function handleClickAnswer(id, answer) {
    setQuestions((questions) =>
      questions.map((question) =>
        question.id === id ? { ...question, selected: answer } : question
      )
    );
  }

  function handlePlayAgain() {
    setStarted(false);
    setChecked(false);
  }

  const questionElement =
    questions.length > 0
      ? questions.map((question) => (
          <Question
            key={question.id}
            q={question}
            handleClickAnswer={handleClickAnswer}
            id={question.id}
          />
        ))
      : [];

  function start(num, cat, diff, type) {
    setStarted(true);
    // You can also use the passed parameters as needed
  }

  return (
    <div className='main-container'>
      <div className='content-container'>
        {started ? (
          <div className='start-content-container'>
            {questionElement}
            <div className='end-div'>
              {checked && (
                <span className='score'>
                  You scored {correct}/{questions.length} correct answers
                </span>
              )}
              <button className='check' onClick={checked ? handlePlayAgain : handleCheck}>
                {checked ? 'Play Again' : 'Check Answer'}
              </button>
            </div>
          </div>
        ) : (
          <Menu start={start} />
        )}
      </div>
    </div>
  );
}

export default App;
