import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface DashboardProps {
  balance: number;
  income: number;
  expense: number;
  onAddTransaction: () => void;
}

function Dashboard({ balance, income, expense, onAddTransaction }: DashboardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xs)' }}>Financial Overview</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Track your income and expenses</p>
        </div>
        <button className="btn btn-primary" onClick={onAddTransaction}>
          <Plus size={20} />
          <span>Add Transaction</span>
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--spacing-lg)'
      }}>
        <div className="glass-container glass-card-hover" style={{ padding: 'var(--spacing-xl)', position: 'relative' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-primary)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <Wallet size={24} />
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Total Balance</p>
          <h2 style={{ fontSize: '2.5rem', margin: 'var(--spacing-xs) 0', fontWeight: 700 }}>{formatCurrency(balance)}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--color-success)' }}>
            <TrendingUp size={16} />
            <span>Good progress this month</span>
          </div>
        </div>

        <div className="glass-container glass-card-hover" style={{ padding: 'var(--spacing-xl)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-success)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <TrendingUp size={24} />
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Total Income</p>
          <h2 style={{ fontSize: '2.25rem', margin: 'var(--spacing-xs) 0', fontWeight: 700, color: 'var(--color-success)' }}>{formatCurrency(income)}</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>From all sources</p>
        </div>

        <div className="glass-container glass-card-hover" style={{ padding: 'var(--spacing-xl)' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-danger)',
            marginBottom: 'var(--spacing-md)'
          }}>
            <TrendingDown size={24} />
          </div>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Total Expenses</p>
          <h2 style={{ fontSize: '2.25rem', margin: 'var(--spacing-xs) 0', fontWeight: 700, color: 'var(--color-danger)' }}>{formatCurrency(expense)}</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>This month</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
