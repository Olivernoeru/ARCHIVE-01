/**
 * Auth Context for managing authentication state across the application
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = api.getToken();
      if (token) {
        try {
          const response = await api.getProfile();
          if (response.success) {
            setUser(response.data);
          } else {
            // Token invalid or expired
            api.clearToken();
          }
        } catch (err) {
          console.error('Failed to restore auth:', err);
          api.clearToken();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await api.login(email, password);
      
      if (response.success) {
        api.setToken(response.data.token);
        setUser(response.data.customer);
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Login gagal');
        return { success: false, message: response.message || 'Login gagal' };
      }
    } catch (err) {
      const errorMessage = 'Terjadi kesalahan saat login. Silakan coba lagi.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username, email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await api.register(username, email, password);
      
      if (response.success) {
        api.setToken(response.data.token);
        setUser(response.data.customer);
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Registrasi gagal');
        return { success: false, message: response.message || 'Registrasi gagal' };
      }
    } catch (err) {
      const errorMessage = 'Terjadi kesalahan saat registrasi. Silakan coba lagi.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    api.clearToken();
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}