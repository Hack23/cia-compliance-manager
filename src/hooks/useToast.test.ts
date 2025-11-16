import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useToast } from './useToast';

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with empty toasts array', () => {
    const { result } = renderHook(() => useToast());
    
    expect(result.current.toasts).toEqual([]);
  });

  it('adds a toast with showToast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({
        type: 'success',
        message: 'Test message'
      });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0]).toMatchObject({
      type: 'success',
      message: 'Test message',
      duration: 3000
    });
    expect(result.current.toasts[0].id).toBeDefined();
  });

  it('adds multiple toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({ type: 'success', message: 'Message 1' });
      result.current.showToast({ type: 'error', message: 'Message 2' });
    });
    
    expect(result.current.toasts).toHaveLength(2);
    expect(result.current.toasts[0].message).toBe('Message 1');
    expect(result.current.toasts[1].message).toBe('Message 2');
  });

  it('uses custom duration when provided', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({
        type: 'info',
        message: 'Custom duration',
        duration: 5000
      });
    });
    
    expect(result.current.toasts[0].duration).toBe(5000);
  });

  it('auto-dismisses toast after duration', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({
        type: 'success',
        message: 'Auto dismiss',
        duration: 3000
      });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  it('manually dismisses toast by ID', () => {
    const { result } = renderHook(() => useToast());
    
    let toastId: number = 0;
    
    act(() => {
      result.current.showToast({ type: 'info', message: 'Manual dismiss' });
    });
    
    toastId = result.current.toasts[0].id;
    expect(result.current.toasts).toHaveLength(1);
    
    act(() => {
      result.current.dismissToast(toastId);
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  it('dismisses only the specified toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({ type: 'success', message: 'Toast 1', duration: 10000 });
      vi.advanceTimersByTime(1); // Advance time to ensure different IDs
      result.current.showToast({ type: 'error', message: 'Toast 2', duration: 10000 });
    });
    
    const firstToastId = result.current.toasts[0].id;
    expect(result.current.toasts).toHaveLength(2);
    
    act(() => {
      result.current.dismissToast(firstToastId);
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Toast 2');
  });

  it('clears all toasts with clearToasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({ type: 'success', message: 'Toast 1' });
      result.current.showToast({ type: 'error', message: 'Toast 2' });
      result.current.showToast({ type: 'info', message: 'Toast 3' });
    });
    
    expect(result.current.toasts).toHaveLength(3);
    
    act(() => {
      result.current.clearToasts();
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  it('handles dismissing non-existent toast gracefully', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({ type: 'info', message: 'Test' });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    
    act(() => {
      result.current.dismissToast(999999); // Non-existent ID
    });
    
    expect(result.current.toasts).toHaveLength(1); // Toast should still exist
  });

  it('generates unique IDs for each toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast({ type: 'success', message: 'Toast 1' });
    });
    
    // Advance time a bit to ensure different timestamp
    act(() => {
      vi.advanceTimersByTime(1);
    });
    
    act(() => {
      result.current.showToast({ type: 'success', message: 'Toast 2' });
    });
    
    const id1 = result.current.toasts[0].id;
    const id2 = result.current.toasts[1].id;
    
    expect(id1).not.toBe(id2);
  });
});
