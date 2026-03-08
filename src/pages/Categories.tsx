import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Plus, Trash2, Edit3, Search, AlertCircle, Loader2 } from 'lucide-react';
import { getCategories } from '../services/category.service';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  count: number;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        if (err.message.includes('401')) {
          navigate('/login');
          return;
        }
        setError(err.message || 'An error occurred while fetching categories');
        console.error('Fetch categories error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  const filteredCategories = categories.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || c.type === filter;
    return matchesSearch && matchesFilter;
  });

  const incomeCategories = filteredCategories.filter(c => c.type === 'income');
  const expenseCategories = filteredCategories.filter(c => c.type === 'expense');

  return (
    <div className="fade-in">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 'var(--spacing-xl)',
        flexWrap: 'wrap',
        gap: 'var(--spacing-md)'
      }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-xs)', fontWeight: 600 }}>Settings</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>Manage your categories</p>
        </div>
        <button className="btn btn-primary" disabled={isLoading}>
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--spacing-md)', 
        marginBottom: 'var(--spacing-xl)',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
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
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={isLoading || !!error}
            style={{ paddingLeft: '40px', height: '44px', width: '100%' }}
          />
        </div>

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
            onClick={() => setFilter('all')}
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
            onClick={() => setFilter('income')}
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
            onClick={() => setFilter('expense')}
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

      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '300px', 
          gap: 'var(--spacing-md)' 
        }}>
          <Loader2 size={48} className="spinner" style={{ color: 'var(--color-primary)', animation: 'spin 1.5s linear infinite' }} />
          <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Loading categories...</p>
        </div>
      ) : error ? (
        <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ color: 'var(--color-danger)', marginBottom: 'var(--spacing-md)', marginInline: 'auto' }} />
          <h3 style={{ marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>Something went wrong</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      ) : (
        <div>
          {/* Income Categories */}
          {(filter === 'all' || filter === 'income') && incomeCategories.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--color-text-primary)'
              }}>
                Income Categories
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--spacing-md)'
              }}>
                {incomeCategories.map(category => (
                  <div key={category.id} className="card card-hover" style={{ padding: 'var(--spacing-lg)' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start', 
                      marginBottom: 'var(--spacing-md)' 
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-success)'
                      }}>
                        <Tag size={20} />
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                        <button 
                          className="btn btn-ghost" 
                          style={{ padding: 'var(--spacing-xs)', minWidth: '28px', height: '28px' }}
                          aria-label="Edit category"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          className="btn btn-ghost" 
                          style={{ padding: 'var(--spacing-xs)', minWidth: '28px', height: '28px' }}
                          aria-label="Delete category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '1rem', fontWeight: 600 }}>
                      {category.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      {category.count} transactions
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expense Categories */}
          {(filter === 'all' || filter === 'expense') && expenseCategories.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
              <h2 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--color-text-primary)'
              }}>
                Expense Categories
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--spacing-md)'
              }}>
                {expenseCategories.map(category => (
                  <div key={category.id} className="card card-hover" style={{ padding: 'var(--spacing-lg)' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start', 
                      marginBottom: 'var(--spacing-md)' 
                    }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-danger)'
                      }}>
                        <Tag size={20} />
                      </div>
                      <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                        <button 
                          className="btn btn-ghost" 
                          style={{ padding: 'var(--spacing-xs)', minWidth: '28px', height: '28px' }}
                          aria-label="Edit category"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          className="btn btn-ghost" 
                          style={{ padding: 'var(--spacing-xs)', minWidth: '28px', height: '28px' }}
                          aria-label="Delete category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <h3 style={{ marginBottom: 'var(--spacing-xs)', fontSize: '1rem', fontWeight: 600 }}>
                      {category.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                      {category.count} transactions
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredCategories.length === 0 && !isLoading && (
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
                <Tag size={32} />
              </div>
              <h3 style={{ marginBottom: 'var(--spacing-sm)', fontWeight: 600 }}>No categories found</h3>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 0 }}>
                {searchTerm ? 'Try a different search term' : 'Create your first category to get started'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Categories;
