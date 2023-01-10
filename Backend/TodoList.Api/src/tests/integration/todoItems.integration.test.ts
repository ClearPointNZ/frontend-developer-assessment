import * as httpStatus from 'http-status';
import request from 'supertest';
import { getApp } from '../../app';

const app = getApp();

describe('TodoItems routes', () => {
  test('should initially have empty list', async () => {
    const response = await request(app)
      .get('/api/todoItems')
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  test('should not allow to create an empty todoItem', async () => {
    await request(app).post('/api/todoItems').expect(httpStatus.BAD_REQUEST);

    const response = await request(app)
      .get('/api/todoItems')
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(0);
  });

  test('should be able to create a todoItem', async () => {
    await request(app)
      .post('/api/todoItems')
      .send({
        description: 'test',
        isCompleted: false,
      })
      .expect(httpStatus.CREATED);

    const response = await request(app)
      .get('/api/todoItems')
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(1);
  });

  test('should return 404 if todoItem does not exist', async () => {
    await request(app)
      .put('/api/todoItems/ffffffffffffffffffffffff')
      .send({
        description: 'test2',
        isCompleted: false,
      })
      .expect(httpStatus.NOT_FOUND);
  });

  test('should return 404 if provided id is not an objectId', async () => {
    await request(app)
      .put('/api/todoItems/some-non-existing-id')
      .send({
        description: 'test2',
        isCompleted: false,
      })
      .expect(httpStatus.NOT_FOUND);
  });

  test('should be able to update a todoItem', async () => {
    const response = await request(app)
      .get('/api/todoItems')
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(1);
    const id = response.body[0].id;
    expect(response.body[0].description).toEqual('test');

    await request(app)
      .put(`/api/todoItems/${id}`)
      .send({
        description: 'test2',
        isCompleted: false,
      })
      .expect(httpStatus.OK);

    const updatedResponse = await request(app)
      .get(`/api/todoItems/${id}`)
      .expect(httpStatus.OK);
    expect(updatedResponse.body.description).toEqual('test2');
  });

  test('should be able to delete a todoItem', async () => {
    const response = await request(app)
      .get('/api/todoItems')
      .expect(httpStatus.OK);
    expect(response.body).toHaveLength(1);
    const id = response.body[0].id;

    await request(app)
      .delete(`/api/todoItems/${id}`)
      .expect(httpStatus.NO_CONTENT);

    const updatedResponse = await request(app)
      .get('/api/todoItems')
      .expect(httpStatus.OK);
    expect(updatedResponse.body).toHaveLength(0);
  });

  test('should return 404 when tried to delete a non-existing todoItem', async () => {
    await request(app)
      .delete('/api/todoItems/some-non-existing-bad-id')
      .expect(httpStatus.NOT_FOUND);
  });
});
