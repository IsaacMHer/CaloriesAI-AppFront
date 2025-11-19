import * as ImagePicker from 'expo-image-picker';
import {Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';

/**
 * Solicita permisos de cámara
 * @returns true si se otorgaron los permisos
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
};

/**
 * Solicita permisos de galería
 * @returns true si se otorgaron los permisos
 */
export const requestGalleryPermission = async (): Promise<boolean> => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting gallery permission:', error);
    return false;
  }
};

/**
 * Abre la cámara para tomar una foto
 * @returns URI de la imagen o null
 */
export const takePhoto = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permiso Denegado',
        'Necesitas otorgar permisos de cámara para usar esta función.',
      );
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'images',
      quality: 0.8,
      allowsEditing: false,
      exif: false,
    });

    if (result.canceled) {
      return null;
    }

    if (result.assets && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    Alert.alert('Error', 'Ocurrió un error al tomar la foto');
    return null;
  }
};

/**
 * Abre la galería para seleccionar una imagen
 * @returns URI de la imagen o null
 */
export const pickFromGallery = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permiso Denegado',
        'Necesitas otorgar permisos de galería para usar esta función.',
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 0.8,
      allowsEditing: false,
      exif: false,
    });

    if (result.canceled) {
      return null;
    }

    if (result.assets && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error picking from gallery:', error);
    Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
    return null;
  }
};

/**
 * Comprime una imagen (Expo maneja esto automáticamente con quality param)
 * @param uri - URI de la imagen
 * @returns URI de la imagen comprimida
 */
export const compressImage = async (uri: string): Promise<string> => {
  try {
    // Expo-image-picker ya comprime las imágenes según el parámetro quality
    // Si necesitas compresión adicional, puedes usar expo-image-manipulator
    return uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    return uri;
  }
};

/**
 * Convierte una imagen a base64
 * @param uri - URI de la imagen
 * @returns String base64
 */
export const convertToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting to base64:', error);
    throw error;
  }
};

/**
 * Obtiene el tipo MIME de una imagen
 * @param uri - URI de la imagen
 * @returns Tipo MIME
 */
export const getImageMimeType = (uri: string): string => {
  const extension = uri.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    default:
      return 'image/jpeg';
  }
};
