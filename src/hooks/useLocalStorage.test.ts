import { act, renderHook } from '@testing-library/react'; // Use @testing-library/react instead of react-hooks
import { useLocalStorage } from './useLocalStorage'; // Use named import

describe('useLocalStorage hook', () => {
  const key = 'test-key'

  beforeEach(() => {
    localStorage.clear()
  })

  it('initializes with default value when no value exists in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'))
    expect(result.current[0]).toBe('default')
  })

  it('initializes with value from localStorage', () => {
    localStorage.setItem(key, JSON.stringify('stored'))
    const { result } = renderHook(() => useLocalStorage(key, 'default'))
    expect(result.current[0]).toBe('stored')
  })

  it('updates value in state and localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'))
    act(() => {
      result.current[1]('new value')
    })
    expect(result.current[0]).toBe('new value')
    expect(JSON.parse(localStorage.getItem(key)!)).toBe('new value')
  })

  it('sets value to null and removes item from localStorage when set to null', () => {
    const { result } = renderHook(() => useLocalStorage(key, 'default'))
    act(() => {
      // Use type assertion to allow null (fixing the TS error)
      result.current[1](null as unknown as string)
    })
    expect(result.current[0]).toBe(null)
    expect(localStorage.getItem(key)).toBeNull()
  })
})
