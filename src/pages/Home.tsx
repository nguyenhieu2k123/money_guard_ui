import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import TransactionList from '../components/TransactionList';
import AddTransactionModal from '../components/AddTransactionModal';
import { Loader2, AlertCircle } from 'lucide-react';
import { fetchWithAuth } from '../utils/api';
import { API_BASE_URL } from '../utils/config';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchWithAuth(`${API_BASE_URL}/v1/transactions`);

      if (response.status === 401) {
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Could not fetch transactions. Please try again later.');
      }

      const data = await response.json();
      const transactionsData = Array.isArray(data) ? data : data.transactions || [];

      const formattedTransactions = transactionsData.map((t: any) => ({
        id: t.id || t._id || Math.random().toString(36).substr(2, 9),
        type: t.type === 'income' ? 'income' : 'expense',
        category: t.category || 'Other',
        amount: Number(t.amount) || 0,
        description: t.description || '',
        date: t.date || new Date().toISOString(),
      }));

      setTransactions(formattedTransactions);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching transactions');
      console.error('Fetch transactions error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 'var(--spacing-md)' }}>
        <Loader2 size={48} className="spinner" style={{ color: 'var(--color-primary)', animation: 'spin 1.5s linear infinite' }} />
        <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Updating your balance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-container" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
        <AlertCircle size={48} style={{ color: 'var(--color-danger)', marginBottom: 'var(--spacing-md)', marginInline: 'auto' }} />
        <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Sync Error</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>{error}</p>
        <button className="btn btn-secondary" onClick={() => fetchTransactions()}>
          Retry Sync
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <Dashboard
        balance={balance}
        income={totalIncome}
        expense={totalExpense}
        onAddTransaction={() => setIsModalOpen(true)}
      />

      <TransactionList
        transactions={transactions}
        onDeleteTransaction={deleteTransaction}
      />

      {isModalOpen && (
        <AddTransactionModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addTransaction}
        />
      )}
    </div>
  );
}

export default Home;
