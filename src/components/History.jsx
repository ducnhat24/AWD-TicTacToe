
function History({ history, jumpTo, sortAscending, toggleSortOrder }) {
    const sortedHistory = sortAscending ? history : history.slice().reverse();

    const moves = sortedHistory.map((move, index) => {
        const moveIndex = history.indexOf(move);
        const location = move.location ? `(${move.location.row}, ${move.location.col})` : '';
        let description;

        if (moveIndex > 0) {
            const player = (moveIndex % 2 !== 0) ? 'X' : 'O';
            description = `Player ${player} marks at ${location} (move #${moveIndex})`;
        } else {
            description = 'Go to game start';
        }

        return (
            <li key={moveIndex}>
                <button className="history-item" onClick={() => jumpTo(moveIndex)}>{description}</button>
            </li>
        );
    });

    return (
        <div >
            <div className="history-header">
                <h2>Game History</h2>
            </div>
            <button className="sort-button" onClick={toggleSortOrder}>
                Sort by: {sortAscending ? 'Ascending' : 'Descending'}
            </button>
            <ul style={{ listStyleType: 'none', padding: 0 }}>{moves}</ul>
        </div>
    );
}

export default History;