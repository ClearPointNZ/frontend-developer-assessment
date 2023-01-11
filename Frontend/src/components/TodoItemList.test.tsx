import { fireEvent, render, waitFor } from '@testing-library/react'
import axios from 'axios'
import { ITodoItem } from '../interfaces/TodoItem'
import TodoItemList from './TodoItemList'

afterEach(() => {
  jest.clearAllMocks()
})

let items: ITodoItem[] = [
  { id: '63bd040ac11625d13087f859', description: 'Buy Water', isCompleted: true },
  { id: '63bd040ac11625d13087f860', description: 'Buy Food', isCompleted: false },
  { id: '63bd040ac11625d13087f861', description: 'Buy Milk', isCompleted: false },
]

test('renders with network error', async () => {
  ;(axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))
  const { getByText, getByTestId } = render(<TodoItemList needsFresh={true} onRefreshSucceeded={jest.fn()} />)

  // it should show the loading indicator
  expect(getByTestId('loading-spinner')).toBeInTheDocument()

  await waitFor(() => {
    expect(getByText('Failed to load todo items: Network Error')).toBeInTheDocument()
  })
})

test('renders the TodoItemList', async () => {
  const onRefreshSucceeded = jest.fn()

  ;(axios.get as jest.Mock).mockResolvedValueOnce({ data: items })

  const { getByText, getByTestId } = render(<TodoItemList needsFresh={true} onRefreshSucceeded={onRefreshSucceeded} />)

  expect(axios.get).toHaveBeenCalledTimes(1)

  await waitFor(() => {
    items.forEach((item) => {
      expect(getByText(item.description)).toBeInTheDocument()
    })
    items
      .filter((item) => !item.isCompleted)
      .forEach((item) => {
        expect(getByTestId(`mark-as-completed-${item.id}`)).toBeInTheDocument()
      })
  })

  // test refresh button
  ;(axios.get as jest.Mock).mockClear()
  ;(axios.get as jest.Mock).mockResolvedValueOnce({
    data: [...items, { id: '63bd040ac11625d13087f862', description: 'Buy books', isCompleted: false }],
  })
  fireEvent.click(getByTestId('refresh-btn'))
  expect(onRefreshSucceeded).toHaveBeenCalledTimes(1)
  await waitFor(() => {
    expect(getByText('Buy books')).toBeInTheDocument()
  })
})
