/**
 * Tipos base de respuestas API
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  errors: string[] | null;
}

/**
 * Tipos de enumeraciones
 */
export enum ActivityLevel {
  Sedentary = 0,
  Light = 1,
  Moderate = 2,
  Active = 3,
  VeryActive = 4,
}

export enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}

export enum GoalType {
  LoseWeight = 0,
  MaintainWeight = 1,
  GainWeight = 2,
}

export enum MealType {
  Breakfast = 0,
  Lunch = 1,
  Dinner = 2,
  Snack = 3,
}

export enum FoodSource {
  Internal = 0,
  Custom = 1,
  External = 2,
}

/**
 * Mapeos para UI
 */
export const ActivityLevelLabels: Record<ActivityLevel, string> = {
  [ActivityLevel.Sedentary]: 'Sedentario (poco o ningún ejercicio)',
  [ActivityLevel.Light]: 'Ligero (ejercicio 1-3 días/semana)',
  [ActivityLevel.Moderate]: 'Moderado (ejercicio 3-5 días/semana)',
  [ActivityLevel.Active]: 'Activo (ejercicio 6-7 días/semana)',
  [ActivityLevel.VeryActive]: 'Muy activo (ejercicio intenso diario)',
};

export const GenderLabels: Record<Gender, string> = {
  [Gender.Male]: 'Masculino',
  [Gender.Female]: 'Femenino',
  [Gender.Other]: 'Otro',
};

export const GoalTypeLabels: Record<GoalType, string> = {
  [GoalType.LoseWeight]: 'Perder peso',
  [GoalType.MaintainWeight]: 'Mantener peso',
  [GoalType.GainWeight]: 'Ganar peso',
};

export const MealTypeLabels: Record<MealType, string> = {
  [MealType.Breakfast]: 'Desayuno',
  [MealType.Lunch]: 'Almuerzo',
  [MealType.Dinner]: 'Cena',
  [MealType.Snack]: 'Snack',
};

export const MealTypeColors: Record<MealType, string> = {
  [MealType.Breakfast]: '#FFB300',
  [MealType.Lunch]: '#4CAF50',
  [MealType.Dinner]: '#FF6F00',
  [MealType.Snack]: '#9C27B0',
};
