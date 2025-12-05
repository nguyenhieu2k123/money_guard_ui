import { JSX } from 'react';
import { Transaction } from '../App';
import './TransactionList.css';

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
    const icons: Record<string, JSX.Element> = {
      Salary: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2L10 18M10 2L6 6M10 2L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      Food: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2V10M6 10C4.89543 10 4 10.8954 4 12V18H8V12C8 10.8954 7.10457 10 6 10ZM14 2V6M14 6V18M14 6C12.8954 6 12 6.89543 12 8V18H16V8C16 6.89543 15.1046 6 14 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      Transport: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 10H16M4 10C2.89543 10 2 10.8954 2 12V16C2 17.1046 2.89543 18 4 18M4 10V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V10M16 10C17.1046 10 18 10.8954 18 12V16C18 17.1046 17.1046 18 16 18M4 18H5M4 18C4 16.8954 4.89543 16 6 16C7.10457 16 8 16.8954 8 18M16 18H15M16 18C16 16.8954 15.1046 16 14 16C12.8954 16 12 16.8954 12 18M8 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    };

    return icons[category] || (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  };

  if (transactions.length === 0) {
    return (
      <section className="transaction-list">
        <h2 className="section-title">Recent Transactions</h2>
        <div className="empty-state glass-card">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M32 20V44M20 32H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h3>No transactions yet</h3>
          <p>Start tracking your finances by adding your first transaction</p>
        </div>
      </section>
    );
  }

  return (
    <section className="transaction-list slide-in">
      <h2 className="section-title">Recent Transactions</h2>
      <div className="transactions-container glass-card">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="transaction-item">
            <div className={`transaction-icon ${transaction.type}-icon`}>
              {getCategoryIcon(transaction.category)}
            </div>
            <div className="transaction-details">
              <h4 className="transaction-category">{transaction.category}</h4>
              <p className="transaction-description">{transaction.description}</p>
            </div>
            <div className="transaction-meta">
              <p className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
              <p className="transaction-date">{formatDate(transaction.date)}</p>
            </div>
            <button
              className="delete-btn"
              onClick={() => onDeleteTransaction(transaction.id)}
              aria-label="Delete transaction"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H14M6 4V2H10V4M6 7V12M10 7V12M3 4L4 14H12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TransactionList;
