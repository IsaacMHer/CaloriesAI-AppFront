import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {statsService, goalsService} from '@/services/stats.service';
import {
  DailySummaryDto,
  ChartDataDto,
  NutritionalGoalDto,
  UpdateGoalRequest,
  ChartPeriod,
} from '@/types/stats.types';

/**
 * Estado de estadísticas y metas
 */
interface StatsState {
  dailySummary: DailySummaryDto | null;
  weeklySummary: DailySummaryDto[];
  chartData: ChartDataDto | null;
  goal: NutritionalGoalDto | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  dailySummary: null,
  weeklySummary: [],
  chartData: null,
  goal: null,
  isLoading: false,
  error: null,
};

/**
 * Thunks asíncronos
 */

// Obtener resumen diario
export const fetchDailySummary = createAsyncThunk(
  'stats/fetchDailySummary',
  async (date: Date | undefined, {rejectWithValue}) => {
    try {
      const response = await statsService.getDailySummary(date);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener resumen diario');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Obtener resumen semanal
export const fetchWeeklySummary = createAsyncThunk(
  'stats/fetchWeeklySummary',
  async (startDate: Date | undefined, {rejectWithValue}) => {
    try {
      const response = await statsService.getWeeklySummary(startDate);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener resumen semanal');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Obtener datos para gráficas
export const fetchChartData = createAsyncThunk(
  'stats/fetchChartData',
  async (period: ChartPeriod, {rejectWithValue}) => {
    try {
      const response = await statsService.getChartData(period);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener datos de gráficas');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Obtener meta
export const fetchGoal = createAsyncThunk(
  'stats/fetchGoal',
  async (_, {rejectWithValue}) => {
    try {
      const response = await goalsService.getGoal();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener meta');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Actualizar meta
export const updateGoal = createAsyncThunk(
  'stats/updateGoal',
  async (data: UpdateGoalRequest, {rejectWithValue}) => {
    try {
      const response = await goalsService.updateGoal(data);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al actualizar meta');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Obtener meta sugerida
export const fetchSuggestedGoal = createAsyncThunk(
  'stats/fetchSuggestedGoal',
  async (_, {rejectWithValue}) => {
    try {
      const response = await goalsService.getSuggestedGoal();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Error al obtener meta sugerida');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

/**
 * Slice de estadísticas
 */
const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    // Fetch daily summary
    builder
      .addCase(fetchDailySummary.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDailySummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dailySummary = action.payload;
      })
      .addCase(fetchDailySummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch weekly summary
    builder
      .addCase(fetchWeeklySummary.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWeeklySummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weeklySummary = action.payload;
      })
      .addCase(fetchWeeklySummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch chart data
    builder
      .addCase(fetchChartData.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chartData = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch goal
    builder
      .addCase(fetchGoal.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goal = action.payload;
      })
      .addCase(fetchGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update goal
    builder
      .addCase(updateGoal.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goal = action.payload;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Fetch suggested goal
    builder
      .addCase(fetchSuggestedGoal.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goal = action.payload;
      })
      .addCase(fetchSuggestedGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearError} = statsSlice.actions;
export default statsSlice.reducer;
