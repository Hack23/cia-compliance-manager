import { useEffect, useState } from 'react';
import { SecurityLevel } from '../types/cia';

// Type guard for SecurityLevel
function isSecurityLevel(value: unknown): value is SecurityLevel {
  return typeof value === 'string' &&
    ['None', 'Low', 'Moderate', 'High', 'Very High'].includes(value as string);
}

/**
 * Custom hook for storing and retrieving values from localStorage
 * 
 * ## Business Perspective
 * 
 * This hook enables persistent user preferences across sessions,
 * ensuring that security configurations are maintained when users
 * return to the application. This improves user experience and
 * workflow continuity for security professionals. 🔒
 * 
 * @param key - The localStorage key
 * @param initialValue - Default value if not found in localStorage
 * @returns Tuple of current value and setter function
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prevValue: T) => T)) => void] {
  // Enhanced debugging flag
  const DEBUG = true;

  // State to store the value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      if (typeof window === 'undefined') {
        return initialValue;
      }

      const item = window.localStorage.getItem(key);

      if (DEBUG) {
        console.log(`useLocalStorage: Initial read from '${key}':`, item);
      }

      // If no item is found, return initialValue
      if (!item) {
        return initialValue;
      }

      // Handle security levels directly
      if (isSecurityLevel(item)) {
        return item as unknown as T;
      }

      // Try to parse as JSON
      try {
        const parsedItem = JSON.parse(item);
        return parsedItem;
      } catch (parseError) {
        // If parsing fails, return the raw item as it might be a simple string
        return item as unknown as T;
      }
    } catch (error) {
      // If error, log it and return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Enhanced setValue function with strict ordering
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Add very explicit logging for debugging
      console.log(`useLocalStorage: Setting "${key}" value:`, valueToStore);

      // CRITICAL FIX: Update localStorage FIRST before state
      if (typeof window !== 'undefined') {
        try {
          // Special handling for security levels or direct string values
          if (isSecurityLevel(valueToStore) || typeof valueToStore === 'string') {
            window.localStorage.setItem(key, String(valueToStore));
          } else if (typeof valueToStore === 'boolean') {
            window.localStorage.setItem(key, String(valueToStore));
          } else {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }

          console.log(`useLocalStorage: Successfully saved "${key}" = "${valueToStore}" to localStorage`);
        } catch (storageError) {
          console.error(`Failed to update localStorage for key "${key}":`, storageError);
        }
      }

      // Then update the state AFTER localStorage is updated
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(`Error in useLocalStorage setValue for key "${key}":`, error);
    }
  };

  // Listen for changes to this localStorage key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        if (DEBUG) {
          console.log(`useLocalStorage: Storage event for '${key}':`, e.newValue);
        }

        try {
          // Handle security levels directly
          if (isSecurityLevel(e.newValue)) {
            setStoredValue(e.newValue as unknown as T);
          } else {
            // Try to parse as JSON
            setStoredValue(JSON.parse(e.newValue));
          }
        } catch (error) {
          // If parsing fails, use the raw value
          setStoredValue(e.newValue as unknown as T);
        }
      }
    };

    // Add event listener
    window.addEventListener('storage', handleStorageChange);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  // Sync to localStorage whenever storedValue changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Special handling for security levels
        if (isSecurityLevel(storedValue)) {
          window.localStorage.setItem(key, storedValue);
        } else {
          window.localStorage.setItem(key, JSON.stringify(storedValue));
        }

        if (DEBUG) {
          console.log(`useLocalStorage: Synced '${key}' to localStorage:`, storedValue);
        }
      }
    } catch (error) {
      console.error(`Error syncing localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
