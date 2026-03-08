import { useState, FormEvent } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction } from '../pages/Home';

interface AddTransactionModalProps {
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

function AddTransactionModal({ onClose, onAdd }: AddTransactionModalProps) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'],
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!category || !amount) {
      return;
    }

    onAdd({
      type,
      category,
      amount: parseFloat(amount),
      description: description || category,
      date: new Date().toISOString(),
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--spacing-md)'
    }} onClick={onClose}>
      <div
        className="card fade-in"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: 'var(--spacing-2xl)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 'var(--spacing-xl)' 
        }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 600 }}>Add Transaction</h2>
          <button 
            className="btn btn-ghost" 
            onClick={onClose} 
            style={{ padding: 'var(--spacing-xs)', minWidth: '32px', height: '32px' }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Type Toggle */}
          <div className="input-group">
            <label className="label">Type</label>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 'var(--spacing-sm)',
              padding: '4px',
              background: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-md)'
            }}>
              <button
                type="button"
                className="btn"
                onClick={() => setType('income')}
                style={{ 
                  height: '44px',
                  background: type === 'income' ? 'var(--color-success)' : 'transparent',
                  color: type === 'income' ? 'white' : 'var(--color-text-secondary)',
                  border: 'none'
                }}
              >
                <TrendingUp size={18} />
                <span>Income</span>
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setType('expense')}
                style={{
                  height: '44px',
                  background: type === 'expense' ? 'var(--color-danger)' : 'transparent',
                  color: type === 'expense' ? 'white' : 'var(--color-text-secondary)',
                  border: 'none'
                }}
              >
                <TrendingDown size={18} />
                <span>Expense</span>
              </button>
            </div>
          </div>

          {/* Amount - Large Input */}
          <div className="input-group">
            <label className="label">Amount</label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                fontWeight: 600,
                fontSize: '1.5rem'
              }}>$</div>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                required
                autoFocus
                style={{ 
                  paddingLeft: '48px', 
                  height: '64px',
                  fontSize: '1.5rem',
                  fontWeight: 600
                }}
              />
            </div>
          </div>

          {/* Category */}
          <div className="input-group">
            <label className="label">Category</label>
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ height: '48px' }}
            >
              <option value="">Select category</option>
              {categories[type].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description - Optional */}
          <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label className="label">Note (optional)</label>
            <input
              type="text"
              className="input"
              placeholder="Add a note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ height: '48px' }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--spacing-md)' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose} 
              style={{ height: '48px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ height: '48px' }}
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
