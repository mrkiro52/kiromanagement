import './FinanceTable.css';

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const FinanceTable = ({ items, onDelete }) => {
  return (
    <div className="finance-table-wrapper">
      <table className="finance-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Комментарий</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="empty-row">Нет данных</td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.title}</td>
                <td>{new Date(item.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td>
                  <span className={`type-pill ${item.type === 'income' ? 'income' : 'expense'}`}>{item.type === 'income' ? 'Пополнение' : 'Трата'}</span>
                </td>
                <td>
                  <span className={`sum-pill ${item.type === 'income' ? 'income' : 'expense'}`}>{item.type === 'income' ? '+' : '-'}{formatNumber(item.amount)}</span>
                </td>
                <td>{item.comment}</td>
                <td>
                  <button className="btn-delete-row" onClick={() => onDelete(idx)} title="Удалить">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
