import { BaseTodoItem, TodoItem, TodoItemModel } from '../models/todoItems';

export const findAll = async (): Promise<TodoItem[]> =>
  TodoItemModel.find().lean().exec();

export const find = async (id: string): Promise<TodoItem> =>
  TodoItemModel.findById(id);

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
): Promise<TodoItem | null> => {
  const updatedTodoItem = await TodoItemModel.findByIdAndUpdate(
    {
      _id: id,
    },
    { ...todoItemUpdate },
    { new: true }
  );

  return updatedTodoItem;
};

export const remove = async (id: string): Promise<null | void> => {
  const existingtodoItem = await find(id);

  if (!existingtodoItem) {
    return null;
  }

  await TodoItemModel.remove({ _id: id }).exec();
};
