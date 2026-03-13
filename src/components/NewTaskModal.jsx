import { useState, useEffect } from 'react';
import './NewTaskModal.css';

const NewTaskModal = ({ onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    onAdd({ title, description, priority });
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="new-task-modal">
        <div className="modal-header">
          <h2>Новая задача</h2>
          <button className="btn-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Название</label>
            <input
              type="text"
              id="title"
              className="form-input"
              placeholder="Введите название задачи"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              className="form-textarea"
              placeholder="Введите описание задачи"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>Приоритет</label>
            <div className="priority-options">
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={priority === 'high'}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <span className="priority-label priority-high">Высокий</span>
              </label>
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={priority === 'medium'}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <span className="priority-label priority-medium">Средний</span>
              </label>
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={priority === 'low'}
                  onChange={(e) => setPriority(e.target.value)}
                />
                <span className="priority-label priority-low">Низкий</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              Создать задачу
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTaskModal;
