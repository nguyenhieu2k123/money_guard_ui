import { JSX, useState } from 'react';
import { Trash2, DollarSign, Utensils, Car, Tag, ShoppingBag, Home as HomeIcon, Heart, Search, Edit2, Check, X } from 'lucide-react';
import { Transaction } from '../pages/Home';

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onUpdateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  filter: 'all' | 'income' | 'expense';
  onFilterChange: (filter: 'all' | 'income' | 'expense') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

function TransactionList({ 
  transactions, 
  onDeleteTransaction, 
  onUpdateTransaction,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange
}: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Omit<Transaction, 'id'> | null>(null);

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
    const iconMap: { [key: string]: JSX.Element } = {
      'Salary': <DollarSign size={20} />,
      'Freelance': <DollarSign size={20} />,
      'Investment': <DollarSign size={20} />,
      'Food': <Utensils size={20} />,
      'Transport': <Car size={20} />,
      'Shopping': <ShoppingBag size={20} />,
      'Bills': <HomeIcon size={20} />,
      'Housing': <HomeIcon size={20} />,
      'Health': <Heart size={20} />,
      'Healthcare': <Heart size={20} />,
      'Entertainment': <Tag size={20} />,
    };
    return iconMap[category] || <Tag size={20} />;
  };

  const startEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      description: transaction.description,
      date: transaction.date,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (editingId && editForm) {
      onUpdateTransaction(editingId, editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const dateKey = formatDate(transaction.date);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {} as { [key: string]: Transaction[] });

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'],
  };

  return (
    <section>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 'var(--spacing-lg)',
        gap: 'var(--spacing-md)',
        flexWrap: 'wrap'
      }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>Transactions</h2>
        
        {/* Filter Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: 'var(--spacing-xs)',
          padding: '4px',
          background: 'var(--color-bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)'
        }}>
          <button
            className="btn"
            onClick={() => onFilterChange('all')}
            style={{
              height: '36px',
              padding: '0 var(--spacing-md)',
              background: filter === 'all' ? 'var(--color-primary)' : 'transparent',
              color: filter === 'all' ? 'white' : 'var(--color-text-secondary)',
              border: 'none',
              fontSize: '0.875rem'
            }}
          >
            All
          </button>
          <button
            className="btn"
            onClick={() => onFilterChange('income')}
            style={{
              height: '36px',
              padding: '0 var(--spacing-md)',
              background: filter === 'income' ? 'var(--color-success)' : 'transparent',
              color: filter === 'income' ? 'white' : 'var(--color-text-secondary)',
              border: 'none',
              fontSize: '0.875rem'
            }}
          >
            Income
          </button>
          <button
            className="btn"
            onClick={() => onFilterChange('expense')}
            style={{
              height: '36px',
              padding: '0 var(--spacing-md)',
              background: filter === 'expense' ? 'var(--color-danger)' : 'transparent',
              color: filter === 'expense' ? 'white' : 'var(--color-text-secondary)',
              border: 'none',
              fontSize: '0.875rem'
            }}
          >
            Expenses
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)'
          }} />
          <input
            type="text"
            className="input"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ 
              paddingLeft: '40px', 
              height: '44px',
              width: '100%'
            }}
          />
        </div>
      </div>

      {transactions.length === 0 ? (
        <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            borderRadius: '50%',
            background: 'var(--color-bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--spacing-lg)',
            color: 'var(--color-text-muted)'
          }}>
            <DollarSign size={32} />
          </div>
          <h3 style={{ marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>No transactions yet</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
            Start tracking your finances by adding your first transaction
          </p>
        </div>
      ) : Object.keys(groupedTransactions).length === 0 ? (
        <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
            No transactions found matching your search
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {Object.entries(groupedTransactions).map(([date, dateTransactions], groupIndex) => (
            <div key={date}>
              <div style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                background: 'var(--color-bg-secondary)',
                borderBottom: '1px solid var(--color-border)',
              }}>
                <h3 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  margin: 0
                }}>
                  {date}
                </h3>
              </div>
              
              {dateTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="transaction-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    borderBottom: index !== dateTransactions.length - 1 || groupIndex !== Object.keys(groupedTransactions).length - 1
                      ? '1px solid var(--color-border)' 
                      : 'none',
                    transition: 'background var(--transition-fast)',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    if (editingId !== transaction.id) {
                      e.currentTarget.style.background = 'var(--color-bg-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (editingId !== transaction.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {editingId === transaction.id && editForm ? (
                    // Edit Mode
                    <div style={{ 
                      display: 'flex', 
                      gap: 'var(--spacing-md)', 
                      flex: 1,
                      alignItems: 'center',
                      flexWrap: 'wrap'
                    }}>
                      <select
                        className="input"
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        style={{ height: '36px', minWidth: '120px', flex: '1' }}
                      >
                        {categories[editForm.type].map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      
                      <input
                        type="number"
                        className="input"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                        style={{ height: '36px', width: '120px' }}
                        step="0.01"
                        min="0"
                      />
                      
                      <input
                        type="text"
                        className="input"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        style={{ height: '36px', flex: '2', minWidth: '150px' }}
                        placeholder="Description"
                      />
                      
                      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                        <button
                          className="btn btn-ghost"
                          onClick={saveEdit}
                          style={{ 
                            padding: 'var(--spacing-xs)',
                            minWidth: '32px',
                            height: '32px',
                            color: 'var(--color-success)'
                          }}
                          aria-label="Save changes"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={cancelEdit}
                          style={{ 
                            padding: 'var(--spacing-xs)',
                            minWidth: '32px',
                            height: '32px',
                            color: 'var(--color-text-muted)'
                          }}
                          aria-label="Cancel edit"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: transaction.type === 'income' 
                          ? 'rgba(16, 185, 129, 0.1)' 
                          : 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)',
                        marginRight: 'var(--spacing-md)',
                        flexShrink: 0
                      }}>
                        {getCategoryIcon(transaction.category)}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ 
                          margin: 0, 
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: 'var(--color-text-primary)'
                        }}>
                          {transaction.category}
                        </h4>
                        {transaction.description && (
                          <p style={{ 
                            margin: 0, 
                            fontSize: '0.8125rem', 
                            color: 'var(--color-text-muted)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {transaction.description}
                          </p>
                        )}
                      </div>

                      <div style={{ 
                        textAlign: 'right', 
                        marginRight: 'var(--spacing-md)',
                        flexShrink: 0
                      }}>
                        <p style={{
                          margin: 0,
                          fontSize: '1rem',
                          fontWeight: 600,
                          color: transaction.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)'
                        }}>
                          {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                        <button
                          className="btn btn-ghost"
                          onClick={() => startEdit(transaction)}
                          style={{ 
                            color: 'var(--color-text-muted)', 
                            padding: 'var(--spacing-xs)',
                            minWidth: '32px',
                            height: '32px'
                          }}
                          aria-label="Edit transaction"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="btn btn-ghost"
                          onClick={() => onDeleteTransaction(transaction.id)}
                          style={{ 
                            color: 'var(--color-text-muted)', 
                            padding: 'var(--spacing-xs)',
                            minWidth: '32px',
                            height: '32px'
                          }}
                          aria-label="Delete transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;
