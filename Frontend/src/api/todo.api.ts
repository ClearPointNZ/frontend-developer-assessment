import axios from 'axios'

const baseUrl = 'http://localhost:7000'

type Request = () => Promise<any>

const requestWithErrorHandling = async (request: Request) => {
  try {
    const response = await request()
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data)
    } else {
      throw new Error(error.message)
    }
  }
}

export const fetchTodoItems = async () => requestWithErrorHandling(() => axios.get(`${baseUrl}/api/todoItems`))

export const markAsCompleted = async (id: string) =>
  requestWithErrorHandling(() => axios.put(`${baseUrl}/api/todoItems/${id}`, { isCompleted: true }))

export const addNewTodoItem = async (description: string) =>
  requestWithErrorHandling(() => axios.post(`${baseUrl}/api/todoItems`, { description }))
