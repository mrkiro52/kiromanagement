import './TrackerTaskCard.css';

const TrackerTaskCard = ({ task, timeSpent, onStartWork, onClick }) => {
  const priorityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  };

  const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
  };

  return (
    <div 
      className="tracker-task-card"
      onClick={onClick}
    >
      <div className="tracker-card-header">
        <h3 className="tracker-card-title">{task.title}</h3>
        <div 
          className="tracker-priority-badge"
          style={{ backgroundColor: priorityColors[task.priority] }}
        >
          {priorityLabels[task.priority]}
        </div>
      </div>

      {task.description && (
        <p className="tracker-card-description">{task.description}</p>
      )}

      <div className="tracker-card-time">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span>{timeSpent}</span>
      </div>

      <button 
        className="tracker-start-btn"
        onClick={(e) => {
          e.stopPropagation();
          onStartWork();
        }}
        title="Начать работу"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
};

export default TrackerTaskCard;
