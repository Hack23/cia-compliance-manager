# Design System Implementation Guide

## Overview

This document provides guidance for completing the design system implementation across all 11 widgets in the CIA Compliance Manager application.

## What Has Been Completed

### ✅ Phase 1: Foundation (Complete)

1. **Design Tokens** (`src/constants/designTokens.ts`)
   - Spacing scale (xs, sm, md, lg, xl, xxl)
   - Typography hierarchy (caption → display)
   - Semantic colors (primary, success, warning, error, info, neutral)
   - Shadow depths (none → xxl)
   - Border radius values
   - Transitions and easing functions
   - Z-index layers
   - Widget-specific tokens
   - Full TypeScript support with helper functions
   - 31 passing unit tests

2. **TailwindCSS Configuration** (`tailwind.config.js`)
   - Extended theme with all design tokens
   - Custom spacing utilities
   - Typography scale with line heights
   - Semantic color palette
   - Shadow utilities
   - Transition utilities
   - Border radius values

3. **Documentation** (`docs/DESIGN_SYSTEM.md`)
   - Comprehensive design system documentation
   - Usage examples for all tokens
   - Widget patterns and guidelines
   - Accessibility guidelines
   - Responsive design patterns
   - Dark mode support

4. **Common Components**
   - ✅ **WidgetContainer** - Updated to use design tokens
   - All existing tests passing (10/10)

## Pattern to Follow

### Before (Inconsistent)

```tsx
<div className="p-4 rounded-lg shadow-sm border border-gray-200">
  <h3 className="text-lg font-medium mb-2">Title</h3>
  <p className="text-sm text-gray-600">Content</p>
</div>
```

### After (Design System)

```tsx
<div className="p-md sm:p-lg rounded-md shadow-md border border-neutral-light">
  <h3 className="text-heading font-semibold mb-sm">Title</h3>
  <p className="text-body text-neutral">Content</p>
</div>
```

## Token Usage Reference

### Spacing

| Old Class | New Class | Value |
|-----------|-----------|-------|
| `p-1` | `p-xs` | 4px |
| `p-2` | `p-sm` | 8px |
| `p-4` | `p-md` | 16px |
| `p-6` | `p-lg` | 24px |
| `p-8` | `p-xl` | 32px |
| `p-12` | `p-xxl` | 48px |

**Apply to**: `padding`, `margin`, `gap`, `space-x`, `space-y`

### Typography

| Old Class | New Class | Size | Usage |
|-----------|-----------|------|-------|
| `text-xs` | `text-caption` | 0.75rem | Labels, timestamps |
| `text-sm` | `text-body` | 0.875rem | Secondary text |
| `text-base` | `text-body-lg` | 1rem | Primary body text |
| - | `text-subheading` | 1.125rem | Subheadings |
| `text-lg` or `text-xl` | `text-heading` | 1.5rem | Section headings |
| `text-2xl` | `text-title` | 2rem | Page titles |
| `text-3xl` | `text-display` | 2.5rem | Hero text |

### Font Weights

| Old Class | New Class | Value |
|-----------|-----------|-------|
| `font-normal` | `font-normal` | 400 |
| `font-medium` | `font-medium` | 500 |
| `font-semibold` | `font-semibold` | 600 |
| `font-bold` | `font-bold` | 700 |

### Semantic Colors

| Context | Old Class | New Class |
|---------|-----------|-----------|
| Primary action | `bg-blue-500` | `bg-primary` |
| Success | `bg-green-500` | `bg-success` |
| Warning | `bg-yellow-500` | `bg-warning` |
| Error | `bg-red-500` | `bg-error` |
| Info | `bg-blue-400` | `bg-info` |
| Neutral | `bg-gray-500` | `bg-neutral` |

**Color Variants**: Add `-light` or `-dark` suffixes
- `bg-primary-light`
- `bg-success-dark`
- `text-error-light`

### Border Radius

| Old Class | New Class | Value |
|-----------|-----------|-------|
| `rounded` | `rounded-sm` | 4px |
| `rounded-md` | `rounded-md` | 8px |
| `rounded-lg` | `rounded-lg` | 12px |
| `rounded-xl` | `rounded-xl` | 16px |
| `rounded-full` | `rounded-full` | 9999px |

### Shadows

| Old Class | New Class | Usage |
|-----------|-----------|-------|
| - | `shadow-sm` | Subtle elevation |
| `shadow-sm` or `shadow` | `shadow-md` | Cards (default) |
| `shadow-lg` | `shadow-lg` | Elevated cards |
| `shadow-xl` | `shadow-xl` | Modals |
| `shadow-2xl` | `shadow-xxl` | Maximum elevation |

## Widget Update Checklist

For each widget, follow this checklist:

### 1. Spacing
- [ ] Replace hardcoded padding values with design tokens (p-md, p-lg)
- [ ] Replace hardcoded margin values with design tokens (mb-md, mt-lg)
- [ ] Use consistent gap values for flex/grid layouts (gap-md, gap-lg)
- [ ] Use responsive variants (sm:p-lg, md:gap-xl)

### 2. Typography
- [ ] Replace font size classes with semantic typography (text-heading, text-body)
- [ ] Apply consistent font weights (font-semibold for headings, font-normal for body)
- [ ] Ensure proper text hierarchy (heading > subheading > body > caption)
- [ ] Use line-height utilities where needed

### 3. Colors
- [ ] Replace arbitrary color classes with semantic colors
- [ ] Use color variants appropriately (primary, success, warning, error, info, neutral)
- [ ] Ensure proper contrast for accessibility
- [ ] Apply dark mode variants (dark:bg-neutral-dark, dark:text-primary-light)

### 4. Borders & Shadows
- [ ] Standardize border radius (rounded-md for cards, rounded-sm for buttons)
- [ ] Use consistent shadow depths (shadow-md for cards, shadow-sm for subtle elevation)
- [ ] Apply appropriate border colors (border-neutral-light, border-primary)

### 5. Transitions
- [ ] Add transition classes to interactive elements (transition-all duration-normal)
- [ ] Use hover states consistently (hover:shadow-lg, hover:bg-primary-dark)
- [ ] Apply focus states for accessibility (focus:ring-2 focus:ring-primary)

## Common Patterns by Widget Type

### Assessment Center Widgets

**Pattern**: Dashboard-style with metrics and badges

```tsx
<WidgetContainer title="Security Summary" icon="📊">
  <div className="space-y-md">
    {/* Metrics grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
      <div className="p-md bg-primary-light/10 rounded-md border border-primary-light">
        <div className="text-caption text-neutral mb-sm">Metric Label</div>
        <div className="text-heading font-semibold">Value</div>
      </div>
    </div>
    
    {/* Security levels */}
    <div className="flex gap-sm">
      <SecurityLevelBadge level="High" />
    </div>
  </div>
</WidgetContainer>
```

### Business Value Widgets

**Pattern**: Information cards with status indicators

```tsx
<WidgetContainer title="Compliance Status" icon="✅">
  <div className="space-y-md">
    {/* Status cards */}
    {items.map(item => (
      <div key={item.id} className="p-md rounded-md shadow-sm border border-neutral-light">
        <div className="flex items-center justify-between mb-sm">
          <h4 className="text-body-lg font-semibold">{item.title}</h4>
          <StatusBadge status={item.status} />
        </div>
        <p className="text-body text-neutral">{item.description}</p>
      </div>
    ))}
  </div>
</WidgetContainer>
```

### Impact Analysis Widgets

**Pattern**: CIA component-specific with metrics

```tsx
<WidgetContainer title="Availability Impact" icon="⏱️">
  <div className="space-y-md">
    {/* Level indicator */}
    <div className="mb-md">
      <SecurityLevelBadge category="Availability" level={level} />
    </div>
    
    {/* SLA Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
      <div className="p-md bg-info-light/10 rounded-md border border-info-light">
        <div className="text-caption font-medium mb-sm text-info-dark">
          Uptime Target
        </div>
        <div className="text-body-lg font-semibold">{uptime}</div>
      </div>
    </div>
  </div>
</WidgetContainer>
```

### Implementation Guide Widgets

**Pattern**: Technical details with code/data display

```tsx
<WidgetContainer title="Technical Details" icon="⚙️">
  <div className="space-y-md">
    {/* Technical metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
      <div className="p-md rounded-md border border-neutral-light">
        <div className="text-caption text-neutral mb-sm">Technical Metric</div>
        <div className="text-body-lg font-semibold font-mono">{value}</div>
      </div>
    </div>
    
    {/* Recommendations */}
    <div className="p-md bg-info-light/10 rounded-md border-l-4 border-info">
      <p className="text-body">{recommendation}</p>
    </div>
  </div>
</WidgetContainer>
```

## Testing Updates

After updating each widget:

1. **Run unit tests**: `npm test -- path/to/Widget.test.tsx --run`
2. **Visual inspection**: Start dev server and check widget appearance
3. **Responsive testing**: Test at different breakpoints (sm, md, lg)
4. **Dark mode testing**: Toggle theme and verify appearance
5. **Accessibility**: Check focus states and color contrast

## Validation

### Before Committing

```bash
# Run all tests
npm test

# Build the project
npm run build

# Lint code
npm run lint

# Check types
npx tsc --noEmit
```

### Visual Regression Check

1. Take screenshots of each widget before changes
2. Take screenshots after applying design system
3. Compare side-by-side
4. Document any intentional visual changes

## Remaining Work

### Assessment Center (2 widgets)
- [ ] SecuritySummaryWidget
- [ ] SecurityLevelWidget

### Business Value (3 widgets)
- [ ] ComplianceStatusWidget
- [ ] CostEstimationWidget
- [ ] ValueCreationWidget

### Impact Analysis (3 widgets)
- [ ] AvailabilityImpactWidget
- [ ] IntegrityImpactWidget
- [ ] ConfidentialityImpactWidget

### Implementation Guide (3 widgets)
- [ ] TechnicalDetailsWidget
- [ ] SecurityVisualizationWidget
- [ ] SecurityResourcesWidget

### Additional (1 widget)
- [ ] BusinessImpactAnalysisWidget

## Tips & Best Practices

1. **Start small**: Update one widget at a time
2. **Test frequently**: Run tests after each change
3. **Use TypeScript**: Import design tokens and use helper functions
4. **Follow patterns**: Refer to WidgetContainer as a reference
5. **Document changes**: Note any intentional visual changes
6. **Maintain consistency**: Use the same spacing/typography across similar elements
7. **Think responsive**: Always add sm:, md:, lg: variants where appropriate
8. **Support dark mode**: Add dark: variants for colors and backgrounds

## Questions or Issues?

Refer to:
- `docs/DESIGN_SYSTEM.md` - Complete design system documentation
- `src/constants/designTokens.ts` - Token definitions and helpers
- `tailwind.config.js` - TailwindCSS configuration
- `src/components/common/WidgetContainer.tsx` - Reference implementation

## Success Criteria

- ✅ All widgets use consistent spacing from design tokens
- ✅ Color usage follows semantic naming
- ✅ Typography hierarchy consistently applied
- ✅ All tests passing
- ✅ Build successful
- ✅ No visual regressions
- ✅ Responsive at all breakpoints
- ✅ Dark mode works correctly
- ✅ Accessibility maintained (focus states, contrast)

---

**Last Updated**: 2025-12-25  
**Version**: 1.0.0  
**Status**: Foundation Complete - Ready for Widget Updates
