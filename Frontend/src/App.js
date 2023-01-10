import './App.css'
import { Container, Row, Col } from 'react-bootstrap'
import React, { useCallback, useEffect, useState } from 'react'
import { fetchTodoItems } from './api/todo.api'
import Header from './components/Header'
import Footer from './components/Footer'
import TodoItemList from './components/TodoItemList'
import AddTodoItem from './components/AddTodoItem'

const App = () => {
  const [items, setItems] = useState([])
  const [loadingError, setLoadingError] = useState(null)

  const fetchItems = useCallback(async () => {
    try {
      const items = await fetchTodoItems()
      setItems(items)
    } catch (error) {
      console.error(error)
      setLoadingError(`Failed to load todo items: ${error.message}`)
    }
  }, [setItems])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleItemCompleted = (itemId) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, isCompleted: true }
      }
      return item
    })
    setItems(updatedItems)
  }

  const handleItemAdded = (item) => {
    setItems([...items, item])
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
            <TodoItemList
              loadingError={loadingError}
              items={items}
              onRefresh={fetchItems}
              onItemCompleted={handleItemCompleted}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}

export default App
