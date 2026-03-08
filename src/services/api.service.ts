import { API_BASE_URL } from '../utils/config';

export interface ApiOptions extends RequestInit {
  credentials?: RequestCredentials;
}

/**
 * Fetch with automatic token refresh
 */
export const fetchWithAuth = async (url: string, options: ApiOptions = {}) => {
  const defaultOptions: ApiOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  };

  let response = await fetch(url, defaultOptions);

  if (response.status === 401) {
    // Try to refresh token
    const refreshResponse = await fetch(`${API_BASE_URL}/v1/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (refreshResponse.ok) {
      // Retry original request
      response = await fetch(url, defaultOptions);
    } else {
      // If refresh fails, let the caller handle it (e.g., redirect to login)
      return refreshResponse;
    }
  }

  return response;
};

/**
 * Base API request helper
 */
export const apiRequest = async <T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetchWithAuth(url, options);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
};
