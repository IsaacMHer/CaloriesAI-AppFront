import React, {useEffect, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useAppDispatch, useAppSelector} from '@/store/store';
import {
  setConnectionStatus,
  syncOfflineQueue,
} from '@/store/slices/offlineQueueSlice';

/**
 * OfflineSyncManager
 * Componente que monitorea la conectividad y sincroniza automáticamente
 * las operaciones offline cuando se restaura la conexión.
 *
 * Features:
 * - Escucha cambios de conectividad con NetInfo
 * - Actualiza el estado de conexión en Redux
 * - Dispara sincronización automática al reconectar
 * - Previene múltiples sincronizaciones simultáneas
 */
const OfflineSyncManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const {queue, isSyncing, isConnected} = useAppSelector(
    state => state.offlineQueue,
  );

  // Ref para rastrear si ya se disparó la sincronización
  const syncTriggeredRef = useRef(false);

  useEffect(() => {
    /**
     * Suscriptor de NetInfo para detectar cambios de conectividad
     */
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;

      // Actualizar estado de conexión en Redux
      dispatch(setConnectionStatus(connected));

      // Si se restauró la conexión y hay items en la queue
      if (connected && queue.length > 0 && !isSyncing) {
        // Prevenir múltiples disparos
        if (!syncTriggeredRef.current) {
          syncTriggeredRef.current = true;

          // Pequeño delay para asegurar que la conexión es estable
          setTimeout(() => {
            console.log(
              `[OfflineSync] Conexión restaurada. Sincronizando ${queue.length} operaciones pendientes...`,
            );
            dispatch(syncOfflineQueue());
            syncTriggeredRef.current = false;
          }, 1000);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, queue.length, isSyncing]);

  /**
   * Effect para resetear el flag cuando termina la sincronización
   */
  useEffect(() => {
    if (!isSyncing) {
      syncTriggeredRef.current = false;
    }
  }, [isSyncing]);

  /**
   * Logging para debugging (solo en desarrollo)
   */
  useEffect(() => {
    if (__DEV__) {
      console.log(
        `[OfflineSync] Estado - Conectado: ${isConnected}, Queue: ${queue.length}, Syncing: ${isSyncing}`,
      );
    }
  }, [isConnected, queue.length, isSyncing]);

  // Este componente no renderiza nada, solo maneja la lógica
  return null;
};

export default OfflineSyncManager;
