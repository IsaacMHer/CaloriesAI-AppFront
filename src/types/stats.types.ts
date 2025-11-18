import {GoalType} from './api.types';

/**
 * Resumen diario
 */
export interface DailySummaryDto {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  goalCalories: number;
  goalProtein: number;
  goalCarbs: number;
  goalFat: number;
  caloriesProgress: number;
  proteinProgress: number;
  carbsProgress: number;
  fatProgress: number;
  remainingCalories: number;
}

/**
 * Meta nutricional
 */
export interface NutritionalGoalDto {
  id: number;
  userId: number;
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  goalType: GoalType;
  createdAt: string;
  updatedAt: string;
}

/**
 * Request para actualizar meta
 */
export interface UpdateGoalRequest {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  goalType: GoalType;
}

/**
 * Punto de datos diario para gráficas
 */
export interface DailyDataPoint {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  goalCalories: number;
}

/**
 * Distribución de macros
 */
export interface MacrosDistributionDto {
  proteinPercentage: number;
  carbsPercentage: number;
  fatPercentage: number;
  totalProteinGrams: number;
  totalCarbsGrams: number;
  totalFatGrams: number;
}

/**
 * Datos para gráficas
 */
export interface ChartDataDto {
  dailyCalories: DailyDataPoint[];
  macrosDistribution: MacrosDistributionDto;
}

/**
 * Periodo de gráficas
 */
export type ChartPeriod = '7days' | '30days' | 'custom';
