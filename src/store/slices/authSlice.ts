import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import authService from '@/services/auth.service';
import {
  LoginRequest,
  RegisterRequest,
  UserProfileDto,
  UpdateProfileRequest,
} from '@/types/user.types';

/**
 * Estado de autenticación
 */
interface AuthState {
  user: UserProfileDto | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Thunks asíncronos
 */

// Login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, {rejectWithValue}) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al iniciar sesión');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Register
export const register = createAsyncThunk(
  'auth/register',
  async (data: RegisterRequest, {rejectWithValue}) => {
    try {
      const response = await authService.register(data);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al registrarse');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Get Profile
export const getProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await authService.getProfile();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener perfil');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Update Profile
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data: UpdateProfileRequest, {rejectWithValue}) => {
    try {
      const response = await authService.updateProfile(data);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar perfil');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Check Auth (verificar si hay token guardado)
export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const hasToken = await authService.hasToken();
  if (hasToken) {
    const user = await authService.getStoredUser();
    const token = await authService.getToken();
    return {user, token};
  }
  return null;
});

/**
 * Slice de autenticación
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserProfileDto>) => {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Profile
    builder
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder.addCase(logout.fulfilled, state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // Check Auth
    builder
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isAuthenticated = true;
        }
      })
      .addCase(checkAuth.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const {clearError, setUser} = authSlice.actions;
export default authSlice.reducer;
