import './FinanceTable.css';

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const FinanceTable = ({ items }) => {
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
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-row">Нет данных</td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FinanceTable;
