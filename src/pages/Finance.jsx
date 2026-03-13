import { useState, useEffect } from 'react';
import './Finance.css';
import FinanceTable from '../components/FinanceTable';
import FinanceStats from '../components/FinanceStats';
import FinancePeriods from '../components/FinancePeriods';
import NewFinanceModal from '../components/NewFinanceModal';

const Finance = () => {
  const [items, setItems] = useState([]);
  const [potentialItems, setPotentialItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPotentialModal, setShowPotentialModal] = useState(false);
  const [tab, setTab] = useState('table');

  useEffect(() => {
    const saved = localStorage.getItem('financeItems');
    if (saved) {
      setItems(JSON.parse(saved));
    }
    const savedPotential = localStorage.getItem('financePotentialItems');
    if (savedPotential) {
      setPotentialItems(JSON.parse(savedPotential));
    }
  }, []);

  const handleAdd = (item) => {
    const newItems = [item, ...items];
    setItems(newItems);
    localStorage.setItem('financeItems', JSON.stringify(newItems));
    setShowModal(false);
  };

  const handleAddPotential = (item) => {
    const newItems = [item, ...potentialItems];
    setPotentialItems(newItems);
    localStorage.setItem('financePotentialItems', JSON.stringify(newItems));
    setShowPotentialModal(false);
  };

  const handleDeletePotential = (index) => {
    const newItems = potentialItems.filter((_, i) => i !== index);
    setPotentialItems(newItems);
    localStorage.setItem('financePotentialItems', JSON.stringify(newItems));
  };

  return (
    <div className="finance-page">
      <div className="finance-header">
        <h1>Финансы</h1>
        <div className="finance-header-actions">
          <button className="btn-add" onClick={() => setShowModal(true)}>
            + Добавить
          </button>
        </div>
      </div>
      <div className="finance-tabs">
        <button className={tab === 'table' ? 'active' : ''} onClick={() => setTab('table')}>Таблица</button>
        <button className={tab === 'stats' ? 'active' : ''} onClick={() => setTab('stats')}>Статистика</button>
        <button className={tab === 'periods' ? 'active' : ''} onClick={() => setTab('periods')}>Периоды</button>
      </div>
      {tab === 'table' ? (
        <FinanceTable items={items} />
      ) : tab === 'stats' ? (
        <FinanceStats items={items} potentialItems={potentialItems} onAddPotential={() => setShowPotentialModal(true)} onDeletePotential={handleDeletePotential} />
      ) : (
        <FinancePeriods items={items} />
      )}
      {showModal && (
        <NewFinanceModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
      {showPotentialModal && (
        <NewFinanceModal 
          onAdd={handleAddPotential} 
          onClose={() => setShowPotentialModal(false)}
          title="Добавить потенциальный платеж"
        />
      )}
    </div>
  );
};

export default Finance;
