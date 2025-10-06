import Square from './Square.jsx';

function Board({ xIsNext, squares, onPlay, winningLine, status }) {
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
        </div>
    );
}

export default Board;