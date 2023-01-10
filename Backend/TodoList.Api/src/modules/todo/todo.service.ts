import { isValidObjectId } from 'mongoose';
import { BaseTodoItem, TodoItem, TodoItemModel } from '../../models/todoItems';

export const findAll = async (): Promise<TodoItem[]> => {
  const items = await TodoItemModel.find().lean().exec();
  return items.map((item) => ({
    id: item._id.toString(),
    description: item.description,
    isCompleted: item.isCompleted,
  }));
};

export const find = async (id: string): Promise<TodoItem> => {
  if (!isValidObjectId(id)) {
    return null;
  }
  const item = await TodoItemModel.findById(id);
  if (!item) {
    return null;
  }

  return {
    id: item?._id.toString(),
    description: item?.description,
    isCompleted: item?.isCompleted,
  };
};

export const todoItemDescriptionExists = async (
  description: string
): Promise<boolean> => {
  const existingTodoItem = await TodoItemModel.exists({ description });
  return existingTodoItem !== null;
};

export const create = async (newTodoItem: BaseTodoItem): Promise<TodoItem> => {
  const todoItem = await TodoItemModel.create(newTodoItem);

  return todoItem;
};

export const update = async (
  id: string,
  todoItemUpdate: BaseTodoItem
): Promise<TodoItem | null> =>
  TodoItemModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { ...todoItemUpdate },
    { new: true }
  );

export const remove = async (id: string): Promise<void> =>
  TodoItemModel.findByIdAndRemove({ _id: id });
