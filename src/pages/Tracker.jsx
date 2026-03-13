import { useState, useEffect } from 'react';
import './Tracker.css';
import RandomTaskModal from '../components/RandomTaskModal';
import TrackerTaskCard from '../components/TrackerTaskCard';
import TrackerTaskModal from '../components/TrackerTaskModal';
import ActiveTaskModal from '../components/ActiveTaskModal';

const Tracker = () => {
  const [tasks, setTasks] = useState([]);
  const [isRandomModalOpen, setIsRandomModalOpen] = useState(false);
  const [selectedRandomTask, setSelectedRandomTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  // Загрузка задач из localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        const enhancedTasks = parsedTasks.map(task => ({
          ...task,
          timeSpent: task.timeSpent || 0, // в секундах
        }));
        setTasks(enhancedTasks);
      } catch (e) {
        console.error('Ошибка при загрузке задач:', e);
      }
    }
  }, []);

  // Сохранение задач в localStorage
  const saveTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const getRandomTask = (priority) => {
    const filtered = tasks.filter(
      task => !task.completed && 
      (priority === 'any' || task.priority === priority)
    );
    
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const handleSelectRandomTask = (priority, duration) => {
    const randomTask = getRandomTask(priority);
    if (randomTask) {
      setSelectedRandomTask({
        ...randomTask,
        selectedDuration: duration,
        timeWorked: 0,
        phase: 'timer', // 'timer' | 'working'
      });
      setIsRandomModalOpen(false);
    }
  };

  const handleStartWork = (randomTask) => {
    setActiveTask({
      ...randomTask,
      startTime: Date.now(),
      isPaused: false,
    });
    setSelectedRandomTask(null);
  };

  const handleContinueWorking = (randomTask) => {
    setSelectedRandomTask({
      ...randomTask,
      phase: 'working',
    });
    setActiveTask(null);
  };

  const handleCompleteWork = (timeSpent) => {
    if (selectedRandomTask) {
      const updatedTasks = tasks.map(t => 
        t.id === selectedRandomTask.id 
          ? { ...t, timeSpent: (t.timeSpent || 0) + timeSpent }
          : t
      );
      saveTasks(updatedTasks);
      setSelectedRandomTask(null);
    }
    
    if (activeTask) {
      const updatedTasks = tasks.map(t => 
        t.id === activeTask.id 
          ? { ...t, timeSpent: (t.timeSpent || 0) + timeSpent }
          : t
      );
      saveTasks(updatedTasks);
      setActiveTask(null);
    }
  };

  const handleAddTimeToTask = (taskId, timeSpent) => {
    const updatedTasks = tasks.map(t => 
      t.id === taskId 
        ? { ...t, timeSpent: (t.timeSpent || 0) + timeSpent }
        : t
    );
    saveTasks(updatedTasks);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}ч ${mins}м`;
    }
    return `${mins}м ${secs}с`;
  };

  if (activeTask) {
    return (
      <ActiveTaskModal 
        task={activeTask}
        onComplete={handleCompleteWork}
        onPause={() => setActiveTask(null)}
      />
    );
  }

  if (selectedRandomTask) {
    return (
      <RandomTaskModal 
        task={selectedRandomTask}
        onClose={() => setSelectedRandomTask(null)}
        onStartWork={handleStartWork}
        onContinueWorking={handleContinueWorking}
        onComplete={handleCompleteWork}
      />
    );
  }

  if (selectedTask) {
    return (
      <TrackerTaskModal 
        task={selectedTask}
        timeSpent={formatTime(selectedTask.timeSpent || 0)}
        onClose={() => setSelectedTask(null)}
      />
    );
  }

  return (
    <div className="tracker-page">
      <div className="tracker-header">
        <div>
          <h1>Трекер времени</h1>
          <p className="tracker-subtitle">Отслеживайте время на каждую задачу</p>
        </div>
        <button 
          className="btn-random-task"
          onClick={() => setIsRandomModalOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Выдать случайную задачу
        </button>
      </div>

      {isRandomModalOpen && (
        <RandomTaskModal 
          isSelection={true}
          onSelectTask={handleSelectRandomTask}
          onClose={() => setIsRandomModalOpen(false)}
        />
      )}

      <div className="tracker-tasks">
        {tasks.length === 0 ? (
          <div className="tracker-empty">
            <p>Нет задач для отслеживания</p>
            <p className="text-secondary">Добавьте задачи на странице "Мои задачи"</p>
          </div>
        ) : (
          tasks.map(task => (
            <TrackerTaskCard 
              key={task.id}
              task={task}
              timeSpent={formatTime(task.timeSpent || 0)}
              onStartWork={() => {
                setActiveTask({
                  ...task,
                  startTime: Date.now(),
                  isPaused: false,
                });
              }}
              onClick={() => setSelectedTask(task)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Tracker;
