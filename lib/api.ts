// Import centralized axios instances
import apiCall from '../url';
import apiCallFileUpload from '../url/filepath';

const API_BASE_URL = 'https://api.efengineering-architect.com/api';

interface Job {
  id: string | number;
  title: string;
  type: string;
  deadline: string;
  description: string;
  [key: string]: any;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}

class ApiService {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Handle different response formats
    if (Array.isArray(data)) {
      return { data: data as T };
    }
    if (data.data !== undefined) {
      return data;
    }
    return { data: data as T };
  }

  // Vacancy/Job endpoints - using centralized axios instance
  // Note: /jobs endpoint is confirmed working, /vacancies returns 404
  async getJobs(): Promise<ApiResponse<Job[]>> {
    try {
      // Try /jobs first since it's confirmed working
      const response = await apiCall.get<any>('/jobs');
      const data = response.data;
      return { data: Array.isArray(data) ? data : data?.data || [] };
    } catch (err) {
      // Fallback to /vacancies if /jobs fails
      try {
        const response = await apiCall.get<any>('/vacancies');
        const data = response.data;
        return { data: Array.isArray(data) ? data : data?.data || [] };
      } catch (fallbackErr) {
        throw err; // Throw original error
      }
    }
  }

  async getJobById(id: string | number): Promise<ApiResponse<Job>> {
    try {
      // Try /jobs first since it's confirmed working
      const response = await apiCall.get<any>(`/jobs/${id}`);
      const data = response.data;
      return { data: data?.data || data };
    } catch (err) {
      // Fallback to /vacancies if /jobs fails
      try {
        const response = await apiCall.get<any>(`/vacancies/${id}`);
        const data = response.data;
        return { data: data?.data || data };
      } catch (fallbackErr) {
        throw err; // Throw original error
      }
    }
  }

  async submitJobApplication(formData: FormData, jobId?: string | number): Promise<ApiResponse<any>> {
    // Optimized: Try the confirmed working endpoint first, then fallbacks
    // Prioritize /applicants as it's confirmed working from old Vacan code
    const priorityEndpoints = [
      '/applicants',  // ✅ CONFIRMED: This endpoint exists and accepts POST
    ];
    
    // Fallback endpoints (only try if priority fails)
    const fallbackEndpoints = [
      '/vacancies/apply',
      '/jobs/apply',
      '/applications',
    ];
    
    // If jobId is provided, try endpoints with job ID first
    const endpointsWithId = jobId ? [
      `/vacancies/${jobId}/apply`,
      `/jobs/${jobId}/apply`,
    ] : [];
    
    // Optimized order: priority endpoints first, then ID-based, then fallbacks
    const endpoints = [...priorityEndpoints, ...endpointsWithId, ...fallbackEndpoints];

    let lastError: Error | null = null;
    let lastResponse: any = null;
    let networkError = false;
    const attemptedEndpoints: string[] = [];
    const failedEndpoints: Array<{ endpoint: string; status: number; error: string }> = [];

    for (const endpoint of endpoints) {
      try {
        // Reduced logging for better performance (only log in dev mode)
        if (process.env.NODE_ENV === 'development') {
          console.log(`Trying endpoint: ${this.baseURL}${endpoint}`);
        }
        attemptedEndpoints.push(`${this.baseURL}${endpoint}`);

        // Use axios instance for file uploads (handles multipart/form-data correctly)
        let response: any;
        try {
          // Optimized: Only log in development mode
          if (process.env.NODE_ENV === 'development') {
            console.log(`Making POST request to: ${endpoint}`);
          }
          
          // Add request interceptor for better error handling
          response = await apiCallFileUpload.post<any>(endpoint, formData, {
            headers: {
              // Ensure no Content-Type is set - axios will set it automatically with boundary
            },
            // Ensure credentials are not sent (helps with CORS)
            withCredentials: false,
          } as any); // Type assertion needed for axios config
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`Response received:`, {
              status: response?.status,
              statusText: response?.statusText
            });
          }
        } catch (axiosError: any) {
          // Axios error structure:
          // - axiosError.response: HTTP response with error status (server responded)
          // - axiosError.request: Request object (no response received - network error)
          // - axiosError.message: Error message
          
          // Only log errors in development mode
          if (process.env.NODE_ENV === 'development') {
            console.error(`Axios error for ${endpoint}:`, {
              message: axiosError?.message,
              code: axiosError?.code,
              status: axiosError?.response?.status
            });
          }
          
          // Check if it's a network error (no response received)
          if (!axiosError.response && axiosError.request) {
            // Network error: CORS, connection refused, timeout, etc.
            if (process.env.NODE_ENV === 'development') {
              console.error(`Network error detected for ${endpoint}:`, axiosError.message);
            }
            networkError = true;
            const errorMsg = axiosError?.message || axiosError?.code || 'Network error';
            
            // Check for specific network error types
            if (errorMsg.includes('Network Error') || 
                errorMsg.includes('ERR_NETWORK') ||
                errorMsg.includes('timeout') ||
                errorMsg.includes('ECONNREFUSED')) {
              throw new Error(`Network error: Unable to connect to the server. ${errorMsg}`);
            } else if (errorMsg.includes('CORS') || errorMsg.includes('cross-origin')) {
              throw new Error(`CORS error: The server is blocking cross-origin requests. Please configure CORS on the backend.`);
            } else {
              throw new Error(`Network error: ${errorMsg}. This might be a CORS issue or the endpoint doesn't exist.`);
            }
          }
          
          // HTTP error response (server responded with error status)
          const errorResponse = axiosError.response;
          const errorStatus = errorResponse?.status;
          const errorData = errorResponse?.data;
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`HTTP error response:`, {
              status: errorStatus,
              data: typeof errorData === 'string' ? errorData.substring(0, 200) : errorData
            });
          }
          
          // Re-throw as HTTP error to be handled below
          // Always add to failedEndpoints for tracking
          failedEndpoints.push({
            endpoint: `${this.baseURL}${endpoint}`,
            status: errorStatus || 0,
            error: typeof errorData === 'string' ? errorData.substring(0, 200) : JSON.stringify(errorData || 'Unknown error')
          });
          
          throw {
            isHttpError: true,
            status: errorStatus,
            data: errorData,
            message: axiosError?.message || `HTTP ${errorStatus}`
          };
        }

        lastResponse = response;

        // Axios automatically parses JSON responses
        const responseData = (response as any).data;
        const status = (response as any).status;

        // Check if response indicates success (201 Created or 200 OK)
        // Old Vacan code expects 201 status
        if (status === 201 || status === 200) {
          // Success - return the response data
          return {
            data: responseData || { success: true, message: 'Application submitted successfully' }
          };
        }
        
        // If status is not success, treat as error
        if (status >= 400) {
          // Extract error message from response
          let errorMessage = `API Error: ${status}`;
          if (responseData) {
            if (typeof responseData === 'string') {
              errorMessage = responseData;
            } else if (typeof responseData === 'object') {
              errorMessage = (responseData as any).message || (responseData as any).error || errorMessage;
            }
          }
          
          // Check if it's a 404 or 405 to try next endpoint
          const isNotFound = status === 404 || errorMessage.includes('Not Found') || errorMessage.includes('404');
          const isMethodNotAllowed = status === 405 || errorMessage.includes('Method Not Allowed') || errorMessage.includes('405');
          
          if (isNotFound || isMethodNotAllowed) {
            const statusText = isMethodNotAllowed ? 'Method Not Allowed (405)' : 'Not Found (404)';
            if (process.env.NODE_ENV === 'development') {
              console.log(`Endpoint ${endpoint} returned ${status} (${statusText}), trying next...`);
            }
            failedEndpoints.push({
              endpoint: `${this.baseURL}${endpoint}`,
              status: status,
              error: errorMessage
            });
            if (endpoint !== endpoints[endpoints.length - 1]) {
              continue;
            }
          }
          
          throw new Error(errorMessage);
        }

        // Handle error responses
        let errorMessage = `API Error: ${status}`;
        let isMethodNotAllowed = false;
        let isNotFound = false;

        // Try to extract error message from response
        if (responseData) {
          if (typeof responseData === 'string') {
            // Check for HTML error responses
            if (responseData.includes('MethodNotAllowedHttpException') || 
                responseData.includes('not supported for route') ||
                responseData.includes('Supported methods:')) {
              isMethodNotAllowed = true;
              const match = responseData.match(/MethodNotAllowedHttpException[^:]*:\s*([^<]+)/i) ||
                           responseData.match(/not supported for route[^<]+/i);
              if (match && match[1]) {
                errorMessage = match[1].trim();
              } else {
                errorMessage = `POST method not supported for this endpoint`;
              }
            } else if (responseData.includes('NotFound') || responseData.includes('404')) {
              isNotFound = true;
              errorMessage = `Endpoint not found`;
            } else {
              errorMessage = responseData;
            }
          } else if (typeof responseData === 'object') {
            errorMessage = (responseData as any).message || (responseData as any).error || (responseData as any).data?.message || errorMessage;
          }
        }

        // Check if it's a method not allowed or not found error
        isMethodNotAllowed = isMethodNotAllowed || 
                             status === 405 || 
                             errorMessage.includes('MethodNotAllowed') || 
                             errorMessage.includes('not supported for route') ||
                             errorMessage.includes('Supported methods:');
        
        isNotFound = isNotFound || 
                     status === 404 || 
                     errorMessage.includes('Not Found') ||
                     errorMessage.includes('404');
        
        // If it's a 404 (Not Found) or 405 (Method Not Allowed), try next endpoint
        if (isNotFound || isMethodNotAllowed) {
          const statusText = isMethodNotAllowed ? 'Method Not Allowed (405)' : 'Not Found (404)';
          if (process.env.NODE_ENV === 'development') {
            console.log(`Endpoint ${endpoint} returned ${status} (${statusText}), trying next...`);
          }
          failedEndpoints.push({
            endpoint: `${this.baseURL}${endpoint}`,
            status: status,
            error: errorMessage
          });
          if (endpoint !== endpoints[endpoints.length - 1]) {
            continue;
          }
        }
        
        // For other errors, throw immediately
        throw new Error(errorMessage);
      } catch (err: any) {
        // Handle HTTP errors from axios
        if (err.isHttpError) {
          const errorStatus = err.status;
          const errorData = err.data;
          let errorMessage = `API Error: ${errorStatus}`;
          let isMethodNotAllowed = false;
          let isNotFound = false;

          // Extract error message
          if (errorData) {
            if (typeof errorData === 'string') {
              if (errorData.includes('MethodNotAllowedHttpException') || 
                  errorData.includes('not supported for route') ||
                  errorData.includes('Supported methods:')) {
                isMethodNotAllowed = true;
                const match = errorData.match(/MethodNotAllowedHttpException[^:]*:\s*([^<]+)/i) ||
                             errorData.match(/not supported for route[^<]+/i);
                if (match && match[1]) {
                  errorMessage = match[1].trim();
                } else {
                  errorMessage = `POST method not supported for this endpoint`;
                }
              } else if (errorData.includes('NotFound') || errorData.includes('404')) {
                isNotFound = true;
                errorMessage = `Endpoint not found`;
              } else {
                errorMessage = errorData;
              }
            } else if (typeof errorData === 'object') {
              errorMessage = errorData?.message || errorData?.error || errorData?.data?.message || errorMessage;
            }
          }

          isMethodNotAllowed = isMethodNotAllowed || errorStatus === 405;
          isNotFound = isNotFound || errorStatus === 404;

          if (isNotFound || isMethodNotAllowed) {
            const statusText = isMethodNotAllowed ? 'Method Not Allowed (405)' : 'Not Found (404)';
            console.log(`Endpoint ${endpoint} returned ${errorStatus} (${statusText}), trying next...`);
            failedEndpoints.push({
              endpoint: `${this.baseURL}${endpoint}`,
              status: errorStatus,
              error: errorMessage
            });
            if (endpoint !== endpoints[endpoints.length - 1]) {
              continue;
            }
          }
          
          lastError = new Error(errorMessage);
        } else {
          lastError = err as Error;
        }
        
        // If it's a network error (CORS, connection refused), don't try other endpoints
        if (networkError || 
            err?.message?.includes('Network error') || 
            err?.message?.includes('Unable to connect') ||
            err?.message?.includes('CORS error')) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Network error detected, stopping endpoint attempts');
          }
          throw err; // Re-throw network errors immediately
        }
        
        // Continue to next endpoint if this one fails
        if (endpoint !== endpoints[endpoints.length - 1]) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`Endpoint ${endpoint} failed, trying next...`);
          }
          continue;
        }
      }
    }

    // If all endpoints failed, throw the last error with helpful message
    const errorMsg = lastError?.message || 'Failed to submit application: All endpoints failed';
    
    // Build a detailed error message with all attempted endpoints
    let detailedError = `All ${attemptedEndpoints.length} endpoints failed:\n\n`;
    
    if (failedEndpoints.length > 0) {
      detailedError += 'Failed endpoints:\n';
      failedEndpoints.slice(0, 10).forEach((failed, index) => {
        detailedError += `${index + 1}. ${failed.endpoint} - Status: ${failed.status}\n`;
      });
      if (failedEndpoints.length > 10) {
        detailedError += `... and ${failedEndpoints.length - 10} more\n`;
      }
    }
    
    detailedError += `\nAttempted endpoints:\n${attemptedEndpoints.map((ep, i) => `${i + 1}. ${ep}`).join('\n')}`;
    detailedError += `\n\nPossible solutions:\n`;
    detailedError += `1. Check with your backend team for the correct endpoint\n`;
    detailedError += `2. Verify the endpoint accepts POST requests with FormData\n`;
    detailedError += `3. Ensure CORS is properly configured on the server\n`;
    detailedError += `4. Check if the endpoint requires authentication\n`;
    detailedError += `5. Verify the API base URL: ${this.baseURL}`;
    
    // Provide more helpful error message
    if (errorMsg.includes('Failed to fetch') || errorMsg.includes('Network error')) {
      throw new Error(`Unable to connect to the API server.\n\n${detailedError}`);
    }
    
    throw new Error(`${errorMsg}\n\n${detailedError}`);
  }

  // Testimonials endpoints - using centralized axios instance
  async getTestimonials(): Promise<ApiResponse<any[]>> {
    try {
      const response = await apiCall.get<any>('/testimonials');
      const data = response.data;
      return { data: Array.isArray(data) ? data : data?.data || [] };
    } catch (err) {
      // Fallback to request method if axios fails
      return this.request<any[]>('/testimonials');
    }
  }
}

const apiService = new ApiService();
export default apiService;

