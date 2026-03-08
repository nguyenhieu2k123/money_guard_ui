import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface DashboardProps {
  balance: number;
  income: number;
  expense: number;
  onAddTransaction: () => void;
  transactionCount?: number;
}

function Dashboard({ balance, income, expense, onAddTransaction, transactionCount = 0 }: DashboardProps) {
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
          <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>Dashboard</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Your financial overview</p>
        </div>
        <button className="btn btn-primary" onClick={onAddTransaction}>
          <Plus size={20} />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="bento-grid">
        {/* Balance Card - Large */}
        <div className="card balance-card" style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '200px'
        }}>
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--spacing-xs)',
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-secondary)'
            }}>
              <Wallet size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Total Balance</span>
            </div>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 700,
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--color-text-primary)'
            }}>
              {formatCurrency(balance)}
            </h2>
          </div>
          <div style={{ 
            fontSize: '0.875rem', 
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)'
          }}>
            <span>{transactionCount} transactions</span>
          </div>
        </div>

        {/* Income Card */}
        <div className="card">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-xs)',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-success)'
          }}>
            <TrendingUp size={20} />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Income</span>
          </div>
          <h3 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700,
            color: 'var(--color-success)'
          }}>
            {formatCurrency(income)}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xs)' }}>
            This month
          </p>
        </div>

        {/* Expense Card */}
        <div className="card">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--spacing-xs)',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--color-danger)'
          }}>
            <TrendingDown size={20} />
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Expenses</span>
          </div>
          <h3 style={{ 
            fontSize: '1.75rem', 
            fontWeight: 700,
            color: 'var(--color-danger)'
          }}>
            {formatCurrency(expense)}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 'var(--spacing-xs)' }}>
            This month
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
