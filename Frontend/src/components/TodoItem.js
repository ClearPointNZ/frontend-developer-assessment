import { Button, Spinner } from 'react-bootstrap'
import { markAsCompleted } from '../api/todo.api'
import React, { useState } from 'react'

const TodoItem = ({ item, onItemCompleted }) => {
  const [isMarkingAsCompleted, setIsMarkingAsCompleted] = useState(false)
  const [markAsCompletedError, setMarkAsCompletedError] = useState(null)

  const handleMarkAsComplete = async (item) => {
    try {
      setIsMarkingAsCompleted(true)
      await markAsCompleted(item.id)
      setIsMarkingAsCompleted(false)
      onItemCompleted(item.id)
    } catch (error) {
      setIsMarkingAsCompleted(false)
      setMarkAsCompletedError(`Failed to mark item as completed: ${error.message}`)

      // show the error message for 3 seconds, than hide it and let user to try again
      setTimeout(() => {
        setMarkAsCompletedError(null)
      }, 3000)
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
