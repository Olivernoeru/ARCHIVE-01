/**
 * API Service for communicating with the backend
 * Base URL configuration and common request methods
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Return error response with status for handling
        return { success: false, status: response.status, ...data };
      }

      return { success: true, status: response.status, ...data };
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        status: 0,
        message: 'Terjadi kesalahan jaringan. Silakan coba lagi.',
      };
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  }

  async register(username, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: { username, email, password },
    });
  }

  async getProfile() {
    return this.request('/auth/me', {
      method: 'GET',
    });
  }

  async updateProfile(data) {
    return this.request('/auth/profile', {
      method: 'PUT',
      body: data,
    });
  }
}

export const api = new ApiService();
export default api;