import { useEffect } from 'react';
import './TrackerTaskModal.css';

const TrackerTaskModal = ({ task, timeSpent, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityText = () => {
    switch(task.priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Средний';
    }
  };

  const getPriorityColor = () => {
    switch(task.priority) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#F59E0B';
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="tracker-task-modal">
        <div className="tracker-modal-header">
          <h2>{task.title}</h2>
          <button className="btn-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>

        <div className="tracker-modal-body">
          <div className="tracker-modal-meta">
            <div className="tracker-modal-item">
              <span className="label">Приоритет:</span>
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor() }}
              >
                {getPriorityText()}
              </span>
            </div>
            <div className="tracker-modal-item">
              <span className="label">Создано:</span>
              <span>{formatDate(task.createdAt)}</span>
            </div>
            <div className="tracker-modal-item">
              <span className="label">Время потрачено:</span>
              <span className="time-spent">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {timeSpent}
              </span>
            </div>
          </div>

          {task.description && (
            <div className="tracker-modal-description">
              <h3>Описание</h3>
              <p>{task.description}</p>
            </div>
          )}

          {task.completed && (
            <div className="tracker-modal-completed">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              <span>Задача выполнена</span>
            </div>
          )}
        </div>

        <button className="btn-close-modal" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};

export default TrackerTaskModal;
