import apiService from './api.service';
import {API_ENDPOINTS} from '@/config/api';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  UserProfileDto,
  UpdateProfileRequest,
  UpdateGeminiKeyRequest,
} from '@/types/user.types';
import {ApiResponse} from '@/types/api.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Servicio de Autenticación
 */
class AuthService {
  /**
   * Registrar nuevo usuario
   */
  async register(
    data: RegisterRequest,
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await apiService.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      data,
    );

    // Guardar token y usuario en AsyncStorage
    if (response.success && response.data) {
      await AsyncStorage.setItem('auth_token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  /**
   * Iniciar sesión
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await apiService.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      data,
    );

    // Guardar token y usuario en AsyncStorage
    if (response.success && response.data) {
      await AsyncStorage.setItem('auth_token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response;
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('user');
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  async getProfile(): Promise<ApiResponse<UserProfileDto>> {
    const response = await apiService.get<ApiResponse<UserProfileDto>>(
      API_ENDPOINTS.AUTH.PROFILE,
    );

    // Actualizar usuario en AsyncStorage
    if (response.success && response.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }

    return response;
  }

  /**
   * Actualizar perfil del usuario
   */
  async updateProfile(
    data: UpdateProfileRequest,
  ): Promise<ApiResponse<UserProfileDto>> {
    const response = await apiService.put<ApiResponse<UserProfileDto>>(
      API_ENDPOINTS.AUTH.UPDATE_PROFILE,
      data,
    );

    // Actualizar usuario en AsyncStorage
    if (response.success && response.data) {
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
    }

    return response;
  }

  /**
   * Actualizar API Key de Gemini
   */
  async updateGeminiKey(
    data: UpdateGeminiKeyRequest,
  ): Promise<ApiResponse<any>> {
    return await apiService.put<ApiResponse<any>>(
      API_ENDPOINTS.AUTH.UPDATE_GEMINI_KEY,
      data,
    );
  }

  /**
   * Verificar si hay token guardado
   */
  async hasToken(): Promise<boolean> {
    const token = await AsyncStorage.getItem('auth_token');
    return !!token;
  }

  /**
   * Obtener usuario guardado en AsyncStorage
   */
  async getStoredUser(): Promise<UserProfileDto | null> {
    const userString = await AsyncStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }

  /**
   * Obtener token guardado en AsyncStorage
   */
  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('auth_token');
  }
}

export default new AuthService();
