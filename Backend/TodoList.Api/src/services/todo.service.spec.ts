import sinon from 'sinon';
import { TodoItemModel } from '../models/todoItems';
import { create, find, findAll, update } from './todo.service';

describe('todo.service', () => {
  describe('findAll', () => {
    it('should return an array of todoItems', async () => {
      sinon
        .mock(TodoItemModel)
        .expects('find')
        .returns({
          lean: () => ({
            exec: () => [
              {
                _id: '5f7a4b4d9b9e3b2a2c7c3e3f',
                description: 'Buy milk',
                isComplete: false,
              },
            ],
          }),
        });

      const items = await findAll();

      expect(items).toBeInstanceOf(Array);
    });
  });

  describe('find', () => {
    it('should return a todoItem', async () => {
      sinon.mock(TodoItemModel).expects('findById').resolves({
        _id: '5f7a4b4d9b9e3b2a2c7c3e3f',
        description: 'Buy milk',
        isComplete: false,
      });

      const item = await find('5f7a4b4d9b9e3b2a2c7c3e3f');

      expect(item).toBeInstanceOf(Object);
    });
  });

  describe('create', () => {
    it('should create a todoItem', async () => {
      sinon.stub(TodoItemModel, 'create').resolves({
        _id: '5f7a4b4d9b9e3b2a2c7c3e3f',
        description: 'test',
        isComplete: false,
      });

      const item = await create({
        description: 'test',
        isCompleted: false,
      });

      expect(item).toBeInstanceOf(Object);
    });
  });

  describe('update', () => {
    it('should update a todoItem', async () => {
      sinon.stub(TodoItemModel, 'findByIdAndUpdate').resolves({
        _id: '5f7a4b4d9b9e3b2a2c7c3e3f',
        description: 'test2',
        isComplete: false,
      });
      const item = await update('5f7a4b4d9b9e3b2a2c7c3e3f', {
        description: 'test2',
        isCompleted: false,
      });

      expect(item).toBeInstanceOf(Object);
    });
  });
});
