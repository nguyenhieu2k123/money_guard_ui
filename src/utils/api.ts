import { API_BASE_URL } from './config';

export interface ApiOptions extends RequestInit {
  credentials?: RequestCredentials;
}

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
