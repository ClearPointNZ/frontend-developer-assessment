import { Alert, Button, Table } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

const TodoList = ({ todoListApi, todoItems, setTodoItems }) => {
  const [todoItemsError, setTodoItemsError] = useState('');

  useEffect(() => {
    refreshTodoItems();
  }, []);

  // Reusable function for refreshing the todoItems
  const refreshTodoItems = () => {
    todoListApi
      .getAll()
      .then((todoItems) => {
        setTodoItems(todoItems);
        setTodoItemsError('');
      })
      .catch((error) => {
        setTodoItemsError(
          `Could not fetch todo items due to a server error: ${
            error.response?.data ? error.response.data : error.message
          }`
        );
      });
  };

  async function handleMarkAsComplete(todoListItem) {
    try {
      // Update the item on the server
      const updatedItem = await todoListApi.update({ ...todoListItem, complete: true });

      // Update local representation
      try {
        updateTodoItem(updatedItem);
      } catch (error) {
        setTodoItemsError(
          `The todo item was successfully marked as completed, but the local table could not be properly updated. Please hit refresh.`
        );
      }
    } catch (error) {
      setTodoItemsError(error.response.data);
    }
  }

  const updateTodoItem = (todoItem) => {
    const index = todoItems.findIndex((item) => {
      return item.id === todoItem.id;
    });

    let toUpdateTodoItems = [...todoItems];
    toUpdateTodoItems[index] = todoItem;

    setTodoItems(toUpdateTodoItems);
  };

  return (
    <>
      <h1>
        Showing {todoItems.length} Item(s){' '}
        <Button variant="primary" className="pull-right" onClick={() => refreshTodoItems()}>
          Refresh
        </Button>
      </h1>

      {todoItemsError && <Alert variant="danger">{todoItemsError}</Alert>}

      {!todoItemsError && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoItems.map((item) => (
              <tr key={item.id} className={`banner ${item.complete ? 'text-decoration-line-through' : ''}`}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  {!item.complete && (
                    <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                      Mark as completed
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default TodoList;
