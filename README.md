# Sudoku Solver (React)

## Overview
This is a Sudoku puzzle solver built with React. The app allows users to input Sudoku puzzles, select difficulty levels (easy, medium, and hard), and automatically solve the puzzle using a backtracking algorithm. The solver steps through the puzzle, filling in numbers based on Sudoku rules, and offers speed controls for visualizing the solution process.

## Features
- **Manual Puzzle Input**: Input your own Sudoku puzzle by editing the board.
- **Difficulty Levels**: Choose between easy, medium, and hard Sudoku boards.
- **Automated Solver**: Use the backtracking algorithm to automatically solve the puzzle.
- **Speed Controls**: Adjust the speed of the solver (Instant, Slow, Medium, Fast).
- **Reset & Stop**: Reset the puzzle or stop the solver at any time.

## Requirements
- Node.js (Recommended version: 16 or higher)
- React (Create React App)
- Vite (for faster development environment)

## Installation & Running the App
1. Clone this repository:
   ```bash
   git clone https://github.com/luvp21/Sudoku-Solver.git
   cd sudoku-solver-react
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The app will open in your browser at [http://localhost:5173](http://localhost:5173).

## Controls
- **Input Puzzle**: Enter your Sudoku puzzle by typing numbers (1-9) in each cell, with empty spots represented by 0.
- **Solve**: Click "Solve" to let the solver fill in the correct values.
- **Reset**: Click "Reset" to clear the board and start over.
- **Stop**: Click "Stop" to halt the solving process.
- **Difficulty Selector**: Choose between Easy, Medium, or Hard Sudoku boards.
- **Speed Selector**: Adjust the solver speed to Instant, Slow, Medium, or Fast.

## Game Rules
- Each row, column, and 3x3 subgrid must contain the numbers 1-9 without repetition.
- The app automatically solves the puzzle using a backtracking algorithm, which tries different numbers until the puzzle is solved.

## Future Improvements
- Implement a feature to generate random Sudoku puzzles.
- Improve the UI with better styling and visual feedback.
- Add hints or a step-by-step solving mode.

## License
This project is open-source and available under the MIT License.

