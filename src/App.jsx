import React, { useState } from 'react';
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
  const [solving, setSolving] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [difficulty, setDifficulty] = useState('easy');
  const [stop, setStop] = useState(false);

  const isValid = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
      if (board[i][col] === num) return false;
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  };

  const solveSudoku = async (board) => {
    setStop(false);
    const sleep = () => new Promise(resolve => setTimeout(resolve, speed));
    
    const solve = async (row = 0, col = 0) => {
      if (stop) return false;
      if (row === 9) return true;
      if (col === 9) return await solve(row + 1, 0);
      if (board[row][col] !== 0) return await solve(row, col + 1);

      for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
          const newBoard = [...board];
          newBoard[row][col] = num;
          setBoard(newBoard);
          await sleep();

          if (await solve(row, col + 1)) return true;

          newBoard[row][col] = 0;
          setBoard([...newBoard]);
          await sleep();
        }
      }
      return false;
    };
    return await solve();
  };

  const handleSolve = async () => {
    if (solving) return;
    setSolving(true);
    const solved = await solveSudoku(board);
    if (solved) alert('Sudoku solved!');
    else alert('No solution found!');
    setSolving(false);
  };

  const handleStop = () => {
    setStop(true);
    setSolving(false);
  };

  const handleReset = () => {
    setBoard(initialBoards[difficulty].map(row => [...row]));
    setStop(true);
    setSolving(false);
  };

  return (
    <div className="App">
      <h1>Sudoku Solver</h1>
      <div className="controls">
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={handleSolve} disabled={solving}>Solve</button>
        <button onClick={handleStop} disabled={!solving}>Stop</button>
        <button onClick={handleReset}>Reset</button>
        <div className="speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="1"
            max="500"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={`cell ${cell !== 0 ? 'filled' : ''}`}>
                {cell || ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
