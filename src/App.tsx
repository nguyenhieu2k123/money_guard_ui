import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'income',
      category: 'Salary',
      amount: 5000,
      description: 'Monthly salary',
      date: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'expense',
      category: 'Food',
      amount: 150,
      description: 'Groceries',
      date: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: '3',
      type: 'expense',
      category: 'Transport',
      amount: 50,
      description: 'Gas',
      date: new Date(Date.now() - 172800000).toISOString(),
    },
  ]);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

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

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="main-content">
        <div className="container">
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
        </div>
      </main>

      {isModalOpen && (
        <AddTransactionModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addTransaction}
        />
      )}
    </div>
  );
}

export default App;
