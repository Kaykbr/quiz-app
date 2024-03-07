import React from "react";
import Questoes from "./Questoes";

function TelaPrincipal(props) {
  return (
    <div className="open-screen-content">
      <h1 className="header">Quizzical</h1>
      <p className="description">Alguma descrição</p>
      {/* on click: show questions screen */}
      <button className="start-btn" onClick={() => props.setShowQuestions(true)}>
        Iniciar quiz
      </button>

      {/* Renderizar as questões quando showQuestions for true */}
      {props.showQuestions && <Questoes setShowQuestions={props.setShowQuestions} />}
    </div>
  );
}

export default TelaPrincipal;
