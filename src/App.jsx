import React from "react";

// components
import TelaPrincipal from "./components/TelaPrincipal";
import Questoes from "./components/Questoes";

function App() {
  // show questions screen
  const [showQuestions, setShowQuestions] = React.useState(false);

  return (
    <div>
      {showQuestions ? (
        <Questoes setShowQuestions={setShowQuestions} />
      ) : (
        <TelaPrincipal setShowQuestions={setShowQuestions} />
      )}
    </div>
  );
}

export default App;
