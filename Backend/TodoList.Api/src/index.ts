import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

import { getApp } from './app';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

if (!process.env.MONGO_URL) {
  console.error(
    'MONGO_URL environtment variable is not set. Please set it and try again'
  );
  process.exit(2);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = getApp();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(3);
  });

export default app;
