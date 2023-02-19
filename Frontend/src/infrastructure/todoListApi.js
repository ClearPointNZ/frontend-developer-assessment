import apiClient from './apiClient';

// Reusable API layer
const todoListApi = {
  get: async (id) => {
    const response = await apiClient.request({
      url: `/api/todoItems/${id}`,
      method: 'GET',
    });

    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.request({
      url: '/api/todoItems',
      method: 'GET',
    });

    return response.data;
  },

  create: async (todoListItem) => {
    const response = await apiClient.request({
      url: `/api/TodoItems`,
      method: 'POST',
      data: todoListItem,
    });

    return response.data;
  },

  update: async (todoListItem) => {
    const response = await apiClient.request({
      url: `/api/TodoItems/${todoListItem.id}`,
      method: 'PUT',
      data: todoListItem,
    });

    return response.data;
  },
};

export default todoListApi;
