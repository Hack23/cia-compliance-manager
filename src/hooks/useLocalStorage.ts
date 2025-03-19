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
      
      // Parse stored json
      return JSON.parse(item);
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
