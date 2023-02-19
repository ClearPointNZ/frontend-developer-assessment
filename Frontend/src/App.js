import './App.css';
import { Image, Button, Container, Row, Col, Form, Table, Stack } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

const App = ({ todoListApi }) => {
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    // todo
  }, []);

  const renderAddTodoItemContent = () => {
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
              placeholder="Enter description..."
              value={description}
              onChange={handleDescriptionChange}
            />
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
  };

  const renderTodoItemsContent = () => {
    return (
      <>
        <h1>
          Showing {items.length} Item(s){' '}
          <Button variant="primary" className="pull-right" onClick={() => getItems()}>
            Refresh
          </Button>
        </h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                    Mark as completed
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

  const handleDescriptionChange = (event) => {
    // todo
  };

  async function getItems() {
    try {
      alert('todo');
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAdd() {
    try {
      alert('todo');
    } catch (error) {
      console.error(error);
    }
  }

  function handleClear() {
    setDescription('');
  }

  async function handleMarkAsComplete(item) {
    try {
      alert('todo');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Image src="clearPointLogo.png" fluid rounded />
          </Col>
        </Row>
        <Row>
          <Col>
            <Instructions />
          </Col>
        </Row>
        <Row>
          <Col>{renderAddTodoItemContent()}</Col>
        </Row>
        <br />
        <Row>
          <Col>{renderTodoItemsContent()}</Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
