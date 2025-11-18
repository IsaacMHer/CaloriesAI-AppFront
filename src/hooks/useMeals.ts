import {useAppDispatch, useAppSelector} from '@/store/store';
import {
  fetchMealsByDate,
  createMeal as createMealAction,
  deleteMeal as deleteMealAction,
  analyzeImage as analyzeImageAction,
  fetchMealById,
  clearError,
  clearCurrentMeal,
} from '@/store/slices/mealSlice';
import {CreateMealRequest} from '@/types/meal.types';

/**
 * Hook personalizado para comidas
 * Provee funciones y estado de comidas
 */
export const useMeals = () => {
  const dispatch = useAppDispatch();
  const {meals, currentMeal, isLoading, isAnalyzing, error} = useAppSelector(
    state => state.meals,
  );

  /**
   * Obtener comidas de una fecha
   */
  const getMealsByDate = async (date?: Date) => {
    return await dispatch(fetchMealsByDate(date)).unwrap();
  };

  /**
   * Crear comida
   */
  const createMeal = async (data: CreateMealRequest) => {
    return await dispatch(createMealAction(data)).unwrap();
  };

  /**
   * Eliminar comida
   */
  const deleteMeal = async (id: number) => {
    return await dispatch(deleteMealAction(id)).unwrap();
  };

  /**
   * Analizar imagen con IA
   */
  const analyzeImage = async (imageUri: string) => {
    return await dispatch(analyzeImageAction(imageUri)).unwrap();
  };

  /**
   * Obtener comida por ID
   */
  const getMealById = async (id: number) => {
    return await dispatch(fetchMealById(id)).unwrap();
  };

  /**
   * Refrescar comidas del día actual
   */
  const refreshTodayMeals = async () => {
    return await getMealsByDate(new Date());
  };

  /**
   * Limpiar error
   */
  const clearMealsError = () => {
    dispatch(clearError());
  };

  /**
   * Limpiar comida actual
   */
  const clearCurrent = () => {
    dispatch(clearCurrentMeal());
  };

  return {
    meals,
    currentMeal,
    isLoading,
    isAnalyzing,
    error,
    getMealsByDate,
    createMeal,
    deleteMeal,
    analyzeImage,
    getMealById,
    refreshTodayMeals,
    clearMealsError,
    clearCurrent,
  };
};
