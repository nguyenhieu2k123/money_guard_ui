import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    console.log('Registering...', { name, email, password });
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
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
              <rect width="32" height="32" rx="8" fill="url(#reg-gradient)" />
              <path d="M16 8L20 12H12L16 8Z" fill="white" />
              <path d="M16 24L12 20H20L16 24Z" fill="white" />
              <circle cx="16" cy="16" r="3" fill="white" />
              <defs>
                <linearGradient id="reg-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#FBBF24" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xs)' }}>Join MoneyGuard</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Start your journey to financial freedom</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }} />
              <input
                type="text"
                className="input"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
              />
            </div>
          </div>

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
              />
            </div>
          </div>

          <div className="input-group">
            <label className="label">Password</label>
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
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '40px' }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--spacing-md)', padding: 'var(--spacing-md)' }}>
            <UserPlus size={20} />
            <span>Create Account</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Already have an account? {' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
              Sign in instead <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
