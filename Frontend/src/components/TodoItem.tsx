import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { markAsCompleted } from '../api/todo.api'
import { ITodoItem } from '../interfaces/TodoItem'

interface TodoItemProps {
  item: ITodoItem
  onItemCompleted: (itemId: string) => void
}

const TodoItem = ({ item, onItemCompleted }: TodoItemProps) => {
  const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState(false)
  const [markAsCompletedError, setMarkAsCompletedError] = useState('')

  const handleMarkAsComplete = async (item: ITodoItem) => {
    try {
      setIsMarkingAsCompleted(true)
      await markAsCompleted(item.id)
      setIsMarkingAsCompleted(false)
      onItemCompleted(item.id)
    } catch (error: any) {
      setIsMarkingAsCompleted(false)
      setMarkAsCompletedError(`Failed to mark item as completed: ${error.message}`)

      // show the error message for 3 seconds, than hide it and let user to try again
      await new Promise((resolve) => setTimeout(resolve, 3000))
      setMarkAsCompletedError('')
    }
  }

  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.description}</td>
      <td>
        {isMarkingAsCompleted && <Spinner data-testid={`item-mark-spinner-${item.id}`} animation="border" size="sm" />}
        {markAsCompletedError && <span className="badge bg-danger">{markAsCompletedError}</span>}
        {item.isCompleted && <span className="badge bg-success">Completed</span>}
        {!isMarkingAsCompleted && !item.isCompleted && !markAsCompletedError && (
          <Button
            data-testid={`mark-as-completed-${item.id}`}
            variant="warning"
            size="sm"
            onClick={() => handleMarkAsComplete(item)}
          >
            Mark as completed
          </Button>
        )}
      </td>
    </tr>
  )
}

export default TodoItem
