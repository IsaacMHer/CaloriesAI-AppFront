import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '@/types/navigation.types';
import {navigationRef} from './navigationRef';

// Navigators
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

// Screens
import SplashScreen from '@/screens/SplashScreen';
import OnboardingScreen from '@/screens/onboarding/OnboardingScreen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * App Navigator (Root)
 * Navegador principal de la aplicación
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#FFFFFF'},
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
