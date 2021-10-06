import React, { useState } from 'react';
import { calculateWinner } from '../helper';
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const x0 = xIsNext ? 'X' : 'O';

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or if someone clicks on a square that's occupied
    if (winner || squares[i]) return;
    // fill square
    squares[i] = x0;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  }

  const jumpTo = (step, destination) => {
    if(destination === "Go to Start"){
      setHistory([Array(9).fill(null)]);
    }
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () => {
    return history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move,destination)}>{destination}</button>
        </li>
      );
    });
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        <div>
          <h3>{winner ? "Winner: " + winner : "Next Player: " + x0}</h3>
        </div>
      </div>
    </>
  )
}
export default Game;
