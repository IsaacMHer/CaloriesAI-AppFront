import {MealType} from './api.types';
import {FoodDto} from './food.types';

/**
 * Item de alimento en una comida
 */
export interface MealFoodDto {
  id: number;
  foodId: number;
  foodName: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  foodDetails: FoodDto;
}

/**
 * Comida completa
 */
export interface MealDto {
  id: number;
  userId: number;
  date: string;
  mealType: MealType;
  photoUrl: string | null;
  notes: string | null;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  createdAt: string;
  foods: MealFoodDto[];
}

/**
 * Request para item de alimento en comida
 */
export interface MealFoodItemRequest {
  foodId: number;
  quantity: number;
  unit: string;
}

/**
 * Request para crear comida
 */
export interface CreateMealRequest {
  date: string;
  mealType: MealType;
  photoUrl?: string | null;
  notes?: string | null;
  foods: MealFoodItemRequest[];
}

/**
 * Comida temporal para crear (UI)
 */
export interface TempMeal {
  date: Date;
  mealType: MealType;
  photoUrl?: string | null;
  notes?: string;
  foods: Array<{
    foodId: number;
    name: string;
    quantity: number;
    unit: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
}
