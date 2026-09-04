import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// 1. Create Context
export const AuthContext = createContext(null);

// 2. Create Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = authService.getCurrentUser();
    const savedToken = authService.getToken();
    if (savedUser && savedToken) {
      setUser(savedUser);
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  // Login handler
  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('musicmart_user', JSON.stringify(data.user));
    localStorage.setItem('musicmart_token', data.token);
    return data.user;
  };

  // Register handler
  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('musicmart_user', JSON.stringify(data.user));
    localStorage.setItem('musicmart_token', data.token);
    return data.user;
  };

  // Logout handler
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  // Profile update handler
  const updateProfile = async (fields) => {
    if (!user) return;
    const updated = await authService.updateProfile(user.id, fields);
    setUser(updated);
    localStorage.setItem('musicmart_user', JSON.stringify(updated));
    return updated;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
