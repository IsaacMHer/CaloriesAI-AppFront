import {AxiosError} from 'axios';
import {ApiResponse} from '@/types/api.types';
import {Strings} from '@/constants/strings';

/**
 * Maneja errores de API y retorna un mensaje legible
 * @param error - Error de Axios
 * @returns Mensaje de error
 */
export const handleApiError = (error: any): string => {
  // Si es un error de Axios
  if (error.response) {
    // El servidor respondió con un código de error
    const data = error.response.data as ApiResponse<any>;

    // Si el backend envió un mensaje de error
    if (data?.message) {
      return data.message;
    }

    // Si hay errores de validación
    if (data?.errors && data.errors.length > 0) {
      return data.errors.join('\n');
    }

    // Errores por código de estado
    switch (error.response.status) {
      case 400:
        return 'Solicitud inválida. Verifica los datos enviados.';
      case 401:
        return 'No autorizado. Por favor inicia sesión nuevamente.';
      case 403:
        return 'No tienes permisos para realizar esta acción.';
      case 404:
        return 'Recurso no encontrado.';
      case 409:
        return 'Conflicto. El recurso ya existe.';
      case 422:
        return 'Datos de entrada inválidos.';
      case 429:
        return 'Demasiadas solicitudes. Intenta nuevamente más tarde.';
      case 500:
        return Strings.common.serverError;
      case 503:
        return 'Servicio no disponible. Intenta más tarde.';
      default:
        return `Error del servidor (${error.response.status})`;
    }
  } else if (error.request) {
    // La solicitud se hizo pero no hubo respuesta
    return Strings.common.noInternet;
  } else {
    // Algo pasó al configurar la solicitud
    return error.message || Strings.common.unexpectedError;
  }
};

/**
 * Verifica si un error es de red (sin conexión)
 * @param error - Error
 * @returns true si es error de red
 */
export const isNetworkError = (error: any): boolean => {
  return (
    error.message === 'Network Error' ||
    error.message === 'Network request failed' ||
    !error.response
  );
};

/**
 * Verifica si un error es de autenticación (401)
 * @param error - Error
 * @returns true si es error de autenticación
 */
export const isAuthError = (error: any): boolean => {
  return error.response?.status === 401;
};

/**
 * Verifica si un error es de validación (422)
 * @param error - Error
 * @returns true si es error de validación
 */
export const isValidationError = (error: any): boolean => {
  return error.response?.status === 422 || error.response?.status === 400;
};

/**
 * Extrae los errores de validación del backend
 * @param error - Error de Axios
 * @returns Objeto con errores por campo
 */
export const extractValidationErrors = (
  error: any,
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (error.response?.data?.errors) {
    const apiErrors = error.response.data.errors;

    if (Array.isArray(apiErrors)) {
      // Si es un array de strings
      apiErrors.forEach((err: string, index: number) => {
        errors[`error${index}`] = err;
      });
    } else if (typeof apiErrors === 'object') {
      // Si es un objeto con errores por campo
      Object.keys(apiErrors).forEach(key => {
        const fieldErrors = apiErrors[key];
        if (Array.isArray(fieldErrors)) {
          errors[key] = fieldErrors.join(', ');
        } else {
          errors[key] = fieldErrors;
        }
      });
    }
  }

  return errors;
};

/**
 * Registra un error en consola (desarrollo) o servicio de logging (producción)
 * @param error - Error
 * @param context - Contexto del error
 */
export const logError = (error: any, context?: string): void => {
  if (__DEV__) {
    console.error(`[ERROR${context ? ` - ${context}` : ''}]:`, error);
  } else {
    // TODO: Enviar a servicio de logging (ej: Sentry)
    // Sentry.captureException(error);
  }
};

/**
 * Clase de error personalizada para errores de API
 */
export class ApiError extends Error {
  statusCode?: number;
  errors?: string[];

  constructor(message: string, statusCode?: number, errors?: string[]) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
