import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_CONFIG} from '@/config/api';
import {handleApiError, isAuthError, logError} from '@/utils/errorHandler';
import {navigationRef} from '@/navigation/navigationRef';

/**
 * Instancia de Axios configurada
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

/**
 * Interceptor de Request - Agrega el token de autenticación
 */
apiClient.interceptors.request.use(
  async (config: any) => {
    try {
      // Obtener token de AsyncStorage
      const token = await AsyncStorage.getItem('auth_token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log en desarrollo
      if (__DEV__) {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
        );
        if (config.data) {
          console.log('[API Request Data]:', config.data);
        }
      }

      return config;
    } catch (error) {
      logError(error, 'Request Interceptor');
      return Promise.reject(error);
    }
  },
  error => {
    logError(error, 'Request Interceptor Error');
    return Promise.reject(error);
  },
);

/**
 * Interceptor de Response - Maneja errores globales
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log en desarrollo
    if (__DEV__) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
      );
      console.log('[API Response Data]:', response.data);
    }

    return response;
  },
  async error => {
    logError(error, 'Response Interceptor Error');

    // Si es error 401 (No autorizado), limpiar token y redirigir a login
    if (isAuthError(error)) {
      try {
        await AsyncStorage.removeItem('auth_token');
        await AsyncStorage.removeItem('user');

        // Navegar a login usando navigationRef
        if (navigationRef.isReady()) {
          navigationRef.reset({
            index: 0,
            routes: [{name: 'Auth'}],
          });
        }
      } catch (err) {
        logError(err, 'Auth Error Handler');
      }
    }

    return Promise.reject(error);
  },
);

/**
 * Clase de servicio API
 */
class ApiService {
  /**
   * GET Request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.get<T>(url, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * POST Request
   */
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await apiClient.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * PUT Request
   */
  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await apiClient.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * DELETE Request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await apiClient.delete<T>(url, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * PATCH Request
   */
  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await apiClient.patch<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * POST con FormData (para envío de imágenes)
   */
  async postFormData<T>(url: string, formData: FormData): Promise<T> {
    try {
      const response = await apiClient.post<T>(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

export default new ApiService();
export {apiClient};
