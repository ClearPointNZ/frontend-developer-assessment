import { Button, Table } from 'react-bootstrap'
import { markAsCompleted } from '../api/todo.api'

const TodoItemList = ({ items, loadingError, onItemCompleted, onRefresh }) => {
  const handleMarkAsComplete = async (item) => {
    try {
      await markAsCompleted(item.id)
      onItemCompleted(item.id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1>
        Showing {items.length} Item(s){' '}
        <Button data-testid="refresh-btn" variant="primary" className="pull-right" onClick={onRefresh}>
          Refresh
        </Button>
      </h1>

      {loadingError && <p className="text-danger">{loadingError}</p>}
      {!loadingError && (
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
                  {item.isCompleted && <span className="badge bg-success">Completed</span>}
                  {!item.isCompleted && (
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
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default TodoItemList
