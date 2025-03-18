import { useEffect, useState } from 'react';

/**
 * Custom hook for managing localStorage values with React state
 * 
 * @param key - localStorage key for value
 * @param initialValue - Initial value to use if no value in localStorage
 * @returns Tuple with current value and setter function
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prevValue: T) => T)) => void] {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      
      // Return initialValue if no item found
      if (item === null) return initialValue;
      
      // Handle boolean values stored as strings
      if (typeof initialValue === 'boolean') {
        if (item === 'true') return true as T;
        if (item === 'false') return false as T;
      }

      // Handle string values when expecting a string
      if (typeof initialValue === 'string') {
        return item as unknown as T;
      }
      
      // Try to parse as JSON
      try {
        return JSON.parse(item);
      } catch (parseError) {
        // If parsing fails, return the raw string or initialValue
        return typeof initialValue === 'string' ? item as unknown as T : initialValue;
      }
    } catch (error) {
      // If error (like invalid JSON), return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when storedValue changes
  useEffect(() => {
    try {
      if (storedValue === null) {
        localStorage.removeItem(key);
      } else {
        // Handle special case for boolean values
        if (typeof storedValue === 'boolean') {
          localStorage.setItem(key, storedValue ? 'true' : 'false');
        } else if (typeof storedValue === 'string') {
          // Store strings directly
          localStorage.setItem(key, storedValue);
        } else {
          // Store objects and arrays as JSON
          localStorage.setItem(key, JSON.stringify(storedValue));
        }
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
