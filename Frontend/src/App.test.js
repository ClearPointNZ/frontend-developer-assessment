import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import App from './App'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'

afterEach(() => {
  jest.clearAllMocks()
})

const itemId = '63bd040ac11625d13087f860'

const renderWithMockedAxios = async () => {
  axios.get.mockResolvedValueOnce({
    data: [{ id: itemId, description: 'Buy Food', isCompleted: false }],
  })

  const { getByText, getByTestId } = render(<App />)
  const footerElement = getByText(/clearpoint.digital/i)
  expect(footerElement).toBeInTheDocument()

  const descriptionInput = getByTestId('description')
  const addItemButton = getByTestId('add-item-btn')

  expect(descriptionInput).toBeInTheDocument()
  expect(addItemButton).toBeInTheDocument()

  expect(axios.get).toHaveBeenCalledTimes(1)
  await waitFor(() => {
    expect(getByText('Buy Food')).toBeInTheDocument()
  })
}

test('renders the App', async () => {
  await renderWithMockedAxios()
})

test('mark an item as completed', async () => {
  await renderWithMockedAxios()

  axios.put.mockResolvedValueOnce({
    data: { id: itemId, description: 'Buy Food', isCompleted: true },
  })

  const markAsCompletedButton = screen.getByTestId(`mark-as-completed-${itemId}`)
  fireEvent.click(markAsCompletedButton)

  await waitFor(() => {
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })
})

test('try to add a todo item with empty description', async () => {
  await renderWithMockedAxios()

  const addItemButton = screen.getByTestId('add-item-btn')
  fireEvent.click(addItemButton)

  expect(axios.post).toHaveBeenCalledTimes(0)
  expect(screen.getByText('Description is required')).toBeInTheDocument()
})

test('try to add a todo item with description that already exists', async () => {
  await renderWithMockedAxios()

  axios.post.mockRejectedValueOnce({
    response: { data: 'Description already exists' },
  })

  const descriptionInput = screen.getByTestId('description')
  const addItemButton = screen.getByTestId('add-item-btn')

  fireEvent.change(descriptionInput, { target: { value: 'Buy Food' } })
  fireEvent.click(addItemButton)

  expect(axios.post).toHaveBeenCalledTimes(1)

  await waitFor(() => {
    expect(screen.getByText('Description already exists')).toBeInTheDocument()
  })
})

test('add a new todo item', async () => {
  await renderWithMockedAxios()

  axios.post.mockResolvedValueOnce({
    data: { id: 2, description: 'Buy Milk', isCompleted: false },
  })

  const descriptionInput = screen.getByTestId('description')
  const addItemButton = screen.getByTestId('add-item-btn')

  fireEvent.change(descriptionInput, { target: { value: 'Buy Milk' } })
  fireEvent.click(addItemButton)

  expect(axios.post).toHaveBeenCalledTimes(1)

  await waitFor(() => {
    expect(screen.getByText('Buy Milk')).toBeInTheDocument()
  })
})
