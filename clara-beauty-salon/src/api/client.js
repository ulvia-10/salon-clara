import axios from 'axios'

/**
 * Base axios instance untuk Clara Beauty Salon API
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.claraabeautysalon.com/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('clara_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
    console.error('[API Error]', message)
    return Promise.reject(new Error(message))
  }
)

export default apiClient
