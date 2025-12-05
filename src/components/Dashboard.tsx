import './Dashboard.css';

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
    <section className="dashboard fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Financial Overview</h1>
          <p className="dashboard-subtitle">Track your income and expenses</p>
        </div>
        <button className="btn btn-primary" onClick={onAddTransaction}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add Transaction
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-card balance-card">
          <div className="stat-icon balance-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Balance</p>
            <h2 className="stat-value balance-value">{formatCurrency(balance)}</h2>
            <p className="stat-change positive">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {((income / (income + expense)) * 100).toFixed(1)}% from income
            </p>
          </div>
        </div>

        <div className="stat-card glass-card income-card">
          <div className="stat-icon income-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L12 22M12 2L6 8M12 2L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Income</p>
            <h3 className="stat-value income-value">{formatCurrency(income)}</h3>
            <p className="stat-info">This month</p>
          </div>
        </div>

        <div className="stat-card glass-card expense-card">
          <div className="stat-icon expense-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22L12 2M12 22L6 16M12 22L18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Expenses</p>
            <h3 className="stat-value expense-value">{formatCurrency(expense)}</h3>
            <p className="stat-info">This month</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
