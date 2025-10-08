
import Board from './components/Board/Board.jsx';
import History from './components/History/History.jsx';
import Modal from './components/Modal/Modal.jsx';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      location: null,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortAscending, setSortAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handlePlay(nextSquares, i) {
    const nextHistory = history.slice(0, currentMove + 1);
    const newMove = {
      squares: nextSquares,
      location: {
        row: Math.floor(i / 3),
        col: i % 3,
      },
    };
    setHistory([...nextHistory, newMove]);
    setCurrentMove(nextHistory.length);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortToggle() {
    setSortAscending(!sortAscending);
  }

  function handleRestart() {
    setHistory([
      {
        squares: Array(9).fill(null),
        location: null,
      },
    ]);
    setCurrentMove(0);
  }



  const result = calculateWinner(currentSquares);
  const winningLine = result ? result.line : [];
  const winner = result ? result.winner : null;
  const isDraw = currentMove === 9 && !winner;

  useEffect(() => {
    if (winner || isDraw) {
      setIsModalOpen(true);
    }
  }, [winner, isDraw]);


  let status;
  if (winner) {
    status = `Winner: Player ${winner}`;
  } else if (currentMove === 9) {
    status = "Result: Draw";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }


  let modalMessage = '';
  if (winner) {
    modalMessage = `The winner is: ${winner}`;
  } else if (currentMove === 9) {
    modalMessage = "The game is a draw!";
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }


  return (
    <div>
      <div className="game-title">
        TicTacToe
      </div>

      <Modal message={modalMessage} onRestart={handleRestart} onClose={handleCloseModal} isOpen={isModalOpen} />

      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningLine={winningLine}
            status={status}
            onRestart={handleRestart}
          />
        </div>
        <div className="game-info">
          <History
            history={history}
            jumpTo={jumpTo}
            sortAscending={sortAscending}
            toggleSortOrder={handleSortToggle}
          />
        </div>
      </div>

    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}


export default App;