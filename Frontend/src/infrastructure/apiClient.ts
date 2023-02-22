import axios, { AxiosError } from 'axios';

// Centralised API client, allowing for better maintainability and centralised actions, such as logging
const apiClient = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_BASE,
});

// Custom error handler for API client
const errorHandler = (error: AxiosError) => {
  const statusCode = error.response?.status;

  // TODO: Tie in an error logging service that can notify us realtime when errors are happening

  // Logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error);
  }

  return Promise.reject(error);
};

// Registering the error handler on the API client via the interceptors
apiClient.interceptors.response.use(undefined, (error: AxiosError) => {
  return errorHandler(error);
});

export default apiClient;
