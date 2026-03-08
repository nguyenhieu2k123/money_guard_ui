# API Services Structure

## Overview

All API calls have been refactored into a dedicated `services` folder with a clean, modular structure. This improves code organization, reusability, and maintainability.

## Base URL

```
http://localhost:8011/api
```

Updated in:
- `src/utils/config.ts`
- `.env`
- `.env.example`

## Folder Structure

```
src/services/
├── index.ts                  # Export all services
├── api.service.ts            # Base API utilities
├── auth.service.ts           # Authentication APIs
├── transaction.service.ts    # Transaction APIs
└── category.service.ts       # Category APIs
```

---

## Services

### 1. API Service (`api.service.ts`)

Base utilities for all API calls.

**Functions:**

```typescript
// Fetch with automatic token refresh
fetchWithAuth(url: string, options?: ApiOptions): Promise<Response>

// Generic API request helper
apiRequest<T>(endpoint: string, options?: ApiOptions): Promise<T>
```

**Features:**
- Automatic token refresh on 401
- Retry failed requests after refresh
- Consistent error handling
- Credentials included by default

---

### 2. Auth Service (`auth.service.ts`)

Authentication and user management.

**Functions:**

```typescript
// Login user
login(credentials: LoginCredentials): Promise<AuthResponse>

// Register new user
register(data: RegisterData): Promise<AuthResponse>

// Logout user
logout(): Promise<void>

// Refresh authentication token
refreshToken(): Promise<AuthResponse>
```

**Types:**

```typescript
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  message?: string;
}
```

**Endpoints:**
- `POST /v1/auth/login`
- `POST /v1/auth/register`
- `POST /v1/auth/logout`
- `POST /v1/auth/refresh-token`

---

### 3. Transaction Service (`transaction.service.ts`)

Transaction CRUD operations.

**Functions:**

```typescript
// Get all transactions
getTransactions(): Promise<Transaction[]>

// Get transaction by ID
getTransactionById(id: string): Promise<Transaction>

// Create new transaction
createTransaction(data: CreateTransactionData): Promise<Transaction>

// Update transaction
updateTransaction(id: string, data: UpdateTransactionData): Promise<Transaction>

// Delete transaction
deleteTransaction(id: string): Promise<void>
```

**Types:**

```typescript
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  accountId?: string;
}

interface CreateTransactionData {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  accountId?: string;
}

interface UpdateTransactionData extends Partial<CreateTransactionData> {}
```

**Endpoints:**
- `GET /v1/transactions`
- `GET /v1/transactions/:id`
- `POST /v1/transactions`
- `PUT /v1/transactions/:id`
- `DELETE /v1/transactions/:id`

---

### 4. Category Service (`category.service.ts`)

Category CRUD operations.

**Functions:**

```typescript
// Get all categories
getCategories(): Promise<Category[]>

// Get category by ID
getCategoryById(id: string): Promise<Category>

// Create new category
createCategory(data: CreateCategoryData): Promise<Category>

// Update category
updateCategory(id: string, data: UpdateCategoryData): Promise<Category>

// Delete category
deleteCategory(id: string): Promise<void>
```

**Types:**

```typescript
interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  count: number;
}

interface CreateCategoryData {
  name: string;
  type: 'income' | 'expense';
  color?: string;
}

interface UpdateCategoryData extends Partial<CreateCategoryData> {}
```

**Endpoints:**
- `GET /v1/categories`
- `GET /v1/categories/:id`
- `POST /v1/categories`
- `PUT /v1/categories/:id`
- `DELETE /v1/categories/:id`

---

## Usage Examples

### Authentication

```typescript
import { login, logout } from '../services/auth.service';

// Login
try {
  const data = await login({ email, password });
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  navigate('/');
} catch (err) {
  console.error('Login failed:', err.message);
}

// Logout
try {
  await logout();
  navigate('/login');
} catch (err) {
  console.error('Logout failed:', err.message);
}
```

### Transactions

```typescript
import { getTransactions, createTransaction } from '../services/transaction.service';

// Get all transactions
try {
  const transactions = await getTransactions();
  setTransactions(transactions);
} catch (err) {
  console.error('Fetch failed:', err.message);
}

// Create transaction
try {
  const newTransaction = await createTransaction({
    type: 'expense',
    category: 'Food',
    amount: 25.50,
    description: 'Lunch',
    date: new Date().toISOString()
  });
  console.log('Created:', newTransaction);
} catch (err) {
  console.error('Create failed:', err.message);
}
```

### Categories

```typescript
import { getCategories, createCategory } from '../services/category.service';

// Get all categories
try {
  const categories = await getCategories();
  setCategories(categories);
} catch (err) {
  console.error('Fetch failed:', err.message);
}

// Create category
try {
  const newCategory = await createCategory({
    name: 'Groceries',
    type: 'expense',
    color: '#EF4444'
  });
  console.log('Created:', newCategory);
} catch (err) {
  console.error('Create failed:', err.message);
}
```

---

## Error Handling

All services throw errors with descriptive messages:

```typescript
try {
  const data = await getTransactions();
} catch (err: any) {
  // Handle 401 (unauthorized)
  if (err.message.includes('401')) {
    navigate('/login');
    return;
  }
  
  // Handle other errors
  setError(err.message || 'An error occurred');
}
```

---

## Migration Guide

### Before (Old Pattern)

```typescript
import { fetchWithAuth } from '../utils/api';
import { API_BASE_URL } from '../utils/config';

const response = await fetchWithAuth(`${API_BASE_URL}/v1/transactions`);
if (!response.ok) {
  throw new Error('Failed');
}
const data = await response.json();
```

### After (New Pattern)

```typescript
import { getTransactions } from '../services/transaction.service';

const data = await getTransactions();
```

---

## Benefits

1. **Cleaner Code**: No more manual URL construction
2. **Type Safety**: Full TypeScript support with interfaces
3. **Reusability**: Import and use anywhere
4. **Maintainability**: Single source of truth for API calls
5. **Error Handling**: Consistent error messages
6. **Testing**: Easy to mock services

---

## Updated Files

### Created:
- `src/services/index.ts`
- `src/services/api.service.ts`
- `src/services/auth.service.ts`
- `src/services/transaction.service.ts`
- `src/services/category.service.ts`

### Updated:
- `src/utils/config.ts` - Base URL changed to `http://localhost:8011/api`
- `.env` - Updated VITE_API_BASE_URL
- `.env.example` - Updated VITE_API_BASE_URL
- `src/pages/Login.tsx` - Uses `auth.service`
- `src/pages/Home.tsx` - Uses `transaction.service`
- `src/pages/Categories.tsx` - Uses `category.service`
- `src/components/Header.tsx` - Uses `auth.service` for logout

### Deprecated:
- `src/utils/api.ts` - Can be removed (functionality moved to services)

---

**Version**: 1.0  
**Date**: 2026-03-07  
**Status**: Complete

