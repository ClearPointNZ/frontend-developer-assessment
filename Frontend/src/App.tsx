import './App.css';
import { Image, Container, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import TodoList from './components/TodoList';
import { TodoListApi } from './Globals';
import Instructions from './components/Instructions';
import AddForm from './components/AddForm';
import Footer from './components/Footer';

interface AppProps {
  todoListApi: TodoListApi;
}

const App = ({ todoListApi }: AppProps) => {
  const [todoItems, setTodoItems] = useState([]);

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
          <Col>
            <TodoList todoListApi={todoListApi} todoItems={todoItems} setTodoItems={setTodoItems} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
