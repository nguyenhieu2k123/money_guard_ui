import { useState, FormEvent } from 'react';
import { X, TrendingUp, TrendingDown, Type } from 'lucide-react';
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

    if (!category || !amount || !description) {
      return;
    }

    onAdd({
      type,
      category,
      amount: parseFloat(amount),
      description,
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
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 'var(--spacing-md)'
    }} onClick={onClose}>
      <div
        className="glass-container fade-in"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: 'var(--spacing-2xl)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Add Transaction</h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ padding: 'var(--spacing-xs)' }}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Transaction Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <button
                type="button"
                className={`btn ${type === 'income' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setType('income')}
                style={{ height: '48px' }}
              >
                <TrendingUp size={18} />
                <span>Income</span>
              </button>
              <button
                type="button"
                className={`btn ${type === 'expense' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setType('expense')}
                style={{
                  height: '48px',
                  background: type === 'expense' ? 'linear-gradient(135deg, var(--color-danger) 0%, #ff6b6b 100%)' : undefined
                }}
              >
                <TrendingDown size={18} />
                <span>Expense</span>
              </button>
            </div>
          </div>

          <div className="input-group">
            <label className="label">Category</label>
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ height: '48px', appearance: 'none' }}
            >
              <option value="">Select a category</option>
              {categories[type].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="label">Amount</label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                fontWeight: 600
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
                style={{ paddingLeft: '32px', height: '48px' }}
              />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <label className="label">Description</label>
            <div style={{ position: 'relative' }}>
              <Type size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)'
              }} />
              <input
                type="text"
                className="input"
                placeholder="What was this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                style={{ paddingLeft: '40px', height: '48px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} style={{ height: '48px' }}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ height: '48px' }}>
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
