import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import AddTodoItem from './components/AddTodoItem'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoItemList from './components/TodoItemList'

const App = () => {
  const [needsFresh, setNeedsFresh] = useState(true)
  const handleItemAdded = () => {
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
