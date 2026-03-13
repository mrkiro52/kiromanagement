import { useState, useEffect } from 'react';
import './Tasks.css';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import NewTaskModal from '../components/NewTaskModal';
import EditTaskModal from '../components/EditTaskModal';

const FILTERS = {
  all: 'Все',
  open: 'Открытые',
  closed: 'Закрытые',
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('all');

  // Загрузка задач из localStorage при монтировании
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    console.log('Загруженные задачи из localStorage:', savedTasks);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        console.log('Распарсенные задачи:', parsedTasks);
        setTasks(parsedTasks);
      } catch (e) {
        console.error('Ошибка при загрузке задач:', e);
      }
    }
  }, []);

  const handleAddTask = (newTask) => {
    const task = {
      id: Date.now(),
      ...newTask,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    // Сохраняем сразу, не ждём реакта
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    console.log('Задача добавлена и сохранена:', updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setSelectedTask(null);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleSaveEdit = (updatedTask) => {
    const updatedTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditTask(null);
    setSelectedTask(null);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'open') return !task.completed;
    if (filter === 'closed') return task.completed;
    return true;
  });

  return (
    <div className="tasks-page">
      <div className="tasks-header">
        <h2>Мои задачи</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', gap: 12, marginRight: 16 }}>
            {Object.entries(FILTERS).map(([key, label]) => (
              <span
                key={key}
                style={{
                  cursor: 'pointer',
                  color: filter === key ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  fontWeight: filter === key ? 600 : 400,
                  borderBottom: filter === key ? '2px solid var(--color-primary)' : 'none',
                  paddingBottom: 2,
                  fontSize: 14,
                  transition: 'color 0.2s',
                }}
                onClick={() => setFilter(key)}
              >
                {label}
              </span>
            ))}
          </div>
          <button 
            className="btn-primary"
            onClick={() => setIsNewTaskModalOpen(true)}
          >
            + Добавить задачу
          </button>
        </div>
      </div>

      <div className="tasks-grid">
        {filteredTasks.map(task => (
          <TaskCard 
            key={task.id}
            task={task}
            onClick={() => setSelectedTask(task)}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="empty-state">
          <p>Нет задач для выбранного фильтра</p>
          <p className="empty-state-hint">Нажмите "Добавить задачу" чтобы создать первую</p>
        </div>
      )}

      {selectedTask && (
        <TaskModal 
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      )}

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={handleSaveEdit}
        />
      )}

      {isNewTaskModalOpen && (
        <NewTaskModal 
          onClose={() => setIsNewTaskModalOpen(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
};

export default Tasks;
