import { apiRequest, fetchWithAuth } from './api.service';
import { API_BASE_URL } from '../utils/config';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  accountId?: string;
}

export interface CreateTransactionData {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  accountId?: string;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {}

/**
 * Get all transactions
 */
export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await fetchWithAuth(`${API_BASE_URL}/v1/transactions`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }

  const data = await response.json();
  const transactionsData = Array.isArray(data) ? data : data.transactions || [];

  return transactionsData.map((t: any) => ({
    id: t.id || t._id || Math.random().toString(36).substr(2, 9),
    type: t.type === 'income' ? 'income' : 'expense',
    category: t.category || 'Other',
    amount: Number(t.amount) || 0,
    description: t.description || '',
    date: t.date || new Date().toISOString(),
    accountId: t.accountId,
  }));
};

/**
 * Get transaction by ID
 */
export const getTransactionById = async (id: string): Promise<Transaction> => {
  return apiRequest(`/api/v1/transactions/${id}`);
};

/**
 * Create new transaction
 */
export const createTransaction = async (data: CreateTransactionData): Promise<Transaction> => {
  return apiRequest('/api/v1/transactions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Update transaction
 */
export const updateTransaction = async (
  id: string,
  data: UpdateTransactionData
): Promise<Transaction> => {
  return apiRequest(`/api/v1/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * Delete transaction
 */
export const deleteTransaction = async (id: string): Promise<void> => {
  return apiRequest(`/api/v1/transactions/${id}`, {
    method: 'DELETE',
  });
};
