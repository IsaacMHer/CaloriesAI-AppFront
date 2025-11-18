import apiService from './api.service';
import {API_ENDPOINTS} from '@/config/api';
import {
  DailySummaryDto,
  ChartDataDto,
  ChartPeriod,
  NutritionalGoalDto,
  UpdateGoalRequest,
} from '@/types/stats.types';
import {ApiResponse} from '@/types/api.types';

/**
 * Servicio de Estadísticas
 */
class StatsService {
  /**
   * Obtener resumen diario
   */
  async getDailySummary(date?: Date): Promise<ApiResponse<DailySummaryDto>> {
    const dateParam = date ? date.toISOString() : new Date().toISOString();
    return await apiService.get<ApiResponse<DailySummaryDto>>(
      `${API_ENDPOINTS.STATS.DAILY}?date=${dateParam}`,
    );
  }

  /**
   * Obtener resumen semanal
   */
  async getWeeklySummary(
    startDate?: Date,
  ): Promise<ApiResponse<DailySummaryDto[]>> {
    const dateParam = startDate
      ? startDate.toISOString()
      : new Date().toISOString();
    return await apiService.get<ApiResponse<DailySummaryDto[]>>(
      `${API_ENDPOINTS.STATS.WEEKLY}?startDate=${dateParam}`,
    );
  }

  /**
   * Obtener resumen mensual
   */
  async getMonthlySummary(
    month: number,
    year: number,
  ): Promise<ApiResponse<DailySummaryDto[]>> {
    return await apiService.get<ApiResponse<DailySummaryDto[]>>(
      `${API_ENDPOINTS.STATS.MONTHLY}?month=${month}&year=${year}`,
    );
  }

  /**
   * Obtener datos para gráficas
   */
  async getChartData(period: ChartPeriod = '7days'): Promise<ApiResponse<ChartDataDto>> {
    return await apiService.get<ApiResponse<ChartDataDto>>(
      `${API_ENDPOINTS.STATS.CHARTS}?period=${period}`,
    );
  }
}

/**
 * Servicio de Metas Nutricionales
 */
class GoalsService {
  /**
   * Obtener meta del usuario
   */
  async getGoal(): Promise<ApiResponse<NutritionalGoalDto>> {
    return await apiService.get<ApiResponse<NutritionalGoalDto>>(
      API_ENDPOINTS.GOALS.GET,
    );
  }

  /**
   * Actualizar meta del usuario
   */
  async updateGoal(
    data: UpdateGoalRequest,
  ): Promise<ApiResponse<NutritionalGoalDto>> {
    return await apiService.put<ApiResponse<NutritionalGoalDto>>(
      API_ENDPOINTS.GOALS.UPDATE,
      data,
    );
  }

  /**
   * Obtener meta sugerida (calculada automáticamente)
   */
  async getSuggestedGoal(): Promise<ApiResponse<NutritionalGoalDto>> {
    return await apiService.post<ApiResponse<NutritionalGoalDto>>(
      API_ENDPOINTS.GOALS.GET_SUGGESTED,
    );
  }
}

export const statsService = new StatsService();
export const goalsService = new GoalsService();
