import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {store} from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import {LightTheme} from './src/config/theme';

// Ignorar warnings específicos en desarrollo
if (__DEV__) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

/**
 * App Principal
 * Componente raíz de la aplicación CaloriesAI
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PaperProvider theme={LightTheme}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent
            />
            <AppNavigator />
          </PaperProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
