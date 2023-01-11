import { fireEvent, render, waitFor } from '@testing-library/react'
import axios from 'axios'
import AddTodoItem from './AddTodoItem'

afterEach(() => {
  jest.clearAllMocks()
})

test('renders the AddTodoItem', async () => {
  const handleItemAdded = jest.fn()

  const { getByTestId } = render(<AddTodoItem onItemAdded={handleItemAdded} />)

  const descriptionInput = getByTestId('description')
  const addItemButton = getByTestId('add-item-btn')

  expect(descriptionInput).toBeInTheDocument()
  expect(addItemButton).toBeInTheDocument()

  const updatedItem = { id: '63bd040ac11625d13087f860', description: 'Buy Food', isCompleted: false }
  ;(axios.post as jest.Mock).mockResolvedValueOnce({
    data: updatedItem,
  })

  fireEvent.change(descriptionInput, { target: { value: 'Buy Food' } })
  fireEvent.click(addItemButton)

  expect(axios.post).toHaveBeenCalledTimes(1)
  expect(axios.post).toHaveBeenCalledWith('http://localhost:7000/api/todoItems', { description: 'Buy Food' })

  await waitFor(() => {
    expect(handleItemAdded).toHaveBeenCalledTimes(1)
  })
  expect(handleItemAdded).toHaveBeenCalledWith(updatedItem)
})

test('clear description', async () => {
  const handleItemAdded = jest.fn()
  const { getByTestId } = render(<AddTodoItem onItemAdded={handleItemAdded} />)
  const descriptionInput = getByTestId('description') as HTMLInputElement
  const clearDescriptionButton = getByTestId('clear-btn')

  fireEvent.change(descriptionInput, { target: { value: 'Buy Food' } })
  fireEvent.click(clearDescriptionButton)

  expect(descriptionInput.value).toBe('')
})

test('try to add a todo item with empty description', async () => {
  const handleItemAdded = jest.fn()
  const { getByTestId, getByText } = render(<AddTodoItem onItemAdded={handleItemAdded} />)

  const addItemButton = getByTestId('add-item-btn')
  fireEvent.click(addItemButton)

  expect(axios.post).toHaveBeenCalledTimes(0)
  expect(handleItemAdded).toHaveBeenCalledTimes(0)
  expect(getByText('Description is required')).toBeInTheDocument()
})

test('try to add a todo item with an error', async () => {
  const handleItemAdded = jest.fn()
  const { getByTestId, getByText, queryByText } = render(<AddTodoItem onItemAdded={handleItemAdded} />)

  const descriptionInput = getByTestId('description') as HTMLInputElement
  const addItemButton = getByTestId('add-item-btn')
  ;(axios.post as jest.Mock).mockRejectedValueOnce({
    response: { data: 'Error' },
  })

  fireEvent.change(descriptionInput, { target: { value: 'Buy Food' } })
  fireEvent.click(addItemButton)

  await waitFor(() => {
    expect(getByText('Error')).toBeInTheDocument()
  })

  // Clear description, should remove the error message
  const clearDescriptionButton = getByTestId('clear-btn')
  fireEvent.click(clearDescriptionButton)
  expect(descriptionInput.value).toBe('')
  expect(queryByText('Error')).not.toBeInTheDocument()
})
