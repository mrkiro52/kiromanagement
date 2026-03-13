import { useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ task, onClose, onDelete, onEdit }) => {
  const { title, description, priority, createdAt } = task;

  useEffect(() => {
    // Блокировка скролла body
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
    switch(priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Средний';
    }
  };

  const getPriorityColor = () => {
    switch(priority) {
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

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDelete(task.id);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="task-modal">
        <div className="task-modal-header">
          <h2>{title}</h2>
          <button className="btn-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>

        <div className="task-modal-body">
          <div className="task-modal-meta">
            <div className="task-modal-priority">
              <span className="label">Приоритет:</span>
              <span 
                className="priority-badge"
                style={{ backgroundColor: getPriorityColor() }}
              >
                {getPriorityText()}
              </span>
            </div>
            <div className="task-modal-date">
              <span className="label">Создано:</span>
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>

          <div className="task-modal-description">
            <h3>Описание</h3>
            <p>{description}</p>
          </div>
        </div>

        <div className="task-modal-footer">
          <button className="btn-danger" onClick={handleDelete}>
            Удалить задачу
          </button>
          <button 
            className="btn-primary" 
            style={{ minWidth: 120 }}
            onClick={() => onEdit(task)}
          >
            Редактировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
