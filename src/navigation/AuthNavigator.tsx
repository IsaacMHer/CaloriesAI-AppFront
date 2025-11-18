import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '@/types/navigation.types';

// Screens (se importarán cuando estén creadas)
import LoginScreen from '@/screens/auth/LoginScreen';
import RegisterScreen from '@/screens/auth/RegisterScreen';

const Stack = createStackNavigator<AuthStackParamList>();

/**
 * Auth Navigator
 * Stack de navegación para autenticación (Login, Register)
 */
const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FAFAFA'},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
