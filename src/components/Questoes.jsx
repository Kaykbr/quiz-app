import React from "react";
import Questao from "./Questao";

function Questoes() {
  const [questions, setQuestions] = React.useState([]);
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);
  const [showWarning, setShowWarning] = React.useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0);
  const [showResult, setShowResult] = React.useState(false);

  React.useEffect(() => {
    if (questions.length === 0) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);
          setQuestionsAndAnswers(
            data.results.map((questionObject) => {
              return {
                question: questionObject.question,
                shuffledAnswers: shuffle([
                  ...questionObject.incorrect_answers,
                  questionObject.correct_answer
                ]),
                correctAnswer: questionObject.correct_answer,
                selectedAnswer: ""
              };
            })
          );
        });
    }
  }, [questions]);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  function updateAnswer(currentQuestion, answer) {
    setQuestionsAndAnswers(
      questionsAndAnswers.map((questionObject) => {
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  }

  function checkAnswers() {
    const notAllAnswered = questionsAndAnswers.some(
      (questionObject) => questionObject.selectedAnswer === ""
    );

    setShowWarning(notAllAnswered);

    if (!notAllAnswered) {
      questionsAndAnswers.forEach((questionObject) => {
        if (questionObject.selectedAnswer === questionObject.correctAnswer) {
          setNumCorrectAnswers(
            (prevNumCorrectAnswers) => prevNumCorrectAnswers + 1
          );
        }
      });

      setShowResult(true);
    }
  }

  function playAgain() {
    setQuestions([]);
    setQuestionsAndAnswers([]);
    setShowResult(false);
    setNumCorrectAnswers(0);
  }

  const questionsElements = questionsAndAnswers.map((questionObject, index) => {
    return (
      <Questao
        key={index}
        question={questionObject.question}
        allAnswers={questionObject.shuffledAnswers}
        selectedAnswer={questionObject.selectedAnswer}
        correctAnswer={questionObject.correctAnswer}
        showResult={showResult}
        updateAnswer={updateAnswer}
      />
    );
  });

  return (
    <div>
      <div className="questions-container">{questionsElements}</div>

      <div className="text-center">
        {showWarning && (
          <p className="warning-message">
            Há perguntas não respondidas ainda^
          </p>
        )}

        {questions.length > 0 && !showResult ? (
          <button className="check-btn" onClick={checkAnswers}>
            Verificar respostas
          </button>
        ) : null}
      </div>

      {showResult && (
        <div className="result-container">
          <p className="result-message">
            Você acertou {numCorrectAnswers}/5 respostas corretas
          </p>
          <button className="play-again-btn" onClick={playAgain}>
            Jogar novamente
          </button>
        </div>
      )}
    </div>
  );
}

export default Questoes;
