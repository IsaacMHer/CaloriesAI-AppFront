import {useState, useEffect} from 'react';

/**
 * Hook para hacer debounce de un valor
 * Útil para búsquedas en tiempo real
 * @param value - Valor a debounce
 * @param delay - Delay en milisegundos (por defecto: 500ms)
 * @returns Valor con debounce
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Establecer un timeout para actualizar el valor después del delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor cambia antes del delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
