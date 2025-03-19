import { useState } from 'react';

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
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      
      // Return initialValue if no item found
      if (item === null) return initialValue;
      
      // Handle special case for boolean values
      if (typeof initialValue === 'boolean') {
        if (item === 'true') return true as unknown as T;
        if (item === 'false') return false as unknown as T;
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
        return item as unknown as T;
      }
    } catch (error) {
      // If error (like invalid JSON), return initialValue
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to update localStorage and state
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // Allow value to be a function to match useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Update state
      setStoredValue(valueToStore);
      
      // Update localStorage
      if (valueToStore === null) {
        window.localStorage.removeItem(key);
      } else if (typeof valueToStore === 'boolean') {
        window.localStorage.setItem(key, valueToStore ? 'true' : 'false');
      } else if (typeof valueToStore === 'string') {
        window.localStorage.setItem(key, valueToStore);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
