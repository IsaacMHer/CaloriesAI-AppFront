import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';

/**
 * Root Stack Navigator (App Level)
 */
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Onboarding: undefined;
};

/**
 * Auth Stack Navigator
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/**
 * Main Bottom Tabs Navigator
 */
export type MainTabsParamList = {
  Home: undefined;
  Statistics: undefined;
  Profile: undefined;
};

/**
 * Home Stack Navigator (dentro del tab Home)
 */
export type HomeStackParamList = {
  HomeMain: undefined;
  AddMeal: undefined;
  MealDetail: {mealId: number};
  FoodDetectionResult: {
    photoUrl: string;
    detectedFoods: any[];
  };
  FoodSearch: {
    onSelectFood: (food: any) => void;
  };
  CustomFoodForm: {
    onFoodCreated: (food: any) => void;
    editFood?: any;
  };
};

/**
 * Profile Stack Navigator (dentro del tab Profile)
 */
export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  GoalsSettings: undefined;
};

/**
 * Screen Props Types - Root
 */
export type SplashScreenProps = StackScreenProps<RootStackParamList, 'Splash'>;
export type OnboardingScreenProps = StackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

/**
 * Screen Props Types - Auth
 */
export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type RegisterScreenProps = StackScreenProps<
  AuthStackParamList,
  'Register'
>;

/**
 * Screen Props Types - Home Stack
 */
export type HomeMainScreenProps = CompositeScreenProps<
  StackScreenProps<HomeStackParamList, 'HomeMain'>,
  BottomTabScreenProps<MainTabsParamList>
>;

export type AddMealScreenProps = StackScreenProps<
  HomeStackParamList,
  'AddMeal'
>;

export type MealDetailScreenProps = StackScreenProps<
  HomeStackParamList,
  'MealDetail'
>;

export type FoodDetectionResultScreenProps = StackScreenProps<
  HomeStackParamList,
  'FoodDetectionResult'
>;

export type FoodSearchScreenProps = StackScreenProps<
  HomeStackParamList,
  'FoodSearch'
>;

export type CustomFoodFormScreenProps = StackScreenProps<
  HomeStackParamList,
  'CustomFoodForm'
>;

/**
 * Screen Props Types - Profile Stack
 */
export type ProfileMainScreenProps = CompositeScreenProps<
  StackScreenProps<ProfileStackParamList, 'ProfileMain'>,
  BottomTabScreenProps<MainTabsParamList>
>;

export type EditProfileScreenProps = StackScreenProps<
  ProfileStackParamList,
  'EditProfile'
>;

export type GoalsSettingsScreenProps = StackScreenProps<
  ProfileStackParamList,
  'GoalsSettings'
>;

/**
 * Screen Props Types - Statistics
 */
export type StatisticsScreenProps = BottomTabScreenProps<
  MainTabsParamList,
  'Statistics'
>;

/**
 * Declaración global para navigation (para uso fuera de componentes)
 */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
