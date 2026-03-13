import { useState, useEffect } from 'react';
import './ActiveTaskModal.css';

const ActiveTaskModal = ({ task, onComplete, onPause }) => {
  const [timeWorked, setTimeWorked] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeWorked(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const priorityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleComplete = () => {
    onComplete(timeWorked);
  };

  return (
    <div className="active-task-fullscreen">
      <div className="active-task-bg" style={{ backgroundColor: priorityColors[task.priority] }} />
      
      <div className="active-task-content">
        <div className="active-task-main">
          <h1 className="active-task-title">{task.title}</h1>
          
          {task.description && (
            <p className="active-task-full-description">{task.description}</p>
          )}

          <div className="active-task-timer-large">
            <div className="timer-display-large">{formatTime(timeWorked)}</div>
            
            <div className="timer-controls-large">
              <button 
                className={`timer-btn-large ${isRunning ? 'running' : ''}`}
                onClick={toggleTimer}
              >
                {isRunning ? (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    Пауза
                  </>
                ) : (
                  <>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Продолжить
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="active-task-bottom">
          <button 
            className="btn-complete-large"
            onClick={handleComplete}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Закончить работу
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveTaskModal;
