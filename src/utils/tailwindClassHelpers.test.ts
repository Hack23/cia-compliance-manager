/**
 * Tests for TailwindCSS class helper utilities
 */

import { describe, it, expect } from 'vitest';
import { cn, WidgetClasses } from './tailwindClassHelpers';

describe('tailwindClassHelpers', () => {
  describe('cn utility', () => {
    it('should combine multiple class strings', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should filter out falsy values', () => {
      const result = cn('class1', false, null, undefined, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      
      const result = cn(
        'base',
        isActive && 'active',
        isDisabled && 'disabled'
      );
      
      expect(result).toBe('base active');
    });

    it('should return empty string when all values are falsy', () => {
      const result = cn(false, null, undefined);
      expect(result).toBe('');
    });

    it('should handle single class string', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('should handle no arguments', () => {
      const result = cn();
      expect(result).toBe('');
    });
  });

  describe('WidgetClasses', () => {
    it('should have container class pattern', () => {
      expect(WidgetClasses.container).toBeTruthy();
      expect(WidgetClasses.container).toContain('rounded-md');
      expect(WidgetClasses.container).toContain('border');
      expect(WidgetClasses.container).toContain('shadow-md');
    });

    it('should have typography class patterns', () => {
      expect(WidgetClasses.heading).toBeTruthy();
      expect(WidgetClasses.subheading).toBeTruthy();
      expect(WidgetClasses.body).toBeTruthy();
      expect(WidgetClasses.label).toBeTruthy();
    });

    it('should have responsive grid patterns', () => {
      expect(WidgetClasses.grid2Cols).toContain('grid');
      expect(WidgetClasses.grid2Cols).toContain('md:grid-cols-2');
      
      expect(WidgetClasses.grid3Cols).toContain('grid');
      expect(WidgetClasses.grid3Cols).toContain('lg:grid-cols-3');
    });

    it('should have button patterns with focus states', () => {
      expect(WidgetClasses.buttonPrimary).toContain('focus:ring');
      expect(WidgetClasses.buttonSecondary).toContain('focus:ring');
    });

    it('should have card patterns', () => {
      expect(WidgetClasses.card).toContain('rounded-md');
      expect(WidgetClasses.cardInteractive).toContain('hover:');
      expect(WidgetClasses.cardInteractive).toContain('cursor-pointer');
    });

    it('should have responsive visibility patterns', () => {
      expect(WidgetClasses.hideMobile).toContain('hidden');
      expect(WidgetClasses.hideMobile).toContain('md:block');
      
      expect(WidgetClasses.hideDesktop).toContain('block');
      expect(WidgetClasses.hideDesktop).toContain('md:hidden');
    });

    it('should have state patterns', () => {
      expect(WidgetClasses.disabled).toContain('opacity-50');
      expect(WidgetClasses.disabled).toContain('cursor-not-allowed');
      
      expect(WidgetClasses.loading).toContain('animate-pulse');
      
      expect(WidgetClasses.focusVisible).toContain('focus-visible:');
    });

    it('should have badge variants', () => {
      expect(WidgetClasses.badgeSuccess).toContain('bg-success');
      expect(WidgetClasses.badgeWarning).toContain('bg-warning');
      expect(WidgetClasses.badgeError).toContain('bg-error');
      expect(WidgetClasses.badgeInfo).toContain('bg-info');
      expect(WidgetClasses.badgeNeutral).toContain('bg-neutral');
    });
  });

  describe('Integration with design tokens', () => {
    it('should use design token spacing classes', () => {
      expect(WidgetClasses.container).toContain('p-lg');
      expect(WidgetClasses.section).toContain('mb-lg');
      expect(WidgetClasses.section).toContain('space-y-md');
    });

    it('should use design token typography classes', () => {
      expect(WidgetClasses.heading).toContain('text-subheading');
      expect(WidgetClasses.body).toContain('text-body');
      expect(WidgetClasses.label).toContain('text-caption');
    });

    it('should use design token color classes', () => {
      expect(WidgetClasses.buttonPrimary).toContain('bg-primary');
      expect(WidgetClasses.sectionBorder).toContain('border-primary');
    });
  });
});
