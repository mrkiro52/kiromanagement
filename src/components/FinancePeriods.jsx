import './FinancePeriods.css';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const FinancePeriods = ({ items }) => {
  const [filterMode, setFilterMode] = useState('all'); // 'all' or 'period'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Исправленный расчёт дневного итога
  const calculateDailyTotal = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;
    
    const dayItems = items.filter(item => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = String(itemDate.getMonth() + 1).padStart(2, '0');
      const itemDay = String(itemDate.getDate()).padStart(2, '0');
      const itemDateStr = `${itemYear}-${itemMonth}-${itemDay}`;
      return itemDateStr === dateStr;
    });
    
    const income = dayItems.filter(i => i.type === 'income').reduce((sum, i) => sum + i.amount, 0);
    const expense = dayItems.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0);
    return income - expense;
  };

  // Filter items by date range
  const filteredItems = filterMode === 'period' && startDate && endDate
    ? items.filter(item => {
        const itemDate = new Date(item.date);
        const itemYear = itemDate.getFullYear();
        const itemMonth = String(itemDate.getMonth() + 1).padStart(2, '0');
        const itemDay = String(itemDate.getDate()).padStart(2, '0');
        const itemDateStr = `${itemYear}-${itemMonth}-${itemDay}`;
        return itemDateStr >= startDate && itemDateStr <= endDate;
      })
    : items;

  // Get calendar days
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const calendarDays = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  // Add empty cells for days before month starts
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendarDays.push(null);
  }

  // Add days of month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
  }

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateRangeSelect = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setShowDatePicker(false);
  };

  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="finance-periods">
      <div className="periods-filter">
        <div className="filter-mode-buttons">
          <button 
            className={`mode-button ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => {
              setFilterMode('all');
              setStartDate('');
              setEndDate('');
            }}
          >
            Все время
          </button>
          <button 
            className={`mode-button ${filterMode === 'period' ? 'active' : ''}`}
            onClick={() => setFilterMode('period')}
          >
            Выбрать период
          </button>
        </div>

        {filterMode === 'period' && (
          <div className="filter-inputs">
            <div className="date-display">
              <span className="date-value">{startDate ? new Date(startDate + 'T00:00:00').toLocaleDateString('ru-RU') : '—'}</span>
            </div>
            <span className="date-separator">→</span>
            <div className="date-display">
              <span className="date-value">{endDate ? new Date(endDate + 'T00:00:00').toLocaleDateString('ru-RU') : '—'}</span>
            </div>
            <button className="btn-select-period" onClick={() => setShowDatePicker(true)}>
              Выбрать период
            </button>
          </div>
        )}
      </div>

      {showDatePicker && (
        <DateRangePicker 
          onSelect={handleDateRangeSelect}
          onClose={() => setShowDatePicker(false)}
        />
      )}

      <div className="periods-content">
        <div className="periods-list">
          <h3>Платежи {filterMode === 'period' && startDate && endDate ? `(${new Date(startDate + 'T00:00:00').toLocaleDateString('ru-RU')} - ${new Date(endDate + 'T00:00:00').toLocaleDateString('ru-RU')})` : '(все)'}</h3>
          <div className="payments-grid">
            {filteredItems.length === 0 ? (
              <p className="empty-message">Нет платежей в выбранном периоде</p>
            ) : (
              filteredItems.map((item, idx) => (
                <div key={idx} className={`payment-pill ${item.type === 'income' ? 'income' : 'expense'}`}>
                  <div className="payment-title">{item.title}</div>
                  <div className="payment-date">
                    {new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })}
                  </div>
                  <div className="payment-amount">
                    {item.type === 'income' ? '+' : '-'}{formatNumber(item.amount)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="periods-calendar">
          <div className="calendar-header">
            <button onClick={previousMonth} className="calendar-nav">←</button>
            <h3>{monthName}</h3>
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

              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const dateStr = `${year}-${month}-${day}`;
              const dayTotal = calculateDailyTotal(date);
              const isHovered = hoveredDate === dateStr;

              return (
                <div
                  key={dateStr}
                  className="calendar-day-wrapper"
                  onMouseEnter={() => setHoveredDate(dateStr)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <div className={`calendar-day ${dayTotal !== 0 ? 'has-data' : ''}`}>
                    {date.getDate()}
                  </div>
                  {isHovered && dayTotal !== 0 && (
                    <div className={`day-tooltip ${dayTotal >= 0 ? 'positive' : 'negative'}`}>
                      {dayTotal >= 0 ? '+' : '-'}{formatNumber(Math.abs(dayTotal))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePeriods;
