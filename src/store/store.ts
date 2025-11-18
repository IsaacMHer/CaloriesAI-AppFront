import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import authReducer from './slices/authSlice';
import mealReducer from './slices/mealSlice';
import statsReducer from './slices/statsSlice';
import offlineQueueReducer from './slices/offlineQueueSlice';
import {
  authPersistConfig,
  mealsPersistConfig,
  statsPersistConfig,
  offlineQueuePersistConfig,
} from './persistConfig';

/**
 * Reducers con Redux Persist
 */
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedMealsReducer = persistReducer(mealsPersistConfig, mealReducer);
const persistedStatsReducer = persistReducer(statsPersistConfig, statsReducer);
const persistedOfflineQueueReducer = persistReducer(offlineQueuePersistConfig, offlineQueueReducer);

/**
 * Redux Store con Redux Persist
 */
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    meals: persistedMealsReducer,
    stats: persistedStatsReducer,
    offlineQueue: persistedOfflineQueueReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar acciones de redux-persist
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'meals/analyzeImage/fulfilled',
        ],
      },
    }),
});

/**
 * Persistor para Redux Persist
 */
export const persistor = persistStore(store);

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados para usar en componentes
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
