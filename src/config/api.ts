import {Platform} from 'react-native';

/**
 * Configuración de API
 * IMPORTANTE: Cambiar la URL de producción antes de deployar
 */
export const API_CONFIG = {
  // Para Android emulator usar 10.0.2.2
  // Para iOS simulator usar localhost
  // Para dispositivos físicos usar la IP de tu computadora
  baseURL: __DEV__
    ? Platform.OS === 'android'
      ? 'http://10.0.2.2:5015/api'
      : 'http://localhost:5015/api'
    : 'https://tu-vps.com/api', // CAMBIAR EN PRODUCCIÓN
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

/**
 * Endpoints de la API
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/Auth/register',
    LOGIN: '/Auth/login',
    PROFILE: '/Auth/profile',
    UPDATE_PROFILE: '/Auth/profile',
    UPDATE_GEMINI_KEY: '/Auth/gemini-key',
  },
  // Foods
  FOODS: {
    SEARCH: '/Foods/search',
    GET_BY_ID: (id: number) => `/Foods/${id}`,
    CREATE_CUSTOM: '/Foods/custom',
    UPDATE_CUSTOM: (id: number) => `/Foods/custom/${id}`,
    DELETE_CUSTOM: (id: number) => `/Foods/custom/${id}`,
    GET_CATEGORIES: '/Foods/categories',
  },
  // Goals
  GOALS: {
    GET: '/Goals',
    UPDATE: '/Goals',
    GET_SUGGESTED: '/Goals/suggested',
  },
  // Meals
  MEALS: {
    ANALYZE_IMAGE: '/Meals/analyze-image',
    CREATE: '/Meals',
    GET_ALL: '/Meals',
    GET_BY_ID: (id: number) => `/Meals/${id}`,
    UPDATE: (id: number) => `/Meals/${id}`,
    DELETE: (id: number) => `/Meals/${id}`,
  },
  // Stats
  STATS: {
    DAILY: '/Stats/daily',
    WEEKLY: '/Stats/weekly',
    MONTHLY: '/Stats/monthly',
    CHARTS: '/Stats/charts',
  },
} as const;
