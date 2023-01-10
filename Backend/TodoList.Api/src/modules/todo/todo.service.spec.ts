import sinon from 'sinon';
import { TodoItemModel } from '../../models/todoItems';
import { create, find, findAll, remove, update } from './todo.service';

const id = '5f7a4b4d9b9e3b2a2c7c3e3f';

describe('todo.service', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('findAll', () => {
    it('should return an array of todoItems', async () => {
      sinon
        .mock(TodoItemModel)
        .expects('find')
        .returns({
          lean: () => ({
            exec: () => [
              {
                _id: id,
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
        _id: id,
        description: 'Buy milk',
        isComplete: false,
      });

      const item = await find(id);

      expect(item).toBeInstanceOf(Object);
    });

    it('should return null when todoItem does not exist', async () => {
      sinon.mock(TodoItemModel).expects('findById').resolves(null);

      const item = await find(id);

      expect(item).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a todoItem', async () => {
      sinon.stub(TodoItemModel, 'create').resolves({
        _id: id,
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
        _id: id,
        description: 'test2',
        isComplete: false,
      });
      const item = await update(id, {
        description: 'test2',
        isCompleted: false,
      });

      expect(item).toEqual({
        _id: id,
        description: 'test2',
        isComplete: false,
      });
    });

    it('should return null when todoItem does not exist', async () => {
      sinon.stub(TodoItemModel, 'findByIdAndUpdate').resolves(null);

      const item = await update(id, {
        description: 'test2',
        isCompleted: false,
      });
      expect(item).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a todoItem', async () => {
      sinon.mock(TodoItemModel).expects('findByIdAndRemove').resolves({
        _id: id,
        description: 'test2',
        isCompleted: false,
      });

      await remove(id);
    });

    it('should work fine when the todoItem does not exist', async () => {
      sinon.mock(TodoItemModel).expects('findByIdAndRemove').resolves(null);
      await remove(id);
    });
  });
});
