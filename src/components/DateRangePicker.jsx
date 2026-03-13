import './DateRangePicker.css';
import { useState } from 'react';

const DateRangePicker = ({ onSelect, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [step, setStep] = useState('start'); // 'start' or 'end'

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const calendarDays = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDayClick = (date) => {
    const dateStr = getDateString(date);
    
    if (step === 'start') {
      setStartDate(dateStr);
      setStep('end');
    } else {
      if (dateStr >= startDate) {
        setEndDate(dateStr);
        onSelect(startDate, dateStr);
        onClose();
      }
    }
  };

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    const dateStr = getDateString(date);
    return dateStr >= startDate && dateStr <= endDate;
  };

  const isStartOrEnd = (date) => {
    const dateStr = getDateString(date);
    return dateStr === startDate || dateStr === endDate;
  };

  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="date-range-picker-overlay" onClick={onClose}>
      <div className="date-range-picker" onClick={(e) => e.stopPropagation()}>
        <div className="picker-header">
          <h3>{step === 'start' ? 'Выберите начало периода' : 'Выберите конец периода'}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="calendar-header">
          <button onClick={previousMonth} className="calendar-nav">←</button>
          <h4>{monthName}</h4>
          <button onClick={nextMonth} className="calendar-nav">→</button>
        </div>

        <div className="calendar-weekdays">
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>Вс</div>
        </div>

        <div className="calendar-days">
          {calendarDays.map((date, idx) => {
            if (!date) {
              return <div key={`empty-${idx}`} className="calendar-day empty"></div>;
            }

            const dateStr = getDateString(date);
            const isStart = dateStr === startDate;
            const isEnd = dateStr === endDate;
            const inRange = isInRange(date);
            const isDisabled = step === 'end' && dateStr < startDate;

            return (
              <button
                key={dateStr}
                className={`calendar-day ${isStart || isEnd ? 'selected' : ''} ${inRange && !isStart && !isEnd ? 'in-range' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && handleDayClick(date)}
                disabled={isDisabled}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {startDate && !endDate && (
          <div className="picker-info">
            Начало: {startDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default DateRangePicker;
