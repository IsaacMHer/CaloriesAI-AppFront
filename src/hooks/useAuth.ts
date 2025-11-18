import {useAppDispatch, useAppSelector} from '@/store/store';
import {
  login as loginAction,
  register as registerAction,
  logout as logoutAction,
  getProfile,
  updateProfile as updateProfileAction,
  checkAuth,
  clearError,
} from '@/store/slices/authSlice';
import {
  LoginRequest,
  RegisterRequest,
  UpdateProfileRequest,
} from '@/types/user.types';

/**
 * Hook personalizado para autenticación
 * Provee funciones y estado de autenticación
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const {user, isAuthenticated, isLoading, error} = useAppSelector(
    state => state.auth,
  );

  /**
   * Iniciar sesión
   */
  const login = async (credentials: LoginRequest) => {
    return await dispatch(loginAction(credentials)).unwrap();
  };

  /**
   * Registrarse
   */
  const register = async (data: RegisterRequest) => {
    return await dispatch(registerAction(data)).unwrap();
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    return await dispatch(logoutAction()).unwrap();
  };

  /**
   * Actualizar perfil
   */
  const updateProfile = async (data: UpdateProfileRequest) => {
    return await dispatch(updateProfileAction(data)).unwrap();
  };

  /**
   * Refrescar perfil
   */
  const refreshProfile = async () => {
    return await dispatch(getProfile()).unwrap();
  };

  /**
   * Verificar autenticación al iniciar app
   */
  const verifyAuth = async () => {
    return await dispatch(checkAuth()).unwrap();
  };

  /**
   * Limpiar error
   */
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    verifyAuth,
    clearAuthError,
  };
};
