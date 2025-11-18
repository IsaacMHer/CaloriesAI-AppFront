import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import NetInfo from '@react-native-community/netinfo';
import mealService from '@/services/meal.service';
import {statsService, goalsService} from '@/services/stats.service';
import authService from '@/services/auth.service';
import {CreateMealRequest} from '@/types/meal.types';
import {UpdateGoalRequest} from '@/types/stats.types';
import {UpdateProfileRequest} from '@/types/user.types';

/**
 * Tipos de operaciones offline
 */
export enum OfflineActionType {
  CREATE_MEAL = 'CREATE_MEAL',
  DELETE_MEAL = 'DELETE_MEAL',
  UPDATE_GOAL = 'UPDATE_GOAL',
  UPDATE_PROFILE = 'UPDATE_PROFILE',
}

/**
 * Item de la queue offline
 */
export interface OfflineQueueItem {
  id: string;
  type: OfflineActionType;
  data: any;
  timestamp: number;
  retries: number;
  maxRetries: number;
  error?: string;
}

/**
 * Estado de offline queue
 */
interface OfflineQueueState {
  queue: OfflineQueueItem[];
  isSyncing: boolean;
  isConnected: boolean;
  lastSyncTime: number | null;
}

const initialState: OfflineQueueState = {
  queue: [],
  isSyncing: false,
  isConnected: true,
  lastSyncTime: null,
};

/**
 * Thunk para sincronizar la queue offline
 */
export const syncOfflineQueue = createAsyncThunk(
  'offlineQueue/sync',
  async (_, {getState, dispatch, rejectWithValue}) => {
    const state: any = getState();
    const queue = state.offlineQueue.queue;

    if (queue.length === 0) {
      return [];
    }

    const results = [];
    const failedItems = [];

    for (const item of queue) {
      try {
        // Ejecutar la operación según el tipo
        switch (item.type) {
          case OfflineActionType.CREATE_MEAL:
            await mealService.createMeal(item.data as CreateMealRequest);
            break;

          case OfflineActionType.DELETE_MEAL:
            await mealService.deleteMeal(item.data.id);
            break;

          case OfflineActionType.UPDATE_GOAL:
            await goalsService.updateGoal(item.data as UpdateGoalRequest);
            break;

          case OfflineActionType.UPDATE_PROFILE:
            await authService.updateProfile(item.data as UpdateProfileRequest);
            break;

          default:
            console.warn('Unknown offline action type:', item.type);
        }

        results.push(item.id);
      } catch (error: any) {
        console.error('Error syncing offline item:', error);

        // Si ha excedido los reintentos, marcar como fallido
        if (item.retries >= item.maxRetries) {
          failedItems.push({
            ...item,
            error: error.message,
          });
        } else {
          // Incrementar contador de reintentos
          failedItems.push({
            ...item,
            retries: item.retries + 1,
            error: error.message,
          });
        }
      }
    }

    return {syncedIds: results, failedItems};
  },
);

/**
 * Slice de offline queue
 */
const offlineQueueSlice = createSlice({
  name: 'offlineQueue',
  initialState,
  reducers: {
    /**
     * Agregar item a la queue
     */
    addToQueue: (state, action: PayloadAction<Omit<OfflineQueueItem, 'id' | 'timestamp' | 'retries'>>) => {
      const item: OfflineQueueItem = {
        ...action.payload,
        id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        retries: 0,
      };
      state.queue.push(item);
    },

    /**
     * Remover item de la queue
     */
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter(item => item.id !== action.payload);
    },

    /**
     * Limpiar queue completa
     */
    clearQueue: state => {
      state.queue = [];
    },

    /**
     * Actualizar estado de conexión
     */
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    /**
     * Limpiar items fallidos
     */
    clearFailedItems: state => {
      state.queue = state.queue.filter(item => !item.error || item.retries < item.maxRetries);
    },
  },
  extraReducers: builder => {
    // Sync offline queue
    builder
      .addCase(syncOfflineQueue.pending, state => {
        state.isSyncing = true;
      })
      .addCase(syncOfflineQueue.fulfilled, (state, action) => {
        state.isSyncing = false;
        state.lastSyncTime = Date.now();

        // Remover items sincronizados exitosamente
        state.queue = state.queue.filter(
          item => !action.payload.syncedIds.includes(item.id),
        );

        // Actualizar items fallidos con nuevos reintentos
        action.payload.failedItems.forEach(failedItem => {
          const index = state.queue.findIndex(item => item.id === failedItem.id);
          if (index !== -1) {
            state.queue[index] = failedItem;
          }
        });
      })
      .addCase(syncOfflineQueue.rejected, state => {
        state.isSyncing = false;
      });
  },
});

export const {
  addToQueue,
  removeFromQueue,
  clearQueue,
  setConnectionStatus,
  clearFailedItems,
} = offlineQueueSlice.actions;

export default offlineQueueSlice.reducer;
