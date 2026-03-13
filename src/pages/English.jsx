import { useState, useEffect } from 'react';
import './English.css';
import WordCard from '../components/WordCard';
import NewWordModal from '../components/NewWordModal';

const English = () => {
  const [words, setWords] = useState([]);
  const [isNewWordModalOpen, setIsNewWordModalOpen] = useState(false);

  // Загрузка слов из localStorage при монтировании
  useEffect(() => {
    const savedWords = localStorage.getItem('words');
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

  // Сохранение слов в localStorage при изменении
  useEffect(() => {
    if (words.length > 0) {
      localStorage.setItem('words', JSON.stringify(words));
    }
  }, [words]);

  const handleAddWord = (newWord) => {
    const word = {
      id: Date.now(),
      ...newWord
    };
    setWords([...words, word]);
  };

  const handleDeleteWord = (wordId) => {
    const updatedWords = words.filter(w => w.id !== wordId);
    setWords(updatedWords);
    localStorage.setItem('words', JSON.stringify(updatedWords));
  };

  return (
    <div className="english-page">
      <div className="english-header">
        <h2>Изучаем языки</h2>
        <button 
          className="btn-primary"
          onClick={() => setIsNewWordModalOpen(true)}
        >
          + Добавить слово
        </button>
      </div>

      <div className="words-grid">
        {words.map(word => (
          <WordCard 
            key={word.id}
            word={word}
            onDelete={handleDeleteWord}
          />
        ))}
      </div>

      {words.length === 0 && (
        <div className="empty-state">
          <p>У вас пока нет слов для изучения</p>
          <p className="empty-state-hint">Нажмите "Добавить слово" чтобы создать первое</p>
        </div>
      )}

      {isNewWordModalOpen && (
        <NewWordModal 
          onClose={() => setIsNewWordModalOpen(false)}
          onAdd={handleAddWord}
        />
      )}
    </div>
  );
};

export default English;
