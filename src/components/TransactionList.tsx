import { Trash2, DollarSign, Utensils, Car, Tag } from 'lucide-react';
import { Transaction } from '../pages/Home';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Salary': return <DollarSign size={20} />;
      case 'Food': return <Utensils size={20} />;
      case 'Transport': return <Car size={20} />;
      default: return <Tag size={20} />;
    }
  };

  return (
    <section>
      <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-lg)' }}>Recent Transactions</h2>

      {transactions.length === 0 ? (
        <div className="glass-container" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>No transactions found. Start by adding one!</p>
        </div>
      ) : (
        <div className="glass-container" style={{ padding: 'var(--spacing-sm)' }}>
          {transactions.map((transaction, index) => (
            <div
              key={transaction.id}
              className="glass-card-hover"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                borderBottom: index !== transactions.length - 1 ? '1px solid var(--color-border)' : 'none',
                transition: 'background 0.2s',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: transaction.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)',
                marginRight: 'var(--spacing-md)'
              }}>
                {getCategoryIcon(transaction.category)}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '1rem' }}>{transaction.category}</h4>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{transaction.description}</p>
              </div>

              <div style={{ textAlign: 'right', marginRight: 'var(--spacing-lg)' }}>
                <p style={{
                  margin: 0,
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{formatDate(transaction.date)}</p>
              </div>

              <button
                className="btn btn-ghost"
                onClick={() => onDeleteTransaction(transaction.id)}
                style={{ color: 'var(--color-danger)', padding: 'var(--spacing-xs)' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;
