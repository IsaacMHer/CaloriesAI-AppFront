import {FoodSource} from './api.types';

/**
 * Alimento (Food)
 */
export interface FoodDto {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  category: string | null;
  isCustom: boolean;
  source: FoodSource;
  externalId: string | null;
}

/**
 * Request para crear alimento personalizado
 */
export interface CreateCustomFoodRequest {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
  category?: string | null;
}

/**
 * Alimento detectado por IA
 */
export interface DetectedFoodDto {
  name: string;
  estimatedQuantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

/**
 * Respuesta de análisis de imagen
 */
export interface AnalyzeImageResponse {
  photoUrl: string;
  detectedFoods: DetectedFoodDto[];
}

/**
 * Alimento con cantidad editable (UI)
 */
export interface EditableFood extends DetectedFoodDto {
  id: string; // ID temporal para manejo en UI
  isEditing?: boolean;
}
