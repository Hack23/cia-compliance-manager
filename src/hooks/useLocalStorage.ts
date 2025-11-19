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
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    // SSR safety: return initial value if window is undefined
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue if none exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error reading from localStorage, log and return initial value
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      // Allow value to be a function like useState
      setStoredValue((prevValue) => {
        const valueToStore = value instanceof Function ? value(prevValue) : value;
        
        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        
        return valueToStore;
      });
    } catch (error) {
      // If error writing to localStorage, log but don't throw
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }, [key]);

  // Sync with changes to localStorage from other tabs/windows
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

    // Listen for changes in other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
