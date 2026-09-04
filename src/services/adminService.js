import api from './api';
import { initialMockData } from './mockData';

export const adminService = {
  // Get dashboard metrics
  async getDashboardStats() {
    try {
      const [ordersRes, productsRes, usersRes] = await Promise.all([
        api.get('/orders'),
        api.get('/products'),
        api.get('/users'),
      ]);

      const orders = ordersRes.data;
      const products = productsRes.data;
      const users = usersRes.data;

      const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const lowStockProducts = products.filter((p) => (p.stock || 0) <= 5);

      return {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalUsers: users.length,
        recentOrders: orders.slice(0, 5),
        lowStockProducts,
      };
    } catch {
      const orders = JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
      const products = JSON.parse(localStorage.getItem('mm_products') || JSON.stringify(initialMockData.products));
      const users = JSON.parse(localStorage.getItem('mm_users') || JSON.stringify(initialMockData.users));

      const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
      const lowStockProducts = products.filter((p) => (p.stock || 0) <= 5);

      return {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalUsers: users.length,
        recentOrders: orders.slice(0, 5),
        lowStockProducts,
      };
    }
  },

  // Get all registered users
  async getAllUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch {
      return JSON.parse(localStorage.getItem('mm_users') || JSON.stringify(initialMockData.users));
    }
  },

  // Toggle user role
  async updateUserRole(userId, newRole) {
    try {
      const response = await api.patch(`/users/${userId}`, { role: newRole });
      return response.data;
    } catch {
      const users = JSON.parse(localStorage.getItem('mm_users') || JSON.stringify(initialMockData.users));
      const idx = users.findIndex((u) => String(u.id) === String(userId));
      if (idx !== -1) {
        users[idx].role = newRole;
        localStorage.setItem('mm_users', JSON.stringify(users));
        return users[idx];
      }
      throw new Error('User not found');
    }
  },

  // Get all customer orders
  async getAllOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch {
      return JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
    }
  },

  // Get single order by ID
  async getOrderById(orderId) {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch {
      const orders = JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
      const found = orders.find((o) => String(o.id) === String(orderId));
      if (!found) throw new Error('Order not found');
      return found;
    }
  },

  // Update order status and tracking
  async updateOrderStatus(orderId, updateFields) {
    try {
      const response = await api.patch(`/orders/${orderId}`, updateFields);
      return response.data;
    } catch {
      const orders = JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
      const idx = orders.findIndex((o) => String(o.id) === String(orderId));
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], ...updateFields };
        localStorage.setItem('mm_orders', JSON.stringify(orders));
        return orders[idx];
      }
      throw new Error('Order not found');
    }
  },
};

export default adminService;
