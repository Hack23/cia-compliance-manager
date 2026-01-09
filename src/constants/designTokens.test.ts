import { describe, expect, it } from 'vitest';
import {
  BORDER_RADIUS,
  BREAKPOINTS,
  EASING,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  SEMANTIC_COLORS,
  SHADOWS,
  SPACING,
  TRANSITIONS,
  TYPOGRAPHY,
  WIDGET_DESIGN,
  WIDGET_STYLES,
  Z_INDEX,
  getBorderRadius,
  getSemanticColor,
  getShadow,
  getSpacing,
  getTypography,
} from './designTokens';

describe('Design Tokens', () => {
  describe('SPACING', () => {
    it('should define all spacing values', () => {
      expect(SPACING.xs).toBe('4px');
      expect(SPACING.sm).toBe('6px'); // Updated to match optimized value
      expect(SPACING.md).toBe('8px'); // Updated to match optimized value
      expect(SPACING.lg).toBe('16px'); // Updated to match optimized value
      expect(SPACING.xl).toBe('24px'); // Updated to match optimized value
      expect(SPACING.xxl).toBe('40px'); // Updated to match optimized value
    });

    it('should follow a consistent grid system', () => {
      const spacingValues = Object.values(SPACING).map(val =>
        parseInt(val.replace('px', ''))
      );
      spacingValues.forEach(value => {
        // All values should be positive numbers and multiples of 2
        expect(value).toBeGreaterThan(0);
        expect(value % 2).toBe(0); // Allow even numbers for flexibility
      });
    });
  });

  describe('TYPOGRAPHY', () => {
    it('should define all typography sizes', () => {
      expect(TYPOGRAPHY.caption).toBe('0.75rem');
      expect(TYPOGRAPHY.body).toBe('0.875rem');
      expect(TYPOGRAPHY.bodyLarge).toBe('1rem');
      expect(TYPOGRAPHY.subheading).toBe('1.125rem');
      expect(TYPOGRAPHY.heading).toBe('1.5rem');
      expect(TYPOGRAPHY.title).toBe('2rem');
      expect(TYPOGRAPHY.display).toBe('2.5rem');
    });

    it('should use rem units for accessibility', () => {
      const typographyValues = Object.values(TYPOGRAPHY);
      typographyValues.forEach(value => {
        expect(value).toMatch(/rem$/);
      });
    });
  });

  describe('FONT_WEIGHTS', () => {
    it('should define all font weights', () => {
      expect(FONT_WEIGHTS.normal).toBe('400');
      expect(FONT_WEIGHTS.medium).toBe('500');
      expect(FONT_WEIGHTS.semibold).toBe('600');
      expect(FONT_WEIGHTS.bold).toBe('700');
    });

    it('should use valid font weight values', () => {
      const weights = Object.values(FONT_WEIGHTS).map(w => parseInt(w));
      weights.forEach(weight => {
        expect(weight).toBeGreaterThanOrEqual(100);
        expect(weight).toBeLessThanOrEqual(900);
      });
    });
  });

  describe('LINE_HEIGHTS', () => {
    it('should define all line heights', () => {
      expect(LINE_HEIGHTS.tight).toBe('1.25');
      expect(LINE_HEIGHTS.normal).toBe('1.5');
      expect(LINE_HEIGHTS.relaxed).toBe('1.75');
    });
  });

  describe('SEMANTIC_COLORS', () => {
    it('should define all semantic color types', () => {
      expect(SEMANTIC_COLORS.primary).toBeDefined();
      expect(SEMANTIC_COLORS.success).toBeDefined();
      expect(SEMANTIC_COLORS.warning).toBeDefined();
      expect(SEMANTIC_COLORS.error).toBeDefined();
      expect(SEMANTIC_COLORS.info).toBeDefined();
      expect(SEMANTIC_COLORS.neutral).toBeDefined();
    });

    it('should define all color variants', () => {
      const colorTypes = Object.values(SEMANTIC_COLORS);
      colorTypes.forEach(colorType => {
        expect(colorType.light).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(colorType.main).toMatch(/^#[0-9a-fA-F]{6}$/);
        expect(colorType.dark).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });

    it('should have valid hex color format', () => {
      const hexColorRegex = /^#[0-9a-fA-F]{6}$/;
      
      expect(SEMANTIC_COLORS.primary.main).toMatch(hexColorRegex);
      expect(SEMANTIC_COLORS.success.main).toMatch(hexColorRegex);
      expect(SEMANTIC_COLORS.warning.main).toMatch(hexColorRegex);
      expect(SEMANTIC_COLORS.error.main).toMatch(hexColorRegex);
      expect(SEMANTIC_COLORS.info.main).toMatch(hexColorRegex);
      expect(SEMANTIC_COLORS.neutral.main).toMatch(hexColorRegex);
    });
  });

  describe('BORDER_RADIUS', () => {
    it('should define all border radius values', () => {
      expect(BORDER_RADIUS.none).toBe('0');
      expect(BORDER_RADIUS.sm).toBe('4px');
      expect(BORDER_RADIUS.md).toBe('12px'); // Updated to match optimized value
      expect(BORDER_RADIUS.lg).toBe('16px'); // Updated to match optimized value
      expect(BORDER_RADIUS.xl).toBe('20px'); // Updated to match optimized value
      expect(BORDER_RADIUS.full).toBe('9999px');
    });
  });

  describe('SHADOWS', () => {
    it('should define all shadow depths', () => {
      expect(SHADOWS.none).toBe('none');
      expect(SHADOWS.sm).toContain('rgba');
      expect(SHADOWS.md).toContain('rgba');
      expect(SHADOWS.lg).toContain('rgba');
      expect(SHADOWS.xl).toContain('rgba');
      expect(SHADOWS.xxl).toContain('rgba');
    });

    it('should have increasing shadow depths', () => {
      // Extract blur radius from shadow values
      const extractBlur = (shadow: string): number => {
        const match = shadow.match(/(\d+)px/g);
        if (!match || match.length < 2) return 0;
        return parseInt(match[1].replace('px', ''));
      };

      const smBlur = extractBlur(SHADOWS.sm);
      const mdBlur = extractBlur(SHADOWS.md);
      const lgBlur = extractBlur(SHADOWS.lg);
      const xlBlur = extractBlur(SHADOWS.xl);
      const xxlBlur = extractBlur(SHADOWS.xxl);

      expect(smBlur).toBeLessThan(mdBlur);
      expect(mdBlur).toBeLessThan(lgBlur);
      expect(lgBlur).toBeLessThan(xlBlur);
      expect(xlBlur).toBeLessThan(xxlBlur);
    });
  });

  describe('TRANSITIONS', () => {
    it('should define all transition durations', () => {
      expect(TRANSITIONS.fast).toBe('150ms');
      expect(TRANSITIONS.normal).toBe('200ms');
      expect(TRANSITIONS.slow).toBe('300ms');
    });

    it('should have increasing durations', () => {
      const fast = parseInt(TRANSITIONS.fast.replace('ms', ''));
      const normal = parseInt(TRANSITIONS.normal.replace('ms', ''));
      const slow = parseInt(TRANSITIONS.slow.replace('ms', ''));

      expect(fast).toBeLessThan(normal);
      expect(normal).toBeLessThan(slow);
    });
  });

  describe('EASING', () => {
    it('should define all easing functions', () => {
      expect(EASING.default).toContain('cubic-bezier');
      expect(EASING.in).toContain('cubic-bezier');
      expect(EASING.out).toContain('cubic-bezier');
      expect(EASING.sharp).toContain('cubic-bezier');
    });
  });

  describe('Z_INDEX', () => {
    it('should define all z-index layers', () => {
      expect(Z_INDEX.base).toBe(0);
      expect(Z_INDEX.dropdown).toBe(1000);
      expect(Z_INDEX.sticky).toBe(1020);
      expect(Z_INDEX.fixed).toBe(1030);
      expect(Z_INDEX.modalBackdrop).toBe(1040);
      expect(Z_INDEX.modal).toBe(1050);
      expect(Z_INDEX.popover).toBe(1060);
      expect(Z_INDEX.tooltip).toBe(1070);
    });

    it('should have proper stacking order', () => {
      expect(Z_INDEX.base).toBeLessThan(Z_INDEX.dropdown);
      expect(Z_INDEX.dropdown).toBeLessThan(Z_INDEX.sticky);
      expect(Z_INDEX.sticky).toBeLessThan(Z_INDEX.fixed);
      expect(Z_INDEX.fixed).toBeLessThan(Z_INDEX.modalBackdrop);
      expect(Z_INDEX.modalBackdrop).toBeLessThan(Z_INDEX.modal);
      expect(Z_INDEX.modal).toBeLessThan(Z_INDEX.popover);
      expect(Z_INDEX.popover).toBeLessThan(Z_INDEX.tooltip);
    });
  });

  describe('WIDGET_DESIGN', () => {
    it('should define widget-specific tokens', () => {
      expect(WIDGET_DESIGN.padding).toBe(SPACING.lg);
      expect(WIDGET_DESIGN.borderRadius).toBe(BORDER_RADIUS.md);
      expect(WIDGET_DESIGN.shadow).toBe(SHADOWS.md);
      expect(WIDGET_DESIGN.sectionGap).toBe(SPACING.md);
    });

    it('should have consistent measurements', () => {
      expect(WIDGET_DESIGN.headerHeight).toMatch(/px$/);
      expect(WIDGET_DESIGN.headerPadding).toBe(SPACING.md);
      expect(WIDGET_DESIGN.contentPadding).toBe(SPACING.md);
      expect(WIDGET_DESIGN.footerPadding).toBe(SPACING.md);
    });
  });

  describe('BREAKPOINTS', () => {
    it('should define all breakpoints', () => {
      expect(BREAKPOINTS.sm).toBe('640px');
      expect(BREAKPOINTS.md).toBe('768px');
      expect(BREAKPOINTS.lg).toBe('1024px');
      expect(BREAKPOINTS.xl).toBe('1280px');
      expect(BREAKPOINTS['2xl']).toBe('1536px');
    });

    it('should have increasing breakpoint values', () => {
      const sm = parseInt(BREAKPOINTS.sm.replace('px', ''));
      const md = parseInt(BREAKPOINTS.md.replace('px', ''));
      const lg = parseInt(BREAKPOINTS.lg.replace('px', ''));
      const xl = parseInt(BREAKPOINTS.xl.replace('px', ''));
      const xxl = parseInt(BREAKPOINTS['2xl'].replace('px', ''));

      expect(sm).toBeLessThan(md);
      expect(md).toBeLessThan(lg);
      expect(lg).toBeLessThan(xl);
      expect(xl).toBeLessThan(xxl);
    });
  });

  describe('Helper Functions', () => {
    describe('getSpacing', () => {
      it('should return correct spacing value', () => {
        expect(getSpacing('xs')).toBe('4px');
        expect(getSpacing('sm')).toBe('6px'); // Updated to match optimized value
        expect(getSpacing('md')).toBe('8px'); // Updated to match optimized value
        expect(getSpacing('lg')).toBe('16px'); // Updated to match optimized value
        expect(getSpacing('xl')).toBe('24px'); // Updated to match optimized value
        expect(getSpacing('xxl')).toBe('40px'); // Updated to match optimized value
      });
    });

    describe('getTypography', () => {
      it('should return correct typography value', () => {
        expect(getTypography('caption')).toBe('0.75rem');
        expect(getTypography('body')).toBe('0.875rem');
        expect(getTypography('heading')).toBe('1.5rem');
        expect(getTypography('title')).toBe('2rem');
      });
    });

    describe('getSemanticColor', () => {
      it('should return correct color with default variant', () => {
        expect(getSemanticColor('primary')).toBe('#9333ea'); // Updated to purple
        expect(getSemanticColor('success')).toBe('#27ae60');
        expect(getSemanticColor('warning')).toBe('#f1c40f');
        expect(getSemanticColor('error')).toBe('#e74c3c');
      });

      it('should return correct color with specified variant', () => {
        expect(getSemanticColor('primary', 'light')).toBe('#c084fc'); // Updated to purple
        expect(getSemanticColor('primary', 'main')).toBe('#9333ea'); // Updated to purple
        expect(getSemanticColor('primary', 'dark')).toBe('#7e22ce'); // Updated to purple
      });
    });

    describe('getShadow', () => {
      it('should return correct shadow value', () => {
        expect(getShadow('none')).toBe('none');
        expect(getShadow('sm')).toContain('rgba');
        expect(getShadow('md')).toContain('rgba');
        expect(getShadow('lg')).toContain('rgba');
      });
    });

    describe('getBorderRadius', () => {
      it('should return correct border radius value', () => {
        expect(getBorderRadius('none')).toBe('0');
        expect(getBorderRadius('sm')).toBe('4px');
        expect(getBorderRadius('md')).toBe('12px'); // Updated to match optimized value
        expect(getBorderRadius('lg')).toBe('16px'); // Updated to match optimized value
        expect(getBorderRadius('full')).toBe('9999px');
      });
    });
  });

  describe('Type Safety', () => {
    it('should export correct types', () => {
      // TypeScript will catch any type errors at compile time
      const spacing: typeof SPACING.md = '8px'; // Updated to match optimized value
      const typography: typeof TYPOGRAPHY.body = '0.875rem';
      const color: typeof SEMANTIC_COLORS.primary.main = '#9333ea'; // Updated to match purple primary
      
      expect(spacing).toBe('8px');
      expect(typography).toBe('0.875rem');
      expect(color).toBe('#9333ea');
    });
  });

  describe('Consistency Checks', () => {
    it('should maintain consistent naming conventions', () => {
      const spacingKeys = Object.keys(SPACING);
      const typographyKeys = Object.keys(TYPOGRAPHY);
      const shadowKeys = Object.keys(SHADOWS);

      // All keys should be lowercase or camelCase
      spacingKeys.forEach(key => {
        expect(key).toMatch(/^[a-z]+$/);
      });

      // Typography can have camelCase for bodyLarge
      typographyKeys.forEach(key => {
        expect(key).toMatch(/^[a-z][a-zA-Z]*$/);
      });

      shadowKeys.forEach(key => {
        expect(key).toMatch(/^[a-z]+$/);
      });
    });

    it('should have no duplicate values in spacing', () => {
      const values = Object.values(SPACING);
      const uniqueValues = [...new Set(values)];
      expect(values.length).toBe(uniqueValues.length);
    });
  });

  describe('WIDGET_STYLES', () => {
    it('should provide container style function', () => {
      const containerClasses = WIDGET_STYLES.container();
      expect(typeof containerClasses).toBe('string');
      expect(containerClasses).toContain('bg-white');
      expect(containerClasses).toContain('dark:bg-gray-800');
      expect(containerClasses).toContain('rounded-md');
      expect(containerClasses).toContain('shadow-md');
    });

    it('should provide header style function', () => {
      const headerClasses = WIDGET_STYLES.header();
      expect(typeof headerClasses).toBe('string');
      expect(headerClasses).toContain('flex');
      expect(headerClasses).toContain('items-center');
      expect(headerClasses).toContain('justify-between');
    });

    it('should provide section style function', () => {
      const sectionClasses = WIDGET_STYLES.section();
      expect(typeof sectionClasses).toBe('string');
      expect(sectionClasses).toContain('mb-lg');
      expect(sectionClasses).toContain('space-y-md');
    });

    it('should provide title style function', () => {
      const titleClasses = WIDGET_STYLES.title();
      expect(typeof titleClasses).toBe('string');
      expect(titleClasses).toContain('text-subheading');
      expect(titleClasses).toContain('font-semibold');
    });

    it('should provide subtitle style function', () => {
      const subtitleClasses = WIDGET_STYLES.subtitle();
      expect(typeof subtitleClasses).toBe('string');
      expect(subtitleClasses).toContain('text-body');
      expect(subtitleClasses).toContain('text-gray-600');
    });

    it('should provide content style function', () => {
      const contentClasses = WIDGET_STYLES.content();
      expect(typeof contentClasses).toBe('string');
      expect(contentClasses).toContain('p-md');
      expect(contentClasses).toContain('space-y-md');
    });

    it('should provide card style function', () => {
      const cardClasses = WIDGET_STYLES.card();
      expect(typeof cardClasses).toBe('string');
      expect(cardClasses).toContain('p-md');
      expect(cardClasses).toContain('bg-gray-50');
      expect(cardClasses).toContain('dark:bg-gray-700');
      expect(cardClasses).toContain('rounded-md');
    });

    it('should provide badge style function with default variant', () => {
      const badgeClasses = WIDGET_STYLES.badge();
      expect(typeof badgeClasses).toBe('string');
      expect(badgeClasses).toContain('inline-flex');
      expect(badgeClasses).toContain('items-center');
      expect(badgeClasses).toContain('rounded-sm');
      expect(badgeClasses).toContain('bg-neutral');
    });

    type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
    const badgeVariantCases: Array<[BadgeVariant, string, string]> = [
      ['primary', 'bg-primary', 'text-white'],
      ['success', 'bg-success', 'text-white'],
      ['warning', 'bg-warning', 'text-gray-900'],
      ['error', 'bg-error', 'text-white'],
      ['info', 'bg-info', 'text-white'],
      ['neutral', 'bg-neutral', 'text-white'],
    ];

    it.each(badgeVariantCases)(
      'should provide badge style with %s variant containing %s and %s',
      (variant, expectedBgClass, expectedTextClass) => {
        const badgeClasses = WIDGET_STYLES.badge(variant);
        expect(badgeClasses).toContain(expectedBgClass);
        expect(badgeClasses).toContain(expectedTextClass);
        expect(badgeClasses).toContain('inline-flex');
        expect(badgeClasses).toContain('items-center');
      }
    );
  });
});
