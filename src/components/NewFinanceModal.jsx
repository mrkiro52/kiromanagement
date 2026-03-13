import { useState } from 'react';
import './NewFinanceModal.css';

const NewFinanceModal = ({ onAdd, onClose, title: modalTitle }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) return;
    onAdd({
      title,
      type,
      amount: Number(amount),
      comment,
      date: new Date().toISOString(),
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="finance-modal" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>{modalTitle || 'Добавить запись'}</h2>
          <button className="btn-close" type="button" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l8 8M14 6l-8 8" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Название</label>
            <input value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Тип</label>
            <div className="type-switch">
              <button type="button" className={type === 'income' ? 'active' : ''} onClick={() => setType('income')}>Пополнение</button>
              <button type="button" className={type === 'expense' ? 'active' : ''} onClick={() => setType('expense')}>Трата</button>
            </div>
          </div>
          <div className="form-group">
            <label>Сумма</label>
            <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Комментарий</label>
            <textarea value={comment} onChange={e => setComment(e.target.value)} rows={2} />
          </div>
        </div>
        <button className="btn-submit" type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default NewFinanceModal;
