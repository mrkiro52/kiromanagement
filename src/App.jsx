import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Tasks from './pages/Tasks';
import English from './pages/English';
import EisenhowerMatrix from './pages/EisenhowerMatrix';
import Tracker from './pages/Tracker';
import Finance from './pages/Finance';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/eisenhower" element={<EisenhowerMatrix />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/english" element={<English />} />
            <Route path="/finance" element={<Finance />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
