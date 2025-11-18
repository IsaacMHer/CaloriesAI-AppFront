import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  Permission,
} from 'react-native-permissions';

/**
 * Solicita permisos de cámara
 * @returns true si se otorgaron los permisos
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permiso de Cámara',
          message: 'CaloriesAI necesita acceso a tu cámara para tomar fotos',
          buttonNeutral: 'Preguntar Luego',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const permission: Permission = PERMISSIONS.IOS.CAMERA;
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    }
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
    if (Platform.OS === 'android') {
      const androidVersion = Platform.Version;

      // Android 13+ usa MEDIA_IMAGES
      if (androidVersion >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: 'Permiso de Galería',
            message: 'CaloriesAI necesita acceso a tus fotos',
            buttonNeutral: 'Preguntar Luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Permiso de Galería',
            message: 'CaloriesAI necesita acceso a tus fotos',
            buttonNeutral: 'Preguntar Luego',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } else {
      const permission: Permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    }
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

    const options = {
      mediaType: 'photo' as const,
      quality: 0.8 as const,
      maxWidth: 1024,
      maxHeight: 1024,
      saveToPhotos: false,
    };

    const result: ImagePickerResponse = await launchCamera(options);

    if (result.didCancel) {
      return null;
    }

    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Error al abrir la cámara');
      return null;
    }

    if (result.assets && result.assets[0]) {
      return await compressImage(result.assets[0].uri!);
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

    const options = {
      mediaType: 'photo' as const,
      quality: 0.8 as const,
      maxWidth: 1024,
      maxHeight: 1024,
      selectionLimit: 1,
    };

    const result: ImagePickerResponse = await launchImageLibrary(options);

    if (result.didCancel) {
      return null;
    }

    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Error al abrir la galería');
      return null;
    }

    if (result.assets && result.assets[0]) {
      return await compressImage(result.assets[0].uri!);
    }

    return null;
  } catch (error) {
    console.error('Error picking from gallery:', error);
    Alert.alert('Error', 'Ocurrió un error al seleccionar la imagen');
    return null;
  }
};

/**
 * Comprime una imagen
 * @param uri - URI de la imagen
 * @returns URI de la imagen comprimida
 */
export const compressImage = async (uri: string): Promise<string> => {
  try {
    const compressedImage = await ImageResizer.createResizedImage(
      uri,
      800, // max width
      800, // max height
      'JPEG',
      80, // quality
      0, // rotation
    );

    return compressedImage.uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    // Si falla la compresión, retornar la URI original
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
    const response = await fetch(uri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remover el prefijo "data:image/...;base64,"
        const base64String = base64.split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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
