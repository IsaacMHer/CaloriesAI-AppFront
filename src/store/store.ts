import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import authReducer from './slices/authSlice';
import mealReducer from './slices/mealSlice';
import statsReducer from './slices/statsSlice';

/**
 * Redux Store
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealReducer,
    stats: statsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar estas rutas de acción para verificación serializable
        ignoredActions: ['meals/analyzeImage/fulfilled'],
      },
    }),
});

// Tipos para TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks tipados para usar en componentes
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
