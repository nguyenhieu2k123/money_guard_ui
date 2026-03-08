import { apiRequest } from './api.service';
import { API_BASE_URL } from '../utils/config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  message?: string;
}

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }

  return response.json();
};

/**
 * Register new user
 */
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(error.message || 'Registration failed. Please try again.');
  }

  return response.json();
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  await fetch(`${API_BASE_URL}/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  
  // Clear local storage
  localStorage.removeItem('token');
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (): Promise<AuthResponse> => {
  return apiRequest('/v1/auth/refresh-token', {
    method: 'POST',
  });
};
