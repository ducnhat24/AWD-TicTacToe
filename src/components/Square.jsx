function Square({ value, onSquareClick, isWinning }) {
    const className = isWinning ? 'square winning' : 'square';

    return (
        <button className={className} onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default Square;