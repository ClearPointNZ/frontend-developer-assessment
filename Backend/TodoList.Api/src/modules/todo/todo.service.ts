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

  return {
    id: todoItem?._id.toString(),
    description: todoItem?.description,
    isCompleted: todoItem?.isCompleted,
  };
};

export const update = async (
  id: string,
  todoItemUpdate: BaseTodoItem
): Promise<TodoItem | null> => {
  const updated = await TodoItemModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { ...todoItemUpdate },
    { new: true }
  );
  if (!updated) {
    return null;
  }

  return {
    id: updated?._id.toString(),
    description: updated?.description,
    isCompleted: updated?.isCompleted,
  };
};

export const remove = async (id: string): Promise<void> =>
  TodoItemModel.findByIdAndRemove({ _id: id });
