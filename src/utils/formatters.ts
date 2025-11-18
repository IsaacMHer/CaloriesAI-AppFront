import {format, parseISO, isToday, isYesterday} from 'date-fns';
import {es} from 'date-fns/locale';

/**
 * Formatea una fecha a formato legible
 * @param date - Fecha en string ISO o Date
 * @param formatString - Formato deseado (por defecto: 'dd/MM/yyyy')
 */
export const formatDate = (
  date: string | Date,
  formatString: string = 'dd/MM/yyyy',
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatString, {locale: es});
  } catch (error) {
    return '';
  }
};

/**
 * Formatea una fecha a formato legible con hora
 * @param date - Fecha en string ISO o Date
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

/**
 * Formatea una fecha a formato relativo (Hoy, Ayer, etc.)
 * @param date - Fecha en string ISO o Date
 */
export const formatRelativeDate = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;

    if (isToday(dateObj)) {
      return 'Hoy';
    }

    if (isYesterday(dateObj)) {
      return 'Ayer';
    }

    return formatDate(dateObj, 'dd/MM/yyyy');
  } catch (error) {
    return '';
  }
};

/**
 * Formatea un número a formato con separador de miles
 * @param value - Número a formatear
 * @param decimals - Número de decimales (por defecto: 0)
 */
export const formatNumber = (value: number, decimals: number = 0): string => {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formatea calorías
 * @param calories - Calorías
 */
export const formatCalories = (calories: number): string => {
  return `${formatNumber(calories)} kcal`;
};

/**
 * Formatea macros (proteína, carbohidratos, grasas)
 * @param grams - Gramos
 */
export const formatMacros = (grams: number): string => {
  return `${formatNumber(grams, 1)}g`;
};

/**
 * Formatea porcentaje
 * @param value - Valor decimal (0-1) o porcentaje (0-100)
 * @param isDecimal - Si el valor es decimal (por defecto: true)
 */
export const formatPercentage = (
  value: number,
  isDecimal: boolean = true,
): string => {
  const percentage = isDecimal ? value * 100 : value;
  return `${formatNumber(percentage, 1)}%`;
};

/**
 * Formatea peso
 * @param kg - Peso en kilogramos
 */
export const formatWeight = (kg: number): string => {
  return `${formatNumber(kg, 1)} kg`;
};

/**
 * Formatea altura
 * @param cm - Altura en centímetros
 */
export const formatHeight = (cm: number): string => {
  return `${formatNumber(cm)} cm`;
};

/**
 * Trunca un texto con puntos suspensivos
 * @param text - Texto a truncar
 * @param maxLength - Longitud máxima
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Formatea un nombre de usuario (primera letra mayúscula)
 * @param name - Nombre del usuario
 */
export const formatName = (name: string): string => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Obtiene las iniciales de un nombre
 * @param name - Nombre completo
 */
export const getInitials = (name: string): string => {
  const words = name.trim().split(' ');
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (
    words[0].charAt(0).toUpperCase() +
    words[words.length - 1].charAt(0).toUpperCase()
  );
};

/**
 * Formatea un saludo según la hora del día
 * @param name - Nombre del usuario (opcional)
 */
export const getGreeting = (name?: string): string => {
  const hour = new Date().getHours();
  let greeting = '';

  if (hour >= 0 && hour < 12) {
    greeting = 'Buenos días';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Buenas tardes';
  } else {
    greeting = 'Buenas noches';
  }

  return name ? `${greeting}, ${name}` : greeting;
};
