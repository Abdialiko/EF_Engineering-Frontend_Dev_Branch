import axios from 'axios'
const apiCall = axios.create({
    baseURL:'https://api.efengineering-architect.com/api/',
    // baseURL:'http://192.168.0.10:8001/api/',
    // Don't set Content-Type header - axios will set it automatically with boundary for FormData
    // headers: { "Content-Type": "multipart/form-data" }
    timeout: 20000, // 20 seconds timeout (reduced for faster feedback)
    withCredentials: false, // Don't send credentials (helps with CORS)
})

// Add request interceptor for debugging (only in dev mode)
if (process.env.NODE_ENV === 'development') {
  apiCall.interceptors.request.use(
    (config) => {
      console.log('File upload request:', {
        url: config.url,
        method: config.method,
        baseURL: config.baseURL,
        hasData: !!config.data,
        dataType: config.data instanceof FormData ? 'FormData' : typeof config.data
      })
      return config
    },
    (error) => {
      console.error('File upload request error:', error)
      return Promise.reject(error)
    }
  )

  // Add response interceptor for debugging
  apiCall.interceptors.response.use(
    (response) => {
      console.log('File upload response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      })
      return response
    },
    (error) => {
      console.error('File upload response error:', {
        message: error.message,
        code: error.code,
        response: error.response ? {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        } : null,
        request: error.request ? 'Request object exists' : null
      })
      return Promise.reject(error)
    }
  )
}

export default apiCall