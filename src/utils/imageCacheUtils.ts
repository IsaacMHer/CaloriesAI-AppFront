import React from 'react';
import {Image} from 'expo-image';

/**
 * Utilidades para manejo de caché de imágenes con Expo Image
 */

/**
 * Precargar una lista de imágenes
 * @param uris - Array de URIs de imágenes a precargar
 * @returns Promise que se resuelve cuando todas las imágenes se han precargado
 */
export const preloadImages = async (uris: string[]): Promise<void> => {
  try {
    const validUris = uris.filter(uri => uri && uri.trim() !== '');

    if (validUris.length === 0) {
      return;
    }

    await Promise.all(
      validUris.map(uri => Image.prefetch(uri))
    );

    console.log(`[ImageCache] Precargadas ${validUris.length} imágenes`);
  } catch (error) {
    console.error('[ImageCache] Error al precargar imágenes:', error);
  }
};

/**
 * Precargar una sola imagen
 * @param uri - URI de la imagen a precargar
 * @returns Promise que se resuelve cuando la imagen se ha precargado
 */
export const preloadImage = async (uri: string): Promise<void> => {
  if (!uri || uri.trim() === '') {
    return;
  }

  try {
    await Image.prefetch(uri);
    console.log(`[ImageCache] Precargada imagen: ${uri}`);
  } catch (error) {
    console.error('[ImageCache] Error al precargar imagen:', error);
  }
};

/**
 * Limpiar todo el caché de imágenes
 * @returns Promise que se resuelve cuando el caché se ha limpiado
 */
export const clearImageCache = async (): Promise<void> => {
  try {
    await Image.clearMemoryCache();
    await Image.clearDiskCache();
    console.log('[ImageCache] Caché de imágenes limpiado completamente');
  } catch (error) {
    console.error('[ImageCache] Error al limpiar caché:', error);
  }
};

/**
 * Limpiar solo el caché en memoria
 * @returns Promise que se resuelve cuando el caché en memoria se ha limpiado
 */
export const clearMemoryCache = async (): Promise<void> => {
  try {
    await Image.clearMemoryCache();
    console.log('[ImageCache] Caché en memoria limpiado');
  } catch (error) {
    console.error('[ImageCache] Error al limpiar caché en memoria:', error);
  }
};

/**
 * Limpiar solo el caché en disco
 * @returns Promise que se resuelve cuando el caché en disco se ha limpiado
 */
export const clearDiskCache = async (): Promise<void> => {
  try {
    await Image.clearDiskCache();
    console.log('[ImageCache] Caché en disco limpiado');
  } catch (error) {
    console.error('[ImageCache] Error al limpiar caché en disco:', error);
  }
};

/**
 * Precargar imágenes de comidas (thumbnails)
 * Útil para precargar las imágenes del día actual
 * @param mealPhotoUrls - Array de URLs de fotos de comidas
 */
export const preloadMealImages = async (
  mealPhotoUrls: string[],
): Promise<void> => {
  const validUrls = mealPhotoUrls.filter(
    url => url && url.trim() !== '' && url.startsWith('http'),
  );

  if (validUrls.length === 0) {
    return;
  }

  try {
    await preloadImages(validUrls);
    console.log(`[ImageCache] Precargadas ${validUrls.length} fotos de comidas`);
  } catch (error) {
    console.error('[ImageCache] Error al precargar fotos de comidas:', error);
  }
};

/**
 * Obtener la URI de una imagen con parámetros de optimización
 * Útil si el backend soporta resize dinámico
 * @param baseUri - URI base de la imagen
 * @param width - Ancho deseado
 * @param height - Alto deseado
 * @param quality - Calidad (1-100)
 * @returns URI optimizada
 */
export const getOptimizedImageUri = (
  baseUri: string,
  width?: number,
  height?: number,
  quality: number = 80,
): string => {
  if (!baseUri || baseUri.trim() === '') {
    return '';
  }

  // Si el backend soporta parámetros de query para resize, agregarlos aquí
  // Ejemplo: https://api.example.com/images/123?w=400&h=300&q=80
  try {
    const url = new URL(baseUri);

    if (width) {
      url.searchParams.set('w', width.toString());
    }
    if (height) {
      url.searchParams.set('h', height.toString());
    }
    if (quality) {
      url.searchParams.set('q', quality.toString());
    }

    return url.toString();
  } catch (error) {
    // Si no es una URL válida, retornar la original
    return baseUri;
  }
};

/**
 * Verificar si una URI es válida para cachear
 * @param uri - URI a verificar
 * @returns true si es válida, false en caso contrario
 */
export const isValidImageUri = (uri: string | null | undefined): boolean => {
  if (!uri || uri.trim() === '') {
    return false;
  }

  // Validar que sea una URL HTTP/HTTPS válida
  try {
    const url = new URL(uri);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Hook personalizado para precargar imágenes al montar un componente
 * @param uris - Array de URIs a precargar
 */
export const usePreloadImages = (uris: string[]) => {
  const validUris = uris.filter(isValidImageUri);

  React.useEffect(() => {
    if (validUris.length > 0) {
      preloadImages(validUris);
    }
  }, [validUris.join(',')]);
};
