import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PomodoroTimer from './PomodoroTimer';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Мобильная шапка */}
            <header className="mobile-header">
                <a href="https://t.me/kiro_team" target="_blank" rel="noopener noreferrer" className="mobile-logo">
                    <span>Kiro</span> Management
                </a>
                <button className="burger-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Меню">
                    <span className={`burger-icon ${isOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>
            </header>

            {/* Оверлей */}
            {isOpen && <div className="sidebar-overlay" onClick={closeMenu} />}

            {/* Сайдбар */}
            <aside className={`sidebar ${isOpen ? 'sidebar-mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <a href="https://t.me/kiro_team" target="_blank" rel="noopener noreferrer" className="sidebar-logo">
                        <span>Kiro</span> Management
                    </a>
                </div>

                <nav className="sidebar-nav">
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                        <span>Мои задачи</span>
                    </NavLink>
                    <NavLink to="/eisenhower" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        <span>Эйзенхауэр</span>
                    </NavLink>
                    <NavLink to="/tracker" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>Трекер времени</span>
                    </NavLink>
                    <NavLink to="/finance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        <span>Финансы</span>
                    </NavLink>
                    <NavLink to="/english" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
                        <span>Изучаем языки</span>
                    </NavLink>
                </nav>

                <PomodoroTimer />
            </aside>
        </>
    );
};

export default Sidebar;
