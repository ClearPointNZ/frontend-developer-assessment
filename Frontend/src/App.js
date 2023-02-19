import './App.css';
import { Image, Button, Container, Row, Col, Table } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import AddForm from './components/AddForm';
import Instructions from './components/Instructions';
import Footer from './components/Footer';

const App = ({ todoListApi }) => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    // todo
  }, []);

  const renderTodoItemsContent = () => {
    return (
      <>
        <h1>
          Showing {todoItems.length} Item(s){' '}
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
            {todoItems.map((item) => (
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

  async function getItems() {
    try {
      alert('todo');
    } catch (error) {
      console.error(error);
    }
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
          <Col>
            <AddForm todoListApi={todoListApi} todoItems={todoItems} setTodoItems={setTodoItems} />
          </Col>
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
