import './FinanceStats.css';
import { useState } from 'react';

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const FinanceStats = ({ items, potentialItems = [], onAddPotential, onDeletePotential }) => {
  const [includePotential, setIncludePotential] = useState(false);
  
  const allItems = includePotential ? [...items, ...potentialItems] : items;
  const income = allItems.filter(i => i.type === 'income').reduce((sum, i) => sum + i.amount, 0);
  const expense = allItems.filter(i => i.type === 'expense').reduce((sum, i) => sum + i.amount, 0);
  const balance = income - expense;
  const total = income + expense;
  const percentIncome = total ? Math.round((income / total) * 100) : 0;
  const percentExpense = total ? Math.round((expense / total) * 100) : 0;

  return (
    <div className="finance-stats">
      <div className="stats-main">
        <div className="stats-chart">
          <button 
            className="stats-toggle-potential"
            onClick={() => setIncludePotential(!includePotential)}
            title="Включить потенциальные платежи"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={includePotential ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
          <svg width="240" height="240" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="70" fill="#F3F4F6" />
            <circle
              cx="90" cy="90" r="70"
              fill="none"
              stroke="#10B981"
              strokeWidth="18"
              strokeDasharray={`${(percentIncome/100)*439.8} 439.8`}
              strokeDashoffset="0"
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dasharray 0.8s' }}
            />
            <circle
              cx="90" cy="90" r="70"
              fill="none"
              stroke="#EF4444"
              strokeWidth="18"
              strokeDasharray={`${(percentExpense/100)*439.8} 439.8`}
              strokeDashoffset={`${-(percentIncome/100)*439.8}`}
              transform="rotate(-90 90 90)"
              style={{ transition: 'stroke-dasharray 0.8s' }}
            />
          </svg>
          <div className="stats-balance">
            <span>Баланс</span>
            <div className={balance >= 0 ? 'balance-positive' : 'balance-negative'}>
              {balance >= 0 ? '+' : '-'}{formatNumber(Math.abs(balance))}
            </div>
          </div>
        </div>
        <div className="stats-details">
          <div className="stats-row">
            <span className="stats-label income">Пополнения</span>
            <span className="stats-value income">+{formatNumber(income)}</span>
          </div>
          <div className="stats-row">
            <span className="stats-label expense">Траты</span>
            <span className="stats-value expense">-{formatNumber(expense)}</span>
          </div>
        </div>
      </div>

      <div className="stats-potential">
        <div className="potential-header">
          <h3>Потенциальные платежи</h3>
          <button className="btn-add-potential" onClick={onAddPotential}>
            + Добавить
          </button>
        </div>
        <div className="potential-list">
          {potentialItems.length === 0 ? (
            <p className="potential-empty">Нет потенциальных платежей</p>
          ) : (
            potentialItems.map((item, idx) => (
              <div key={idx} className="potential-item">
                <button className="btn-delete-potential" onClick={() => onDeletePotential(idx)} title="Удалить">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <div className="potential-title">{item.title}</div>
                <div className={`potential-amount ${item.type === 'income' ? 'income' : 'expense'}`}>
                  {item.type === 'income' ? '+' : '-'}{formatNumber(item.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FinanceStats;
