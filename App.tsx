import React from 'react';
import {StatusBar, LogBox, View, ActivityIndicator} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import {ThemeProvider, useTheme} from './src/contexts/ThemeContext';
import ConnectionStatus from './src/components/common/ConnectionStatus';
import OfflineSyncManager from './src/components/common/OfflineSyncManager';

// Ignorar warnings específicos en desarrollo
if (__DEV__) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

/**
 * App Content - Componente interno que usa el tema
 */
const AppContent: React.FC = () => {
  const {theme, isDark} = useTheme();

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ConnectionStatus />
      <AppNavigator />
    </PaperProvider>
  );
};

/**
 * App Principal
 * Componente raíz de la aplicación CaloriesAI
 */
const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <PersistGate
            loading={
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color="#4CAF50" />
              </View>
            }
            persistor={persistor}>
            <ThemeProvider>
              <OfflineSyncManager />
              <AppContent />
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
