import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to sync state with localStorage
 * 
 * ## Business Perspective
 * 
 * Enables widgets to remember user preferences and settings across browser
 * sessions, improving user experience by maintaining personalized configurations.
 * This is particularly valuable for security officers who configure specific
 * security levels and want their settings persisted. 💾
 * 
 * ## Technical Perspective
 * 
 * Provides a React state hook that automatically syncs with localStorage,
 * handling JSON serialization/deserialization and SSR compatibility. Uses
 * the same API as useState for familiarity.
 * 
 * @template T - Type of the stored value
 * @param key - localStorage key to use for storage
 * @param initialValue - Initial value if key doesn't exist in localStorage
 * @returns Tuple of [storedValue, setValue] similar to useState
 * 
 * @example
 * ```tsx
 * // Store user's preferred theme
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * 
 * return (
 *   <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
 *     Toggle Theme
 *   </button>
 * );
 * ```
 * 
 * @example
 * ```tsx
 * // Store security level preferences
 * const [savedLevels, setSavedLevels] = useLocalStorage('securityLevels', {
 *   availability: 'Moderate',
 *   integrity: 'Moderate',
 *   confidentiality: 'Moderate'
 * });
 * ```
 * 
 * @example
 * ```tsx
 * // Store widget visibility preferences
 * const [widgetPrefs, setWidgetPrefs] = useLocalStorage('widgetPreferences', {
 *   showDetails: true,
 *   expandedSections: ['overview', 'metrics']
 * });
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      setStoredValue((prevValue) => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (storageError) {
            console.error(`Error saving to localStorage key "${key}":`, storageError);
          }
        }
        
        return valueToStore;
      });
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing storage event for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
