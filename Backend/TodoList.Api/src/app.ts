import express from "express";
import cors from "cors";
import helmet from "helmet";
import { todoItemRouter } from "./routes";

export const getApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use("/api/todoItems", todoItemRouter);
  return app;
};
