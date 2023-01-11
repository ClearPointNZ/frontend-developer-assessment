import { fireEvent, render, waitFor } from '@testing-library/react'
import axios from 'axios'
import TodoItem from './TodoItem'

afterEach(() => {
  jest.clearAllMocks()
})

const item = { id: '63bd040ac11625d13087f860', description: 'Buy Food', isCompleted: false }
const initRender = () => {
  const onItemCompleted = jest.fn()

  const tableBody = document.createElement('tbody')

  const { getByTestId, queryByTestId, getByText, queryByText } = render(
    <TodoItem item={item} onItemCompleted={onItemCompleted} />,
    {
      container: document.body.appendChild(tableBody),
    }
  )

  const descriptionElement = getByText('Buy Food')
  expect(descriptionElement).toBeInTheDocument()

  const markAsCompletedButton = getByTestId(`mark-as-completed-${item.id}`)
  expect(markAsCompletedButton).toBeInTheDocument()

  return {
    onItemCompleted,
    markAsCompletedButton,
    queryByTestId,
    queryByText,
  }
}

test('renders the TodoItem', async () => {
  initRender()
})

test('try to mark item as completed without network', async () => {
  const { onItemCompleted, markAsCompletedButton, queryByText } = initRender()
  ;(axios.put as jest.Mock).mockRejectedValueOnce(new Error('Network Error'))
  fireEvent.click(markAsCompletedButton)

  await waitFor(() => {
    expect(queryByText('Failed to mark item as completed: Network Error')).toBeInTheDocument()
  })
  expect(onItemCompleted).toBeCalledTimes(0)

  // Error message should disappear after 3 seconds
  await waitFor(
    () => {
      expect(queryByText('Failed to mark item as completed: Network Error')).not.toBeInTheDocument()
    },
    { timeout: 3000 }
  )
}, 4000)

test('mark an item as completed', async () => {
  const { onItemCompleted, markAsCompletedButton, queryByTestId } = initRender()

  ;(axios.put as jest.Mock).mockResolvedValueOnce({
    data: { ...item, isCompleted: true },
  })

  fireEvent.click(markAsCompletedButton)

  expect(axios.put).toHaveBeenCalledTimes(1)
  expect(queryByTestId(`item-mark-spinner-${item.id}`)).toBeInTheDocument()

  await waitFor(() => {
    expect(onItemCompleted).toHaveBeenCalledTimes(1)
  })
  expect(queryByTestId(`item-mark-spinner-${item.id}`)).not.toBeInTheDocument()
})
