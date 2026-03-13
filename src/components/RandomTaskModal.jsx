import { useState, useEffect } from 'react';
import './RandomTaskModal.css';

const RandomTaskModal = ({ 
  isSelection = false, 
  onSelectTask, 
  onClose,
  task,
  onStartWork,
  onContinueWorking,
  onComplete,
}) => {
  const [duration, setDuration] = useState(15);
  const [priority, setPriority] = useState('any');
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const priorityLabels = {
    any: 'Любой приоритет',
    low: 'Низкий приоритет',
    medium: 'Средний приоритет',
    high: 'Высокий приоритет',
  };

  const priorityColors = {
    low: '#10B981',
    medium: '#F59E0B',
    high: '#EF4444',
  };

  const handleSelectTask = () => {
    onSelectTask(priority, duration * 60);
  };

  const handleStartWork = () => {
    onStartWork({
      ...task,
      selectedDuration: duration * 60,
      timeWorked: 0,
      phase: 'timer',
    });
  };

  const handleTimerComplete = () => {
    setIsRunning(false);
  };

  const handleContinue = () => {
    onContinueWorking({
      ...task,
      selectedDuration: duration * 60,
      timeWorked: task.timeWorked || 0,
      timeSpentThisSession: timeLeft === null ? duration * 60 : Math.max(0, duration * 60 - (timeLeft || 0)),
    });
  };

  const handleFinish = () => {
    const spent = timeLeft === null ? duration * 60 : Math.max(0, duration * 60 - (timeLeft || 0));
    onComplete(spent);
  };

  if (isSelection) {
    return (
      <div className="random-modal-overlay" onClick={onClose}>
        <div className="random-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <h2>Выбрать случайную задачу</h2>

          <div className="modal-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 16 12 12 9 9" />
            </svg>
            <p>
              Когда не знаешь к какой задаче приступить, возьми любую и сядь за неё на 15 минут. 
              Зачастую ты сам затянешься в работу и продолжишь занятие до конца!
            </p>
          </div>

          <div className="modal-form">
            <div className="form-group">
              <label>Выбор приоритета</label>
              <div className="priority-buttons">
                {Object.entries(priorityLabels).map(([key, label]) => (
                  <button
                    key={key}
                    className={`priority-btn ${priority === key ? 'active' : ''}`}
                    onClick={() => setPriority(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Время (минут)</label>
              <div className="duration-control">
                <button 
                  className="duration-btn"
                  onClick={() => setDuration(Math.max(5, duration - 5))}
                >
                  − 5
                </button>
                <div className="duration-display">
                  <span>{duration}m</span>
                </div>
                <button 
                  className="duration-btn"
                  onClick={() => setDuration(duration + 5)}
                >
                  + 5
                </button>
              </div>
            </div>
          </div>

          <button className="btn-submit" onClick={handleSelectTask}>
            Выбрать задачу
          </button>
        </div>
      </div>
    );
  }

  // Модал с выбранной задачей
  if (task && task.phase === 'timer') {
    return (
      <div className="random-modal-overlay" onClick={onClose}>
        <div className="random-modal active-task" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="active-task-header">
            <div
              className="task-priority-indicator"
              style={{ backgroundColor: priorityColors[task.priority] }}
            />
            <h2>{task.title}</h2>
          </div>

          {task.description && (
            <p className="active-task-description">{task.description}</p>
          )}

          <div className="active-task-timer">
            <TimerComponent 
              duration={task.selectedDuration}
              onComplete={handleTimerComplete}
              onStart={() => setIsRunning(true)}
              onPause={() => setIsRunning(false)}
              onTimeChange={setTimeLeft}
            />
          </div>

          <div className="active-task-actions">
            <button className="btn-start-work" onClick={handleStartWork}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M8 5v14l11-7z" />
              </svg>
              Приступить к задаче
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Модал в режиме работы
  if (task && task.phase === 'working') {
    return (
      <div className="random-modal-overlay" onClick={onClose}>
        <div className="random-modal active-task" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="active-task-header">
            <div
              className="task-priority-indicator"
              style={{ backgroundColor: priorityColors[task.priority] }}
            />
            <h2>{task.title}</h2>
          </div>

          {task.description && (
            <p className="active-task-description">{task.description}</p>
          )}

          <div className="active-task-timer">
            <WorkingTimerComponent 
              onComplete={handleFinish}
              onTimeChange={setTimeLeft}
            />
          </div>

          <div className="active-task-actions">
            <button 
              className="btn-continue"
              onClick={handleContinue}
            >
              Продолжить дальше
            </button>
            <button 
              className="btn-complete"
              onClick={handleFinish}
            >
              Закончить работу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Таймер обратного отсчета
const TimerComponent = ({ duration, onComplete, onStart, onPause, onTimeChange }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          onTimeChange(newTime);
          if (newTime === 0) {
            setIsRunning(false);
            onComplete();
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((duration - timeLeft) / duration) * 100;

  const toggleTimer = () => {
    if (isRunning) {
      onPause();
    } else {
      onStart();
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="timer-container">
      <div 
        className="timer-progress"
        style={{ width: `${progressPercent}%` }}
      />
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <button 
        className={`timer-toggle ${isRunning ? 'running' : ''}`}
        onClick={toggleTimer}
      >
        {isRunning ? '⏸' : '▶'}
      </button>
    </div>
  );
};

// Таймер прямого отсчета (сколько уже потратил)
const WorkingTimerComponent = ({ onComplete, onTimeChange }) => {
  const [timeWorked, setTimeWorked] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeWorked(prev => {
          const newTime = prev + 1;
          onTimeChange(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="timer-container working">
      <div className="timer-display">{formatTime(timeWorked)}</div>
      <button 
        className={`timer-toggle ${isRunning ? 'running' : ''}`}
        onClick={toggleTimer}
      >
        {isRunning ? '⏸' : '▶'}
      </button>
    </div>
  );
};

export default RandomTaskModal;
