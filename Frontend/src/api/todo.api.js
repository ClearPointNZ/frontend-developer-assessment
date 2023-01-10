import axios from 'axios'

const baseUrl = 'http://localhost:7000'

const requestWithErrorHandling = async (request) => {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error(error.message)
    }
  }
}

export const fetchTodoItems = async () => requestWithErrorHandling(() => axios.get(`${baseUrl}/api/todoItems`))

export const markAsCompleted = async (id) =>
  requestWithErrorHandling(() => axios.put(`${baseUrl}/api/todoItems/${id}`, { isCompleted: true }))

export const addNewTodoItem = async (description) =>
  requestWithErrorHandling(() => axios.post(`${baseUrl}/api/todoItems`, { description }))
