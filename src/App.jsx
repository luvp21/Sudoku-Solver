import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const initialBoards = {
  easy: [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  medium: [
    [0, 0, 0, 0, 0, 0, 6, 8, 0],
    [0, 0, 0, 0, 7, 3, 0, 0, 9],
    [3, 0, 9, 0, 0, 0, 0, 4, 5],
    [4, 9, 0, 0, 0, 0, 0, 0, 0],
    [8, 0, 3, 0, 5, 0, 9, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 3, 6],
    [9, 6, 0, 0, 0, 0, 3, 0, 8],
    [7, 0, 0, 6, 8, 0, 0, 0, 0],
    [0, 2, 8, 0, 0, 0, 0, 0, 0],
  ],
  hard: [
    [8, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 6, 0, 0, 0, 0, 0],
    [0, 7, 0, 0, 9, 0, 2, 0, 0],
    [0, 5, 0, 0, 0, 7, 0, 0, 0],
    [0, 0, 0, 0, 4, 5, 7, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 3, 0],
    [0, 0, 1, 0, 0, 0, 0, 6, 8],
    [0, 0, 8, 5, 0, 0, 0, 1, 0],
    [0, 9, 0, 0, 0, 0, 4, 0, 0],
  ],
};

function App() {
  const [board, setBoard] = useState(initialBoards.easy.map(row => [...row]));
  const [difficulty, setDifficulty] = useState('easy');
  const [speed, setSpeed] = useState('medium');
  const stopRef = useRef(false);

  useEffect(() => {
    const initialBoard = initialBoards[difficulty].map(row => [...row]);
    console.log("Initial Board:", initialBoard); // Debugging line
    setBoard(initialBoard);
  }, [difficulty]);

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  const getSpeedValue = () => {
    switch (speed) {
      case 'instant':
        return 0;
      case 'medium':
        return 25;
      case 'fast':
        return 10;
      case 'slow':
        return 50;
      default:
        return 100;
    }
  };

  const solveSudoku = async (board) => {
    const sleep = () => new Promise(resolve => setTimeout(resolve, getSpeedValue()));
  
    const solve = async () => {
      if (stopRef.current) return false;
  
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] === 0) {
            for (let num = 1; num <= 9; num++) {
              if (stopRef.current) return false;
              if (isValid(board, row, col, num)) {
                board[row][col] = num;
                if (speed !== 'instant') {
                  setBoard([...board.map(r => [...r])]);
                  await sleep();
                }
                if (await solve()) return true;
                board[row][col] = 0;
                if (speed !== 'instant') {
                  setBoard([...board.map(r => [...r])]);
                  await sleep();
                }
              }
            }
            return false;
          }
        }
      }
      return true;
    };
  
    stopRef.current = false;
    await solve();
  
    if (speed === 'instant' && !stopRef.current) {
      setBoard([...board.map(r => [...r])]);
     
    } else if (!stopRef.current) {
      alert("Sudoku solved!");
    }
  };
  

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <div className="board">
        {board.map((row, rIdx) => (
          <div key={rIdx} className="row">
            {row.map((cell, cIdx) => (
              <div key={cIdx} className="cell">{cell !== 0 ? cell : ''}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={() => solveSudoku([...board.map(row => [...row])])}>Solve</button>
        <button onClick={() => setBoard(initialBoards[difficulty].map(row => [...row]))}>Reset</button>
        <button onClick={() => { stopRef.current = true }}>Stop</button>
        <div className="speed-controls">
          <label>Speed:</label>
          <select value={speed} onChange={(e) => setSpeed(e.target.value)}>
            <option value="instant">Instant</option>
            <option value="slow">Slow</option>
            <option value="medium">Medium</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;