import { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      // Браузерное уведомление
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro завершён!', {
          body: '25 минут истекли. Пора отдохнуть!',
        });
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = 25 * 60;
  const progressPercent = 100 - (timeLeft / totalSeconds) * 100;

  return (
    <div 
      className="pomodoro-timer"
      style={{
        '--progress-width': `${progressPercent}%`
      }}
    >
      <div className="pomodoro-overlay" style={{ width: `${progressPercent}%` }} />
      
      <span className="pomodoro-time">{formatTime(timeLeft)}</span>
      
      <div className="pomodoro-buttons">
        <button 
          className="pomodoro-play-btn"
          onClick={toggleTimer}
          title={isRunning ? 'Пауза' : 'Старт'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            {isRunning ? (
              <>
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </>
            ) : (
              <path d="M8 5v14l11-7z" />
            )}
          </svg>
        </button>

        <button 
          className="pomodoro-reset-btn"
          onClick={resetTimer}
          title="Очистить"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="5" width="14" height="14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
