import apiService from './api.service';
import {API_ENDPOINTS} from '@/config/api';
import {MealDto, CreateMealRequest} from '@/types/meal.types';
import {AnalyzeImageResponse} from '@/types/food.types';
import {ApiResponse} from '@/types/api.types';
import {Platform} from 'react-native';

/**
 * Servicio de Comidas
 */
class MealService {
  /**
   * Analizar imagen con IA
   */
  async analyzeImage(imageUri: string): Promise<ApiResponse<AnalyzeImageResponse>> {
    const formData = new FormData();

    // Preparar el archivo para FormData
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('image', {
      uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,
      type: type,
      name: filename,
    } as any);

    return await apiService.postFormData<ApiResponse<AnalyzeImageResponse>>(
      API_ENDPOINTS.MEALS.ANALYZE_IMAGE,
      formData,
    );
  }

  /**
   * Crear comida
   */
  async createMeal(data: CreateMealRequest): Promise<ApiResponse<MealDto>> {
    return await apiService.post<ApiResponse<MealDto>>(
      API_ENDPOINTS.MEALS.CREATE,
      data,
    );
  }

  /**
   * Obtener comidas por fecha
   */
  async getMealsByDate(date?: Date): Promise<ApiResponse<MealDto[]>> {
    const dateParam = date ? date.toISOString() : new Date().toISOString();
    return await apiService.get<ApiResponse<MealDto[]>>(
      `${API_ENDPOINTS.MEALS.GET_ALL}?date=${dateParam}`,
    );
  }

  /**
   * Obtener comida por ID
   */
  async getMealById(id: number): Promise<ApiResponse<MealDto>> {
    return await apiService.get<ApiResponse<MealDto>>(
      API_ENDPOINTS.MEALS.GET_BY_ID(id),
    );
  }

  /**
   * Actualizar comida
   */
  async updateMeal(
    id: number,
    data: CreateMealRequest,
  ): Promise<ApiResponse<MealDto>> {
    return await apiService.put<ApiResponse<MealDto>>(
      API_ENDPOINTS.MEALS.UPDATE(id),
      data,
    );
  }

  /**
   * Eliminar comida
   */
  async deleteMeal(id: number): Promise<ApiResponse<any>> {
    return await apiService.delete<ApiResponse<any>>(
      API_ENDPOINTS.MEALS.DELETE(id),
    );
  }
}

export default new MealService();
