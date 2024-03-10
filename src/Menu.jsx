// Menu.jsx
import React, { useState } from 'react';

function Menu({ start }) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [category, setCategory] = useState(18);
  const [difficulty, setDifficulty] = useState('easy');
  const [type, setType] = useState('multiple');

  const handleStart = () => {
    start(numQuestions, category, difficulty, type);
  };

  return (
    <div className="menu">
      <h1 className='page-title'>Quizzical</h1>
      <span className='page-description'>Description</span>
      <div className="input-group">
        <label htmlFor="numQuestions">Number of Questions:</label>
        <input
          type="number"
          id="numQuestions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category:</label>
        <input
          type="number"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="multiple">Multiple Choice</option>
          <option value="boolean">True/False</option>
        </select>
      </div>
      <button className='start-button' onClick={handleStart}>Start Quizzical</button>
    </div>
  );
}

export default Menu;
