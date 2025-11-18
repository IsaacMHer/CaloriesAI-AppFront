import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

/**
 * Configuración de Redux Persist
 * Persiste el estado de Redux en AsyncStorage
 */

// Configuración para auth slice
export const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user', 'token', 'isAuthenticated'], // Solo persistir estos campos
  blacklist: ['isLoading', 'error'], // No persistir loading y errors
  stateReconciler: autoMergeLevel2,
};

// Configuración para meals slice
export const mealsPersistConfig = {
  key: 'meals',
  storage: AsyncStorage,
  whitelist: ['meals'], // Persistir meals
  blacklist: ['currentMeal', 'isLoading', 'isAnalyzing', 'error'],
  stateReconciler: autoMergeLevel2,
};

// Configuración para stats slice
export const statsPersistConfig = {
  key: 'stats',
  storage: AsyncStorage,
  whitelist: ['dailySummary', 'goal'], // Persistir resumen y metas
  blacklist: ['weeklySummary', 'chartData', 'isLoading', 'error'],
  stateReconciler: autoMergeLevel2,
};

/**
 * Configuración para offline queue
 */
export const offlineQueuePersistConfig = {
  key: 'offlineQueue',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
