import { useState } from 'react';
import './WordCard.css';

const WordCard = ({ word, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Удалить это слово?')) {
      onDelete(word.id);
    }
  };

  return (
    <div className="word-card-container" onClick={handleClick}>
      <div className={`word-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="word-card-front">
          <button 
            className="word-card-delete" 
            onClick={handleDelete}
            title="Удалить"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>
          <div className="word-card-content">
            <p className="word-card-text">{word.english}</p>
          </div>
        </div>
        <div className="word-card-back">
          <div className="word-card-content">
            <p className="word-card-text">{word.russian}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
