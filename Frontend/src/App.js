import './App.css'
import { Container, Row, Col } from 'react-bootstrap'
import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import TodoItemList from './components/TodoItemList'
import AddTodoItem from './components/AddTodoItem'

const App = () => {
  const [needsFresh, setNeedsFresh] = useState(true)
  const handleItemAdded = (item) => {
    setNeedsFresh(true)
  }

  return (
    <div className="App">
      <Header />
      <Container>
        <Row>
          <Col>
            <AddTodoItem onItemAdded={handleItemAdded} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <TodoItemList needsFresh={needsFresh} onRefreshSucceeded={() => setNeedsFresh(false)} />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
