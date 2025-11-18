import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MainTabsParamList, HomeStackParamList, ProfileStackParamList} from '@/types/navigation.types';
import {Colors} from '@/config/theme';

// Screens - Home Stack
import HomeScreen from '@/screens/home/HomeScreen';
import AddMealScreen from '@/screens/meals/AddMealScreen';
import MealDetailScreen from '@/screens/meals/MealDetailScreen';
import FoodDetectionResultScreen from '@/screens/meals/FoodDetectionResultScreen';
import FoodSearchScreen from '@/screens/foods/FoodSearchScreen';
import CustomFoodFormScreen from '@/screens/foods/CustomFoodFormScreen';

// Screens - Statistics
import StatisticsScreen from '@/screens/statistics/StatisticsScreen';

// Screens - Profile Stack
import ProfileScreen from '@/screens/profile/ProfileScreen';
import EditProfileScreen from '@/screens/profile/EditProfileScreen';
import GoalsSettingsScreen from '@/screens/profile/GoalsSettingsScreen';

const Tab = createBottomTabNavigator<MainTabsParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

/**
 * Home Stack Navigator
 */
const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FAFAFA'},
      }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="AddMeal" component={AddMealScreen} />
      <HomeStack.Screen name="MealDetail" component={MealDetailScreen} />
      <HomeStack.Screen
        name="FoodDetectionResult"
        component={FoodDetectionResultScreen}
      />
      <HomeStack.Screen name="FoodSearch" component={FoodSearchScreen} />
      <HomeStack.Screen name="CustomFoodForm" component={CustomFoodFormScreen} />
    </HomeStack.Navigator>
  );
};

/**
 * Profile Stack Navigator
 */
const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FAFAFA'},
      }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="GoalsSettings" component={GoalsSettingsScreen} />
    </ProfileStack.Navigator>
  );
};

/**
 * Main Bottom Tabs Navigator
 */
const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.grey500,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: Colors.grey300,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{
          tabBarLabel: 'Estadísticas',
          tabBarIcon: ({color, size}) => (
            <Icon name="chart-bar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
