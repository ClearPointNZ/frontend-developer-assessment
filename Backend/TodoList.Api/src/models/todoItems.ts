import { model, Schema } from 'mongoose';

export interface TodoItem extends BaseTodoItem {
  id: string;
}

export interface BaseTodoItem {
  description: string;
  isCompleted: boolean;
}

export const TodoItemSchema = new Schema<BaseTodoItem>({
  description: { type: String, required: true, index: true },
  isCompleted: { type: Boolean, required: true, default: false },
});

export const TodoItemModel = model<TodoItem>('TodoItem', TodoItemSchema);

export interface TodoItems {
  [key: string]: TodoItem;
}
