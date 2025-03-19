import { act, renderHook } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage hook', () => {
  const key = 'test-key';
  
  // Setup fresh localStorage mock before each test
  beforeEach(() => {
    // Create a mock implementation with proper behavior
    const mockStorage: Record<string, string> = {};
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((k) => mockStorage[k] || null),
        setItem: vi.fn((k, v) => { mockStorage[k] = v; }),
        removeItem: vi.fn((k) => { delete mockStorage[k]; }),
        clear: vi.fn(() => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }),
      },
      writable: true,
    });
  });

  it('initializes with default value when no value exists in localStorage', () => {
    // Ensure getItem returns null for this test
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(null);
    
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    expect(result.current[0]).toBe('default');
    expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('initializes with value from localStorage', () => {
    // Mock localStorage to return a stored value
    const storedValue = 'stored';
    vi.spyOn(window.localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(storedValue));
    
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    expect(result.current[0]).toBe(storedValue);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('updates value in state and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    
    // Create a spy to track localStorage.setItem calls
    const setItemSpy = vi.spyOn(window.localStorage, 'setItem');
    
    // Update value with setValue
    act(() => {
      result.current[1]('new value');
    });
    
    // Check state was updated
    expect(result.current[0]).toBe('new value');
    
    // Check localStorage was updated with stringified value
    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify('new value'));
  });

  it('sets value to null and removes item from localStorage when set to null', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'));
    
    // Create a spy to track localStorage.removeItem calls
    const removeItemSpy = vi.spyOn(window.localStorage, 'removeItem');
    
    // Set value to null
    act(() => {
      result.current[1](null as unknown as string);
    });
    
    // Check that the value is null
    expect(result.current[0]).toBe(null);
    
    // Check that localStorage.removeItem was called
    expect(removeItemSpy).toHaveBeenCalledWith(key);
  });
});
