import './Header.css';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#gradient)" />
              <path d="M16 8L20 12H12L16 8Z" fill="white" />
              <path d="M16 24L12 20H20L16 24Z" fill="white" />
              <circle cx="16" cy="16" r="3" fill="white" />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">MoneyGuard</span>
          </div>

          <nav className="nav">
            <a href="#dashboard" className="nav-link active">Dashboard</a>
            <a href="#transactions" className="nav-link">Transactions</a>
            <a href="#analytics" className="nav-link">Analytics</a>
            <a href="#settings" className="nav-link">Settings</a>
          </nav>

          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3V1M10 19V17M17 10H19M1 10H3M15.657 4.343L17.071 2.929M2.929 17.071L4.343 15.657M15.657 15.657L17.071 17.071M2.929 2.929L4.343 4.343" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
