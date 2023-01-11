import { useCallback, useEffect, useState } from 'react'
import { Button, Spinner, Table } from 'react-bootstrap'
import { fetchTodoItems } from '../api/todo.api'
import { ITodoItem } from '../interfaces/TodoItem'
import TodoItem from './TodoItem'

interface TodoItemListProps {
  needsFresh: boolean
  onRefreshSucceeded?: () => void
}

const TodoItemList = ({ needsFresh, onRefreshSucceeded }: TodoItemListProps) => {
  const [items, setItems] = useState<ITodoItem[]>([])
  const [loadingError, setLoadingError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchItems = useCallback(async () => {
    try {
      setLoadingError('')
      setIsLoading(true)
      const newItems = await fetchTodoItems()
      setIsLoading(false)
      setItems(newItems)
    } catch (error: any) {
      setIsLoading(false)
      setLoadingError(`Failed to load todo items: ${error.message}`)
    }
  }, [setItems])

  useEffect(() => {
    if (needsFresh) {
      fetchItems().then(() => {
        if (onRefreshSucceeded) {
          onRefreshSucceeded()
        }
      })
    }
  }, [onRefreshSucceeded, needsFresh, fetchItems])

  const onItemCompleted = (itemId: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, isCompleted: true }
      }
      return item
    })
    setItems(updatedItems)
  }

  return (
    <>
      <h1>
        Showing {items.length} Item(s){' '}
        <Button data-testid="refresh-btn" variant="primary" className="pull-right" onClick={fetchItems}>
          Refresh
        </Button>
      </h1>

      {isLoading && (
        <Spinner data-testid="loading-spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {loadingError && <p className="text-danger">{loadingError}</p>}
      {!loadingError && !isLoading && (
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
              <TodoItem key={item.id} item={item} onItemCompleted={onItemCompleted} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default TodoItemList
