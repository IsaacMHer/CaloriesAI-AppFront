import * as yup from 'yup';
import {Strings} from '@/constants/strings';

/**
 * Schema de validación para Login
 */
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email(Strings.validation.emailInvalid)
    .required(Strings.validation.required),
  password: yup
    .string()
    .min(6, Strings.validation.passwordMin)
    .required(Strings.validation.required),
});

/**
 * Schema de validación para Registro
 */
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, Strings.validation.nameMin)
    .max(100)
    .required(Strings.validation.required),
  email: yup
    .string()
    .email(Strings.validation.emailInvalid)
    .required(Strings.validation.required),
  password: yup
    .string()
    .min(6, Strings.validation.passwordMin)
    .required(Strings.validation.required),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], Strings.validation.passwordsNotMatch)
    .required(Strings.validation.required),
});

/**
 * Schema de validación para Perfil
 */
export const profileSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, Strings.validation.nameMin)
    .max(100)
    .required(Strings.validation.required),
  weight: yup
    .number()
    .min(30, Strings.validation.minValue(30))
    .max(300, Strings.validation.maxValue(300))
    .nullable(),
  height: yup
    .number()
    .min(100, Strings.validation.minValue(100))
    .max(250, Strings.validation.maxValue(250))
    .nullable(),
  age: yup
    .number()
    .min(10, Strings.validation.minValue(10))
    .max(120, Strings.validation.maxValue(120))
    .nullable(),
});

/**
 * Schema de validación para Onboarding Step 1
 */
export const onboardingStep1Schema = yup.object().shape({
  weight: yup
    .number()
    .min(30, Strings.validation.minValue(30))
    .max(300, Strings.validation.maxValue(300))
    .required(Strings.validation.required),
  height: yup
    .number()
    .min(100, Strings.validation.minValue(100))
    .max(250, Strings.validation.maxValue(250))
    .required(Strings.validation.required),
  age: yup
    .number()
    .min(10, Strings.validation.minValue(10))
    .max(120, Strings.validation.maxValue(120))
    .required(Strings.validation.required),
});

/**
 * Schema de validación para Alimento Personalizado
 */
export const customFoodSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(200)
    .required(Strings.validation.required),
  calories: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(10000, Strings.validation.maxValue(10000))
    .required(Strings.validation.required),
  protein: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(1000, Strings.validation.maxValue(1000))
    .required(Strings.validation.required),
  carbs: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(2000, Strings.validation.maxValue(2000))
    .required(Strings.validation.required),
  fat: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(500, Strings.validation.maxValue(500))
    .required(Strings.validation.required),
  servingSize: yup
    .string()
    .min(1)
    .max(50)
    .required(Strings.validation.required),
  category: yup.string().max(100).nullable(),
});

/**
 * Schema de validación para Metas
 */
export const goalsSchema = yup.object().shape({
  dailyCalories: yup
    .number()
    .min(800, Strings.validation.minValue(800))
    .max(10000, Strings.validation.maxValue(10000))
    .required(Strings.validation.required),
  dailyProtein: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(1000, Strings.validation.maxValue(1000))
    .required(Strings.validation.required),
  dailyCarbs: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(2000, Strings.validation.maxValue(2000))
    .required(Strings.validation.required),
  dailyFat: yup
    .number()
    .min(0, Strings.validation.minValue(0))
    .max(500, Strings.validation.maxValue(500))
    .required(Strings.validation.required),
});
