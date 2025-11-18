import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

/**
 * Paleta de colores personalizada (tema fitness/salud)
 */
export const Colors = {
  primary: '#4CAF50', // Verde moderno
  accent: '#FF9800', // Naranja para energía
  background: '#FAFAFA', // Gris claro
  surface: '#FFFFFF',
  error: '#F44336',
  success: '#8BC34A',
  warning: '#FFC107',
  info: '#2196F3',

  // Colores de texto
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',

  // Colores de macros
  protein: '#FF6384', // Rojo para proteína
  carbs: '#36A2EB', // Azul para carbohidratos
  fat: '#FFCE56', // Amarillo para grasas

  // Colores de progreso
  progressLow: '#F44336', // Rojo (< 30%)
  progressMedium: '#FF9800', // Naranja (30-70%)
  progressHigh: '#4CAF50', // Verde (70-100%)
  progressOver: '#9C27B0', // Morado (> 100%)

  // Grises
  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',

  // Transparencias
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadowColor: '#000000',
};

/**
 * Tema claro (Light Theme) - React Native Paper
 */
export const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    secondary: Colors.accent,
    tertiary: Colors.info,
    error: Colors.error,
    background: Colors.background,
    surface: Colors.surface,
    surfaceVariant: Colors.grey100,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: Colors.text,
    onSurfaceVariant: Colors.textSecondary,
    outline: Colors.grey300,
  },
};

/**
 * Tema oscuro (Dark Theme) - React Native Paper
 */
export const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.primary,
    secondary: Colors.accent,
    tertiary: Colors.info,
    error: Colors.error,
    background: Colors.grey900,
    surface: Colors.grey800,
    surfaceVariant: Colors.grey700,
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#FFFFFF',
    onSurfaceVariant: Colors.grey300,
    outline: Colors.grey600,
  },
};

/**
 * Tamaños y espaciados
 */
export const Sizes = {
  // Espaciados
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,

  // Tamaños de fuente
  fontXs: 10,
  fontSm: 12,
  fontMd: 14,
  fontLg: 16,
  fontXl: 20,
  fontXxl: 24,
  fontHuge: 32,

  // Border radius
  radiusXs: 4,
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 16,
  radiusXl: 24,
  radiusRound: 999,

  // Iconos
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
  iconXl: 48,

  // Componentes
  buttonHeight: 48,
  inputHeight: 56,
  cardElevation: 2,
  modalElevation: 8,
};

/**
 * Sombras
 */
export const Shadows = {
  small: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

/**
 * Tipografía
 */
export const Typography = {
  h1: {
    fontSize: Sizes.fontHuge,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: Sizes.fontXxl,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: Sizes.fontXl,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h4: {
    fontSize: Sizes.fontLg,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: Sizes.fontMd,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  bodyLarge: {
    fontSize: Sizes.fontLg,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: Sizes.fontSm,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: Sizes.fontMd,
    fontWeight: '600' as const,
    lineHeight: 20,
    textTransform: 'uppercase' as const,
  },
};
