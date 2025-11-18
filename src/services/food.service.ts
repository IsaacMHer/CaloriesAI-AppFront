import apiService from './api.service';
import {API_ENDPOINTS} from '@/config/api';
import {
  FoodDto,
  CreateCustomFoodRequest,
} from '@/types/food.types';
import {ApiResponse} from '@/types/api.types';

/**
 * Servicio de Alimentos
 */
class FoodService {
  /**
   * Buscar alimentos
   */
  async searchFoods(
    query: string,
    limit: number = 20,
  ): Promise<ApiResponse<FoodDto[]>> {
    return await apiService.get<ApiResponse<FoodDto[]>>(
      `${API_ENDPOINTS.FOODS.SEARCH}?query=${encodeURIComponent(
        query,
      )}&limit=${limit}`,
    );
  }

  /**
   * Obtener alimento por ID
   */
  async getFoodById(id: number): Promise<ApiResponse<FoodDto>> {
    return await apiService.get<ApiResponse<FoodDto>>(
      API_ENDPOINTS.FOODS.GET_BY_ID(id),
    );
  }

  /**
   * Crear alimento personalizado
   */
  async createCustomFood(
    data: CreateCustomFoodRequest,
  ): Promise<ApiResponse<FoodDto>> {
    return await apiService.post<ApiResponse<FoodDto>>(
      API_ENDPOINTS.FOODS.CREATE_CUSTOM,
      data,
    );
  }

  /**
   * Actualizar alimento personalizado
   */
  async updateCustomFood(
    id: number,
    data: CreateCustomFoodRequest,
  ): Promise<ApiResponse<FoodDto>> {
    return await apiService.put<ApiResponse<FoodDto>>(
      API_ENDPOINTS.FOODS.UPDATE_CUSTOM(id),
      data,
    );
  }

  /**
   * Eliminar alimento personalizado
   */
  async deleteCustomFood(id: number): Promise<ApiResponse<any>> {
    return await apiService.delete<ApiResponse<any>>(
      API_ENDPOINTS.FOODS.DELETE_CUSTOM(id),
    );
  }

  /**
   * Obtener categorías de alimentos
   */
  async getCategories(): Promise<ApiResponse<string[]>> {
    return await apiService.get<ApiResponse<string[]>>(
      API_ENDPOINTS.FOODS.GET_CATEGORIES,
    );
  }
}

export default new FoodService();
