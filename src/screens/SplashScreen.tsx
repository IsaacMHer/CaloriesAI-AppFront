import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Animated, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {SplashScreenProps} from '@/types/navigation.types';
import {useAuth} from '@/hooks/useAuth';
import {Colors, Sizes} from '@/config/theme';
import {Strings} from '@/constants/strings';

/**
 * Splash Screen
 * Pantalla inicial que verifica autenticación y navega a la pantalla correspondiente
 */
const SplashScreen: React.FC<SplashScreenProps> = ({navigation}) => {
  const {verifyAuth} = useAuth();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Verificar autenticación después de 2 segundos
    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const authData = await verifyAuth();

        if (authData && authData.user) {
          // Usuario autenticado, ir a Main
          navigation.replace('Main');
        } else {
          // No autenticado, ir a Auth
          navigation.replace('Auth');
        }
      } catch (error) {
        // En caso de error, ir a Auth
        navigation.replace('Auth');
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        {/* Logo o icono de la app */}
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🍎</Text>
        </View>

        <Text variant="headlineLarge" style={styles.title}>
          {Strings.appName}
        </Text>

        <Text variant="bodyLarge" style={styles.tagline}>
          {Strings.appTagline}
        </Text>

        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.loader}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.lg,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Sizes.sm,
  },
  tagline: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Sizes.xl,
  },
  loader: {
    marginTop: Sizes.lg,
  },
});

export default SplashScreen;
