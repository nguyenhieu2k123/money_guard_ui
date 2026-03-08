import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PieChart, Settings, Sun, Moon, Wallet, User, LogOut, LogIn } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { logout } from '../services/auth.service';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

function Header({ theme, onToggleTheme }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;

  // Check if user is logged in (you can replace this with actual auth check)
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Still navigate to login even if logout fails
      setIsUserMenuOpen(false);
      navigate('/login');
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <header style={{
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: 100,
      background: 'var(--color-bg-primary)',
      borderBottom: '1px solid var(--color-border)',
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white'
            }}>
              <Wallet size={20} />
            </div>
            <span style={{ 
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700, 
              fontSize: '1.25rem',
              color: 'var(--color-text-primary)'
            }}>MoneyGuard</span>
          </Link>

          <nav style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center' }}>
            <Link
              to="/"
              className={`btn btn-ghost ${isActive('/') ? 'btn-secondary' : ''}`}
              style={{ gap: 'var(--spacing-xs)' }}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/reports"
              className={`btn btn-ghost ${isActive('/reports') ? 'btn-secondary' : ''}`}
              style={{ gap: 'var(--spacing-xs)' }}
            >
              <PieChart size={18} />
              <span>Reports</span>
            </Link>
            <Link
              to="/settings"
              className={`btn btn-ghost ${isActive('/settings') ? 'btn-secondary' : ''}`}
              style={{ gap: 'var(--spacing-xs)' }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
            <button
              className="btn btn-ghost"
              onClick={onToggleTheme}
              style={{ width: '40px', height: '40px', padding: 0 }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* User Menu */}
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button
                className="btn btn-ghost"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  padding: 0,
                  background: isUserMenuOpen ? 'var(--color-bg-secondary)' : 'transparent'
                }}
                aria-label="User menu"
              >
                <User size={20} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="card fade-in"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    minWidth: '180px',
                    padding: 'var(--spacing-xs)',
                    zIndex: 1000
                  }}
                >
                  {isLoggedIn ? (
                    <>
                      <div style={{ 
                        padding: 'var(--spacing-sm) var(--spacing-md)',
                        borderBottom: '1px solid var(--color-border)',
                        marginBottom: 'var(--spacing-xs)'
                      }}>
                        <p style={{ 
                          fontSize: '0.875rem', 
                          fontWeight: 600,
                          margin: 0,
                          color: 'var(--color-text-primary)'
                        }}>
                          User Account
                        </p>
                        <p style={{ 
                          fontSize: '0.75rem', 
                          color: 'var(--color-text-muted)',
                          margin: 0
                        }}>
                          user@example.com
                        </p>
                      </div>
                      <button
                        className="btn btn-ghost"
                        onClick={handleLogout}
                        style={{ 
                          width: '100%', 
                          justifyContent: 'flex-start',
                          gap: 'var(--spacing-sm)',
                          color: 'var(--color-danger)'
                        }}
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="btn btn-ghost"
                        onClick={() => setIsUserMenuOpen(false)}
                        style={{ 
                          width: '100%', 
                          justifyContent: 'flex-start',
                          gap: 'var(--spacing-sm)'
                        }}
                      >
                        <LogIn size={16} />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        className="btn btn-ghost"
                        onClick={() => setIsUserMenuOpen(false)}
                        style={{ 
                          width: '100%', 
                          justifyContent: 'flex-start',
                          gap: 'var(--spacing-sm)'
                        }}
                      >
                        <User size={16} />
                        <span>Register</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
