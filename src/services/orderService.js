import api from './api';
import { initialMockData } from './mockData';

export const orderService = {
  // Create and submit a new customer order
  async createOrder(orderData) {
    const trackingNumber = `MM-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      trackingNumber,
      carrier: 'FedEx Priority Express',
      status: 'Processing',
      createdAt: new Date().toISOString(),
      ...orderData,
    };

    try {
      const response = await api.post('/orders', newOrder);
      return response.data;
    } catch {
      const orders = JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
      orders.unshift(newOrder);
      localStorage.setItem('mm_orders', JSON.stringify(orders));
      return newOrder;
    }
  },

  // Get orders placed by a specific user
  async getUserOrders(userId) {
    try {
      const response = await api.get(`/orders?userId=${encodeURIComponent(userId)}`);
      return response.data;
    } catch {
      const orders = JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
      return orders.filter((o) => String(o.userId) === String(userId));
    }
  },

  // Lookup order by Order ID or Tracking Number
  async getOrderById(query) {
    try {
      const response = await api.get('/orders');
      const orders = response.data;
      const found = orders.find(
        (o) =>
          o.id.toLowerCase() === query.toLowerCase() ||
          o.trackingNumber.toLowerCase() === query.toLowerCase()
      );
      if (!found) throw new Error('Order not found');
      return found;
    } catch {
      const orders = JSON.parse(localStorage.getItem('mm_orders') || JSON.stringify(initialMockData.orders));
      const found = orders.find(
        (o) =>
          o.id.toLowerCase() === query.toLowerCase() ||
          o.trackingNumber.toLowerCase() === query.toLowerCase()
      );
      if (!found) throw new Error('Order not found');
      return found;
    }
  },
};

export default orderService;
