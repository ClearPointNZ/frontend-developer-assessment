import { useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import { addNewTodoItem } from '../api/todo.api'
import { ITodoItem } from '../interfaces/TodoItem'

interface AddTodoItemProps {
  onItemAdded: (item: ITodoItem) => void
}

const AddTodoItem = ({ onItemAdded }: AddTodoItemProps) => {
  const [description, setDescription] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const handleClear = () => {
    setDescription('')
    setErrorMessage('')
  }

  const handleAdd = async () => {
    if (!description) {
      setErrorMessage('Description is required')
      return
    }
    try {
      const newItem = await addNewTodoItem(description)
      onItemAdded(newItem)
    } catch (error: any) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Container>
      <h1>Add Item</h1>
      <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
        <Form.Label column sm="2">
          Description
        </Form.Label>
        <Col md="6">
          <Stack direction="horizontal" gap={2}>
            <Form.Control
              data-testid="description"
              type="text"
              className={`${errorMessage ? 'is-invalid' : ''}`}
              placeholder="Enter description..."
              value={description}
              onChange={handleDescriptionChange}
            />
            {errorMessage && <Form.Label className="text-danger">{errorMessage}</Form.Label>}
          </Stack>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
        <Stack direction="horizontal" gap={2}>
          <Button data-testid="add-item-btn" variant="primary" onClick={() => handleAdd()}>
            Add Item
          </Button>
          <Button variant="secondary" data-testid="clear-btn" onClick={() => handleClear()}>
            Clear
          </Button>
        </Stack>
      </Form.Group>
    </Container>
  )
}

export default AddTodoItem
