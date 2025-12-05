import { useState, FormEvent } from 'react';
import { Transaction } from '../App';
import './AddTransactionModal.css';

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Transaction</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Type</label>
            <div className="type-selector">
              <button
                type="button"
                className={`type-btn ${type === 'income' ? 'active income' : ''}`}
                onClick={() => {
                  setType('income');
                  setCategory('');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 16V4M10 4L6 8M10 4L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Income
              </button>
              <button
                type="button"
                className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
                onClick={() => {
                  setType('expense');
                  setCategory('');
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M10 16L6 12M10 16L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Expense
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">Category</label>
            <select
              id="category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories[type].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount</label>
            <div className="input-wrapper">
              <span className="input-prefix">$</span>
              <input
                id="amount"
                type="number"
                className="input input-with-prefix"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              id="description"
              type="text"
              className="input"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
