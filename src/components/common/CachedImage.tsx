import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
} from 'react-native';
import FastImage, {
  FastImageProps,
  Priority,
  ResizeMode,
} from 'react-native-fast-image';
import {IconButton, Text} from 'react-native-paper';
import {Colors} from '@/config/theme';

/**
 * Props para el componente CachedImage
 */
interface CachedImageProps extends Omit<FastImageProps, 'source'> {
  /** URI de la imagen */
  uri: string;
  /** Estilo del contenedor */
  containerStyle?: StyleProp<ViewStyle>;
  /** Placeholder durante la carga */
  showPlaceholder?: boolean;
  /** Color del placeholder */
  placeholderColor?: string;
  /** Prioridad de carga (normal, low, high) */
  priority?: Priority;
  /** Modo de resize */
  resizeMode?: ResizeMode;
  /** Callback cuando la carga falla */
  onError?: () => void;
  /** Callback cuando la carga termina */
  onLoadEnd?: () => void;
  /** Mostrar indicador de carga */
  showLoadingIndicator?: boolean;
}

/**
 * CachedImage
 * Wrapper de FastImage con características adicionales:
 * - Cache automático de imágenes
 * - Placeholder durante carga
 * - Manejo de errores con UI
 * - Indicador de carga
 * - Prioridad de carga configurable
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
  priority = FastImage.priority.normal,
  resizeMode = FastImage.resizeMode.cover,
  onError,
  onLoadEnd,
  showLoadingIndicator = true,
  ...restProps
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
      {/* Imagen con FastImage */}
      <FastImage
        style={[styles.image, style]}
        source={{
          uri,
          priority,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={resizeMode}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...restProps}
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
