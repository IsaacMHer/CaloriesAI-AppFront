import {ActivityLevel, Gender, GoalType} from '@/types/api.types';

/**
 * Calcula el BMR (Tasa Metabólica Basal) usando la fórmula de Mifflin-St Jeor
 * @param weight - Peso en kg
 * @param height - Altura en cm
 * @param age - Edad en años
 * @param gender - Género
 * @returns BMR en calorías
 */
export const calculateBMR = (
  weight: number,
  height: number,
  age: number,
  gender: Gender,
): number => {
  // Fórmula de Mifflin-St Jeor
  // Hombres: BMR = 10 * peso(kg) + 6.25 * altura(cm) - 5 * edad(años) + 5
  // Mujeres: BMR = 10 * peso(kg) + 6.25 * altura(cm) - 5 * edad(años) - 161

  const baseBMR = 10 * weight + 6.25 * height - 5 * age;

  if (gender === Gender.Male) {
    return baseBMR + 5;
  } else if (gender === Gender.Female) {
    return baseBMR - 161;
  } else {
    // Para "Otro", usamos el promedio
    return baseBMR - 78;
  }
};

/**
 * Obtiene el multiplicador de actividad según el nivel
 * @param activityLevel - Nivel de actividad
 * @returns Multiplicador
 */
export const getActivityMultiplier = (activityLevel: ActivityLevel): number => {
  const multipliers = {
    [ActivityLevel.Sedentary]: 1.2, // Poco o ningún ejercicio
    [ActivityLevel.Light]: 1.375, // Ejercicio ligero 1-3 días/semana
    [ActivityLevel.Moderate]: 1.55, // Ejercicio moderado 3-5 días/semana
    [ActivityLevel.Active]: 1.725, // Ejercicio intenso 6-7 días/semana
    [ActivityLevel.VeryActive]: 1.9, // Ejercicio muy intenso diario
  };

  return multipliers[activityLevel];
};

/**
 * Calcula el TDEE (Total Daily Energy Expenditure)
 * @param bmr - BMR calculado
 * @param activityLevel - Nivel de actividad
 * @returns TDEE en calorías
 */
export const calculateTDEE = (
  bmr: number,
  activityLevel: ActivityLevel,
): number => {
  const multiplier = getActivityMultiplier(activityLevel);
  return Math.round(bmr * multiplier);
};

/**
 * Calcula las calorías objetivo según el tipo de meta
 * @param tdee - TDEE calculado
 * @param goalType - Tipo de meta
 * @returns Calorías objetivo
 */
export const calculateGoalCalories = (
  tdee: number,
  goalType: GoalType,
): number => {
  switch (goalType) {
    case GoalType.LoseWeight:
      // Déficit de 500 calorías (aproximadamente 0.5kg por semana)
      return Math.round(tdee - 500);

    case GoalType.MaintainWeight:
      return Math.round(tdee);

    case GoalType.GainWeight:
      // Superávit de 300 calorías (ganancia muscular controlada)
      return Math.round(tdee + 300);

    default:
      return Math.round(tdee);
  }
};

/**
 * Calcula la distribución de macros según las calorías objetivo
 * @param goalCalories - Calorías objetivo
 * @param goalType - Tipo de meta
 * @returns Distribución de proteína, carbohidratos y grasas en gramos
 */
export const calculateMacros = (
  goalCalories: number,
  goalType: GoalType,
): {protein: number; carbs: number; fat: number} => {
  // Porcentajes de macros según el objetivo
  let proteinPercent: number;
  let carbsPercent: number;
  let fatPercent: number;

  switch (goalType) {
    case GoalType.LoseWeight:
      // Alto en proteína para preservar masa muscular
      proteinPercent = 0.35; // 35%
      carbsPercent = 0.35; // 35%
      fatPercent = 0.3; // 30%
      break;

    case GoalType.MaintainWeight:
      // Distribución balanceada
      proteinPercent = 0.3; // 30%
      carbsPercent = 0.4; // 40%
      fatPercent = 0.3; // 30%
      break;

    case GoalType.GainWeight:
      // Más carbohidratos para energía y crecimiento
      proteinPercent = 0.3; // 30%
      carbsPercent = 0.45; // 45%
      fatPercent = 0.25; // 25%
      break;

    default:
      proteinPercent = 0.3;
      carbsPercent = 0.4;
      fatPercent = 0.3;
  }

  // Conversión de calorías a gramos
  // Proteína: 4 kcal/g
  // Carbohidratos: 4 kcal/g
  // Grasas: 9 kcal/g

  const protein = Math.round((goalCalories * proteinPercent) / 4);
  const carbs = Math.round((goalCalories * carbsPercent) / 4);
  const fat = Math.round((goalCalories * fatPercent) / 9);

  return {protein, carbs, fat};
};

/**
 * Calcula el porcentaje de progreso
 * @param current - Valor actual
 * @param goal - Valor objetivo
 * @returns Porcentaje (0-100+)
 */
export const calculateProgress = (current: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.round((current / goal) * 100);
};

/**
 * Obtiene el color de progreso según el porcentaje
 * @param percentage - Porcentaje de progreso
 * @returns Color hexadecimal
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage < 30) {
    return '#F44336'; // Rojo
  } else if (percentage < 70) {
    return '#FF9800'; // Naranja
  } else if (percentage <= 100) {
    return '#4CAF50'; // Verde
  } else {
    return '#9C27B0'; // Morado (sobre el objetivo)
  }
};

/**
 * Calcula calorías totales de un alimento según cantidad
 * @param baseCalories - Calorías base (por porción)
 * @param quantity - Cantidad
 * @param baseQuantity - Cantidad base (por defecto: 1)
 * @returns Calorías totales
 */
export const calculateFoodCalories = (
  baseCalories: number,
  quantity: number,
  baseQuantity: number = 1,
): number => {
  return Math.round((baseCalories / baseQuantity) * quantity);
};

/**
 * Calcula macros de un alimento según cantidad
 * @param baseMacros - Macros base {protein, carbs, fat}
 * @param quantity - Cantidad
 * @param baseQuantity - Cantidad base (por defecto: 1)
 * @returns Macros calculados
 */
export const calculateFoodMacros = (
  baseMacros: {protein: number; carbs: number; fat: number},
  quantity: number,
  baseQuantity: number = 1,
): {protein: number; carbs: number; fat: number} => {
  const ratio = quantity / baseQuantity;

  return {
    protein: Math.round(baseMacros.protein * ratio * 10) / 10,
    carbs: Math.round(baseMacros.carbs * ratio * 10) / 10,
    fat: Math.round(baseMacros.fat * ratio * 10) / 10,
  };
};

/**
 * Calcula el IMC (Índice de Masa Corporal)
 * @param weight - Peso en kg
 * @param height - Altura en cm
 * @returns IMC
 */
export const calculateBMI = (weight: number, height: number): number => {
  const heightInMeters = height / 100;
  return Math.round((weight / (heightInMeters * heightInMeters)) * 10) / 10;
};

/**
 * Obtiene la categoría de IMC
 * @param bmi - IMC calculado
 * @returns Categoría
 */
export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Bajo peso';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Sobrepeso';
  return 'Obesidad';
};
