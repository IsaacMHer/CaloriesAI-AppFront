import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from '@/types/navigation.types';

/**
 * Referencia de navegación para uso fuera de componentes
 * Permite navegar desde servicios, middlewares, etc.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Navegar a una ruta
 */
export function navigate(name: keyof RootStackParamList, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

/**
 * Resetear el stack de navegación
 */
export function reset(state: any) {
  if (navigationRef.isReady()) {
    navigationRef.reset(state);
  }
}

/**
 * Ir atrás
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
