import * as dotenv from 'dotenv';
import { connect, disconnect } from 'mongoose';
import { TodoItemModel } from '../../models/todoItems';

const setupDB = async () => {
  dotenv.config({ path: '.env.test' });

  await connect(process.env.MONGO_URL);
  console.log('connected to mongodb at ', process.env.MONGO_URL);

  try {
    await TodoItemModel.deleteMany({});
  } catch (e) {
    console.log('Error deleting all FileRecords', e);
  }
};
export const teardownDb = async () => {
  await disconnect();
};

beforeAll(async () => {
  await setupDB();
});

afterAll(async () => {
  await teardownDb();
});
