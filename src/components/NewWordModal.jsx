import { useState, useEffect } from 'react';
import './NewWordModal.css';

const NewWordModal = ({ onClose, onAdd }) => {
  const [english, setEnglish] = useState('');
  const [russian, setRussian] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!english.trim() || !russian.trim()) {
      alert('Пожалуйста, заполните оба поля');
      return;
    }

    onAdd({ english: english.trim(), russian: russian.trim() });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="new-word-modal">
        <div className="modal-header">
          <h2>Новое слово</h2>
          <button className="btn-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="english">Английское слово</label>
            <input
              type="text"
              id="english"
              className="form-input"
              placeholder="Введите слово на английском"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="russian">Перевод на русский</label>
            <input
              type="text"
              id="russian"
              className="form-input"
              placeholder="Введите перевод"
              value={russian}
              onChange={(e) => setRussian(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              Добавить слово
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewWordModal;
