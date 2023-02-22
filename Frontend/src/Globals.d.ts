import { TodoListItem } from './infrastructure/todoListApi';

export interface TodoListItem {
  id?: number;
  description: string;
  complete: boolean;
}

export interface TodoListApi {
  get: (id: number) => Promise<TodoListItem>;
  getAll: () => Promise<Array<TodoListItem>>;
  create: (todoListItem: TodoListItem) => Promise<TodoListItem>;
  update: (todoListItem: TodoListItem) => Promise<TodoListItem>;
}
