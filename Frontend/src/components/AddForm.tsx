import { Alert, Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import React, { useState } from 'react';
import { TodoListApi, TodoListItem } from '../Globals';

export interface AddFormProps {
  todoListApi: TodoListApi;
  todoItems: TodoListItem[];
  setTodoItems: React.Dispatch<React.SetStateAction<any>>;
}

export default function AddForm({ todoListApi, todoItems, setTodoItems }: AddFormProps) {
  const [description, setDescription] = useState('');
  const [addDescriptionError, setAddDescriptionError] = useState('');

  async function handleAdd() {
    try {
      if (description.length < 5) {
        setAddDescriptionError('Please describe your TODO with a minimum of 5 characters');
        return;
      }

      setAddDescriptionError('');

      // Create via the API
      const response = await todoListApi.create({
        description: description,
        complete: false,
      });

      setDescription('');

      // Also add to the local representation
      try {
        appendTodoItem(response);
      } catch (error) {
        setAddDescriptionError(
          `The todo item was successfully added, but the local table could not be properly updated. Please hit refresh.`
        );
      }
    } catch (error: any) {
      setAddDescriptionError(
        `Could not add the todo item due to a server error: ${
          error.response?.data ? error.response.data : error.message
        }`
      );
    }
  }

  const appendTodoItem = (todoItem: TodoListItem) => {
    const updatedTodoItems = [...todoItems, todoItem];

    setTodoItems(updatedTodoItems);
  };

  function handleClear() {
    setDescription('');
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <Container>
      <h1>Add Item</h1>
      <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col md="6">
          <Form.Control
            type="text"
            placeholder="Describe your TODO with a minimum of 5 characters"
            value={description}
            onChange={handleDescriptionChange}
          />
          {addDescriptionError && (
            <Alert className="mt-3" variant="danger">
              {addDescriptionError}
            </Alert>
          )}
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
        <Stack direction="horizontal" gap={2}>
          <Button variant="primary" onClick={() => handleAdd()}>
            Add Item
          </Button>
          <Button variant="secondary" onClick={() => handleClear()}>
            Clear
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  );
}
