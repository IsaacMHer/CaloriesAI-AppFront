import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import mealService from '@/services/meal.service';
import {MealDto, CreateMealRequest} from '@/types/meal.types';

/**
 * Estado de comidas
 */
interface MealState {
  meals: MealDto[];
  currentMeal: MealDto | null;
  isLoading: boolean;
  isAnalyzing: boolean;
  error: string | null;
}

const initialState: MealState = {
  meals: [],
  currentMeal: null,
  isLoading: false,
  isAnalyzing: false,
  error: null,
};

/**
 * Thunks asíncronos
 */

// Obtener comidas del día
export const fetchMealsByDate = createAsyncThunk(
  'meals/fetchByDate',
  async (date: Date | undefined, {rejectWithValue}) => {
    try {
      const response = await mealService.getMealsByDate(date);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener comidas');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Crear comida
export const createMeal = createAsyncThunk(
  'meals/create',
  async (data: CreateMealRequest, {rejectWithValue}) => {
    try {
      const response = await mealService.createMeal(data);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al crear comida');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Analizar imagen
export const analyzeImage = createAsyncThunk(
  'meals/analyzeImage',
  async (imageUri: string, {rejectWithValue}) => {
    try {
      const response = await mealService.analyzeImage(imageUri);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al analizar imagen');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Obtener comida por ID
export const fetchMealById = createAsyncThunk(
  'meals/fetchById',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await mealService.getMealById(id);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener comida');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Eliminar comida
export const deleteMeal = createAsyncThunk(
  'meals/delete',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await mealService.deleteMeal(id);
      if (response.success) {
        return id;
      }
      throw new Error(response.message || 'Error al eliminar comida');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Slice de comidas
 */
const mealSlice = createSlice({
  name: 'meals',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    clearCurrentMeal: state => {
      state.currentMeal = null;
    },
  },
  extraReducers: builder => {
    // Fetch meals by date
    builder
      .addCase(fetchMealsByDate.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMealsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMealsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create meal
    builder
      .addCase(createMeal.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createMeal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meals.push(action.payload);
      })
      .addCase(createMeal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Analyze image
    builder
      .addCase(analyzeImage.pending, state => {
        state.isAnalyzing = true;
        state.error = null;
      })
      .addCase(analyzeImage.fulfilled, state => {
        state.isAnalyzing = false;
      })
      .addCase(analyzeImage.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.error = action.payload as string;
      });

    // Fetch meal by ID
    builder
      .addCase(fetchMealById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMealById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentMeal = action.payload;
      })
      .addCase(fetchMealById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Delete meal
    builder
      .addCase(deleteMeal.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMeal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.meals = state.meals.filter(meal => meal.id !== action.payload);
      })
      .addCase(deleteMeal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearError, clearCurrentMeal} = mealSlice.actions;
export default mealSlice.reducer;
