import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import {Text} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {useTheme} from '@/contexts/ThemeContext';
import {Sizes} from '@/config/theme';

/**
 * Banner de estado de conexión
 * Muestra un banner cuando no hay conexión a internet
 */
const ConnectionStatus: React.FC = () => {
  const {colors} = useTheme();
  const [isConnected, setIsConnected] = useState(true);
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    // Suscribirse a cambios de conectividad
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? true;
      setIsConnected(connected);

      // Animar entrada/salida del banner
      Animated.spring(slideAnim, {
        toValue: connected ? -100 : 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    });

    return () => unsubscribe();
  }, []);

  if (isConnected) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.error,
          transform: [{translateY: slideAnim}],
          top: Platform.OS === 'ios' ? 40 : 0,
        },
      ]}>
      <View style={styles.content}>
        <Text style={styles.icon}>📡</Text>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Sin conexión</Text>
          <Text style={styles.subtitle}>
            Los cambios se guardarán localmente
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Sizes.md,
    paddingTop: Platform.OS === 'ios' ? Sizes.lg : Sizes.md,
  },
  icon: {
    fontSize: 24,
    marginRight: Sizes.sm,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
    marginTop: 2,
  },
});

export default ConnectionStatus;
