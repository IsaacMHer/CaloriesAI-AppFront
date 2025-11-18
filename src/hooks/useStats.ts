import {useAppDispatch, useAppSelector} from '@/store/store';
import {
  fetchDailySummary,
  fetchWeeklySummary,
  fetchChartData,
  fetchGoal,
  updateGoal as updateGoalAction,
  fetchSuggestedGoal,
  clearError,
} from '@/store/slices/statsSlice';
import {UpdateGoalRequest, ChartPeriod} from '@/types/stats.types';

/**
 * Hook personalizado para estadísticas y metas
 * Provee funciones y estado de estadísticas
 */
export const useStats = () => {
  const dispatch = useAppDispatch();
  const {dailySummary, weeklySummary, chartData, goal, isLoading, error} =
    useAppSelector(state => state.stats);

  /**
   * Obtener resumen diario
   */
  const getDailySummary = async (date?: Date) => {
    return await dispatch(fetchDailySummary(date)).unwrap();
  };

  /**
   * Obtener resumen semanal
   */
  const getWeeklySummary = async (startDate?: Date) => {
    return await dispatch(fetchWeeklySummary(startDate)).unwrap();
  };

  /**
   * Obtener datos para gráficas
   */
  const getChartData = async (period: ChartPeriod = '7days') => {
    return await dispatch(fetchChartData(period)).unwrap();
  };

  /**
   * Obtener meta nutricional
   */
  const getGoal = async () => {
    return await dispatch(fetchGoal()).unwrap();
  };

  /**
   * Actualizar meta nutricional
   */
  const updateGoal = async (data: UpdateGoalRequest) => {
    return await dispatch(updateGoalAction(data)).unwrap();
  };

  /**
   * Obtener meta sugerida (calculada automáticamente)
   */
  const getSuggestedGoal = async () => {
    return await dispatch(fetchSuggestedGoal()).unwrap();
  };

  /**
   * Refrescar resumen de hoy
   */
  const refreshTodaySummary = async () => {
    return await getDailySummary(new Date());
  };

  /**
   * Limpiar error
   */
  const clearStatsError = () => {
    dispatch(clearError());
  };

  return {
    dailySummary,
    weeklySummary,
    chartData,
    goal,
    isLoading,
    error,
    getDailySummary,
    getWeeklySummary,
    getChartData,
    getGoal,
    updateGoal,
    getSuggestedGoal,
    refreshTodaySummary,
    clearStatsError,
  };
};
