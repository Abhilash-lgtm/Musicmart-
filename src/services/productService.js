import api from './api';
import { initialMockData } from './mockData';

export const productService = {
  // Fetch all categories
  async getCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch {
      return JSON.parse(localStorage.getItem('mm_categories') || JSON.stringify(initialMockData.categories));
    }
  },

  // Fetch products with optional filtering & sorting
  async getProducts(params = {}) {
    const { category, search, minPrice, maxPrice, sortBy } = params;
    try {
      let url = '/products';
      const queryParts = [];
      if (category && category !== 'all') queryParts.push(`category=${encodeURIComponent(category)}`);
      if (search) queryParts.push(`q=${encodeURIComponent(search)}`);
      if (queryParts.length) url += `?${queryParts.join('&')}`;

      const response = await api.get(url);
      let products = response.data;

      // Filter by price
      if (maxPrice) products = products.filter((p) => p.price <= maxPrice);
      if (minPrice) products = products.filter((p) => p.price >= minPrice);

      // Sort
      if (sortBy === 'price-low') products.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-high') products.sort((a, b) => b.price - a.price);
      if (sortBy === 'rating') products.sort((a, b) => b.rating - a.rating);

      return products;
    } catch {
      let products = JSON.parse(localStorage.getItem('mm_products') || JSON.stringify(initialMockData.products));
      if (category && category !== 'all') {
        products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        products = products.filter((p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      if (maxPrice) products = products.filter((p) => p.price <= maxPrice);
      if (minPrice) products = products.filter((p) => p.price >= minPrice);

      if (sortBy === 'price-low') products.sort((a, b) => a.price - b.price);
      if (sortBy === 'price-high') products.sort((a, b) => b.price - a.price);
      if (sortBy === 'rating') products.sort((a, b) => b.rating - a.rating);

      return products;
    }
  },

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch {
      const products = JSON.parse(localStorage.getItem('mm_products') || JSON.stringify(initialMockData.products));
      const product = products.find((p) => String(p.id) === String(id));
      if (!product) throw new Error('Product not found');
      return product;
    }
  },

  // Create new product
  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch {
      const products = JSON.parse(localStorage.getItem('mm_products') || JSON.stringify(initialMockData.products));
      const newProduct = {
        id: String(Date.now()),
        ...productData,
      };
      products.unshift(newProduct);
      localStorage.setItem('mm_products', JSON.stringify(products));
      return newProduct;
    }
  },

  // Update existing product
  async updateProduct(id, productData) {
    try {
      const response = await api.patch(`/products/${id}`, productData);
      return response.data;
    } catch {
      const products = JSON.parse(localStorage.getItem('mm_products') || JSON.stringify(initialMockData.products));
      const idx = products.findIndex((p) => String(p.id) === String(id));
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...productData };
        localStorage.setItem('mm_products', JSON.stringify(products));
        return products[idx];
      }
      throw new Error('Product not found');
    }
  },

  // Delete product
  async deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);
      return true;
    } catch {
      let products = JSON.parse(localStorage.getItem('mm_products') || JSON.stringify(initialMockData.products));
      products = products.filter((p) => String(p.id) !== String(id));
      localStorage.setItem('mm_products', JSON.stringify(products));
      return true;
    }
  },
};

export default productService;
