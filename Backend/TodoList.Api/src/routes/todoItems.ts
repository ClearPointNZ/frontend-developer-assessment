import express, { Request, Response } from "express";
import ShortUniqueId from "short-unique-id";
import { BaseTodoItem, TodoItem, TodoItems } from "../models/todoItems";

export const todoItemRouter = express.Router();

let todoItems: TodoItems = {};

const findAll = async (): Promise<TodoItem[]> => Object.values(todoItems);
const find = async (id: string): Promise<TodoItem> => todoItems[id];

const todoItemDescriptionExists = async (
  description: string
): Promise<boolean> => {
  return Object.values(todoItems).some(
    (todoItem) => todoItem.description === description
  );
};

const create = async (newTodoItem: BaseTodoItem): Promise<TodoItem> => {
  const uid = new ShortUniqueId({ length: 10 });
  const id: string = uid();
  todoItems[id] = {
    id,
    ...newTodoItem,
  };

  return todoItems[id];
};
const update = async (
  id: string,
  todoItemUpdate: BaseTodoItem
): Promise<TodoItem | null> => {
  const existingtodoItem = await find(id);

  if (!existingtodoItem) {
    return null;
  }

  todoItems[id] = { id, ...todoItemUpdate };

  return todoItems[id];
};
const remove = async (id: string): Promise<null | void> => {
  const existingtodoItem = await find(id);

  if (!existingtodoItem) {
    return null;
  }

  delete todoItems[id];
};

// GET todoItems
todoItemRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: TodoItem[] = await findAll();

    return res.status(200).send(items);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// GET todoItem/:id
todoItemRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const item: TodoItem = await find(req.params.id);

    if (item) {
      return res.status(200).send(item);
    }

    return res.status(404).send("TodoItem not found");
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// POST todoItem
todoItemRouter.post("/", async (req: Request, res: Response) => {
  try {
    const todoItem: BaseTodoItem = req.body;
    console.log({ todoItem, req, body: req.body });

    const description = todoItem?.description;
    if (!description) {
      return res.status(400).send("Description is required");
    }

    const hasDuplicateDescription = await todoItemDescriptionExists(
      description
    );

    if (hasDuplicateDescription) {
      return res.status(400).send("Description already exists");
    }
    const newtodoItem = await create(todoItem);
    return res.status(201).json(newtodoItem);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// PUT todoItems/:id
todoItemRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todoItem: BaseTodoItem = req.body;

    const existingTodoItem: TodoItem = await find(id);
    if (existingTodoItem) {
      const updatedItem = await update(id, todoItem);
      return res.status(200).json(updatedItem);
    }

    return res.status(404).send("TodoItem not found");
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

// DELETE todoItems/:id
todoItemRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await remove(id);

    return res.sendStatus(204);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
