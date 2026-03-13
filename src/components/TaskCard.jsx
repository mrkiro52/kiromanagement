import './TaskCard.css';

const TaskCard = ({ task, onClick, onToggleComplete }) => {
  const { title, description, priority, createdAt, completed } = task;

  // Обрезка описания
  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Определение класса по приоритету
  const getPriorityClass = () => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div 
      className={`task-card ${getPriorityClass()}`}
      onClick={onClick}
      style={{ opacity: completed ? 0.5 : 1, position: 'relative' }}
    >
      <h3 className="task-card-title" style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h3>
      <p className="task-card-description">{truncateText(description)}</p>
      <div className="task-card-footer">
        <span className="task-card-date">{formatDate(createdAt)}</span>
        <button
          title={completed ? 'Сделать открытой' : 'Отметить выполненной'}
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            border: 'none',
            background: completed ? 'var(--color-success)' : 'var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft: 8,
            transition: 'background 0.2s',
          }}
          onClick={(e) => { 
            e.stopPropagation(); 
            onToggleComplete(task.id); 
          }}
        >
          {completed ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2"><path d="M4 8l3 3 5-5" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="8" cy="8" r="6" /></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
