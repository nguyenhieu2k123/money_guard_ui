import { fetchWithAuth } from './api.service';
import { API_BASE_URL } from '../utils/config';

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon?: string;
  count: number;
}

export interface CreateCategoryData {
  name: string;
  type: 'income' | 'expense';
  color?: string;
  icon?: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

/**
 * Get all categories
 */
export const getCategories = async (): Promise<Category[]> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/v1/categories`);

  if (!response.ok) {
    throw new Error('Could not fetch categories. Please try again later.');
  }

  const result = await response.json();
  
  // Parse new API format: { data: { expense: [...], income: [...] }, meta: { total: number } }
  const data = result.data || {};
  const expenseCategories = data.expense || [];
  const incomeCategories = data.income || [];
  
  // Combine both arrays
  const allCategories = [...incomeCategories, ...expenseCategories];

  return allCategories.map((cat: any) => ({
    id: cat.id || Math.random().toString(36).substring(2, 9),
    name: cat.name || 'Unnamed Category',
    type: cat.type === 'income' ? 'income' : 'expense',
    color: cat.color || (cat.type === 'income' ? '#10B981' : '#EF4444'),
    icon: cat.icon,
    count: 0, // API doesn't provide count, will need separate endpoint
  }));
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/v1/categories/${id}`);

  if (!response.ok) {
    throw new Error('Could not fetch category');
  }

  return response.json();
};

/**
 * Create new category
 */
export const createCategory = async (data: CreateCategoryData): Promise<Category> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/v1/categories`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Could not create category');
  }

  return response.json();
};

/**
 * Update category
 */
export const updateCategory = async (
  id: string,
  data: UpdateCategoryData
): Promise<Category> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/v1/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Could not update category');
  }

  return response.json();
};

/**
 * Delete category
 */
export const deleteCategory = async (id: string): Promise<void> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/v1/categories/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Could not delete category');
  }
};
