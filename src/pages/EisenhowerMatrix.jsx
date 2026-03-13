import { useState, useEffect } from 'react';
import './EisenhowerMatrix.css';

const EisenhowerMatrix = () => {
  const [tasks, setTasks] = useState([]);
  const [matrixData, setMatrixData] = useState({
    important_urgent: [],
    important_not_urgent: [],
    not_important_urgent: [],
    not_important_not_urgent: [],
  });
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isPriorityMode, setIsPriorityMode] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);

  // Загрузка из localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Ошибка при загрузке задач:', e);
      }
    }

    const savedMatrix = localStorage.getItem('eisenhowerMatrix');
    if (savedMatrix) {
      try {
        setMatrixData(JSON.parse(savedMatrix));
      } catch (e) {
        console.error('Ошибка при загрузке матрицы:', e);
      }
    }
  }, []);

  // Сохранение в localStorage
  const saveMatrixData = (newMatrixData) => {
    localStorage.setItem('eisenhowerMatrix', JSON.stringify(newMatrixData));
    setMatrixData(newMatrixData);
  };

  // Добавление задачи в зону
  const handleAddTaskToZone = (zone, taskId) => {
    const newMatrixData = { ...matrixData };
    
    // Если задача уже в какой-то зоне, удалим оттуда
    Object.keys(newMatrixData).forEach(z => {
      newMatrixData[z] = newMatrixData[z].filter(t => t.id !== taskId);
    });

    // Добавим в новую зону
    const task = tasks.find(t => t.id === taskId);
    newMatrixData[zone] = [...newMatrixData[zone], { ...task, matrixPriority: null }];

    saveMatrixData(newMatrixData);
    setSelectedTaskId(null);
  };

  // Удаление задачи из зоны
  const handleRemoveTaskFromZone = (zone, taskId) => {
    const newMatrixData = { ...matrixData };
    newMatrixData[zone] = newMatrixData[zone].filter(t => t.id !== taskId);
    saveMatrixData(newMatrixData);
  };

  // Установка приоритета
  const handleSetPriority = (zone, taskId) => {
    if (!isPriorityMode || zone !== 'important_urgent') return;

    const newMatrixData = { ...matrixData };
    
    // Если уже есть приоритет, снимем его со всех
    Object.keys(newMatrixData).forEach(z => {
      newMatrixData[z] = newMatrixData[z].map(t => ({
        ...t,
        matrixPriority: null,
      }));
    });

    // Установим новый приоритет только в зоне "Важно и срочно"
    newMatrixData[zone] = newMatrixData[zone].map(t =>
      t.id === taskId ? { ...t, matrixPriority: true } : t
    );

    saveMatrixData(newMatrixData);
    setSelectedPriority(taskId);
    // Выключаем режим приоритета после выбора
    setIsPriorityMode(false);
  };

  const allTaskIds = new Set();
  Object.keys(matrixData).forEach(zone => {
    matrixData[zone].forEach(task => allTaskIds.add(task.id));
  });

  const availableTasks = tasks.filter(t => !allTaskIds.has(t.id));

  const ZoneComponent = ({ title, zone, color }) => {
    const zoneTasksWithPriority = matrixData[zone];
    const canHavePriority = zone === 'important_urgent';

    return (
      <div className={`matrix-zone ${color}`}>
        <h3 className="matrix-zone-title">{title}</h3>
        <div className="matrix-zone-tasks">
          {zoneTasksWithPriority.map(task => (
            <button
              key={task.id}
              className={`matrix-task-item matrix-task-item-${color} ${task.matrixPriority ? 'priority' : ''}`}
              onClick={() => {
                if (isPriorityMode && canHavePriority) {
                  handleSetPriority(zone, task.id);
                }
              }}
              style={{
                cursor: isPriorityMode && canHavePriority ? 'pointer' : 'default',
              }}
            >
              <span className="matrix-task-title">{task.title}</span>
              <button
                className="matrix-task-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveTaskFromZone(zone, task.id);
                }}
                title="Удалить из матрицы"
              >
                ✕
              </button>
            </button>
          ))}

          {selectedTaskId && !isPriorityMode && (
            <button
              className="matrix-add-zone-btn"
              onClick={() => handleAddTaskToZone(zone, selectedTaskId)}
              title="Добавить в эту зону"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="eisenhower-page">
      <div className="eisenhower-header">
        <h2>Матрица Эйзенхауэра</h2>
        <button
          className={`btn-priority ${isPriorityMode ? 'active' : ''}`}
          onClick={() => {
            setIsPriorityMode(!isPriorityMode);
            if (!isPriorityMode) {
              setSelectedTaskId(null);
            }
          }}
        >
          Приоритет
        </button>
      </div>

      <div className="eisenhower-tasks-selector">
        <h3>Доступные задачи:</h3>
        <div className="tasks-pills">
          {availableTasks.map(task => (
            <button
              key={task.id}
              className={`task-pill ${selectedTaskId === task.id ? 'selected' : ''}`}
              onClick={() => setSelectedTaskId(selectedTaskId === task.id ? null : task.id)}
            >
              {task.title}
            </button>
          ))}
          {availableTasks.length === 0 && (
            <p className="no-tasks">Все задачи уже добавлены в матрицу</p>
          )}
        </div>
      </div>

      <div className="eisenhower-matrix">
        <div className="matrix-row">
          <ZoneComponent
            title="Важно и срочно"
            zone="important_urgent"
            color="red"
          />
          <ZoneComponent
            title="Важно, но не срочно"
            zone="important_not_urgent"
            color="yellow"
          />
        </div>
        <div className="matrix-row">
          <ZoneComponent
            title="Не важно, но срочно"
            zone="not_important_urgent"
            color="blue"
          />
          <ZoneComponent
            title="Не важно и не срочно"
            zone="not_important_not_urgent"
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

export default EisenhowerMatrix;
