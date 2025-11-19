import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useSecurityLevelState } from './useSecurityLevelState';
import { SecurityLevel, CIAComponent } from '../types/cia';

describe('useSecurityLevelState', () => {
  describe('initialization', () => {
    it('initializes with default Moderate levels when no initial values provided', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      expect(result.current.levels.availability).toBe('Moderate');
      expect(result.current.levels.integrity).toBe('Moderate');
      expect(result.current.levels.confidentiality).toBe('Moderate');
    });

    it('initializes with partial custom levels, using defaults for unspecified', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({ availability: 'High' })
      );
      
      expect(result.current.levels.availability).toBe('High');
      expect(result.current.levels.integrity).toBe('Moderate');
      expect(result.current.levels.confidentiality).toBe('Moderate');
    });

    it('initializes with all custom levels when all provided', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({
          availability: 'High',
          integrity: 'Low',
          confidentiality: 'Very High'
        })
      );
      
      expect(result.current.levels.availability).toBe('High');
      expect(result.current.levels.integrity).toBe('Low');
      expect(result.current.levels.confidentiality).toBe('Very High');
    });
  });

  describe('setLevel', () => {
    it('updates availability level without affecting other components', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('availability', 'High');
      });
      
      expect(result.current.levels.availability).toBe('High');
      expect(result.current.levels.integrity).toBe('Moderate');
      expect(result.current.levels.confidentiality).toBe('Moderate');
    });

    it('updates integrity level without affecting other components', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('integrity', 'Low');
      });
      
      expect(result.current.levels.availability).toBe('Moderate');
      expect(result.current.levels.integrity).toBe('Low');
      expect(result.current.levels.confidentiality).toBe('Moderate');
    });

    it('updates confidentiality level without affecting other components', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('confidentiality', 'Very High');
      });
      
      expect(result.current.levels.availability).toBe('Moderate');
      expect(result.current.levels.integrity).toBe('Moderate');
      expect(result.current.levels.confidentiality).toBe('Very High');
    });

    it('allows multiple sequential updates', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('availability', 'High');
      });
      
      act(() => {
        result.current.setLevel('integrity', 'Very High');
      });
      
      act(() => {
        result.current.setLevel('confidentiality', 'Low');
      });
      
      expect(result.current.levels.availability).toBe('High');
      expect(result.current.levels.integrity).toBe('Very High');
      expect(result.current.levels.confidentiality).toBe('Low');
    });

    it('updates the same component multiple times', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('availability', 'High');
      });
      
      expect(result.current.levels.availability).toBe('High');
      
      act(() => {
        result.current.setLevel('availability', 'Low');
      });
      
      expect(result.current.levels.availability).toBe('Low');
    });

    it('handles all security level values', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      const levels: SecurityLevel[] = ['None', 'Low', 'Moderate', 'High', 'Very High'];
      
      levels.forEach(level => {
        act(() => {
          result.current.setLevel('availability', level);
        });
        
        expect(result.current.levels.availability).toBe(level);
      });
    });
  });

  describe('getLevel', () => {
    it('returns current level for availability', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({ availability: 'High' })
      );
      
      expect(result.current.getLevel('availability')).toBe('High');
    });

    it('returns current level for integrity', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({ integrity: 'Low' })
      );
      
      expect(result.current.getLevel('integrity')).toBe('Low');
    });

    it('returns current level for confidentiality', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({ confidentiality: 'Very High' })
      );
      
      expect(result.current.getLevel('confidentiality')).toBe('Very High');
    });

    it('returns updated level after setLevel is called', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('availability', 'High');
      });
      
      expect(result.current.getLevel('availability')).toBe('High');
    });
  });

  describe('resetLevels', () => {
    it('resets all levels to Moderate by default', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({
          availability: 'High',
          integrity: 'Low',
          confidentiality: 'Very High'
        })
      );
      
      act(() => {
        result.current.resetLevels();
      });
      
      expect(result.current.levels.availability).toBe('Moderate');
      expect(result.current.levels.integrity).toBe('Moderate');
      expect(result.current.levels.confidentiality).toBe('Moderate');
    });

    it('resets all levels to specified level', () => {
      const { result } = renderHook(() => 
        useSecurityLevelState({
          availability: 'High',
          integrity: 'Moderate',
          confidentiality: 'Very High'
        })
      );
      
      act(() => {
        result.current.resetLevels('Low');
      });
      
      expect(result.current.levels.availability).toBe('Low');
      expect(result.current.levels.integrity).toBe('Low');
      expect(result.current.levels.confidentiality).toBe('Low');
    });

    it('resets to Very High when specified', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.resetLevels('Very High');
      });
      
      expect(result.current.levels.availability).toBe('Very High');
      expect(result.current.levels.integrity).toBe('Very High');
      expect(result.current.levels.confidentiality).toBe('Very High');
    });

    it('can be called multiple times', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.resetLevels('High');
      });
      
      expect(result.current.levels.availability).toBe('High');
      
      act(() => {
        result.current.resetLevels('Low');
      });
      
      expect(result.current.levels.availability).toBe('Low');
    });
  });

  describe('function stability', () => {
    it('setLevel function remains stable across renders', () => {
      const { result, rerender } = renderHook(() => useSecurityLevelState());
      
      const firstSetLevel = result.current.setLevel;
      
      rerender();
      
      expect(result.current.setLevel).toBe(firstSetLevel);
    });

    it('resetLevels function remains stable across renders', () => {
      const { result, rerender } = renderHook(() => useSecurityLevelState());
      
      const firstResetLevels = result.current.resetLevels;
      
      rerender();
      
      expect(result.current.resetLevels).toBe(firstResetLevels);
    });

    it('getLevel function updates when levels change', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      const firstGetLevel = result.current.getLevel;
      
      act(() => {
        result.current.setLevel('availability', 'High');
      });
      
      // getLevel should be a new function since levels changed
      expect(result.current.getLevel).not.toBe(firstGetLevel);
    });
  });

  describe('type safety', () => {
    it('accepts valid CIA component names', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      const components: CIAComponent[] = ['availability', 'integrity', 'confidentiality'];
      
      components.forEach(component => {
        act(() => {
          result.current.setLevel(component, 'High');
        });
        
        expect(result.current.getLevel(component)).toBe('High');
      });
    });

    it('accepts valid security levels', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      const levels: SecurityLevel[] = ['None', 'Low', 'Moderate', 'High', 'Very High'];
      
      levels.forEach(level => {
        act(() => {
          result.current.setLevel('availability', level);
        });
        
        expect(result.current.levels.availability).toBe(level);
      });
    });
  });

  describe('integration scenarios', () => {
    it('handles complex state updates in realistic widget scenario', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      // Simulate user configuring security levels
      act(() => {
        result.current.setLevel('confidentiality', 'Very High');
      });
      
      act(() => {
        result.current.setLevel('integrity', 'High');
      });
      
      act(() => {
        result.current.setLevel('availability', 'Moderate');
      });
      
      expect(result.current.levels).toEqual({
        availability: 'Moderate',
        integrity: 'High',
        confidentiality: 'Very High'
      });
      
      // User decides to reset and start over
      act(() => {
        result.current.resetLevels('Low');
      });
      
      expect(result.current.levels).toEqual({
        availability: 'Low',
        integrity: 'Low',
        confidentiality: 'Low'
      });
    });

    it('maintains consistency when used with getLevel', () => {
      const { result } = renderHook(() => useSecurityLevelState());
      
      act(() => {
        result.current.setLevel('availability', 'High');
      });
      
      const levelFromGet = result.current.getLevel('availability');
      const levelFromState = result.current.levels.availability;
      
      expect(levelFromGet).toBe(levelFromState);
      expect(levelFromGet).toBe('High');
    });
  });
});
