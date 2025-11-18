import {ActivityLevel, Gender} from './api.types';

/**
 * Perfil de usuario
 */
export interface UserProfileDto {
  id: number;
  email: string;
  name: string;
  weight: number | null;
  height: number | null;
  age: number | null;
  gender: Gender;
  activityLevel: ActivityLevel;
  hasGeminiApiKey: boolean;
  createdAt: string;
}

/**
 * Request para registro
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * Request para login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Respuesta de login/registro
 */
export interface LoginResponse {
  token: string;
  expiresAt: string;
  user: UserProfileDto;
}

/**
 * Request para actualizar perfil
 */
export interface UpdateProfileRequest {
  name: string;
  weight?: number | null;
  height?: number | null;
  age?: number | null;
  gender?: Gender;
  activityLevel?: ActivityLevel;
}

/**
 * Request para actualizar API Key de Gemini
 */
export interface UpdateGeminiKeyRequest {
  geminiApiKey: string;
}

/**
 * Datos de onboarding
 */
export interface OnboardingData {
  // Paso 1: Datos personales
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  // Paso 2: Nivel de actividad
  activityLevel: ActivityLevel;
  // Paso 3: Objetivo
  goalType: number;
  // Paso 4: API Key (opcional)
  geminiApiKey?: string;
  // Paso 5: Metas (si no es automático)
  customGoals?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  autoCalculate?: boolean;
}
