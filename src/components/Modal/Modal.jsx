import './Modal.css';

function Modal({ message, onRestart, onClose, isOpen }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <div className="modal-header">Game Over</div>
        <p>{message}</p>
        <button onClick={onRestart}>Play again</button>
      </div>
    </div>
  );
}

export default Modal;