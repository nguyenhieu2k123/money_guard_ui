import { Link, useLocation } from 'react-router-dom';
import { Home, List, PieChart, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="glass-container" style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: 100,
      borderRadius: '0',
      borderLeft: 'none',
      borderRight: 'none',
      borderTop: 'none',
      backdropFilter: 'blur(30px)'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', textDecoration: 'none' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#header-gradient)" />
              <path d="M16 8L20 12H12L16 8Z" fill="white" />
              <path d="M16 24L12 20H20L16 24Z" fill="white" />
              <circle cx="16" cy="16" r="3" fill="white" />
              <defs>
                <linearGradient id="header-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text gradient-text" style={{ fontWeight: 700, fontSize: '1.5rem' }}>MoneyGuard</span>
          </Link>

          <nav style={{ display: 'flex', gap: 'var(--spacing-md)', alignItems: 'center' }}>
            <Link
              to="/"
              className={`btn btn-ghost ${isActive('/') ? 'btn-secondary' : ''}`}
              style={{ gap: 'var(--spacing-xs)' }}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/categories"
              className={`btn btn-ghost ${isActive('/categories') ? 'btn-secondary' : ''}`}
              style={{ gap: 'var(--spacing-xs)' }}
            >
              <List size={18} />
              <span>Categories</span>
            </Link>
            <Link
              to="/analytics"
              className={`btn btn-ghost ${isActive('/analytics') ? 'btn-secondary' : ''}`}
              style={{ gap: 'var(--spacing-xs)' }}
            >
              <PieChart size={18} />
              <span>Analytics</span>
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            <button
              className="btn btn-ghost"
              onClick={onToggleTheme}
              style={{ width: '40px', height: '40px', padding: 0 }}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
