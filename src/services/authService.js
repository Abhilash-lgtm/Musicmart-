import api from './api';
import { initialMockData } from './mockData';

export const authService = {
  // Login user with email & password
  async login(email, password) {
    try {
      const response = await api.get(`/users?email=${encodeURIComponent(email)}`);
      const users = response.data;
      const user = users.find((u) => u.password === password);
      if (!user) throw new Error('Invalid email or password');
      const token = `jwt-token-${user.id}-${Date.now()}`;
      return { user, token };
    } catch {
      // Local fallback
      const stored = JSON.parse(localStorage.getItem('mm_users') || JSON.stringify(initialMockData.users));
      const user = stored.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
      if (!user) throw new Error('Invalid email or password');
      const token = `jwt-mock-${user.id}`;
      return { user, token };
    }
  },

  // Register new account
  async register(userData) {
    try {
      const response = await api.post('/users', {
        ...userData,
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      });
      const user = response.data;
      const token = `jwt-token-${user.id}-${Date.now()}`;
      return { user, token };
    } catch {
      // Local fallback
      const stored = JSON.parse(localStorage.getItem('mm_users') || JSON.stringify(initialMockData.users));
      const exists = stored.some((u) => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) throw new Error('Email already registered');
      const newUser = {
        id: String(Date.now()),
        ...userData,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString(),
      };
      stored.push(newUser);
      localStorage.setItem('mm_users', JSON.stringify(stored));
      return { user: newUser, token: `jwt-mock-${newUser.id}` };
    }
  },

  // Update profile details
  async updateProfile(userId, fields) {
    try {
      const response = await api.patch(`/users/${userId}`, fields);
      return response.data;
    } catch {
      const stored = JSON.parse(localStorage.getItem('mm_users') || JSON.stringify(initialMockData.users));
      const idx = stored.findIndex((u) => String(u.id) === String(userId));
      if (idx !== -1) {
        stored[idx] = { ...stored[idx], ...fields };
        localStorage.setItem('mm_users', JSON.stringify(stored));
        return stored[idx];
      }
      throw new Error('User not found');
    }
  },

  // Mock password reset
  async forgotPassword(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `If an account exists for ${email}, a password reset link has been dispatched.`,
        });
      }, 500);
    });
  },

  // Get user from localStorage
  getCurrentUser() {
    try {
      const user = localStorage.getItem('musicmart_user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('musicmart_token') || null;
  },

  // Logout
  logout() {
    localStorage.removeItem('musicmart_token');
    localStorage.removeItem('musicmart_user');
  },
};

export default authService;
