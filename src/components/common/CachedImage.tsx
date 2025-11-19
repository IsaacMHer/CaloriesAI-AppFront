import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  ImageStyle,
} from 'react-native';
import {Image, ImageContentFit} from 'expo-image';
import {IconButton, Text} from 'react-native-paper';
import {Colors} from '@/config/theme';

/**
 * Props para el componente CachedImage
 */
interface CachedImageProps {
  /** URI de la imagen */
  uri: string;
  /** Estilo de la imagen */
  style?: StyleProp<ImageStyle>;
  /** Estilo del contenedor */
  containerStyle?: StyleProp<ViewStyle>;
  /** Placeholder durante la carga */
  showPlaceholder?: boolean;
  /** Color del placeholder */
  placeholderColor?: string;
  /** Modo de resize */
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  /** Callback cuando la carga falla */
  onError?: () => void;
  /** Callback cuando la carga termina */
  onLoadEnd?: () => void;
  /** Mostrar indicador de carga */
  showLoadingIndicator?: boolean;
}

/**
 * CachedImage
 * Wrapper de Expo Image con características adicionales:
 * - Cache automático de imágenes
 * - Placeholder durante carga
 * - Manejo de errores con UI
 * - Indicador de carga
 * - Optimización de rendimiento
 *
 * Uso:
 * ```tsx
 * <CachedImage
 *   uri="https://example.com/image.jpg"
 *   style={{width: 100, height: 100}}
 *   showPlaceholder
 *   resizeMode="cover"
 * />
 * ```
 */
const CachedImage: React.FC<CachedImageProps> = ({
  uri,
  style,
  containerStyle,
  showPlaceholder = true,
  placeholderColor = Colors.border,
  resizeMode = 'cover',
  onError,
  onLoadEnd,
  showLoadingIndicator = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /**
   * Handler cuando la imagen se carga exitosamente
   */
  const handleLoadEnd = () => {
    setIsLoading(false);
    onLoadEnd?.();
  };

  /**
   * Handler cuando falla la carga de la imagen
   */
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  /**
   * Reintentar carga de imagen
   */
  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Imagen con Expo Image */}
      <Image
        style={[styles.image, style]}
        source={{uri}}
        contentFit={resizeMode as ImageContentFit}
        transition={200}
        cachePolicy="memory-disk"
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />

      {/* Placeholder durante carga */}
      {showPlaceholder && isLoading && !hasError && (
        <View
          style={[
            styles.placeholder,
            style,
            {backgroundColor: placeholderColor},
          ]}>
          {showLoadingIndicator && (
            <ActivityIndicator size="small" color={Colors.primary} />
          )}
        </View>
      )}

      {/* UI de error */}
      {hasError && (
        <View style={[styles.errorContainer, style]}>
          <IconButton
            icon="image-broken-variant"
            size={32}
            iconColor={Colors.textSecondary}
          />
          <Text variant="bodySmall" style={styles.errorText}>
            Error al cargar imagen
          </Text>
          <IconButton
            icon="refresh"
            size={20}
            iconColor={Colors.primary}
            onPress={handleRetry}
          />
        </View>
      )}
    </View>
  );
};

/**
 * Estilos del componente
 */
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    color: Colors.textSecondary,
    marginTop: 4,
  },
});

export default CachedImage;
