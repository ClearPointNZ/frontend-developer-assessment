import { render, fireEvent, waitFor } from '@testing-library/react'
import TodoItemList from './TodoItemList'
import axios from 'axios'

afterEach(() => {
  jest.clearAllMocks()
})

let items = [
  { id: '63bd040ac11625d13087f859', description: 'Buy Water', isCompleted: true },
  { id: '63bd040ac11625d13087f860', description: 'Buy Food', isCompleted: false },
  { id: '63bd040ac11625d13087f861', description: 'Buy Milk', isCompleted: false },
]

test('renders the TodoItemList', async () => {
  const handleItemCompleted = jest.fn()
  const handleRefresh = jest.fn()

  const { getByText, getByTestId } = render(
    <TodoItemList items={items} onRefresh={handleRefresh} onItemCompleted={handleItemCompleted} />
  )

  items.forEach((item) => {
    expect(getByText(item.description)).toBeInTheDocument()
  })

  items
    .filter((item) => !item.isCompleted)
    .forEach((item) => {
      expect(getByTestId(`mark-as-completed-${item.id}`)).toBeInTheDocument()
    })

  fireEvent.click(getByTestId('refresh-btn'))
  expect(handleRefresh).toHaveBeenCalledTimes(1)

  axios.put.mockResolvedValueOnce({ data: { ...items[1], isCompleted: true } })

  fireEvent.click(getByTestId(`mark-as-completed-${items[1].id}`))
  expect(axios.put).toHaveBeenCalledTimes(1)

  await waitFor(() => {
    expect(handleItemCompleted).toHaveBeenCalledTimes(1)
  })
  expect(handleItemCompleted).toHaveBeenCalledWith(items[1].id)
})
