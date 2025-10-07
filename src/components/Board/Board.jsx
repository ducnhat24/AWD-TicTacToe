import Square from '../Square/Square.jsx';
import './Board.css';

function Board({ xIsNext, squares, onPlay, winningLine, status, onRestart }) {
    function handleClick(i) {
        if (squares[i] || winningLine.length > 0) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }

        onPlay(nextSquares, i);
    }

    return (
        <div className="board">
            <div className="status">{status}</div>
            {Array(3).fill(null).map((_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {Array(3).fill(null).map((_, colIndex) => {
                        const squareIndex = rowIndex * 3 + colIndex;
                        const isWinning = winningLine.includes(squareIndex);
                        return (
                            <Square
                                key={squareIndex}
                                value={squares[squareIndex]}
                                onSquareClick={() => handleClick(squareIndex)}
                                isWinning={isWinning}
                            />
                        );
                    })}
                </div>
            ))}

            <button className="restart-button" onClick={onRestart}>
                <i className="fas fa-redo"></i> Restart
            </button>
        </div>
    );
}

export default Board;