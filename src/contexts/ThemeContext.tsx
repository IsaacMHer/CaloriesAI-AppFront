import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import {Colors as BaseColors, LightTheme, DarkTheme} from '@/config/theme';

/**
 * Tipo de tema
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Contexto de tema
 */
interface ThemeContextType {
  theme: typeof LightTheme;
  colors: typeof BaseColors & {isDark: boolean};
  themeMode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
  setThemeMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@caloriesai_theme_mode';

/**
 * Colores extendidos para tema oscuro
 */
const DarkColors = {
  ...BaseColors,
  // Overrides para tema oscuro
  primary: '#66BB6A', // Verde más claro para mejor contraste
  accent: '#FFB74D', // Naranja más claro
  background: '#121212', // Fondo oscuro Material Design
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  textDisabled: '#6E6E6E',

  // Grises invertidos
  grey50: '#1E1E1E',
  grey100: '#2C2C2C',
  grey200: '#383838',
  grey300: '#4A4A4A',
  grey400: '#6E6E6E',
  grey500: '#9E9E9E',
  grey600: '#B0B0B0',
  grey700: '#D0D0D0',
  grey800: '#E0E0E0',
  grey900: '#F5F5F5',

  // Cards y superficies
  cardBackground: '#1E1E1E',
  cardBorder: '#2C2C2C',

  isDark: true,
};

const LightColors = {
  ...BaseColors,
  cardBackground: '#FFFFFF',
  cardBorder: '#E0E0E0',
  isDark: false,
};

/**
 * Provider de Tema
 */
export const ThemeProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('auto');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar preferencia de tema desde AsyncStorage
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
        setThemeModeState(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setThemeMode(newMode);
  };

  // Determinar si debe usar tema oscuro
  const isDark =
    themeMode === 'dark' ||
    (themeMode === 'auto' && systemColorScheme === 'dark');

  // Seleccionar tema y colores
  const theme = isDark ? DarkTheme : LightTheme;
  const colors = isDark ? DarkColors : LightColors;

  // Actualizar theme colors dinámicamente
  const updatedTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: colors.background,
      surface: colors.surface,
      onSurface: colors.text,
      onSurfaceVariant: colors.textSecondary,
    },
  };

  if (isLoading) {
    return null; // O un loader
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: updatedTheme,
        colors,
        themeMode,
        isDark,
        toggleTheme,
        setThemeMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Hook para usar el tema
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
