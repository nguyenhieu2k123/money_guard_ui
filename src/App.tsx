import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Categories from './pages/Categories';
import './App.css';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Main Routes */}
        <Route
          path="/"
          element={
            <Layout theme={theme} onToggleTheme={toggleTheme}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/reports"
          element={
            <Layout theme={theme} onToggleTheme={toggleTheme}>
              <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Reports</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>Coming soon - Charts and analytics</p>
              </div>
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout theme={theme} onToggleTheme={toggleTheme}>
              <Categories />
            </Layout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
