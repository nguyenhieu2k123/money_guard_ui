import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../utils/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await response.json();

      console.log('Login successful:', data);
      navigate('/categories');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-md)'
    }}>
      <div className="liquid-bg"></div>

      <div className="glass-container fade-in" style={{
        width: '100%',
        maxWidth: '450px',
        padding: 'var(--spacing-2xl)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <div className="logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#login-gradient)" />
              <path d="M16 8L20 12H12L16 8Z" fill="white" />
              <path d="M16 24L12 20H20L16 24Z" fill="white" />
              <circle cx="16" cy="16" r="3" fill="white" />
              <defs>
                <linearGradient id="login-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xs)' }}>Welcome Back</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Log in to your MoneyGuard account</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{
              padding: 'var(--spacing-sm) var(--spacing-md)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: 'var(--color-danger)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.875rem',
              marginBottom: 'var(--spacing-md)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              {error}
            </div>
          )}

          <div className="input-group">
            <label className="label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }} />
              <input
                type="email"
                className="input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xs)' }}>
              <label className="label" style={{ marginBottom: 0 }}>Password</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none' }}>Forgot?</a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }} />
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'var(--spacing-md)', padding: 'var(--spacing-md)' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="shimmer" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                <div className="spinner" style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite'
                }}></div>
                Authenticating...
              </span>
            ) : (
              <>
                <LogIn size={20} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Don't have an account? {' '}
            <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Create one now <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
