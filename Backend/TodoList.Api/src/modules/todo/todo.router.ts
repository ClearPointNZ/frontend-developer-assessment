import express, { Request, Response } from 'express';
import { BaseTodoItem, TodoItem } from '../../models/todoItems';
import {
  create,
  find,
  findAll,
  remove,
  todoItemDescriptionExists,
  update,
} from './todo.service';

export const todoItemRouter = express.Router();

// GET todoItems
todoItemRouter.get('/', async (req: Request, res: Response) => {
  try {
    const items: TodoItem[] = await findAll();

    return res.status(200).send(items);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET todoItem/:id
todoItemRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const item: TodoItem = await find(req.params.id);

    if (item) {
      return res.status(200).send(item);
    }

    return res.status(404).send('TodoItem not found');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST todoItem
todoItemRouter.post('/', async (req: Request, res: Response) => {
  try {
    const todoItem: BaseTodoItem = req.body;

    const description = todoItem?.description;
    if (!description) {
      return res.status(400).send('Description is required');
    }

    const hasDuplicateDescription = await todoItemDescriptionExists(
      description
    );

    if (hasDuplicateDescription) {
      return res.status(400).send('Description already exists');
    }
    const newtodoItem = await create(todoItem);
    return res.status(201).json(newtodoItem);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT todoItems/:id
todoItemRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todoItem: BaseTodoItem = req.body;

    const existingTodoItem: TodoItem = await find(id);
    if (existingTodoItem) {
      const updatedItem = await update(id, todoItem);
      return res.status(200).json(updatedItem);
    }

    return res.status(404).send('TodoItem not found');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE todoItems/:id
todoItemRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await remove(id);

    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
