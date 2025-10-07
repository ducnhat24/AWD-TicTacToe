import './Modal.css';

function Modal({ message, onRestart }) {
  if (!message) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Game Over</h2>
        <p>{message}</p>
        <button onClick={onRestart}>Play again</button>
      </div>
    </div>
  );
}

export default Modal;