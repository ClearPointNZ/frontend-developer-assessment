// Reusable API layer
import apiClient from './apiClient';
import { TodoListApi, TodoListItem } from '../Globals';

export const todoListApi: TodoListApi = {
  get: async (id: number): Promise<TodoListItem> => {
    const response = await apiClient.request({
      url: `/api/todoItems/${id}`,
      method: 'GET',
    });

    return response.data;
  },

  getAll: async (): Promise<Array<TodoListItem>> => {
    const response = await apiClient.request({
      url: '/api/todoItems',
      method: 'GET',
    });

    return response.data;
  },

  create: async (todoListItem: TodoListItem): Promise<TodoListItem> => {
    const response = await apiClient.request({
      url: `/api/TodoItems`,
      method: 'POST',
      data: todoListItem,
    });

    return response.data;
  },

  update: async (todoListItem: TodoListItem): Promise<TodoListItem> => {
    const response = await apiClient.request({
      url: `/api/TodoItems/${todoListItem.id}`,
      method: 'PUT',
      data: todoListItem,
    });

    return response.data;
  },
};
