import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Plus, PlusCircle, Trash2, Edit3, Search, AlertCircle, Loader2 } from 'lucide-react';
import { fetchWithAuth } from '../utils/api';
import { API_BASE_URL } from '../utils/config';

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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchWithAuth(`${API_BASE_URL}/v1/categories`);

        if (response.status === 401) {
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Could not fetch categories. Please try again later.');
        }

        const data = await response.json();
        // Assuming the API returns an array of categories or an object with a categories field
        const categoriesData = Array.isArray(data) ? data : data.categories || [];

        // Map data to match our interface if necessary, adding defaults for missing fields
        const formattedCategories = categoriesData.map((cat: any) => ({
          id: cat.id || cat._id || Math.random().toString(36).substr(2, 9),
          name: cat.name || 'Unnamed Category',
          type: cat.type === 'income' ? 'income' : 'expense',
          color: cat.color || (cat.type === 'income' ? '#10B981' : '#EF4444'),
          count: cat.count || 0
        }));

        setCategories(formattedCategories);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching categories');
        console.error('Fetch categories error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-xs)' }}>Categories</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage your income and expense categories</p>
        </div>
        <button className="btn btn-primary" disabled={isLoading}>
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      <div className="glass-container" style={{ padding: 'var(--spacing-md)', marginBottom: 'var(--spacing-xl)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          placeholder="Search categories..."
          className="btn-ghost"
          style={{
            border: 'none',
            outline: 'none',
            flex: 1,
            fontSize: '1rem',
            padding: 'var(--spacing-xs)',
            color: 'var(--color-text-primary)'
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading || !!error}
        />
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: 'var(--spacing-md)' }}>
          <Loader2 size={48} className="spinner" style={{ color: 'var(--color-primary)', animation: 'spin 1.5s linear infinite' }} />
          <p style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>Fetching your categories...</p>
        </div>
      ) : error ? (
        <div className="glass-container" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <AlertCircle size={48} style={{ color: 'var(--color-danger)', marginBottom: 'var(--spacing-md)' }} />
          <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Oops! Something went wrong</h3>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-lg)' }}>{error}</p>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 'var(--spacing-lg)'
        }}>
          {filteredCategories.map(category => (
            <div key={category.id} className="glass-container glass-card-hover" style={{ padding: 'var(--spacing-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: `${category.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: category.color
                  }}
                >
                  <Tag size={24} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                  <button className="btn btn-ghost" style={{ padding: 'var(--spacing-xs)' }}>
                    <Edit3 size={16} />
                  </button>
                  <button className="btn btn-ghost" style={{ padding: 'var(--spacing-xs)', color: 'var(--color-danger)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 style={{ marginBottom: '4px' }}>{category.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: category.type === 'income' ? 'var(--color-success)' : 'var(--color-danger)',
                  background: category.type === 'income' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {category.type}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {category.count} transactions
                </span>
              </div>
            </div>
          ))}

          <div
            className="glass-container glass-card-hover"
            style={{
              padding: 'var(--spacing-lg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderStyle: 'dashed',
              borderWidth: '2px',
              cursor: 'pointer',
              minHeight: '160px'
            }}
          >
            <PlusCircle size={40} style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-sm)' }} />
            <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>New Category</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
