import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, onToggleTheme }) => {
  return (
    <div className="app">
      <div className="liquid-bg"></div>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main className="main-content" style={{ marginTop: '80px', padding: 'var(--spacing-xl) 0' }}>
        <div className="container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
