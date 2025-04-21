import { useState } from 'react'
import './App.css'

function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if(squares[i] || calculateWinnder(squares)) {
      return;
    }
    
    const nextSquares = squares.slice();
    const nextLetter = xIsNext ? 'X' : 'O';
    
    nextSquares[i] = nextLetter;
    onPlay(nextSquares);
  }

  const winnerRow = calculateWinnder(squares);
  const winner = winnerRow ? squares[winnerRow[0]] : null;
  const [a,b,c] = winnerRow || [];
  let status;
    if(winner) {
      status = `Winner is ${winner}`;
    } else if(squares[squares.length - 1] !== null) {
      status = `It's a draw!`;
    } else {
      status = `Next player is ${xIsNext ? 'X' : 'O'}`;
    } 

  
  return (
    <> 
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} winnerCell={winnerRow && winnerRow.indexOf(0) > -1}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} winnerCell={winnerRow && winnerRow.indexOf(1) > -1}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} winnerCell={winnerRow && winnerRow.indexOf(2) > -1}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} winnerCell={winnerRow && winnerRow.indexOf(3) > -1}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} winnerCell={winnerRow && winnerRow.indexOf(4) > -1}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} winnerCell={winnerRow && winnerRow.indexOf(5) > -1}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} winnerCell={winnerRow && winnerRow.indexOf(6) > -1}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} winnerCell={winnerRow && winnerRow.indexOf(7) > -1}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} winnerCell={winnerRow && winnerRow.indexOf(8) > -1}/>
      </div>  
     </>
  )
}

function Square({value, onSquareClick, winnerCell}) {
  const className = winnerCell ? 'square winner' : 'square';
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  )
}

function calculateWinnder(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for(let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;

}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isMovesAscending, setIsMovesAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const current = history[currentMove];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setCurrentMove(history.length);
  }

  function jumpTo(index) {
    setCurrentMove(index);
    setHistory(history.slice(0, index + 1));
  }

  function toggleMoves() {
    setIsMovesAscending(!isMovesAscending);
  }

  const moves = history.map((squares, move) => {
    const desc = move > 0 ? `Go to move #${move}` : 'Go to game start';
    
    return (
      <li key={move}>
        {move === currentMove ? (<strong>You are at #{currentMove}</strong>) : (<button onClick={() => jumpTo(move)}>{desc}</button>)}
        
      </li>
    ) 
  })
  if(!isMovesAscending) {
    moves.reverse();
  }
  return (
    <>  
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext={xIsNext} squares={current} onPlay={handlePlay}/> 
        </div>
        <div className='game-info'>
          <button onClick={toggleMoves}>Toggle Moves</button>
          {moves}
        </div>
      </div>
    </>
  )
}

export default Game;

