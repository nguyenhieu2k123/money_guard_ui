// API base URL from environment variable, with fallback for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8011';

export { API_BASE_URL };
